import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function GoalsScreen() {
  const { goals, setGoal } = useData();
  const navigate = useNavigate();
  const [dailyHours, setDailyHours] = useState(goals.dailyHours);
  const [dailyQuestions, setDailyQuestions] = useState(goals.dailyQuestions);

  const handleSave = () => {
    if (!dailyHours || !dailyQuestions) {
      alert('Tüm alanları doldurun');
      return;
    }

    setGoal({ dailyHours: parseFloat(dailyHours), dailyQuestions: parseInt(dailyQuestions) });
    alert('Tebrikler! Hedefleriniz kaydedildi');
    navigate('/home');
  };

  return (
    <div className="container">
      <h2 style={styles.section}>Günlük Hedefler</h2>

      <input
        style={styles.input}
        placeholder="Çalışma Saatııı (örn: 4)"
        value={dailyHours.toString()}
        onChange={(e) => setDailyHours(e.target.value)}
        type="number"
      />

      <input
        style={styles.input}
        placeholder="Soru Sayısııı (örn: 100)"
        value={dailyQuestions.toString()}
        onChange={(e) => setDailyQuestions(e.target.value)}
        type="number"
      />

      <button style={styles.button} onClick={handleSave}>
        Kaydet
      </button>
    </div>
  );
}

const styles = {
  section: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16, border: '1px solid #ddd', width: '100%' },
  button: { backgroundColor: '#4f46e5', padding: 18, borderRadius: 10, color: '#fff', fontSize: 18, fontWeight: 'bold', border: 'none', marginTop: 20, width: '100%' },
};