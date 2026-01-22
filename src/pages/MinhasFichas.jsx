import { useState } from 'react';

export function MinhasFichas() {
  const [showForm, setShowForm] = useState(false);
  
  // Lista de todas as fichas que aparecem na tela
  const [fichasSalvas, setFichasSalvas] = useState([
    {
      id: 1,
      nome: "Ficha A - Superiores (Exemplo)",
      data: "21/01/2026",
      exercicios: [
        { nome: "Supino Reto", series: "4", reps: "8-12", carga: "40kg" },
        { nome: "Desenvolvimento", series: "3", reps: "10", carga: "15kg" }
      ]
    }
  ]);

  // Estados do formulário de criação
  const [nomeFicha, setNomeFicha] = useState('');
  const [exerciciosDaFicha, setExerciciosDaFicha] = useState([]); 
  const [tempEx, setTempEx] = useState({ nome: '', series: '', reps: '', carga: '' });

  // 1. Adiciona um exercício à lista temporária (antes de salvar a ficha)
  const incluirExercicioNaLista = () => {
    if (tempEx.nome === '') return;
    setExerciciosDaFicha([...exerciciosDaFicha, tempEx]);
    setTempEx({ nome: '', series: '', reps: '', carga: '' }); // Limpa campos
  };

  // 2. Salva a FICHA COMPLETA na lista principal
  const salvarFichaFinal = () => {
    if (!nomeFicha || exerciciosDaFicha.length === 0) {
      alert("Dê um nome à ficha e adicione pelo menos um exercício!");
      return;
    }

    const novaFicha = {
      id: Date.now(),
      nome: nomeFicha,
      data: new Date().toLocaleDateString('pt-BR'),
      exercicios: exerciciosDaFicha
    };

    setFichasSalvas([novaFicha, ...fichasSalvas]); // Adiciona no topo da lista
    
    // Reseta o formulário
    setNomeFicha('');
    setExerciciosDaFicha([]);
    setShowForm(false);
  };

  const removerExercicioDaLista = (index) => {
    setExerciciosDaFicha(exerciciosDaFicha.filter((_, i) => i !== index));
  };

  return (
    <div className="animate-fadeIn pb-10">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold italic text-white uppercase tracking-tighter">
            Minhas <span className="text-red-500 drop-shadow-[0_0_8px_#ff0000]">Fichas</span>
          </h2>
          <div className="h-1 w-20 bg-red-600 mt-2 shadow-[0_0_10px_#ff0000]"></div>
        </div>
        
        <button onClick={() => setShowForm(!showForm)} className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-2 rounded-lg uppercase italic text-xs transition-all flex items-center gap-2">
          <i className={`fas ${showForm ? 'fa-times' : 'fa-plus'}`}></i>
          {showForm ? 'Cancelar' : 'Nova Ficha'}
        </button>
      </header>

      {/* FORMULÁRIO DE CRIAÇÃO */}
      {showForm && (
        <div className="bg-[#14191e] border border-red-500/20 p-6 rounded-2xl mb-8 shadow-2xl">
          <div className="mb-6">
            <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Nome da Ficha de Treino</label>
            <input 
              type="text" 
              value={nomeFicha}
              onChange={(e) => setNomeFicha(e.target.value)}
              placeholder="Ex: Treino B - Costas e Bíceps" 
              className="w-full bg-black/40 border border-gray-800 p-3 rounded text-white outline-none focus:border-red-500" 
            />
          </div>

          <div className="space-y-4 bg-black/20 p-4 rounded-xl border border-white/5">
            <p className="text-red-500 text-[10px] uppercase font-black tracking-widest">Montar Exercícios</p>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              <input type="text" placeholder="Exercício" value={tempEx.nome} onChange={(e) => setTempEx({...tempEx, nome: e.target.value})} className="md:col-span-2 bg-black/40 border border-gray-800 p-2 rounded text-xs text-white outline-none focus:border-red-500" />
              <input type="text" placeholder="Séries" value={tempEx.series} onChange={(e) => setTempEx({...tempEx, series: e.target.value})} className="bg-black/40 border border-gray-800 p-2 rounded text-xs text-white outline-none focus:border-red-500" />
              <input type="text" placeholder="Reps" value={tempEx.reps} onChange={(e) => setTempEx({...tempEx, reps: e.target.value})} className="bg-black/40 border border-gray-800 p-2 rounded text-xs text-white outline-none focus:border-red-500" />
              <input type="text" placeholder="Carga" value={tempEx.carga} onChange={(e) => setTempEx({...tempEx, carga: e.target.value})} className="bg-black/40 border border-gray-800 p-2 rounded text-xs text-white outline-none focus:border-red-500" />
            </div>
            
            <button onClick={incluirExercicioNaLista} className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 rounded text-[10px] uppercase tracking-widest">
              + Incluir Exercício na Ficha
            </button>

            {/* LISTA PREVIA (TABELA) */}
            {exerciciosDaFicha.length > 0 && (
              <div className="mt-4 border-t border-white/10 pt-4">
                <table className="w-full text-[11px] text-left">
                  <thead className="text-gray-500">
                    <tr>
                      <th>EXERCÍCIO</th>
                      <th>SÉRIES</th>
                      <th>REPS</th>
                      <th>CARGA</th>
                      <th className="text-right">AÇÃO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exerciciosDaFicha.map((ex, i) => (
                      <tr key={i} className="text-white border-b border-white/5">
                        <td className="py-2 uppercase font-bold">{ex.nome}</td>
                        <td className="py-2">{ex.series}</td>
                        <td className="py-2">{ex.reps}</td>
                        <td className="py-2 text-red-500 font-black">{ex.carga}</td>
                        <td className="py-2 text-right">
                          <button onClick={() => removerExercicioDaLista(i)} className="text-red-500"><i className="fas fa-trash"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <button onClick={salvarFichaFinal} className="mt-8 w-full bg-red-600 text-white font-black py-4 rounded uppercase italic hover:bg-red-700 transition-all shadow-lg">
            Finalizar e Salvar Ficha
          </button>
        </div>
      )}

      {/* LISTAGEM DE FICHAS SALVAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fichasSalvas.map(ficha => (
          <div key={ficha.id} className="bg-[#14191e]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-red-500/30 transition-all">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">{ficha.nome}</h3>
                <span className="text-[10px] text-gray-500 font-bold uppercase">{ficha.data}</span>
              </div>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-red-500 uppercase font-black border-b border-white/5">
                  <th className="pb-2">Exercício</th>
                  <th className="pb-2 text-center">Séries</th>
                  <th className="pb-2 text-center">Reps</th>
                  <th className="pb-2 text-right">Carga</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {ficha.exercicios.map((ex, idx) => (
                  <tr key={idx} className="border-b border-white/5 last:border-0">
                    <td className="py-3 text-white font-medium uppercase text-xs">{ex.nome}</td>
                    <td className="py-3 text-center text-gray-400 font-bold">{ex.series}</td>
                    <td className="py-3 text-center text-gray-400 font-bold">{ex.reps}</td>
                    <td className="py-3 text-right text-red-500 font-black italic">{ex.carga}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}