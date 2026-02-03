import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';

export function Sidebar({ onLogout, isMobileOpen, setIsMobileOpen }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Fecha o menu mobile automaticamente ao mudar de rota (clicar em um link)
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  }, [location, setIsMobileOpen]);

  return (
    <>
      {/* Overlay Escuro para Mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-screen transition-all duration-300 flex flex-col
        bg-[var(--bg-card)]/95 md:bg-[var(--bg-card)]/80 backdrop-blur-md border-r border-[var(--border-color)]
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'md:w-20' : 'md:w-64'} w-64
      `}>
      
      {/* BOTÃO COLAPSO */}
      <div className="p-4 mb-6 flex justify-end hidden md:flex">
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-[var(--color-primary)] cursor-pointer p-2 hover:scale-110 transition-transform">
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-bars'} text-2xl`}></i>
        </button>
      </div>

      {/* NAVEGAÇÃO PRINCIPAL */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <ul className="space-y-1">
          <NavItem to="/" icon="fa-home" label="Home" isCollapsed={isCollapsed} active={location.pathname === "/"} />
          
          {/* ABA UNIFICADA: ESPORTES */}
          <NavItem 
            to="/esportes" 
            icon="fa-trophy" 
            label="Esportes" 
            isCollapsed={isCollapsed} 
            active={location.pathname === "/esportes"} 
          />
          
          <NavItem to="/musculacao" icon="fa-dumbbell" label="Musculação" isCollapsed={isCollapsed} active={location.pathname === "/musculacao"} />

          <NavItem to="/dieta" icon="fa-utensils" label="Dieta" isCollapsed={isCollapsed} active={location.pathname === "/dieta"} />
          <NavItem to="/MeusTreinos" icon="fa-clipboard-list" label="Meus Treinos" isCollapsed={isCollapsed} active={location.pathname === "/MeusTreinos"} />
          <NavItem to="/metas" icon="fa-bullseye" label="Metas" isCollapsed={isCollapsed} active={location.pathname === "/metas"} />
        </ul>
      </nav>

      {/* TOGGLE TEMA */}
      <div className="px-4 mb-2">
        <button 
          onClick={toggleTheme}
          className="w-full flex items-center justify-center p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-all cursor-pointer"
        >
          <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
          {!isCollapsed && <span className="ml-3 text-xs font-bold uppercase">{theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</span>}
        </button>
      </div>

      {/* RODAPÉ / SAIR */}
      <div className="mb-6 border-t border-[var(--border-color)] pt-2">
        <button 
          onClick={onLogout}
          className="w-full flex items-center p-4 text-[var(--text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all cursor-pointer group"
        >
          <i className="fas fa-sign-out-alt w-8 text-center text-lg group-hover:drop-shadow-[0_0_8px_var(--color-primary)]"></i>
          {!isCollapsed && (
            <span className="ml-4 font-medium italic uppercase tracking-wider text-sm">Sair</span>
          )}
        </button>
      </div>
    </aside>
    </>
  );
}

// COMPONENTE DE ITEM DE MENU (Permanece igual)
function NavItem({ icon, label, isCollapsed, to, active, isSubItem }) {
  return (
    <li>
      <Link 
        to={to} 
        className={`
          flex items-center p-4 transition-all group border-l-4
          ${active 
            ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10 border-[var(--color-primary)] drop-shadow-[0_0_5px_var(--shadow-color)]' 
            : 'text-[var(--text-muted)] border-transparent hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 hover:border-[var(--color-primary)]/40'}
          ${isSubItem ? 'pl-12 bg-[var(--bg-main)]/20' : ''} 
        `}
      >
        <i className={`fas ${icon} min-w-[32px] text-center text-lg group-hover:scale-110 transition-transform`}></i>
        {!isCollapsed && (
          <span className={`ml-4 font-medium italic uppercase tracking-wider whitespace-nowrap transition-opacity duration-300 ${isSubItem ? 'text-[11px] opacity-70' : 'text-sm'}`}>
            {label}
          </span>
        )}
      </Link>
    </li>
  );
}