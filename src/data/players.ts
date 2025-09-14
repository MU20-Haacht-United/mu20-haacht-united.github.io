// Dynamische spelersdata en types
export type Position = 'Keeper' | 'Verdediger' | 'Middenvelder' | 'Aanvaller' | 'Flank';

export interface Player {
  rugnummer: number;            // (Voorlopig fictief indien niet officieel gekend)
  naam: string;
  positie: Position;            // Positie inschatting/placeholder
  leeftijd?: number;            // Niet publiek => optioneel
  lengteM?: number;
  sinds?: number;               // Jaar aansluiting onbekend => optioneel
  sterktes?: string[];
  rol?: string;                 // Kapitein / Vicekapitein
  doelpuntenSeizoen?: number;   // Optioneel
  cleanSheets?: number;         // Voor keepers
  wedstrijden?: number;         // Aantal gespeelde matchen volgens RBFA snapshot
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
  { rugnummer: 1,  naam: 'Geuvens Lisa',              positie: 'Aanvaller',  wedstrijden: 2 },
  { rugnummer: 2,  naam: 'Mattheus Febe',             positie: 'Middenvelder', wedstrijden: 2 },
  { rugnummer: 3,  naam: 'Vander Aerschot Nina',      positie: 'Verdediger',  wedstrijden: 1, rol: 'Kapitein' },
  { rugnummer: 4,  naam: 'Verdood Femke',             positie: 'Keeper',   wedstrijden: 1 },
  { rugnummer: 5,  naam: 'Le Leu Margue',             positie: 'Flank',  wedstrijden: 2 },
  { rugnummer: 6,  naam: 'Marin Auke',                positie: 'Flank',  wedstrijden: 1 },
  { rugnummer: 7,  naam: 'Vermoesen Imke',            positie: 'Aanvaller',   wedstrijden: 2 },
  { rugnummer: 8,  naam: 'Vermunicht Morane',         positie: 'Verdediger', wedstrijden: 0 },
  { rugnummer: 9,  naam: 'Van Loo Ella',              positie: 'Aanvaller',   wedstrijden: 2 },
  { rugnummer:10,  naam: 'Lahor Dee Dee',             positie: 'Verdediger', wedstrijden: 2 },
  { rugnummer:11,  naam: 'Liekens Yanaika',           positie: 'Middenvelder', wedstrijden: 2 },
  { rugnummer:12,  naam: 'Quintelier Esmee',          positie: 'Verdediger', wedstrijden: 2 },
  { rugnummer:13,  naam: 'Samyn Tille',               positie: 'Middenvelder',   wedstrijden: 2, rol: 'Vicekapitein' },
  { rugnummer:14,  naam: 'Canada Seldeslachts Julia', positie: 'Verdediger',  wedstrijden: 0 },
  { rugnummer:15,  naam: 'Ver Eecke Lize',            positie: 'Middenvelder',  wedstrijden: 0 },
  { rugnummer:16,  naam: 'Cauwenberghs Alexis',       positie: 'Verdediger',   wedstrijden: 1 },
  { rugnummer:17,  naam: 'Van den Bogaert Lynka',     positie: 'Verdediger',  wedstrijden: 2 },
  { rugnummer:18,  naam: 'Cruypelinck Elke',          positie: 'Verdediger',  wedstrijden: 0 },
  { rugnummer:19,  naam: 'Meulemans Nym',             positie: 'Aanvaller',   wedstrijden: 2 },
  { rugnummer:20,  naam: 'Reyns Lieze',               positie: 'Verdediger',  wedstrijden: 1 },
  { rugnummer:21,  naam: 'Vanhoutte Noor',            positie: 'Middenvelder', wedstrijden: 0 },
  { rugnummer:22,  naam: 'Stroobants Lisa',           positie: 'Verdediger',  wedstrijden: 0 },
  { rugnummer:23,  naam: 'Reichert June',             positie: 'Keeper',      wedstrijden: 0 },
  { rugnummer:24,  naam: 'Verbeek Iris',              positie: 'Middenvelder', wedstrijden: 1 },
  { rugnummer:25,  naam: 'Van Noten Lore',            positie: 'Keeper',  wedstrijden: 1 },
  { rugnummer:26,  naam: 'Smits Gitte',               positie: 'Middenvelder',   wedstrijden: 0 },
  { rugnummer:27,  naam: 'Aerts Marie',               positie: 'Flank',      wedstrijden: 0 },
];

export const staff: StaffMember[] = [
  { naam: 'Van Loo Andrew', functie: 'T1' },
  { naam: 'Lahor Marnix', functie: 'T2' },
  { naam: 'Vermunicht Andy', functie: 'T3' },
  { naam: 'Quintelier Sujith', functie: 'Team Delegate' },
];

export function groupPlayersByPosition(list: Player[]): Record<Position, Player[]> {
  return list.reduce((acc, p) => {
    acc[p.positie] ||= [];
    acc[p.positie].push(p);
    return acc;
  }, {Keeper: [], Verdediger: [], Middenvelder: [], Aanvaller: []} as Record<Position, Player[]>);
}

export function formatHeight(player: Player): string {
  return player.lengteM ? player.lengteM.toFixed(2).replace('.', ',') + ' m' : '-';
}
