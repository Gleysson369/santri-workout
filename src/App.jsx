import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { ActivityRing } from './components/ActivityRing';

// Imports com extensão .jsx para garantir compatibilidade no servidor Linux
import { Musculacao } from './pages/Musculacao.jsx';
import { Ciclismo } from './pages/Ciclismo.jsx';
import { Corrida } from './pages/Corrida.jsx';
import { MeusTreinos } from './pages/MeusTreinos.jsx';
import { Metas } from './pages/Metas.jsx';
import { MinhasFichas } from './pages/MinhasFichas.jsx';
import { Dieta } from './pages/Dieta.jsx';
import { Login } from './pages/Login.jsx';

function Home() {
  return (
    <div className="flex flex-col justify-center min-h-[80vh] animate-fadeIn">
      <header className="mb-12 text-left ml-10">
        <h1 className="text-4xl font-light italic uppercase tracking-tighter text-white">
          Santri <span className="font-bold text-red-500 drop-shadow-[0_0_10px_#ff0000]">Workout</span>
        </h1>
        <p className="text-white/70 text-sm mt-1 tracking-widest uppercase">
           Suas metas. Seu ritmo. Sua evolução.
        </p>
        <p className="text-gray-400 mt-4 uppercase text-[10px] tracking-[0.2em]">
          Performance Dashboard de <strong className="text-red-500 font-bold">GLEYSSON FLAVIO GOMES DE SOUZA</strong>
        </p>
      </header>

      <section className="flex flex-wrap justify-center gap-16 mb-20">
        <Link to="/Corrida" className="transition-transform hover:scale-110">
          <ActivityRing icon="fa-running" label="Corrida" colorClass="border-t-red-600 border-r-red-600" shadowColor="#ff0000" />
        </Link>
        <Link to="/Ciclismo" className="transition-transform hover:scale-110">
          <ActivityRing icon="fa-bicycle" label="Ciclismo" colorClass="border-t-red-600 border-r-red-600" shadowColor="#ff0000" />
        </Link>
        <Link to="/Musculacao" className="transition-transform hover:scale-110">
          <ActivityRing icon="fa-dumbbell" label="Musculação" colorClass="border-t-red-600 border-r-red-600" shadowColor="#ff0000" />
        </Link>
      </section>

      <div className="px-10">
        <h3 className="text-gray-500 text-[10px] uppercase font-black tracking-[0.3em] mb-6 text-center">Gestão de Performance</h3>
        <section className="flex flex-wrap justify-center gap-6">
          <QuickLink to="/Dieta" icon="fa-utensils" label="Dieta & Macros" color="hover:border-emerald-500" />
          <QuickLink to="/MinhasFichas" icon="fa-file-invoice" label="Minhas Fichas" color="hover:border-red-500" />
          <QuickLink to="/Metas" icon="fa-bullseye" label="Minhas Metas" color="hover:border-orange-500" />
          <QuickLink to="/MeusTreinos" icon="fa-history" label="Histórico" color="hover:border-blue-500" />
        </section>
      </div>
    </div>
  );
}

function QuickLink({ to, icon, label, color }) {
  return (
    <Link to={to} className={`bg-[#14191e]/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl w-44 flex flex-col items-center gap-3 transition-all hover:-translate-y-2 group ${color}`}>
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
        <i className={`fas ${icon} text-xl text-gray-400 group-hover:text-red-500`}></i>
      </div>
      <span className="text-[10px] font-black uppercase text-gray-500 group-hover:text-white tracking-widest text-center">{label}</span>
    </Link>
  );
}

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
              <Route path="/Corrida" element={<Corrida />} />
              <Route path="/Ciclismo" element={<Ciclismo />} />
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