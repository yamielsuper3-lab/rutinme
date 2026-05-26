import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { View } from './types';
import Dashboard from './views/Dashboard';
import Welcome from './views/Welcome';
import Library from './views/Library';
import Progress from './views/Progress';
import Profile from './views/Profile';
import LogSet from './views/LogSet';
import CreateRoutine from './views/CreateRoutine';
import ExerciseDetails from './views/ExerciseDetails';
import BottomNav from './components/BottomNav';
import Header from './components/Header';

const App: React.FC = () => {
  // Keeping darkMode local for now to avoid breaking Profile signature immediately
  // TODO: Move to global store in next step
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const isLogSet = location.pathname === '/log-set';
  const isWelcome = location.pathname === '/';
  const isCreateRoutine = location.pathname === '/create-routine';

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {!isLogSet && !isWelcome && !isCreateRoutine && <Header />}

      <main className={`flex-1 overflow-y-auto scrollbar-hide ${!isWelcome ? 'pb-24' : ''}`}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/create-routine" element={<CreateRoutine />} />
          <Route path="/exercise/:id" element={<ExerciseDetails />} />
          <Route path="/dashboard" element={<Dashboard onStartExercise={() => navigate('/log-set')} />} />
          <Route path="/library" element={<Library onSelectExercise={() => navigate('/log-set')} />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/profile" element={<Profile darkMode={darkMode} setDarkMode={setDarkMode} />} />
          <Route path="/log-set" element={<LogSet onBack={() => navigate(-1)} />} />
        </Routes>
      </main>

      {!isLogSet && !isWelcome && !isCreateRoutine && <BottomNav />}
    </div>
  );
};

export default App;
