import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddWorkoutScreen from './screens/AddWorkoutScreen';
import ReportsScreen from './screens/ReportsScreen';
import GoalsScreen from './screens/GoalsScreen';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
<<<<<<< HEAD
import PomodoroScreen from "./screens/PomodoroScreen";
=======
>>>>>>> dc14faa301dcc7ce479c07735fa72e2ddb6d07ea

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/add-workout" element={<AddWorkoutScreen />} />
          <Route path="/reports" element={<ReportsScreen />} />
          <Route path="/goals" element={<GoalsScreen />} />
<<<<<<< HEAD
          <Route path="/pomodoro" element={<PomodoroScreen />} />
        
=======
>>>>>>> dc14faa301dcc7ce479c07735fa72e2ddb6d07ea
        </Routes>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;