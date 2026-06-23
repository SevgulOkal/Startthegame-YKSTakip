
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert('Tüm alanlar gereklidir');
      return;
    }
    if (password.length < 6) {
      alert('Password en az 6 karakter olmalıdır');
      return;
    }
    try {
      register(email, password, name);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container" style={styles.container}>
      <h2 style={styles.title}>Kayıt Ol</h2>

      <input style={styles.input} placeholder="Ad" value={name} onChange={(e) => setName(e.target.value)} />
      <input style={styles.input} placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
      <input style={styles.input} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />

      <button style={styles.button} onClick={handleRegister}>
        Kayıt Ol
      </button>

      <button style={styles.linkButton} onClick={() => navigate('/')}>
        Giriş Yap
      </button>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5', minHeight: '100vh' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4f46e5', marginBottom: 30, textAlign: 'center' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16, border: '1px solid #ddd' },
  button: { backgroundColor: '#4f46e5', padding: 15, borderRadius: 10, color: '#fff', fontSize: 18, fontWeight: 'bold', border: 'none', marginBottom: 15 },
  linkButton: { color: '#4f46e5', fontSize: 16, textAlign: 'center', border: 'none', background: 'none', cursor: 'pointer' },
};