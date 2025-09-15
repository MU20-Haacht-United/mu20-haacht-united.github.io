import React from 'react';
import Layout from '@theme/Layout';
import styles from './games.module.css'; // reuse table styles
import dutyStyles from './duties.module.css';
import {
  computeDutySchedule,
  formatDateShort,
  playerName,
  formatRugList,
  SuggestedDuty,
  computeDutyTotals,
} from '../data/duties';

function DutyRow({d}: { d: SuggestedDuty }) {
  const fruitAssigned = !!d.fruit;
  const wasAssigned = !!d.was;
  const isHome = d.thuis;
  const notApplicable = d.nvt;
  return (
    <tr>
      <td>{formatDateShort(d.datum)}</td>
      <td>{d.tegenstander}</td>
      <td>{isHome ? 'Thuis' : 'Uit'}</td>
      <td>
        {notApplicable ? (
          <span>n.v.t.</span>
        ) : isHome ? (
          d.bar.length === 2 ? (
            <span>{formatRugList(d.bar)}</span>
          ) : (
            <span>
              {d.bar.length > 0 && <>{formatRugList(d.bar)}{!d.gespeeld && '; '}</>}
              {!d.gespeeld ? (
                <em>Voorstel: {d.suggestedBar?.map(playerName).join(', ')}</em>
              ) : (
                d.bar.length === 0 && <span>-</span>
              )}
            </span>
          )
        ) : (
          <span>-</span>
        )}
      </td>
      <td>
  {notApplicable ? 'n.v.t.' : fruitAssigned ? playerName(d.fruit!) : (!d.gespeeld ? <em>{d.suggestedFruit && playerName(d.suggestedFruit)}</em> : <span>-</span>)}
      </td>
      <td>
  {notApplicable ? 'n.v.t.' : wasAssigned ? playerName(d.was!) : (!d.gespeeld ? <em>{d.suggestedWas && playerName(d.suggestedWas)}</em> : <span>-</span>)}
      </td>
  <td>{d.gespeeld ? '✅' : '❓'}</td>
    </tr>
  );
}

export default function DutiesPage() {
  const data = computeDutySchedule();
  const totals = computeDutyTotals();
  // Bepaal per speler of ze een taak hebben vervuld in een reeds gespeelde match
  const playedAssignments = data.filter(d => d.gespeeld && !d.nvt);
  const hasPlayedDuty: Record<number, { bar: boolean; fruit: boolean; was: boolean }> = {};
  totals.forEach(t => { hasPlayedDuty[t.rugnummer] = { bar: false, fruit: false, was: false }; });
  playedAssignments.forEach(d => {
    d.bar.forEach(r => { if (hasPlayedDuty[r]) hasPlayedDuty[r].bar = true; });
    if (d.fruit && hasPlayedDuty[d.fruit]) hasPlayedDuty[d.fruit].fruit = true;
    if (d.was && hasPlayedDuty[d.was]) hasPlayedDuty[d.was].was = true;
  });
  return (
  <Layout title="Shiften & Taken" description="Bar, fruit & was taken (thuis en uit)">
      <main className={styles.container}>
        <h1>Shiften & Taken (Alle Wedstrijden)</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Datum</th>
              <th>Tegenstander</th>
              <th>Thuis/Uit</th>
              <th>Bar (2)</th>
              <th>Fruit</th>
              <th>Was</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => <DutyRow key={d.datum} d={d} />)}
          </tbody>
        </table>
  <h2 className={dutyStyles.subheading}>Overzicht per Speelster</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Speelster</th>
              <th>Bar</th>
              <th>Fruit</th>
              <th>Was</th>
              <th>Totaal</th>
            </tr>
          </thead>
          <tbody>
            {totals.map(t => {
              const status = hasPlayedDuty[t.rugnummer];
              const icon = (done:boolean) => done ? '✅' : '❓';
              return (
                <tr key={t.rugnummer}>
                  <td>{t.naam}</td>
                  <td>{icon(status.bar)}</td>
                  <td>{icon(status.fruit)}</td>
                  <td>{icon(status.was)}</td>
                  <td>{t.totaal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>  
      </main>
    </Layout>
  );
}
