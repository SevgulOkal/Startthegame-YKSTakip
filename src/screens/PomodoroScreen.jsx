import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "yks_pomodoro_state";
const HISTORY_KEY = "yks_pomodoro_history";

export default function PomodoroScreen() {
  const navigate = useNavigate();
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [lastStartTime, setLastStartTime] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedHistory = localStorage.getItem(HISTORY_KEY);

    if (saved) {
      const data = JSON.parse(saved);
      setWorkMinutes(data.workMinutes ?? 25);
      setBreakMinutes(data.breakMinutes ?? 5);
      setIsWork(data.isWork ?? true);
      setIsRunning(data.isRunning ?? false);
      setLastStartTime(data.lastStartTime ?? null);

      if (data.isRunning && data.lastStartTime) {
        const elapsed = Math.floor((Date.now() - data.lastStartTime) / 1000);
        const baseSeconds = data.isWork
          ? (data.workMinutes ?? 25) * 60
          : (data.breakMinutes ?? 5) * 60;

        const remaining = Math.max(baseSeconds - elapsed, 0);
        setSecondsLeft(remaining);

        if (remaining === 0) {
          completePhase(data.isWork, data.workMinutes ?? 25, data.breakMinutes ?? 5);
        }
      } else {
        setSecondsLeft((data.isWork ?? true ? (data.workMinutes ?? 25) : (data.breakMinutes ?? 5)) * 60);
      }
    }

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    const state = {
      workMinutes,
      breakMinutes,
      secondsLeft,
      isRunning,
      isWork,
      lastStartTime,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [workMinutes, breakMinutes, secondsLeft, isRunning, isWork, lastStartTime]);

  useEffect(() => {
    let timer = null;

    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }

    if (secondsLeft === 0) {
      completePhase(isWork, workMinutes, breakMinutes);
    }

    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, isWork, workMinutes, breakMinutes]);

  const completePhase = (currentIsWork, currentWorkMinutes, currentBreakMinutes) => {
    const now = new Date().toISOString();

    const session = {
      type: currentIsWork ? "Çalışma" : "Mola",
      duration: currentIsWork ? currentWorkMinutes : currentBreakMinutes,
      completedAt: now,
    };

    const updatedHistory = [session, ...history];
    setHistory(updatedHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));

    const nextIsWork = !currentIsWork;
    const nextSeconds = nextIsWork ? currentWorkMinutes * 60 : currentBreakMinutes * 60;

    setIsWork(nextIsWork);
    setSecondsLeft(nextSeconds);
    setIsRunning(false);
    setLastStartTime(null);
  };

  const toggleTimer = () => {
    if (!isRunning) {
      setLastStartTime(Date.now());
    } else {
      setLastStartTime(null);
    }
    setIsRunning((prev) => !prev);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsWork(true);
    setSecondsLeft(workMinutes * 60);
    setLastStartTime(null);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const updateWorkMinutes = (value) => {
    const val = Number(value);
    setWorkMinutes(val);
    if (isWork && !isRunning) setSecondsLeft(val * 60);
  };

  const updateBreakMinutes = (value) => {
    const val = Number(value);
    setBreakMinutes(val);
    if (!isWork && !isRunning) setSecondsLeft(val * 60);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate("/home")}>
        ← Geri
      </button>

      <h1 style={styles.title}>Pomodoro Timer</h1>
      <p style={styles.mode}>{isWork ? "Çalışma Süresi" : "Mola Süresi"}</p>

      <div style={styles.timer}>{formatTime(secondsLeft)}</div>

      <div style={styles.controls}>
        <button style={styles.primaryButton} onClick={toggleTimer}>
          {isRunning ? "Durdur" : "Başlat"}
        </button>
        <button style={styles.secondaryButton} onClick={resetTimer}>
          Sıfırla
        </button>
      </div>

      <div style={styles.settings}>
        <label style={styles.label}>
          Çalışma dakikası
          <input
            type="number"
            min="1"
            max="120"
            value={workMinutes}
            onChange={(e) => updateWorkMinutes(e.target.value)}
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Mola dakikası
          <input
            type="number"
            min="1"
            max="30"
            value={breakMinutes}
            onChange={(e) => updateBreakMinutes(e.target.value)}
            style={styles.input}
          />
        </label>
      </div>

      <div style={styles.historyBox}>
        <div style={styles.historyHeader}>
          <h3 style={styles.historyTitle}>Oturum Geçmişi</h3>
          <button style={styles.clearButton} onClick={clearHistory}>
            Temizle
          </button>
        </div>

        {history.length === 0 ? (
          <p style={styles.emptyText}>Henüz kayıt yok.</p>
        ) : (
          history.map((item, index) => (
            <div key={index} style={styles.historyItem}>
              <strong>{item.type}</strong> - {item.duration} dk
              <span style={styles.historyDate}>
                {new Date(item.completedAt).toLocaleString("tr-TR")}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "24px",
    background: "#f5f7fb",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
  },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    border: "none",
    background: "#e5e7eb",
    padding: "10px 14px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  title: { fontSize: "40px", color: "#1f2937", margin: 0 },
  mode: { fontSize: "18px", color: "#6b7280", margin: 0 },
  timer: {
    fontSize: "72px",
    fontWeight: "bold",
    color: "#4f46e5",
    background: "#fff",
    padding: "30px 40px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  controls: { display: "flex", gap: "12px" },
  primaryButton: {
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    padding: "14px 22px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },
  secondaryButton: {
    border: "none",
    background: "#e5e7eb",
    color: "#111827",
    padding: "14px 22px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
  },
  settings: {
    marginTop: "12px",
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  label: { display: "flex", flexDirection: "column", gap: "6px", color: "#374151" },
  input: {
    width: "120px",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
  },
  historyBox: {
    marginTop: "20px",
    width: "100%",
    maxWidth: "520px",
    background: "#fff",
    borderRadius: "16px",
    padding: "18px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  },
  historyHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  historyTitle: {
    margin: 0,
    color: "#111827",
  },
  clearButton: {
    border: "none",
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "8px 12px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  emptyText: {
    color: "#6b7280",
    margin: 0,
  },
  historyItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "10px 0",
    borderBottom: "1px solid #e5e7eb",
    color: "#374151",
  },
  historyDate: {
    fontSize: "12px",
    color: "#6b7280",
  },
};
