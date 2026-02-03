import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../components/ToastContext';

export function Login({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de carregamento para dar um ar mais profissional
    setTimeout(() => {
      if (user === 'admin' && pass === '123') {
        onLogin();
      } else {
        addToast("Acesso Negado: Credenciais incorretas!", 'error');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[var(--bg-main)]">
      
      {/* Elementos Decorativos de Fundo (Glows) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-primary)]/10 rounded-full blur-[120px] z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-primary)]/10 rounded-full blur-[120px] z-0"></div>

      {/* Background Overlay com textura/imagem */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-main)]/80 to-[var(--bg-main)] z-0"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[var(--bg-card)]/80 backdrop-blur-2xl border border-[var(--border-color)] p-10 rounded-[2.5rem] shadow-2xl overflow-hidden group">
          
          {/* Linha de brilho no topo do card */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50"></div>

          <header className="text-center mb-10">
            <div className="inline-block p-4 bg-[var(--color-primary)]/10 rounded-2xl mb-4 border border-[var(--color-primary)]/20">
               <i className="fas fa-dumbbell text-3xl text-[var(--color-primary)] drop-shadow-[0_0_8px_var(--color-primary)]"></i>
            </div>
            <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-[var(--text-main)]">
              RED-G <span className="text-[var(--color-primary)] drop-shadow-[0_0_10px_var(--color-primary)]">Workout</span>
            </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
                <div className="h-[1px] w-8 bg-gray-800"></div>
                <p className="text-[var(--text-muted)] text-[9px] uppercase tracking-[0.4em] font-bold">Aesthetics & Power</p>
                <div className="h-[1px] w-8 bg-gray-800"></div>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] text-[var(--text-muted)] uppercase font-black ml-1 tracking-widest">Atleta / Usuário</label>
              <div className="relative">
                <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-xs"></i>
                <input 
                  type="text" 
                  required
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="w-full bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-4 pl-12 rounded-2xl text-[var(--text-main)] text-sm outline-none focus:border-[var(--color-primary)]/50 focus:bg-[var(--bg-main)]/60 transition-all placeholder:text-gray-700"
                  placeholder="Nome de usuário"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-[var(--text-muted)] uppercase font-black ml-1 tracking-widest">Senha de Acesso</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-xs"></i>
                <input 
                  type="password" 
                  required
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  className="w-full bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-4 pl-12 rounded-2xl text-[var(--text-main)] text-sm outline-none focus:border-[var(--color-primary)]/50 focus:bg-[var(--bg-main)]/60 transition-all placeholder:text-gray-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex justify-end pr-1">
                <button type="button" className="text-[9px] text-[var(--text-muted)] hover:text-[var(--color-primary)] uppercase font-bold transition-colors">Esqueceu a senha?</button>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full relative group overflow-hidden ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <div className="absolute inset-0 bg-[var(--color-primary)] group-hover:bg-[var(--color-primary-hover)] transition-colors"></div>
              
              {/* Efeito de brilho ao passar o mouse */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 duration-500 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
              
              <div className="relative px-6 py-4 flex items-center justify-center gap-3">
                {isLoading ? (
                    <i className="fas fa-circle-notch animate-spin text-white"></i>
                ) : (
                    <>
                        <span className="text-white font-black uppercase italic tracking-[0.2em] text-sm">Entrar</span>
                        <i className="fas fa-chevron-right text-[10px] text-white/50 group-hover:translate-x-1 transition-transform"></i>
                    </>
                )}
              </div>
            </button>
          </form>

          <footer className="mt-10 text-center">
             <p className="text-[var(--text-muted)] text-[10px] uppercase font-bold">
                Não tem uma conta? <Link to="/register" className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] cursor-pointer transition-colors">Faça seu registro</Link>
             </p>
          </footer>
        </div>
        
        {/* Rodapé externo */}
        <p className="text-center mt-8 text-[var(--text-muted)] text-[9px] uppercase tracking-widest font-medium">
            &copy; 2024 RED-G Systems - Protocolo de Treinamento Avançado
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}} />
    </div>
  );
}