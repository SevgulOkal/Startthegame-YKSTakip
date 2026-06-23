import React, { useEffect, useState } from 'react';
import { useData } from '../context/DataContext';

export default function ReportsScreen() {
  const { workouts } = useData();
  const [weeklyData, setWeeklyData] = useState({ hours: [], questions: [] });

  useEffect(() => {
    if (workouts.length > 0) {
      const last7Days = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayStr = date.toDateString();
        const dayWorkouts = workouts.filter(w => new Date(w.date).toDateString() === dayStr);
        last7Days.push({
          hours: dayWorkouts.reduce((sum, w) => sum + w.hours, 0),
          questions: dayWorkouts.reduce((sum, w) => sum + w.questions, 0),
        });
      }
      setWeeklyData({
        hours: last7Days.map(d => d.hours),
        questions: last7Days.map(d => d.questions),
      });
    }
  }, [workouts]);

  const totalHours = workouts.reduce((sum, w) => sum + w.hours, 0);
  const totalQuestions = workouts.reduce((sum, w) => sum + w.questions, 0);

  return (
    <div className="container">
      <div style={styles.statsCard}>
        <div style={styles.statValue}>{totalHours}</div>
        <div style={styles.statLabel}>Toplam Saat</div>
      </div>
      <div style={styles.statsCard}>
        <div style={styles.statValue}>{totalQuestions}</div>
        <div style={styles.statLabel}>Toplam Soru</div>
      </div>

      <h3 style={styles.chartTitle}>Son 7 Gün - Çalışma Saatııı</h3>
      {weeklyData.hours.map((hours, index) => (
        <div style={styles.barContainer} key={index}>
          <span style={styles.barLabel}>{['Pzt','Sal','Çar','Per','Cu','Prt','Cmt'][index]}:</span>
          <span style={styles.barValue}>{hours} saat</span>
        </div>
      ))}

      <h3 style={styles.chartTitle}>Son 7 Gün - Soru Sayısııı</h3>
      {weeklyData.questions.map((questions, index) => (
        <div style={styles.barContainer} key={index}>
          <span style={styles.barLabel}>{['Pzt','Sal','Çar','Per','Cu','Prt','Cmt'][index]}:</span>
          <span style={styles.barValue}>{questions} soru</span>
        </div>
      ))}
    </div>
  );
}

const styles = {
  statsCard: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 15, alignItems: 'center', display: 'flex', flexDirection: 'column' },
  statValue: { fontSize: 32, fontWeight: 'bold', color: '#4f46e5' },
  statLabel: { fontSize: 14, color: '#666', marginTop: 5 },
  chartTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 20, marginBottom: 10 },
  barContainer: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 8, display: 'flex', justifyContent: 'space-between' },
  barLabel: { fontSize: 14, color: '#666' },
  barValue: { fontSize: 16, color: '#4f46e5', fontWeight: 'bold' },
};