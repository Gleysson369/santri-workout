import { useState } from 'react';

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

  const handleSubmit = () => {
    if (!nome.trim()) return alert("Digite um nome para a ficha!");
    onSave({ nome, divisao });
  };

  return (
    <div className="max-w-xl mx-auto bg-[#14191e] p-8 rounded-2xl border border-white/10 animate-fadeIn">
      <h3 className="text-white font-black uppercase text-xl mb-6 text-center">{initialData ? 'Editar Ficha' : 'Nova Ficha'}</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Nome da Ficha</label>
          <input 
            value={nome} 
            onChange={e => setNome(e.target.value)} 
            className="w-full bg-black/40 border border-gray-800 p-3 rounded text-white outline-none focus:border-red-500 transition-colors" 
            placeholder="Ex: Hipertrofia ABC" 
            autoFocus
          />
        </div>

        <div>
          <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Divisão de Treino</label>
          <select 
            value={divisao.join(',')}
            onChange={e => setDivisao(e.target.value.split(','))} 
            className="w-full bg-black/40 border border-gray-800 p-3 rounded text-white outline-none focus:border-red-500 transition-colors"
          >
            {DIVISOES.map((div, i) => (
              <option key={i} value={div.keys.join(',')}>{div.label}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-4 pt-4">
          <button onClick={onCancel} className="flex-1 bg-gray-800 hover:bg-gray-700 py-3 rounded font-bold uppercase text-xs transition-colors text-white cursor-pointer">Cancelar</button>
          <button onClick={handleSubmit} className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded font-bold uppercase text-xs transition-colors text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] cursor-pointer">Salvar Ficha</button>
        </div>
      </div>
    </div>
  );
}