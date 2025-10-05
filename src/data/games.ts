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
  { datum: '2025-09-07', tegenstander: 'Zonhoven', thuis: true, goalsVoor: 0, goalsTegen: 2, competitie: true, events: [ ], players: [1,2,3,4,5,6,7, 9,10,11,12,13, 16,17,19] },
  { datum: '2025-09-14', tegenstander: 'Grasheide', thuis: true, goalsVoor: 3, goalsTegen: 0, competitie: true, events: [ { rugnummer: 19, type: 'goal' }, 
    { rugnummer: 12, type: 'goal' }, 
    { rugnummer: 1, type: 'goal' } ], players: [1,2,5,7,9,10,11,12,13,16,17,19,20,25,26] },
  { datum: '2025-09-19', tegenstander: 'Laakdal', thuis: false, goalsVoor: 3, goalsTegen: 0, competitie: true, events: [{ rugnummer: 13, type: 'goal' }, 
    { rugnummer: 12, type: 'goal' }, 
    { rugnummer: 12, type: 'goal' }], players: [1,2,3,7,10,11,12,13,15,16,17,19,20,21,25] },
  { datum: '2025-09-28', tegenstander: 'Leuven', thuis: true, goalsVoor: 1, goalsTegen: 4, competitie: true, events: [{ rugnummer: 1, type: 'goal' }], players: [3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,25] },
  { datum: '2025-10-05', tegenstander: 'Herent', thuis: false, goalsVoor: 1, goalsTegen: 8, competitie: true, events: [{ rugnummer: 12, type: 'goal' },
    { rugnummer: 1, type: 'goal' },
    { rugnummer: 11, type: 'goal' },
    { rugnummer: 1, type: 'goal' },
    { rugnummer: 21, type: 'goal' },
    { rugnummer: 9, type: 'goal' },
    { rugnummer: 12, type: 'goal' },
    { rugnummer: 6, type: 'goal' },
  ], players: [21, 6, 10, 16,11,9,2,12,13,15,19,5,1,17,18] },
  
];

// Komende fixtures
export interface Fixture {
  datum: string;
  tegenstander: string;
  thuis: boolean;
  tijd: string; // HH:MM
  locatie?: string; // Korte beschrijving ("Terrein A", "Sportpark" etc.)
  adres?: string;   // Straat + nr + gemeente
  mapsUrl?: string; // Volledige Google Maps deeplink (https://maps.google.com/?q=...)
  commentaar?: string;
}

// Gebruik van adres & mapsUrl:
//  - Laat weg indien nog niet gekend.
//  - 'adres' is plain tekst voor weergave in de UI.
//  - 'mapsUrl' is een volledige link (kan target _blank) naar Google Maps zodat ouders/spelers snel kunnen navigeren.
//  - Voor thuiswedstrijden kan mapsUrl desgewenst telkens hetzelfde terrein aanwijzen.

