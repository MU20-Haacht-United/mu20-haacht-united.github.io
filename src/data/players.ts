// Dynamische spelersdata en types
// Positienummers volgens klassieke 1-11 (1=Keeper, 2=Rechtsback, 3=Linksback, 4=Centraal Def, 5=Centraal Def,
// 6=Defensieve middenvelder, 7=Rechtsflank, 8=Centrale middenvelder, 9=Spits, 10=Aanvallende middenveld / tweede spits, 11=Linksflank)
// Laatste update posities: handmatig aangeleverde mapping (chat lijst) – pas aan indien nieuwe inzichten.
export type Position = 1|2|3|4|5|6|7|8|9|10|11;
export type Team = 'MU20' | 'MU16' | 'Px';
export type Formation = '4-4-2' | '4-3-3' | '4-2-3-1' | '3-5-2';

export interface Player {
  rugnummer: number;            // (Voorlopig fictief indien niet officieel gekend)
  naam: string;
  positie: Position[];          // Meerdere mogelijke posities
  leeftijd?: number;            // Niet publiek => optioneel
  lengteM?: number;
  sinds?: number;               // Jaar aansluiting onbekend => optioneel
  sterktes?: string[];
  rol?: string;                 // Kapitein / Vicekapitein
  team: Team;                   // Team
}

export interface PlayerWithStats extends Player {
  wedstrijden: number;
  doelpuntenSeizoen: number;
  cleanSheets: number; // alleen relevant voor keepers, anders 0
}

export interface StaffMember {
  naam: string;
  functie: string; // T1, T2, Delegate, ...
}

// Opmerking: Rugnummers en posities zijn voorlopig ingevuld als placeholders waar niet publiek.
// Wedstrijden = snapshot van RBFA pagina (1 of 2). Aanpassen wanneer nieuwe data beschikbaar is.
// Volledige lijst (snapshot) uit aangeleverde spreadsheet / RBFA.
// Posities zijn placeholders (te verfijnen). Rugnummers toegekend sequentieel waar onbekend.
export const players: Player[] = [
  // Posities geüpdatet op basis van aangeleverde lijst (1=K, 2=RB, 3=LB, 4/5=CV, 6=DM, 7=RF, 8=CM, 9=Spits, 10=AM/2e spits, 11=LF)
  { rugnummer: 1,  naam: 'Geuvens Lisa',              positie: [11], team: 'MU20' },
  { rugnummer: 2,  naam: 'Mattheus Febe',             positie: [8], team: 'MU20'},
  { rugnummer: 3,  naam: 'Vander Aerschot Nina',      positie: [6], team: 'MU20', rol: 'Kapitein' },
  { rugnummer: 4,  naam: 'Verdood Femke',             positie: [1], team: 'MU20'},
  { rugnummer: 5,  naam: 'Le Leu Margue',             positie: [7], team: 'MU20'},
  { rugnummer: 6,  naam: 'Marin Auke',                positie: [7,11], team: 'MU20'},
  { rugnummer: 7,  naam: 'Vermoesen Imke',            positie: [10,9], team: 'MU20'},
  { rugnummer: 8,  naam: 'Vermunicht Morane',         positie: [3,4], team: 'MU20'},
  { rugnummer: 9,  naam: 'Van Loo Ella',              positie: [9,10], team: 'MU20'},
  { rugnummer:10,  naam: 'Lahor Dee Dee',             positie: [3,4], team: 'MU20'},
  { rugnummer:11,  naam: 'Liekens Yanaika',           positie: [3,4,6], team: 'MU20'},
  { rugnummer:12,  naam: 'Quintelier Esmee',          positie: [9,7], team: 'MU20'},
  { rugnummer:13,  naam: 'Samyn Tille',               positie: [10,8], team: 'MU20', rol: 'Vicekapitein' },
  { rugnummer:14,  naam: 'Canada Seldeslachts Julia', positie: [7,11], team: 'MU20'},
  { rugnummer:15,  naam: 'Ver Eecke Lize',            positie: [8,10], team: 'MU20' },
  { rugnummer:16,  naam: 'Cauwenberghs Alexis',       positie: [5,2], team: 'MU20'},
  { rugnummer:17,  naam: 'Van den Bogaert Lynka',     positie: [3,4], team: 'MU20'},
  { rugnummer:18,  naam: 'Cruypelinck Elke',          positie: [7,11], team: 'MU16'},
  { rugnummer:19,  naam: 'Meulemans Nym',             positie: [7,11,9], team: 'MU16'},
  { rugnummer:20,  naam: 'Reyns Lieze',               positie: [2,5], team: 'MU16'},
  { rugnummer:22,  naam: 'Stroobants Lisa',           positie: [2], team: 'MU16'},
  { rugnummer:23,  naam: 'Reichert June',             positie: [1], team: 'Px'},
  { rugnummer:24,  naam: 'Verbeek Iris',              positie: [10], team: 'Px'},
  { rugnummer:25,  naam: 'Van Noten Lore',            positie: [1], team: 'Px'},
  { rugnummer:26,  naam: 'Smits Gitte',               positie: [7,11], team: 'Px'},
  { rugnummer:27,  naam: 'Aerts Marie',               positie: [11,7], team: 'Px'},
];

