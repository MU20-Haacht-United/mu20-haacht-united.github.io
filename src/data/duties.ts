// Taken & Shiften voor alle wedstrijden (thuis + uit)
// MIGRATIE: Voorheen alleen thuiswedstrijden zonder 'thuis' veld. Nu elke entry heeft 'thuis: boolean'.
// Voeg voor bestaande custom entries een 'thuis: true' toe indien het een thuiswedstrijd was.
// Thuis: bar/toog (2 speelsters), fruit (1), was (1)
// Uit: geen bar; enkel fruit & was (optioneel)
// Vul assignments aan wanneer namen gekend zijn. Rotatiehelpers geven voorstellen.

import { upcoming, matches, formatDate } from './games';
import { players } from './players';

export interface DutyAssignment {
  datum: string;          // ISO datum (match dag)
  tegenstander: string;   // Tegenstander
  thuis: boolean;         // True = thuis, false = uit
  bar: number[];          // Rugnummers (exact 2 aanbevolen bij thuis, leeg bij uit)
  fruit?: number;         // Rugnummer speelster die fruit voorziet
  was?: number;           // Rugnummer speelster die was doet
  opmerking?: string;     // Vrij veld voor notities
  gespeeld?: boolean;     // true indien match reeds gespeeld (afgeleide info mogelijk)
  nvt?: boolean;          // true indien deze taak niet van toepassing is (bijv. geen was bij uitwedstrijden)
}

// n.v.t. gebruik:
//  - Zet nvt: true voor een wedstrijd wanneer GEEN enkele taak van toepassing is (geen bar/fruit/was).
//  - Laat dan bar als [] en laat fruit/was weg; UI toont automatisch 'n.v.t.'.
//  - Scheduler genereert geen voorstellen voor nvt wedstrijden.

// Verzamel alle wedstrijden (gespeeld + toekomst) met thuis/uit vlag
function getAllGames() {
  const past = matches.map(m => ({ datum: m.datum, tegenstander: m.tegenstander, thuis: m.thuis, gespeeld: true }));
  const future = upcoming.map(f => ({ datum: f.datum, tegenstander: f.tegenstander, thuis: f.thuis, gespeeld: false }));
  const combined = [...past, ...future];
  // Dedup on datum+tegenstander in case overlap between matches/upcoming (prefer past entry)
  const seen = new Set<string>();
  const result: typeof combined = [];
  for (const g of combined) {
    const key = g.datum + '|' + g.tegenstander;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(g);
  }
  result.sort((a,b) => a.datum.localeCompare(b.datum));
  return result;
}

// Manuele lijst met assignments (start leeg of met reeds ingevoerde).
// Gebruik rugnummers zodat naamwijzigingen geen impact hebben.
// Voorbeeld: { datum: '2025-09-28', tegenstander: 'Leuven', thuis: true, bar: [7,12], fruit: 15, was: 11 }
export const dutyAssignments: DutyAssignment[] = [
  { datum: '2025-09-07', tegenstander: 'Zonhoven', thuis: true, bar: [9,12], fruit: 9, was: 9, gespeeld: true },
  { datum: '2025-09-14', tegenstander: 'Grasheide', thuis: true, bar: [], fruit: 1, was: 1, gespeeld: true },
  { datum: '2025-09-19', tegenstander: 'Laakdal', thuis: false, bar: [], fruit: 2, was: 2, gespeeld: true },
  { datum: '2025-09-28', tegenstander: 'Leuven', thuis: true, bar: [1,2], fruit: 12, was: 12, gespeeld: true },
  { datum: '2025-10-05', tegenstander: 'Herent', thuis: false, bar: [], fruit: 6, was: 6, gespeeld: true },
  // { datum: '2025-10-12', tegenstander: 'Herentals', thuis: true, bar: [], gespeeld: false, nvt: true },
  { datum: '2025-10-18', tegenstander: 'Grobbendonk', thuis: false, bar: [], fruit: 7, was: 7, gespeeld: true },
  { datum: '2025-10-25', tegenstander: 'Zonhoven', thuis: false, bar: [], fruit: 10, was: 10, gespeeld: true },
  { datum: '2025-11-02', tegenstander: 'Grasheide', thuis: true, bar: [3,5], fruit: 11, was: 11, gespeeld: true },
  { datum: '2025-11-09', tegenstander: 'Laakdal', thuis: true, bar: [4,6], fruit: 15, was: 15, gespeeld: true },
  { datum: '2025-11-15', tegenstander: 'Leuven', thuis: false, bar: [], fruit: 4, was: 4, gespeeld: false },
  { datum: '2025-11-23', tegenstander: 'Herent', thuis: true, bar: [7,8], fruit: 3, was: 3, gespeeld: false },
  // { datum: '2025-11-30', tegenstander: 'Herentals', thuis: false, bar: [], gespeeld: false, nvt: true},
  { datum: '2025-12-07', tegenstander: 'Grobbendonk', thuis: true, bar: [10,11], fruit: 14, was: 14, gespeeld: false },
];

