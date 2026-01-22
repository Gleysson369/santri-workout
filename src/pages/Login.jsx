import { useState } from 'react';

export function Login({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode definir um usuário padrão ou validar como quiser
    if (user === 'admin' && pass === '123') {
      onLogin();
    } else {
      alert("Usuário ou senha incorretos! (Dica: admin / 123)");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d10] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#14191e] border border-red-500/20 p-10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-light italic uppercase tracking-tighter text-white">
            Santri <span className="font-bold text-red-500 drop-shadow-[0_0_10px_#ff0000]">Workout</span>
          </h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mt-2">Acesse sua performance</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] text-gray-500 uppercase font-black mb-2 block ml-1">Usuário</label>
            <input 
              type="text" 
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full bg-black/40 border border-white/5 p-4 rounded-xl text-white outline-none focus:border-red-500 transition-all"
              placeholder="Digite seu usuário"
            />
          </div>

          <div>
            <label className="text-[10px] text-gray-500 uppercase font-black mb-2 block ml-1">Senha</label>
            <input 
              type="password" 
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full bg-black/40 border border-white/5 p-4 rounded-xl text-white outline-none focus:border-red-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl uppercase italic tracking-widest transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-red-600/50"
          >
            Entrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
}