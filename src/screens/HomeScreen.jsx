
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';


export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { workouts, goals } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user]);

  const totalHours = workouts.reduce((sum, w) => sum + (w.hours || 0), 0);
  const totalQuestions = workouts.reduce((sum, w) => sum + (w.questions || 0), 0);

  return (
    <div className="container">
      <div style={styles.header}>
        <h1 style={styles.title}>Merhaba, {user?.name}</h1>
        <button style={styles.logout} onClick={logout}>Çıkış Yap</button>
      </div>

      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{totalHours}</div>
          <div style={styles.statLabel}>Toplam Saat</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{totalQuestions}</div>
          <div style={styles.statLabel}>Toplam Soru</div>
        </div>
      </div>

      <div style={styles.goalsCard}>
        <h3 style={styles.goalsTitle}>Günlük Hedefler</h3>
        <p style={styles.goalText}>📚 {goals.dailyHours} saat</p>
        <p style={styles.goalText}>✏️ {goals.dailyQuestions} soru</p>
      </div>

      <button style={styles.addButton} onClick={() => navigate('/add-workout')}>
        + Çalışma Ekle
      </button>

      <button style={styles.pomodoroButton} onClick={() => navigate('/pomodoro')}>
  ⏱ Pomodoro Başlat
</button>


      <button style={styles.reportButton} onClick={() => navigate('/reports')}>
        📊 Raporları Gör
      </button>

      <button style={styles.goalButton} onClick={() => navigate('/goals')}>
        🎯 Hedefleri Ayarla
      </button>
    </div>
  );
}

const styles = {
  header: { padding: 20, backgroundColor: '#4f46e5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  logout: { color: '#fff', fontSize: 16, border: 'none', background: 'none', cursor: 'pointer' },
  statsContainer: { display: 'flex', padding: 20, gap: 16 },
  statCard: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '48%', alignItems: 'center', display: 'flex', flexDirection: 'column' },
  statValue: { fontSize: 32, fontWeight: 'bold', color: '#4f46e5' },
  statLabel: { fontSize: 14, color: '#666', marginTop: 5 },
  goalsCard: { backgroundColor: '#fff', padding: 20, borderRadius: 10, margin: 20 },
  goalsTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  goalText: { fontSize: 16, color: '#666', marginTop: 5 },
  addButton: { backgroundColor: '#4f46e5', padding: 18, borderRadius: 10, margin: 20, color: '#fff', fontSize: 18, fontWeight: 'bold', border: 'none', width: '100%' },
  reportButton: { backgroundColor: '#10b981', padding: 18, borderRadius: 10, margin: 20, color: '#fff', fontSize: 18, fontWeight: 'bold', border: 'none', width: '100%' },
  goalButton: { backgroundColor: '#f59e0b', padding: 18, borderRadius: 10, margin: 20, color: '#fff', fontSize: 18, fontWeight: 'bold', border: 'none', width: '100%' },

  pomodoroButton: {
  backgroundColor: "#6366f1",
  padding: 18,
  borderRadius: 10,
  margin: 20,
  color: "#fff",
  fontSize: 18,
  fontWeight: "bold",
  border: "none",
  width: "100%",
},
};
