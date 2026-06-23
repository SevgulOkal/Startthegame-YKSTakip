import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

const COURSES = ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Türkçe', 'Tarih', 'Coğrafya', 'Felsefe'];

export default function AddWorkoutScreen() {
  const { addWorkout } = useData();
  const navigate = useNavigate();
  const [hours, setHours] = useState('');
  const [courseQuestions, setCourseQuestions] = useState({});

  const setQuestion = (course, value) => {
    setCourseQuestions(prev => ({ ...prev, [course]: value }));
  };

  const handleSubmit = () => {
    if (!hours || parseFloat(hours) <= 0) {
      alert('Geçerli bir çalışma saati girin');
      return;
    }

    const questions = Object.values(courseQuestions).reduce((sum, q) => sum + (parseInt(q) || 0), 0);

    addWorkout({
      date: new Date().toISOString(),
      hours: parseFloat(hours),
      questions,
      courseQuestions,
    });

    alert('Tebrikler! Çalışmanız kaydedildi');
    navigate('/home');
  };

  return (
    <div className="container">
      <h2 style={styles.section}>Çalışma Saatııı</h2>
      <input style={styles.input} placeholder="Saat (örn: 2.5)" value={hours} onChange={(e) => setHours(e.target.value)} type="number" />

      <h2 style={styles.section}>Ders Bazlı Soru Sayısııı</h2>
      {COURSES.map(course => (
        <input
          key={course}
          style={styles.inputSmall}
          placeholder={course}
          value={courseQuestions[course] || ''}
          onChange={(e) => setQuestion(course, e.target.value)}
          type="number"
        />
      ))}

      <button style={styles.button} onClick={handleSubmit}>
        Kaydet
      </button>
    </div>
  );
}

const styles = {
  section: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10, marginTop: 20 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16, border: '1px solid #ddd', width: '100%' },
  inputSmall: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, fontSize: 14, border: '1px solid #ddd', width: '100%' },
  button: { backgroundColor: '#4f46e5', padding: 18, borderRadius: 10, color: '#fff', fontSize: 18, fontWeight: 'bold', border: 'none', marginTop: 30, width: '100%' },
};