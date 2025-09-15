// Dynamische wedstrijddata en helpers
export interface MatchEvent {
  rugnummer: number; // scorer
  type: 'goal';
}

export interface Match {
  datum: string; // ISO yyyy-mm-dd
  tegenstander: string;
  thuis: boolean;
  goalsVoor: number;
  goalsTegen: number;
  events: MatchEvent[];
  competitie: boolean;
  players: number[];
}

// Resultaten (gespeelde wedstrijden)
export const matches: Match[] = [
  { datum: '2025-09-07', tegenstander: 'Zonhoven United', thuis: true, goalsVoor: 0, goalsTegen: 2, competitie: true, events: [ ], players: [1,2,3,4,5,6,7, 9,10,11,12,13, 16,17,19] },
  { datum: '2025-09-14', tegenstander: 'SV Grasheide', thuis: true, goalsVoor: 3, goalsTegen: 0, competitie: true, events: [ { rugnummer: 19, type: 'goal' }, { rugnummer: 12, type: 'goal' }, { rugnummer: 1, type: 'goal' } ], players: [1,2,5,7,9,10,11,12,13,16,17,19,20,25,26] },
];

// Komende fixtures
export interface Fixture {
  datum: string;
  tegenstander: string;
  thuis: boolean;
  tijd: string; // HH:MM
  locatie?: string; // optioneel
}

export const upcoming: Fixture[] = [
  // LET OP: Data afkomstig van RBFA kalender (dynamic page). Alleen eerstvolgende match kon automatisch geïdentificeerd.
  // Vul de rest manueel aan zodra volledige kalender beschikbaar is in tekstvorm.
    // Volledige heenronde (najaar) volgens RBFA kalender (screenshots 19 sep -> 7 dec 2025)
    { datum: '2025-09-19', tegenstander: 'VV-NEXT Laakdal', thuis: false, tijd: '20:00' },
    { datum: '2025-09-28', tegenstander: 'Football Girls Leuven A', thuis: true, tijd: '10:00' },
    { datum: '2025-10-05', tegenstander: 'KFC Herent', thuis: false, tijd: '11:30' },
    { datum: '2025-10-12', tegenstander: 'KSKS Herentals', thuis: true, tijd: '10:00' },
    { datum: '2025-10-18', tegenstander: 'KFC Grobbendonk', thuis: false, tijd: '14:30' },
    { datum: '2025-10-25', tegenstander: 'Zonhoven United', thuis: false, tijd: '13:00' },
    { datum: '2025-11-02', tegenstander: 'SV Grasheide', thuis: true, tijd: '10:00' },
    { datum: '2025-11-09', tegenstander: 'VV-NEXT Laakdal', thuis: true, tijd: '10:00' },
    { datum: '2025-11-15', tegenstander: 'Football Girls Leuven A', thuis: false, tijd: '17:00' },
    { datum: '2025-11-23', tegenstander: 'KFC Herent', thuis: true, tijd: '10:00' },
    { datum: '2025-11-30', tegenstander: 'KSKS Herentals', thuis: false, tijd: '10:00' },
    { datum: '2025-12-07', tegenstander: 'KFC Grobbendonk', thuis: true, tijd: '10:00' },
];

// --- Dynamische competitie tabel ---
// We willen alle gespeelde competitiewedstrijden van ALLE ploegen kunnen bijhouden om een actuele rangschikking te berekenen.
// Voor nu registreren we enkel wedstrijden waar MU20 in meespeelde + (optioneel) "spiegel" wedstrijden tussen andere teams
// indien gekend. Je kan later eenvoudig wedstrijden toevoegen (ook tussen 2 tegenstanders waar MU20 niet speelt) zodat de
// tabel altijd klopt.

export interface TableRow {
  team: string;
  gespeeld: number; winst: number; gelijk: number; verlies: number;
  doelpuntenVoor: number; doelpuntenTegen: number;
  doelsaldo: number; punten: number;
}

