import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Footer from './components/Footer';

const App = () => {
  const location = useLocation();

  // Determine if the current path is either /login or /signUp
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signUp';

  return (
    <div className="flex flex-col min-h-screen">
      <main className={`flex-grow ${isAuthPage ? 'flex flex-col justify-between' : ''}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
        </Routes>
        {isAuthPage && <Footer />} {/* Footer inside main for Login and SignUp */}
      </main>
      {!isAuthPage && <Footer />}  {/* Footer outside main for Home */}
    </div>
  );
};

export default App;