// Helpers om suggesties te maken voor nog niet ingevulde shiften.

// Gewicht per speler: aantal reeds toegewezen taken zodat we een eerlijke verdeling kunnen voorstellen.
interface LoadCounter { bar: number; fruit: number; was: number; total: number; }

function buildLoadCounters(assignments: DutyAssignment[]): Map<number, LoadCounter> {
  const map = new Map<number, LoadCounter>();
  players.forEach(p => map.set(p.rugnummer, { bar: 0, fruit: 0, was: 0, total: 0 }));
  assignments.forEach(a => {
    a.bar.forEach(r => {
      const lc = map.get(r)!; lc.bar++; lc.total++; });
    if (a.fruit) { const lc = map.get(a.fruit); if (lc) { lc.fruit++; lc.total++; } }
    if (a.was) { const lc = map.get(a.was); if (lc) { lc.was++; lc.total++; } }
  });
  return map;
}

// Sorteer spelers op laagste total -> naam
function leastLoadedPlayers(loads: Map<number, LoadCounter>): number[] {
  return Array.from(loads.entries())
    .sort((a,b) => a[1].total - b[1].total || a[0] - b[0])
    .map(e => e[0]);
}

export interface SuggestedDuty extends DutyAssignment {
  suggestedBar?: number[];    // 2 voorstellen indien bar leeg (alleen thuis)
  suggestedFruit?: number;    // voorstel fruit indien leeg
  suggestedWas?: number;      // voorstel was indien leeg
}

export function computeDutySchedule(): SuggestedDuty[] {
  const games = getAllGames();
  const assignments = dutyAssignments.slice();
  const load = buildLoadCounters(assignments);
  const ordered = leastLoadedPlayers(load);

  // Helper die volgende beschikbare speler geeft (en load virtueel verhoogt zodat suggesties roteren)
  let idx = 0;
  function nextPlayer(): number {
    const r = ordered[idx % ordered.length];
    idx++;
    return r;
  }

  return games.map(g => {
    const existing = assignments.find(a => a.datum === g.datum && a.tegenstander === g.tegenstander) || { datum: g.datum, tegenstander: g.tegenstander, thuis: g.thuis, bar: [], fruit: undefined, was: undefined } as DutyAssignment;
    const suggestion: SuggestedDuty = { ...existing, gespeeld: g.gespeeld, thuis: g.thuis };
    if (!suggestion.nvt) {
      if (g.thuis) {
        if (suggestion.bar.length < 2) {
          const needed = 2 - suggestion.bar.length;
            suggestion.suggestedBar = [];
            for (let i=0;i<needed;i++) suggestion.suggestedBar.push(nextPlayer());
        }
      }
      // Fruit/was ook bij uitwedstrijden indien leeg
      if (!suggestion.fruit) suggestion.suggestedFruit = nextPlayer();
      if (!suggestion.was) suggestion.suggestedWas = nextPlayer();
    }
    return suggestion;
  });
}

export function playerName(rugnummer: number): string {
  const p = players.find(p => p.rugnummer === rugnummer);
  return p ? p.naam : `#${rugnummer}`;
}

export function formatRugList(nums: number[]): string {
  return nums.map(n => playerName(n)).join(', ');
}

export function formatDateShort(iso: string): string {
  return formatDate(iso);
}

// --- Per speler totalen ---
export interface PlayerDutyTotals {
  rugnummer: number;
  naam: string;
  bar: number;
  fruit: number;
  was: number;
  totaal: number;
}

export function computeDutyTotals(assignments: DutyAssignment[] = dutyAssignments): PlayerDutyTotals[] {
  const counters = new Map<number, { bar: number; fruit: number; was: number }>();
  players.forEach(p => counters.set(p.rugnummer, { bar: 0, fruit: 0, was: 0 }));
  assignments.forEach(a => {
    if (a.nvt) return; // n.v.t. telt niet mee
    a.bar.forEach(r => { const c = counters.get(r); if (c) c.bar++; });
    if (a.fruit) { const c = counters.get(a.fruit); if (c) c.fruit++; }
    if (a.was) { const c = counters.get(a.was); if (c) c.was++; }
  });
  return players.map(p => {
    const c = counters.get(p.rugnummer)!;
    return { rugnummer: p.rugnummer, naam: p.naam, bar: c.bar, fruit: c.fruit, was: c.was, totaal: c.bar + c.fruit + c.was };
  }).sort((a,b) => b.totaal - a.totaal || a.naam.localeCompare(b.naam));
}
