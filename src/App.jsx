import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';

// Imports das páginas
import { Home } from './pages/Home.jsx';
import { Musculacao } from './pages/Musculacao.jsx';
import { MeusTreinos } from './pages/MeusTreinos.jsx';
import { Esportes } from './pages/Esportes.jsx';
import { Metas } from './pages/Metas.jsx';
import { MinhasFichas } from './pages/MinhasFichas.jsx';
import { Dieta } from './pages/Dieta.jsx';
import { Login } from './pages/Login.jsx';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const handleLogin = () => setIsLogged(true);
  const handleLogout = () => setIsLogged(false);

  return (
    <Router>
      {!isLogged ? (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <div className="flex min-h-screen bg-[#0a0d10] text-white font-sans selection:bg-red-500/30">
          <Sidebar onLogout={handleLogout} />
          <main className="flex-1 p-10 overflow-y-auto overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Esportes" element={<Esportes />} />
              <Route path="/Musculacao" element={<Musculacao />} />
              <Route path="/MeusTreinos" element={<MeusTreinos />} />
              <Route path="/Metas" element={<Metas />} />
              <Route path="/MinhasFichas" element={<MinhasFichas />} />
              <Route path="/Dieta" element={<Dieta />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      )}
    </Router>
  );
}

export default App;