export const upcoming: Fixture[] = [
  // LET OP: Data afkomstig van RBFA kalender (dynamic page). Alleen eerstvolgende match kon automatisch geïdentificeerd.
  // Vul de rest manueel aan zodra volledige kalender beschikbaar is in tekstvorm.
    // Volledige heenronde (najaar) volgens RBFA kalender (screenshots 19 sep -> 7 dec 2025)
    { datum: '2025-10-18', tegenstander: 'Grobbendonk', thuis: false, tijd: '14:30', 
      locatie: 'Cmp Grobbendonk - Terr. 1',
      adres: 'Vaartkom 2, 2280 Grobbendonk',
      mapsUrl: 'https://www.google.com/maps/place/KFC+Grobbendonk/@51.1902146,4.7318345,982m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47c155766e7379a5:0x1130543b4389c75a!8m2!3d51.1902146!4d4.7344094!16s%2Fg%2F11gmc9mr9w?entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D'
 },
    { datum: '2025-10-25', tegenstander: 'Zonhoven', thuis: false, tijd: '13:00', 
      locatie: 'De Basvelden - Terr. 2',
      adres: 'Herestraat 124A, 3520 Zonhoven',
      mapsUrl: 'https://www.google.com/maps/place/Zonhoven+United+-+Jeugdacademie/@50.9867578,5.3803551,987m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47c126db6e22e5db:0x1e40501f4f8b20c5!8m2!3d50.9867579!4d5.385226!16s%2Fg%2F1v93_6cg?entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D' },
    { datum: '2025-11-02', tegenstander: 'Grasheide', thuis: true, tijd: '10:00' },
    { datum: '2025-11-09', tegenstander: 'Laakdal', thuis: true, tijd: '10:00' },
    { datum: '2025-11-15', tegenstander: 'Leuven', thuis: false, tijd: '17:00', 
      locatie: 'Boudewijnstadion',
      adres: 'Stadionlaan 8, 3010 Kessel-Lo',
      mapsUrl: 'https://www.google.com/maps/place/Boudewijnstadion/@50.8835806,4.7283799,1978m/data=!3m2!1e3!4b1!4m6!3m5!1s0x47c167237dc07261:0x65342f5c9b813b89!8m2!3d50.8835807!4d4.7332508!16s%2Fg%2F11j4swclzy?entry=ttu&g_ep=EgoyMDI1MDkxMC4wIKXMDSoASAFQAw%3D%3D' },
    { datum: '2025-11-23', tegenstander: 'Herent', thuis: true, tijd: '10:00' },
    // { datum: '2025-11-30', tegenstander: 'Herentals', thuis: false, tijd: '10:00', 
    //   locatie: '',
    //   adres: '',
    //   mapsUrl: '', commentaar: 'Forfait door Herentals' },
    { datum: '2025-12-07', tegenstander: 'Grobbendonk', thuis: true, tijd: '10:00' },
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
  gespeeld?: boolean;
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
//   { datum: '2025-09-07', thuisTeam: 'Laakdal', uitTeam: 'Herent', thuisGoals: 1, uitGoals: 1 },
// ];
// BELANGRIJK: Voeg hier GEEN wedstrijden toe waar "Haacht United" (OUR_TEAM_NAME) in voorkomt, die worden al
// automatisch gegenereerd vanuit `matches` via ownMatchesToLeague() -> anders worden ze dubbel geteld.
const externalResults: LeagueMatch[] = [
  { datum: '2025-09-05', thuisTeam: 'Laakdal', uitTeam: 'Grasheide', thuisGoals: 2, uitGoals: 1, gespeeld: true },
  { datum: '2025-09-06', thuisTeam: 'Leuven', uitTeam: 'Grobbendonk', thuisGoals: 8, uitGoals: 1, gespeeld: true },

  { datum: '2025-09-13', thuisTeam: 'Zonhoven', uitTeam: 'Leuven', thuisGoals: 1, uitGoals: 4, gespeeld: true },
  { datum: '2025-09-13', thuisTeam: 'Grobbendonk', uitTeam: 'Herent', thuisGoals: 3, uitGoals: 7, gespeeld: true },

  { datum: '2025-09-20', thuisTeam: 'Leuven', uitTeam: 'Grasheide', thuisGoals: 4, uitGoals: 0, gespeeld: true },
  { datum: '2025-09-21', thuisTeam: 'Herent', uitTeam: 'Zonhoven', thuisGoals: 6, uitGoals: 4, gespeeld: true },

  { datum: '2025-09-27', thuisTeam: 'Grobbendonk', uitTeam: 'Laakdal', thuisGoals: 0, uitGoals: 11, gespeeld: true },
  { datum: '2025-09-28', thuisTeam: 'Grasheide', uitTeam: 'Herent', thuisGoals: 3, uitGoals: 1, gespeeld: true },

  { datum: '2025-10-04', thuisTeam: 'Grobbendonk', uitTeam: 'Zonhoven', thuisGoals: 0, uitGoals: 3, gespeeld: true },
  { datum: '2025-10-05', thuisTeam: 'Laakdal', uitTeam: 'Leuven', thuisGoals: 4, uitGoals: 5, gespeeld: true },

  { datum: '2025-10-10', thuisTeam: 'Laakdal', uitTeam: 'Zonhoven', thuisGoals: 0, uitGoals: 0, gespeeld: false },
  { datum: '2025-10-11', thuisTeam: 'Leuven', uitTeam: 'Herent', thuisGoals: 0, uitGoals: 0, gespeeld: false },
  { datum: '2025-10-12', thuisTeam: 'Grasheide', uitTeam: 'Grobbendonk', thuisGoals: 0, uitGoals: 0, gespeeld: false },

  { datum: '2025-10-18', thuisTeam: 'Zonhoven', uitTeam: 'Grasheide', thuisGoals: 0, uitGoals: 0, gespeeld: false },
  { datum: '2025-10-05', thuisTeam: 'Herent', uitTeam: 'Laakdal', thuisGoals: 0, uitGoals: 0, gespeeld: false },
];

// Combineer & dedupliceer (datum+thuis+uit). Dit beschermt tegen per ongeluk dubbel ingeven.
export const allLeagueMatches: LeagueMatch[] = (() => {
  const combined = [...ownMatchesToLeague(), ...externalResults];
  const seen = new Set<string>();
  const result: LeagueMatch[] = [];
  combined.forEach(m => {
    const key = `${m.datum}|${m.thuisTeam}|${m.uitTeam}`;
    if (seen.has(key)) {
      if (process?.env?.NODE_ENV !== 'production') {
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
    // Neem enkel gespeelde wedstrijden op; behandel 'undefined' als gespeeld (voor eigen matches uit `matches`).
    if (m.gespeeld === false) return;
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
  // Een match telt als 'gespeeld' voor stats als die ook in de competitiematrix als gespeeld geldt of als er een uitslag (goalsVoor/goalsTegen) is ingevuld.
  // In deze dataset zijn onze eigen matches reeds resultaten; we pushen defensief een extra guard:
  const played = list.filter(m => Number.isFinite(m.goalsVoor) && Number.isFinite(m.goalsTegen));
  const totaal = played.length;
  let winst = 0, gelijk = 0, verlies = 0, goalsVoor = 0, goalsTegen = 0, cleanSheets = 0;
  played.forEach(m => {
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
  // Enkel doelpunten uit gespeelde wedstrijden meetellen
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