// Naam van ons team zoals gebruikt in de competitie dataset
export const OUR_TEAM_NAME = 'Haacht United';

// Generiek competitietype (aparte interface ipv Match omdat we voor andere teams niet alle velden nodig hebben)
export interface LeagueMatch {
  datum: string; // ISO
  thuisTeam: string;
  uitTeam: string;
  thuisGoals: number;
  uitGoals: number;
  // Optioneel referentie naar originele Match (voor ons eigen team) - kan gebruikt worden voor linking
  sourceMatchIndex?: number;
}

// Helper: converteer de huidige "matches" (waar MU20 speelt) naar LeagueMatch records
function ownMatchesToLeague(): LeagueMatch[] {
  return matches.filter(m => m.competitie).map((m, idx) => ({
    datum: m.datum,
    thuisTeam: m.thuis ? OUR_TEAM_NAME : m.tegenstander,
    uitTeam: m.thuis ? m.tegenstander : OUR_TEAM_NAME,
    thuisGoals: m.thuis ? m.goalsVoor : m.goalsTegen,
    uitGoals: m.thuis ? m.goalsTegen : m.goalsVoor,
    sourceMatchIndex: idx,
  }));
}

// Wedstrijden tussen andere ploegen kunnen hier aanvullend toegevoegd worden zodra gekend.
// Voorbeeld placeholder (commented):
// const externalResults: LeagueMatch[] = [
//   { datum: '2025-09-07', thuisTeam: 'VV-NEXT Laakdal', uitTeam: 'KFC Herent', thuisGoals: 1, uitGoals: 1 },
// ];
// BELANGRIJK: Voeg hier GEEN wedstrijden toe waar "Haacht United" (OUR_TEAM_NAME) in voorkomt, die worden al
// automatisch gegenereerd vanuit `matches` via ownMatchesToLeague() -> anders worden ze dubbel geteld.
const externalResults: LeagueMatch[] = [
  { datum: '2025-09-05', thuisTeam: 'VV-NEXT Laakdal', uitTeam: 'SV Grasheide', thuisGoals: 2, uitGoals: 1 },
  { datum: '2025-09-06', thuisTeam: 'Football Girls Leuven A', uitTeam: 'KFC Grobbendonk', thuisGoals: 8, uitGoals: 1 },
  { datum: '2025-09-07', thuisTeam: 'KFC Herent', uitTeam: 'KSKS Herentals', thuisGoals: 5, uitGoals: 0 },
  { datum: '2025-09-13', thuisTeam: 'Zonhoven United', uitTeam: 'Football Girls Leuven A', thuisGoals: 1, uitGoals: 4 },
  { datum: '2025-09-13', thuisTeam: 'KFC Grobbendonk', uitTeam: 'KFC Herent', thuisGoals: 3, uitGoals: 7 },
  { datum: '2025-09-14', thuisTeam: 'KSKS Herentals', uitTeam: 'VV-NEXT Laakdal', thuisGoals: 0, uitGoals: 5 },
];

// Combineer & dedupliceer (datum+thuis+uit). Dit beschermt tegen per ongeluk dubbel ingeven.
export const allLeagueMatches: LeagueMatch[] = (() => {
  const combined = [...ownMatchesToLeague(), ...externalResults];
  const seen = new Set<string>();
  const result: LeagueMatch[] = [];
  combined.forEach(m => {
    const key = `${m.datum}|${m.thuisTeam}|${m.uitTeam}`;
    if (seen.has(key)) {
      if (typeof console !== 'undefined' && process?.env?.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('Dubbele wedstrijd genegeerd in allLeagueMatches:', key);
      }
      return;
    }
    seen.add(key);
    result.push(m);
  });
  return result;
})();

