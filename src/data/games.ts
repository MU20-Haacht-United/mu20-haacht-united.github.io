// Dynamische wedstrijddata en helpers
export interface MatchEvent {
  minuut: number;
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
}

// Resultaten (gespeelde wedstrijden)
export const matches: Match[] = [
  { datum: '2025-03-16', tegenstander: 'FC Brussels U20', thuis: false, goalsVoor: 2, goalsTegen: 1, competitie: true, events: [ { minuut: 45, rugnummer: 9, type: 'goal' }, { minuut: 78, rugnummer: 11, type: 'goal' } ] },
  { datum: '2025-03-09', tegenstander: 'Leuven Stars U20', thuis: true, goalsVoor: 1, goalsTegen: 1, competitie: true, events: [ { minuut: 23, rugnummer: 10, type: 'goal' } ] },
  { datum: '2025-03-02', tegenstander: 'Antwerp United U20', thuis: true, goalsVoor: 3, goalsTegen: 0, competitie: true, events: [ { minuut: 12, rugnummer: 9, type: 'goal' }, { minuut: 34, rugnummer: 9, type: 'goal' }, { minuut: 67, rugnummer: 7, type: 'goal' } ] },
  { datum: '2025-02-23', tegenstander: 'Ghent Ladies U20', thuis: false, goalsVoor: 1, goalsTegen: 2, competitie: true, events: [ { minuut: 56, rugnummer: 8, type: 'goal' } ] },
  { datum: '2025-02-16', tegenstander: 'Mechelen FC U20', thuis: true, goalsVoor: 4, goalsTegen: 1, competitie: true, events: [ { minuut: 8, rugnummer: 9, type: 'goal' }, { minuut: 29, rugnummer: 11, type: 'goal' }, { minuut: 43, rugnummer: 9, type: 'goal' }, { minuut: 71, rugnummer: 10, type: 'goal' } ] },
  { datum: '2025-02-09', tegenstander: 'Bruges Youth U20', thuis: false, goalsVoor: 2, goalsTegen: 0, competitie: true, events: [ { minuut: 33, rugnummer: 11, type: 'goal' }, { minuut: 82, rugnummer: 5, type: 'goal' } ] },
  { datum: '2025-02-02', tegenstander: 'Hasselt FC U20', thuis: true, goalsVoor: 0, goalsTegen: 0, competitie: true, events: [] },
  { datum: '2025-01-26', tegenstander: 'Charleroi U20', thuis: false, goalsVoor: 3, goalsTegen: 1, competitie: true, events: [ { minuut: 15, rugnummer: 9, type: 'goal' }, { minuut: 42, rugnummer: 10, type: 'goal' }, { minuut: 88, rugnummer: 7, type: 'goal' } ] },
  { datum: '2025-01-19', tegenstander: 'Liège United U20', thuis: true, goalsVoor: 2, goalsTegen: 1, competitie: true, events: [ { minuut: 25, rugnummer: 11, type: 'goal' }, { minuut: 90, rugnummer: 9, type: 'goal' } ] },
  { datum: '2025-01-12', tegenstander: 'Kortrijk Ladies U20', thuis: false, goalsVoor: 2, goalsTegen: 2, competitie: true, events: [ { minuut: 18, rugnummer: 8, type: 'goal' }, { minuut: 75, rugnummer: 10, type: 'goal' } ] },
  { datum: '2025-01-05', tegenstander: 'Ostend FC U20', thuis: true, goalsVoor: 1, goalsTegen: 0, competitie: true, events: [ { minuut: 67, rugnummer: 9, type: 'goal' } ] },
];

// Komende fixtures
export interface Fixture {
  datum: string;
  tegenstander: string;
  thuis: boolean;
  tijd: string; // HH:MM
  locatie: string;
}

export const upcoming: Fixture[] = [
  { datum: '2025-03-23', tegenstander: 'Namur United U20', thuis: true, tijd: '15:00', locatie: 'Sportcomplex Haacht' },
  { datum: '2025-03-30', tegenstander: 'Tornhout FC U20', thuis: false, tijd: '14:00', locatie: 'Tornhout Stadion' },
  { datum: '2025-04-06', tegenstander: 'Diest Ladies U20', thuis: true, tijd: '15:00', locatie: 'Sportcomplex Haacht' },
  { datum: '2025-04-13', tegenstander: 'Aarschot U20', thuis: false, tijd: '14:30', locatie: 'Gemeentelijk terrein Aarschot' },
];

export interface TableRow {
  team: string;
  gespeeld: number; winst: number; gelijk: number; verlies: number;
  doelpuntenVoor: number; doelpuntenTegen: number;
}

export const leagueTable: TableRow[] = [
  { team: 'Leuven Stars U20', gespeeld: 15, winst: 12, gelijk: 2, verlies: 1, doelpuntenVoor: 38, doelpuntenTegen: 8 },
  { team: 'FC Brussels U20', gespeeld: 15, winst: 10, gelijk: 3, verlies: 2, doelpuntenVoor: 35, doelpuntenTegen: 15 },
  { team: 'MU20 Haacht United', gespeeld: 15, winst: 9, gelijk: 4, verlies: 2, doelpuntenVoor: 45, doelpuntenTegen: 18 },
  { team: 'Antwerp United U20', gespeeld: 15, winst: 9, gelijk: 2, verlies: 4, doelpuntenVoor: 28, doelpuntenTegen: 20 },
  { team: 'Ghent Ladies U20', gespeeld: 15, winst: 8, gelijk: 3, verlies: 4, doelpuntenVoor: 31, doelpuntenTegen: 22 },
];

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
