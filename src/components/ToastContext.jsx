import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-24 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`
              pointer-events-auto min-w-[300px] max-w-sm p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] border backdrop-blur-xl flex items-center gap-4 animate-slideIn
              ${toast.type === 'success' ? 'bg-[var(--bg-card)]/95 border-green-500/30' : ''}
              ${toast.type === 'error' ? 'bg-[var(--bg-card)]/95 border-[var(--color-secondary)]/30' : ''}
              ${toast.type === 'info' ? 'bg-[var(--bg-card)]/95 border-[var(--color-primary)]/30' : ''}
            `}
          >
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center shrink-0
              ${toast.type === 'success' ? 'bg-green-500/10 text-green-500' : ''}
              ${toast.type === 'error' ? 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]' : ''}
              ${toast.type === 'info' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : ''}
            `}>
              <i className={`fas ${
                toast.type === 'success' ? 'fa-check' : 
                toast.type === 'error' ? 'fa-times' : 'fa-info'
              }`}></i>
            </div>
            
            <div className="flex-1">
              <p className={`text-[10px] font-black uppercase tracking-widest mb-0.5 ${
                toast.type === 'success' ? 'text-green-500' : 
                toast.type === 'error' ? 'text-[var(--color-secondary)]' : 'text-[var(--color-primary)]'
              }`}>
                {toast.type === 'success' ? 'Sucesso' : toast.type === 'error' ? 'Atenção' : 'Info'}
              </p>
              <p className="text-sm font-bold text-[var(--text-main)] leading-tight">{toast.message}</p>
            </div>

            <button onClick={() => removeToast(toast.id)} className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer">
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>
      <style>{`@keyframes slideIn { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } } .animate-slideIn { animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }`}</style>
    </ToastContext.Provider>
  );
}
