import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Sidebar({ onLogout }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Estado para controlar se o submenu de musculação está aberto
  const [musculacaoOpen, setMusculacaoOpen] = useState(false);
  const location = useLocation();

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-[#0f0f0f]/90 border-r border-red-500/20 h-screen transition-all duration-300 flex flex-col sticky top-0 z-50`}>
      
      {/* BOTÃO COLAPSO */}
      <div className="p-4 mb-6 flex justify-end">
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-red-600 cursor-pointer p-2 hover:scale-110 transition-transform">
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-bars'} text-2xl`}></i>
        </button>
      </div>

      {/* NAVEGAÇÃO PRINCIPAL */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        <ul className="space-y-1">
          <NavItem to="/" icon="fa-home" label="Home" isCollapsed={isCollapsed} active={location.pathname === "/"} />
          <NavItem to="/corrida" icon="fa-running" label="Corrida" isCollapsed={isCollapsed} active={location.pathname === "/corrida"} />
          <NavItem to="/ciclismo" icon="fa-bicycle" label="Ciclismo" isCollapsed={isCollapsed} active={location.pathname === "/ciclismo"} />
          
          {/* MENU PAI: MUSCULAÇÃO COM SUBMENU */}
          <li>
            <button 
              onClick={() => {
                if(isCollapsed) setIsCollapsed(false); 
                setMusculacaoOpen(!musculacaoOpen);
              }}
              className={`w-full flex items-center p-4 transition-all border-l-4 cursor-pointer group
                ${(location.pathname === "/musculacao" || location.pathname === "/MinhasFichas") 
                  ? 'text-red-500 bg-red-500/5 border-red-500 shadow-[inset_10px_0_15px_-10px_rgba(239,68,68,0.2)]' 
                  : 'text-gray-400 border-transparent hover:text-red-400 hover:bg-white/5'}
              `}
            >
              <i className="fas fa-dumbbell min-w-[32px] text-center text-lg"></i>
              {!isCollapsed && (
                <>
                  <span className="ml-4 font-medium italic uppercase tracking-wider text-sm flex-1 text-left">Musculação</span>
                  <i className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ${musculacaoOpen ? 'rotate-180' : ''}`}></i>
                </>
              )}
            </button>

            {/* SUBMENU MUSCULAÇÃO */}
            {musculacaoOpen && !isCollapsed && (
              <ul className="bg-black/40 border-y border-white/5 animate-slideDown">
                <NavItem 
                  to="/musculacao" 
                  icon="fa-play-circle" 
                  label="Treinar Agora" 
                  isCollapsed={isCollapsed} 
                  active={location.pathname === "/musculacao"}
                  isSubItem 
                />
                <NavItem 
                  to="/MinhasFichas" 
                  icon="fa-file-invoice" 
                  label="Minhas Fichas" 
                  isCollapsed={isCollapsed} 
                  active={location.pathname === "/MinhasFichas"}
                  isSubItem 
                />
              </ul>
            )}
          </li>

          <NavItem to="/MeusTreinos" icon="fa-clipboard-list" label="Meus Treinos" isCollapsed={isCollapsed} active={location.pathname === "/MeusTreinos"} />
          <NavItem to="/metas" icon="fa-bullseye" label="Metas" isCollapsed={isCollapsed} active={location.pathname === "/metas"} />
          <NavItem to="/dieta" icon="fa-utensils" label="Dieta" isCollapsed={isCollapsed} active={location.pathname === "/dieta"} />
        </ul>
      </nav>

      {/* RODAPÉ / SAIR */}
      <div className="mb-6 border-t border-red-900/20 pt-2">
        <button 
          onClick={onLogout}
          className="w-full flex items-center p-4 text-gray-500 hover:text-red-600 hover:bg-red-500/5 transition-all cursor-pointer group"
        >
          <i className="fas fa-sign-out-alt w-8 text-center text-lg group-hover:drop-shadow-[0_0_8px_#ff0000]"></i>
          {!isCollapsed && (
            <span className="ml-4 font-medium italic uppercase tracking-wider text-sm">Sair</span>
          )}
        </button>
      </div>
    </aside>
  );
}

// COMPONENTE DE ITEM DE MENU
function NavItem({ icon, label, isCollapsed, to, active, isSubItem }) {
  return (
    <li>
      <Link 
        to={to} 
        className={`
          flex items-center p-4 transition-all group border-l-4
          ${active 
            ? 'text-red-500 bg-red-500/10 border-red-500 drop-shadow-[0_0_5px_rgba(255,0,0,0.3)]' 
            : 'text-gray-400 border-transparent hover:text-red-400 hover:bg-red-500/5 hover:border-red-500/40'}
          ${isSubItem ? 'pl-12 bg-black/20' : ''} 
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