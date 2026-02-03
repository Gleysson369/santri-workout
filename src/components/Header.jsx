import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Header({ onLogout, searchTerm, onSearch, onToggleMobileMenu }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Mock de dados do usuário (futuramente viria de um Contexto ou API)
  const user = { name: 'Gleysson Flavio', email: 'atleta@santri.com', avatar: null };

  return (
    <header className="h-20 px-6 lg:px-10 flex items-center justify-between bg-[var(--bg-card)]/90 backdrop-blur-xl border-b border-[var(--border-color)] z-40 shrink-0 transition-colors duration-300">
      
      {/* 🔍 Search Bar */}
      <div className="relative w-full max-w-md hidden md:block group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <i className="fas fa-search text-[var(--text-muted)] group-focus-within:text-[var(--color-primary)] transition-colors"></i>
        </div>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="block w-full pl-11 pr-4 py-3 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-2xl text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] focus:border-[var(--color-primary)]/50 focus:ring-1 focus:ring-[var(--color-primary)]/50 focus:bg-[var(--bg-main)]/40 transition-all outline-none" 
          placeholder="Buscar treinos, fichas ou atletas..." 
        />
      </div>

      {/* Título Mobile (só aparece em telas pequenas) */}
      <div className="md:hidden flex items-center gap-4">
        <button onClick={onToggleMobileMenu} className="text-[var(--text-main)] text-xl focus:outline-none">
          <i className="fas fa-bars"></i>
        </button>
        <h1 className="text-xl font-black italic text-[var(--text-main)] uppercase tracking-tighter">
          Red-G <span className="text-[var(--color-primary)]">.</span>
        </h1>
      </div>

      {/* 👤 User Profile Menu */}
      <div className="relative ml-auto">
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-4 p-1.5 pr-4 rounded-full hover:bg-[var(--bg-main)]/5 border border-transparent hover:border-[var(--border-color)] transition-all cursor-pointer group"
        >
          {/* Avatar com Glow */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] p-[2px] shadow-[0_0_15px_var(--shadow-color)] group-hover:shadow-[0_0_20px_var(--shadow-color)] transition-shadow">
             <div className="w-full h-full rounded-full bg-[var(--bg-card)] flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-black text-white text-sm">{user.name.charAt(0)}</span>
                )}
             </div>
          </div>
          
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-[var(--text-main)] leading-none group-hover:text-[var(--color-primary)] transition-colors">{user.name}</p>
            <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mt-1">Atleta Pro</p>
          </div>
          
          <i className={`fas fa-chevron-down text-[10px] text-[var(--text-muted)] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[var(--color-primary)]' : ''}`}></i>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
            <div className="absolute right-0 top-full mt-3 w-64 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl z-50 overflow-hidden animate-fadeIn origin-top-right">
              <div className="p-5 border-b border-[var(--border-color)] bg-[var(--bg-main)]/5">
                <p className="text-[var(--text-main)] font-bold text-sm">{user.name}</p>
                <p className="text-[var(--text-muted)] text-xs">{user.email}</p>
              </div>
              <div className="p-2">
                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-muted)] hover:bg-[var(--bg-main)]/5 hover:text-[var(--text-main)] rounded-xl transition-colors">
                  <i className="fas fa-user-circle w-5 text-center"></i> Meu Perfil
                </Link>
                <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-muted)] hover:bg-[var(--bg-main)]/5 hover:text-[var(--text-main)] rounded-xl transition-colors">
                  <i className="fas fa-cog w-5 text-center"></i> Configurações
                </Link>
              </div>
              <div className="p-2 border-t border-[var(--border-color)]">
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-xl transition-colors font-bold cursor-pointer"
                >
                  <i className="fas fa-sign-out-alt w-5 text-center"></i> Sair do Sistema
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