// Dynamische statistieken op basis van gespeelde matches & events
import { matches } from './games';

export function computePlayerStats(base: Player[]): PlayerWithStats[] {
  const goals = new Map<number, number>();
  const appearances = new Map<number, number>();
  const cleanSheets = new Map<number, number>();

  matches.forEach(m => {
    // appearances
    m.players.forEach(r => {
      appearances.set(r, (appearances.get(r) || 0) + 1);
    });
    // goals
    m.events.filter(e => e.type === 'goal').forEach(e => {
      goals.set(e.rugnummer, (goals.get(e.rugnummer) || 0) + 1);
    });
    // clean sheet credit voor keepers die speelden in match met 0 tegengoals
    if (m.goalsTegen === 0) {
      m.players.forEach(r => {
        // Vind speler en check of positie 1 (keeper) bevat
        const pl = base.find(p => p.rugnummer === r);
        if (pl && pl.positie.includes(1)) {
          cleanSheets.set(r, (cleanSheets.get(r) || 0) + 1);
        }
      });
    }
  });

  return base.map(p => ({
    ...p,
    wedstrijden: appearances.get(p.rugnummer) || 0,
    doelpuntenSeizoen: goals.get(p.rugnummer) || 0,
    cleanSheets: cleanSheets.get(p.rugnummer) || 0,
  }));
}

export const playersWithStats: PlayerWithStats[] = computePlayerStats(players);

export const staff: StaffMember[] = [
  { naam: 'Van Loo Andrew', functie: 'T1' },
  { naam: 'Lahor Marnix', functie: 'T2' },
  { naam: 'Vermunicht Andy', functie: 'T3' },
  { naam: 'Quintelier Sujith', functie: 'Team Delegate' },
];

export function groupPlayersByPosition(list: Player[]): Record<Position, Player[]> {
  const base = { } as Record<Position, Player[]>;
  ( [1,2,3,4,5,6,7,8,9,10,11] as Position[] ).forEach(n => { base[n] = []; });
  list.forEach(p => p.positie.forEach(pos => { base[pos].push(p); }));
  return base;
}

// Formation-specifieke benamingen per klassiek nummer.
// 4-4-2: 7/11 = Wide Midfielders, 10 = Second Striker, 6 = Holding Mid
// 4-3-3: 7/11 = Wingers, 10 = False 9 / AM (optioneel), 8 = Advanced CM
// 4-2-3-1: 7/11 = Wingers, 10 = Central AM, 6 = Double pivot (1 of 2), 8 = Box-to-box
// 3-5-2: 2/5 = Wide CB, 7/11 = Wingbacks, 10 = Support Striker
const formationLabels: Record<Formation, Record<Position, string>> = {
  '4-4-2': {
    1: 'Keeper', 2: 'Rechtsback', 3: 'Linksback', 4: 'Centrale verdediger', 5: 'Centrale verdediger',
    6: 'Defensieve middenvelder', 7: 'Rechtsmidden', 8: 'Centrale middenvelder', 9: 'Spits', 10: 'Tweede spits', 11: 'Linksmidden'
  },
  '4-3-3': {
    1: 'Keeper', 2: 'Rechtsback', 3: 'Linksback', 4: 'Centrale verdediger', 5: 'Centrale verdediger',
    6: 'Controleur', 7: 'Rechtsbuiten', 8: 'Box-to-box', 9: 'Spits', 10: 'Aanvallende middenvelder', 11: 'Linksbuiten'
  },
  '4-2-3-1': {
    1: 'Keeper', 2: 'Rechtsback', 3: 'Linksback', 4: 'Centrale verdediger', 5: 'Centrale verdediger',
    6: 'Verdedigende middenvelder', 7: 'Rechtsbuiten', 8: 'Box-to-box', 9: 'Spits', 10: 'Nummer 10', 11: 'Linksbuiten'
  },
  '3-5-2': {
    1: 'Keeper', 2: 'Rechts centrale verdediger', 3: 'Links centrale verdediger', 4: 'Centrale verdediger', 5: 'Reserve centrale',
    6: 'Defensieve middenvelder', 7: 'Rechts wingback', 8: 'Centrale middenvelder', 9: 'Spits', 10: 'Tweede spits', 11: 'Links wingback'
  }
};

export function positionLabel(pos: Position, formation: Formation = '4-4-2'): string {
  return formationLabels[formation][pos];
}

export function formatPositions(player: Player, formation: Formation = '4-4-2'): string {
  return player.positie.map(n => positionLabel(n, formation)).join(', ');
}

export function formatHeight(player: Player): string {
  return player.lengteM ? player.lengteM.toFixed(2).replace('.', ',') + ' m' : '-';
}
