import React from 'react';
import Layout from '@theme/Layout';
import { players, groupPlayersByPosition, staff } from '../data/players';
import styles from './players.module.css';

export default function PlayersPage() {
  const grouped = groupPlayersByPosition(players);
  return (
    <Layout title="Speelsters" description="Overzicht van speelsters MU20 Haacht United">
      <main className="container margin-vert--lg">
        <h1>Speelsters</h1>
        <p>Maak kennis met de talentvolle kern van MU20 Haacht United.</p>
        { (['Keeper','Verdediger','Middenvelder','Aanvaller'] as const).map(pos => (
          <section key={pos} className={styles.section}>
            <h2>{pos}{pos === 'Keeper' ? 's' : ''}</h2>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th><th>Naam</th><th>Wedstrijden</th><th>Positie</th><th>Sterktes</th><th>Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {grouped[pos].map(p => (
                    <tr key={p.rugnummer}>
                      <td>{p.rugnummer}</td>
                      <td>{p.naam}</td>
                      <td>{p.wedstrijden ?? '-'}</td>
                      <td>{p.positie}</td>
                      <td>{p.sterktes ? p.sterktes.join(', ') : '-'}</td>
                      <td>{p.rol || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )) }
        <section className={styles.sectionLarge}>
          <h2>Ontwikkeling</h2>
          <ul>
            <li><strong>Techniek:</strong> Balcontrole, passing, afwerking</li>
            <li><strong>Tactiek:</strong> Positiespel en spelinzicht</li>
            <li><strong>Fysiek:</strong> Kracht, snelheid, uithouding</li>
            <li><strong>Mentaal:</strong> Vertrouwen en beslissingsvermogen</li>
          </ul>
        </section>
        <section className={styles.sectionLarge}>
          <h2>Staf</h2>
          <table>
            <thead>
              <tr><th>Naam</th><th>Functie</th></tr>
            </thead>
            <tbody>
              {staff.map(m => (
                <tr key={m.naam}><td>{m.naam}</td><td>{m.functie}</td></tr>
              ))}
            </tbody>
          </table>
        </section>
  <p className={styles.note}>Profielen worden aangevuld &amp; bijgewerkt gedurende het seizoen.</p>
      </main>
    </Layout>
  );
}