// Onderhoudsrichtlijn:
// 1. Voeg elke nieuwe gespeelde competitiewedstrijd van MU20 toe aan `matches` (boven) zoals nu gebeurt.
// 2. Voeg (optioneel) wedstrijden tussen andere ploegen toe in `externalResults` zodra de uitslag gekend is.
// 3. De export `leagueTable` wordt dan automatisch opnieuw berekend bij build.
// 4. Sorteervolgorde = Punten desc, Doelsaldo desc, Goals Voor desc, Teamnaam asc.

export function computeLeagueTable(rows: LeagueMatch[]): TableRow[] {
  interface Agg { gespeeld: number; winst: number; gelijk: number; verlies: number; doelpuntenVoor: number; doelpuntenTegen: number; }
  const map = new Map<string, Agg>();
  const ensure = (team: string) => {
    if (!map.has(team)) map.set(team, { gespeeld: 0, winst: 0, gelijk: 0, verlies: 0, doelpuntenVoor: 0, doelpuntenTegen: 0 });
    return map.get(team)!;
  };
  rows.forEach(m => {
    const home = ensure(m.thuisTeam);
    const away = ensure(m.uitTeam);
    home.gespeeld++; away.gespeeld++;
    home.doelpuntenVoor += m.thuisGoals; home.doelpuntenTegen += m.uitGoals;
    away.doelpuntenVoor += m.uitGoals; away.doelpuntenTegen += m.thuisGoals;
    if (m.thuisGoals > m.uitGoals) { home.winst++; away.verlies++; }
    else if (m.thuisGoals < m.uitGoals) { away.winst++; home.verlies++; }
    else { home.gelijk++; away.gelijk++; }
  });
  const table: TableRow[] = Array.from(map.entries()).map(([team, a]) => ({
    team,
    gespeeld: a.gespeeld,
    winst: a.winst,
    gelijk: a.gelijk,
    verlies: a.verlies,
    doelpuntenVoor: a.doelpuntenVoor,
    doelpuntenTegen: a.doelpuntenTegen,
    doelsaldo: a.doelpuntenVoor - a.doelpuntenTegen,
    punten: a.winst * 3 + a.gelijk,
  }));
  // Sorteer: punten desc, doelsaldo desc, doelpuntenVoor desc, team naam asc
  table.sort((a,b) => b.punten - a.punten || b.doelsaldo - a.doelsaldo || b.doelpuntenVoor - a.doelpuntenVoor || a.team.localeCompare(b.team));
  return table;
}

export const leagueTable: TableRow[] = computeLeagueTable(allLeagueMatches);

export function computeTeamStats(list: Match[]) {
  const totaal = list.length;
  let winst = 0, gelijk = 0, verlies = 0, goalsVoor = 0, goalsTegen = 0, cleanSheets = 0;
  list.forEach(m => {
    goalsVoor += m.goalsVoor; goalsTegen += m.goalsTegen;
    if (m.goalsVoor > m.goalsTegen) winst++; else if (m.goalsVoor === m.goalsTegen) gelijk++; else verlies++;
    if (m.goalsTegen === 0) cleanSheets++;
  });
  const punten = winst * 3 + gelijk;
  return { totaal, winst, gelijk, verlies, goalsVoor, goalsTegen, doelsaldo: goalsVoor - goalsTegen, punten, cleanSheets, goalsPerWedstrijd: goalsVoor / (totaal || 1) };
}

export interface ScorerRow { rugnummer: number; goals: number; }

export function goalRanking(list: Match[]): ScorerRow[] {
  const map = new Map<number, number>();
  list.forEach(m => m.events.filter(e => e.type === 'goal').forEach(e => {
    map.set(e.rugnummer, (map.get(e.rugnummer) || 0) + 1);
  }));
  return Array.from(map.entries()).map(([rugnummer, goals]) => ({ rugnummer, goals }))
    .sort((a,b) => b.goals - a.goals);
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso + 'T00:00:00').toLocaleDateString('nl-BE', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}
