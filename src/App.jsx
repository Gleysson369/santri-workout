import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Perfil } from './pages/perfil';
import { Configuracoes } from './pages/Configuracoes';
import { Esportes } from './pages/Esportes';
import { Musculacao } from './pages/Musculacao';
import { Dieta } from './pages/Dieta';
import { MeusTreinos } from './pages/MeusTreinos';
import { Metas } from './pages/Metas';
import { MinhasFichas } from './pages/MinhasFichas';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    setSearchTerm(''); // Limpa a busca ao sair
    setIsMobileMenuOpen(false);
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] font-sans selection:bg-[var(--color-primary)]/30 transition-colors duration-300">
        {isAuthenticated && (
          <Sidebar 
            onLogout={handleLogout} 
            isMobileOpen={isMobileMenuOpen} 
            setIsMobileOpen={setIsMobileMenuOpen} 
          />
        )}
        
        <main className={`flex-1 flex flex-col relative ${isAuthenticated ? 'overflow-hidden h-screen' : ''}`}>
          
          {/* Header Global */}
          {isAuthenticated && (
            <Header 
              onLogout={handleLogout} 
              searchTerm={searchTerm} 
              onSearch={setSearchTerm} 
              onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          )}

          {/* Área de Conteúdo com Scroll */}
          <div className="flex-1 overflow-y-auto custom-scrollbar relative">
            <Routes>
              {/* Rotas Públicas */}
              <Route 
                path="/login" 
                element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
              />
              <Route 
                path="/register" 
                element={!isAuthenticated ? <Register /> : <Navigate to="/" />} 
              />

              {/* Rotas Privadas */}
              <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
              <Route path="/profile" element={isAuthenticated ? <Perfil /> : <Navigate to="/login" />} />
              <Route path="/settings" element={isAuthenticated ? <Configuracoes /> : <Navigate to="/login" />} />
              <Route path="/esportes" element={isAuthenticated ? <Esportes searchTerm={searchTerm} /> : <Navigate to="/login" />} />
              <Route path="/musculacao" element={isAuthenticated ? <Musculacao /> : <Navigate to="/login" />} />
              <Route path="/dieta" element={isAuthenticated ? <Dieta /> : <Navigate to="/login" />} />
              <Route path="/MeusTreinos" element={isAuthenticated ? <MeusTreinos searchTerm={searchTerm} /> : <Navigate to="/login" />} />
              <Route path="/metas" element={isAuthenticated ? <Metas /> : <Navigate to="/login" />} />
              <Route path="/MinhasFichas" element={isAuthenticated ? <MinhasFichas /> : <Navigate to="/login" />} />
              
              {/* Redirecionamento Padrão */}
              <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}