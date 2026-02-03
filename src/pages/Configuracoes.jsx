import { useState } from 'react';
import { useTheme } from '../components/ThemeContext';
import { useToast } from '../components/ToastContext';

export function Configuracoes() {
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(false);
  const [language, setLanguage] = useState('pt-BR');

  const handleSave = () => {
    // Aqui você salvaria no localStorage ou Backend
    addToast("Suas preferências foram salvas com sucesso!", "success");
  };

  return (
    <div className="p-4 lg:p-8 animate-fadeIn pb-24">
      <header className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold italic text-[var(--text-main)] uppercase tracking-tighter">
          Ajustes & <span className="text-[var(--color-primary)] drop-shadow-[0_0_8px_var(--color-primary)]">Configurações</span>
        </h2>
        <div className="h-1 w-20 bg-[var(--color-primary)] mt-2 shadow-[0_0_10px_var(--color-primary)]"></div>
      </header>

      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* APARÊNCIA */}
        <section className="bg-[var(--bg-card)]/80 backdrop-blur-xl p-8 rounded-3xl border border-[var(--border-color)] shadow-xl">
          <h3 className="text-[var(--color-primary)] font-black uppercase text-xs mb-6 tracking-widest border-b border-[var(--border-color)] pb-2 flex items-center gap-2">
            <i className="fas fa-paint-brush"></i> Aparência
          </h3>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
            <div>
              <p className="text-[var(--text-main)] font-bold text-sm">Tema do Sistema</p>
              <p className="text-[var(--text-muted)] text-xs">Alternar entre modo claro e escuro</p>
            </div>
            <button 
              onClick={toggleTheme}
              className={`relative w-14 h-8 rounded-full transition-colors duration-300 cursor-pointer ${theme === 'dark' ? 'bg-[var(--color-primary)]' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${theme === 'dark' ? 'translate-x-6' : ''}`}>
                <i className={`fas ${theme === 'dark' ? 'fa-moon text-[var(--color-primary)]' : 'fa-sun text-yellow-500'} text-[10px]`}></i>
              </div>
            </button>
          </div>
        </section>

        {/* PREFERÊNCIAS */}
        <section className="bg-[var(--bg-card)]/80 backdrop-blur-xl p-8 rounded-3xl border border-[var(--border-color)] shadow-xl">
          <h3 className="text-[var(--color-primary)] font-black uppercase text-xs mb-6 tracking-widest border-b border-[var(--border-color)] pb-2 flex items-center gap-2">
            <i className="fas fa-sliders-h"></i> Preferências
          </h3>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
              <div>
                <p className="text-[var(--text-main)] font-bold text-sm">Notificações</p>
                <p className="text-[var(--text-muted)] text-xs">Receber alertas de treinos e metas</p>
              </div>
              <ToggleSwitch checked={notifications} onChange={() => setNotifications(!notifications)} />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
              <div>
                <p className="text-[var(--text-main)] font-bold text-sm">Sons do Sistema</p>
                <p className="text-[var(--text-muted)] text-xs">Efeitos sonoros ao concluir ações</p>
              </div>
              <ToggleSwitch checked={sound} onChange={() => setSound(!sound)} />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
              <div>
                <p className="text-[var(--text-main)] font-bold text-sm">Idioma</p>
                <p className="text-[var(--text-muted)] text-xs">Linguagem da interface</p>
              </div>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-[var(--bg-main)]/40 border border-[var(--border-color)] text-[var(--text-main)] text-xs rounded-lg p-2 outline-none focus:border-[var(--color-primary)]"
              >
                <option value="pt-BR">Português (BR)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>
          </div>
        </section>
        {/* CONTA */}
        <section className="bg-[var(--bg-card)]/80 backdrop-blur-xl p-8 rounded-3xl border border-[var(--border-color)] shadow-xl">
          <h3 className="text-[var(--color-secondary)] font-black uppercase text-xs mb-6 tracking-widest border-b border-[var(--border-color)] pb-2 flex items-center gap-2">
            <i className="fas fa-user-shield"></i> Zona de Perigo
          </h3>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
            <div>
              <p className="text-[var(--text-main)] font-bold text-sm">Excluir Conta</p>
              <p className="text-[var(--text-muted)] text-xs">Esta ação é irreversível</p>
            </div>
            <button className="bg-[var(--color-secondary)]/10 hover:bg-[var(--color-secondary)] text-[var(--color-secondary)] hover:text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer">
              Excluir
            </button>
          </div>
        </section>

        {/* BOTÃO SALVAR GERAL */}
        <div className="flex justify-end pt-4">
          <button 
            onClick={handleSave}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-8 py-3 rounded-xl font-black uppercase italic text-xs shadow-lg shadow-[var(--shadow-color)] transition-all cursor-pointer"
          >
            Salvar Preferências
          </button>
        </div>
      </div>
    </div>
  );
}

function ToggleSwitch({ checked, onChange }) {
  return (
    <button 
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 cursor-pointer ${checked ? 'bg-[var(--color-primary)]' : 'bg-[var(--bg-main)] border border-[var(--border-color)]'}`}
    >
      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${checked ? 'translate-x-6' : ''}`}></div>
    </button>
  );
}
