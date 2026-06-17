import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState(() => 
    JSON.parse(localStorage.getItem('workouts') || '[]')
  );
  const [goals, setGoals] = useState(() => 
    JSON.parse(localStorage.getItem('goals') || '{"dailyHours":4,"dailyQuestions":100}')
  );

  const addWorkout = (workout) => {
    const newWorkouts = [...workouts, { ...workout, id: Date.now().toString() }];
    setWorkouts(newWorkouts);
    localStorage.setItem('workouts', JSON.stringify(newWorkouts));
  };

  const setGoal = (newGoals) => {
    setGoals(newGoals);
    localStorage.setItem('goals', JSON.stringify(newGoals));
  };

  return (
    <DataContext.Provider value={{ workouts, goals, addWorkout, setGoal }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);