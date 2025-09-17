import React from 'react';
import Layout from '@theme/Layout';
import { matches, upcoming, leagueTable, computeTeamStats, goalRanking, formatDate } from '../data/games';
import { players } from '../data/players';
import styles from './games.module.css';

export default function GamesPage() {
  const stats = computeTeamStats(matches);
  const scorers = goalRanking(matches);
  const playerName = (nr: number) => players.find(p => p.rugnummer === nr)?.naam || `#${nr}`;

  return (
    <Layout title="Wedstrijden & Statistieken" description="Resultaten en statistieken MU20 Haacht United">
      <div className="container container--fluid margin-vert--lg">
  <h1>Wedstrijden &amp; Statistieken</h1>
        <section>
          <h2>Seizoen 2024-2025 Overzicht</h2>
          <ul>
            <li><strong>Gespeeld:</strong> {stats.totaal}</li>
            <li><strong>Winst / Gelijk / Verlies:</strong> {stats.winst} / {stats.gelijk} / {stats.verlies}</li>
            <li><strong>Punten:</strong> {stats.punten}</li>
            <li><strong>⚽:</strong> {stats.goalsVoor} ({stats.goalsPerWedstrijd.toFixed(2)} p/w)</li>
            <li><strong>Tegendoelpunten:</strong> {stats.goalsTegen}</li>
            <li><strong>Doelsaldo:</strong> {stats.doelsaldo}</li>
            <li><strong>Clean sheets:</strong> {stats.cleanSheets}</li>
          </ul>
        </section>
  <section className={styles.mt2}>
          <h2>Recente Uitslagen</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>📅</th><th>🆚</th><th>🏠/✈️</th><th>💯</th><th>⚽</th></tr>
              </thead>
              <tbody>
                {matches.slice().sort((a,b) => b.datum.localeCompare(a.datum)).map(m => {
                  const goals = m.events.filter(e => e.type==='goal').map(e => playerName(e.rugnummer)).join(', ');
                  return (
                    <tr key={`${m.datum}-${m.tegenstander}`}>
                      <td>{formatDate(m.datum)}</td>
                      <td>{m.tegenstander}</td>
                      <td>{m.thuis ? '🏠' : '✈️'}</td>
                      <td>{m.goalsVoor}-{m.goalsTegen}</td>
                      <td>{goals || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
  <section className={styles.mt2}>
          <h2>Komende Wedstrijden</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>📅</th><th>🆚</th><th>🏠/✈️</th><th>🕐</th><th>📍</th><th>🏚</th><th>🗺</th><th>💬</th></tr>
              </thead>
              <tbody>
                {upcoming.map(f => (
                  <tr key={`${f.datum}-${f.tegenstander}`}>
                    <td>{formatDate(f.datum)}</td>
                    <td>{f.tegenstander}</td>
                    <td>{f.thuis ? '🏠' : '✈️'}</td>
                    <td>{f.tijd}</td>
                    <td>{f.locatie || '-'}</td>
                    <td>{f.adres || '-'}</td>
                    <td>{f.mapsUrl ? <a href={f.mapsUrl} target="_blank" rel="noopener noreferrer">🔗</a> : '-'}</td>
                    <td>{f.commentaar || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
  <section className={styles.mt2}>
          <h2>Topscorers</h2>
          <ol>
            {scorers.map(s => (
              <li key={s.rugnummer}><strong>{playerName(s.rugnummer)}</strong> - {s.goals} doelpunt(en)</li>
            ))}
          </ol>
        </section>
  <section className={styles.mt2}>
          <h2>Ranglijst</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>Pos</th><th>Team</th><th>P</th><th>W</th><th>G</th><th>V</th><th>DV</th><th>DT</th><th>DS</th><th>Ptn</th></tr>
              </thead>
              <tbody>
                {leagueTable.map((row, idx) => {
                  const punten = row.winst*3 + row.gelijk;
                  return (
                    <tr key={row.team} className={row.team.includes('MU20') ? styles.boldRow : undefined}>
                      <td>{idx+1}</td>
                      <td>{row.team}</td>
                      <td>{row.gespeeld}</td>
                      <td>{row.winst}</td>
                      <td>{row.gelijk}</td>
                      <td>{row.verlies}</td>
                      <td>{row.doelpuntenVoor}</td>
                      <td>{row.doelpuntenTegen}</td>
                      <td>{row.doelpuntenVoor - row.doelpuntenTegen}</td>
                      <td>{punten}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
  <p className={styles.note}>Data wordt centraal beheerd en kan eenvoudig aangepast worden in de data bestanden.</p>
      </div>
    </Layout>
  );
}
