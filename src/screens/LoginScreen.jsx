
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    try {
      login(email, password);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.title}>YKS Ders Takip</h1>
      <h2 style={styles.subtitle}>Giriş Yap</h2>

      <input
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />

      <input
        style={styles.input}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />

      <button style={styles.button} onClick={handleLogin}>
        Giriş Yap
      </button>

      <button style={styles.linkButton} onClick={() => navigate('/register')}>
        Kayıt Ol
      </button>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5', minHeight: '100vh' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#4f46e5', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 20, color: '#666', textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, fontSize: 16, border: '1px solid #ddd' },
  button: { backgroundColor: '#4f46e5', padding: 15, borderRadius: 10, color: '#fff', fontSize: 18, fontWeight: 'bold', border: 'none', marginBottom: 15 },
  linkButton: { color: '#4f46e5', fontSize: 16, textAlign: 'center', border: 'none', background: 'none', cursor: 'pointer' },
};