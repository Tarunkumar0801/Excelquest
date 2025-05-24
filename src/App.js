
// Main React App Structure for ExcelQuest with Authentication, Animation, and Sound Effects
import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { ModulePage } from './components/ModulePage';
import { QuestPage } from './components/QuestPage';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import './App.css';
import './sounds/success.mp3';
import { AnimatePresence } from 'framer-motion';

const ProgressContext = createContext();

export const useProgress = () => useContext(ProgressContext);

function App() {
  const [xp, setXP] = useState(1500);
  const [completedQuests, setCompletedQuests] = useState([]);
  const [user, setUser] = useState(null);

  const gainXP = (amount) => setXP(prev => prev + amount);
  const completeQuest = (questId) => setCompletedQuests(prev => [...new Set([...prev, questId])]);
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <ProgressContext.Provider value={{ xp, gainXP, completedQuests, completeQuest, user, login, logout }}>
      <Router>
        <Navbar />
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/module/:id" element={<ModulePage />} />
            <Route path="/quest/:id" element={<QuestPage />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </ProgressContext.Provider>
  );
}

export default App;
