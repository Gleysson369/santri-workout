import { useState } from 'react';
import { useToast } from '../ToastContext';

const DIVISOES = [
  { label: 'A (Único)', keys: ['A'] },
  { label: 'A, B', keys: ['A', 'B'] },
  { label: 'A, B, C', keys: ['A', 'B', 'C'] },
  { label: 'A, B, C, D', keys: ['A', 'B', 'C', 'D'] },
  { label: 'A, B, C, D, E', keys: ['A', 'B', 'C', 'D', 'E'] },
  { label: 'A, B, C, D, E, F', keys: ['A', 'B', 'C', 'D', 'E', 'F'] },
];

export function CriarFichaForm({ onSave, onCancel, initialData }) {
  const [nome, setNome] = useState(initialData?.nome || '');
  const [divisao, setDivisao] = useState(initialData?.divisao || DIVISOES[0].keys);
  const { addToast } = useToast();

  const handleSubmit = () => {
    if (!nome.trim()) return addToast("Digite um nome para a ficha!", 'error');
    onSave({ nome, divisao });
  };

  return (
    <div className="max-w-xl mx-auto bg-[var(--bg-card)] p-8 rounded-2xl border border-[var(--border-color)] animate-fadeIn">
      <h3 className="text-[var(--text-main)] font-black uppercase text-xl mb-6 text-center">{initialData ? 'Editar Ficha' : 'Nova Ficha'}</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-[10px] text-[var(--text-muted)] uppercase font-bold mb-1 block">Nome da Ficha</label>
          <input 
            value={nome} 
            onChange={e => setNome(e.target.value)} 
            className="w-full bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-3 rounded text-[var(--text-main)] outline-none focus:border-[var(--color-primary)] transition-colors" 
            placeholder="Ex: Hipertrofia ABC" 
            autoFocus
          />
        </div>

        <div>
          <label className="text-[10px] text-[var(--text-muted)] uppercase font-bold mb-1 block">Divisão de Treino</label>
          <select 
            value={divisao.join(',')}
            onChange={e => setDivisao(e.target.value.split(','))} 
            className="w-full bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-3 rounded text-[var(--text-main)] outline-none focus:border-[var(--color-primary)] transition-colors"
          >
            {DIVISOES.map((div, i) => (
              <option key={i} value={div.keys.join(',')} className="bg-[var(--bg-card)]">{div.label}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <button onClick={onCancel} className="flex-1 bg-[var(--bg-main)] hover:bg-[var(--bg-card-hover)] py-3 rounded font-bold uppercase text-xs transition-colors text-[var(--text-main)] cursor-pointer">Cancelar</button>
          <button onClick={handleSubmit} className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] py-3 rounded font-bold uppercase text-xs transition-colors text-white shadow-[0_0_15px_var(--shadow-color)] cursor-pointer">Salvar Ficha</button>
        </div>
      </div>
    </div>
  );
}