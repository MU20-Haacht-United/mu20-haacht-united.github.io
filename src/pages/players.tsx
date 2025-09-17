import React from 'react';
import Layout from '@theme/Layout';
import { playersWithStats, groupPlayersByPosition, staff, positionLabel, formatPositions } from '../data/players';
import styles from './players.module.css';

export default function PlayersPage() {
  const grouped = groupPlayersByPosition(playersWithStats);
  return (
    <Layout title="Speelsters" description="Overzicht van speelsters MU20 Haacht United">
      <div className="theme-layout-main main-wrapper mainWrapper_z2l0 twp">
        <div className="container container--fluid margin-vert--lg px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">Speelsters</h1>
          <p className="mb-6">Maak kennis met de talentvolle kern van MU20 Haacht United.</p>
          {( [1,2,3,4,5,6,7,8,9,10,11] as const).map(posNumber => (
            <section key={posNumber} className={`${styles.section} mb-8`}> 
              <h2 className="text-xl font-semibold mb-2">Positie {posNumber} – {positionLabel(posNumber)}</h2>
              <div className="table-wrapper overflow-x-auto -mx-4 sm:mx-0">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr>
                      <th>#</th><th>Naam</th><th>Wedstr.</th><th>Posities</th><th>Sterktes</th><th>Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grouped[posNumber].map(p => (
                      <tr key={p.rugnummer}>
                        <td>{p.rugnummer}</td>
                        <td>{p.naam}</td>
                        <td>{'wedstrijden' in p ? (p as any).wedstrijden : '-'}</td>
                        <td>{formatPositions(p)}</td>
                        <td>{p.sterktes ? p.sterktes.join(', ') : '-'}</td>
                        <td>{p.rol || ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )) }
          <section className={`${styles.sectionLarge} mb-8`}>
            <h2 className="text-xl font-semibold mb-2">Ontwikkeling</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Techniek:</strong> Balcontrole, passing, afwerking</li>
              <li><strong>Tactiek:</strong> Positiespel en spelinzicht</li>
              <li><strong>Fysiek:</strong> Kracht, snelheid, uithouding</li>
              <li><strong>Mentaal:</strong> Vertrouwen en beslissingsvermogen</li>
            </ul>
          </section>
          <section className={`${styles.sectionLarge} mb-8`}>
            <h2 className="text-xl font-semibold mb-2">Staf</h2>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="min-w-full text-sm">
                <thead>
                  <tr><th>Naam</th><th>Functie</th></tr>
                </thead>
                <tbody>
                  {staff.map(m => (
                    <tr key={m.naam}><td>{m.naam}</td><td>{m.functie}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <p className={`${styles.note} text-sm text-gray-600 dark:text-gray-300`}>Profielen worden aangevuld &amp; bijgewerkt gedurende het seizoen.</p>
        </div>
      </div>
    </Layout>
  );
}
