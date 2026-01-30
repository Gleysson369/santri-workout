export const EXERCICIOS_DB = {
  Superior: [
    // Peito
    'Supino Reto',
    'Supino Inclinado',
    'Supino Declinado',
    'Crucifixo Reto',
    'Crucifixo Inclinado',
    'Crossover',
    'Flexão de Braço',

    // Ombros
    'Desenvolvimento com Barra',
    'Desenvolvimento com Halteres',
    'Elevação Lateral',
    'Elevação Frontal',
    'Arnold Press',
    'Remada Alta',

    // Tríceps
    'Tríceps Pulley',
    'Tríceps Testa',
    'Tríceps Francês',
    'Mergulho em Paralelas',
    'Tríceps Coice',

    // Bíceps
    'Rosca Direta',
    'Rosca Alternada',
    'Rosca Concentrada',
    'Rosca Scott',
    'Rosca Martelo'
  ],

  Inferior: [
    // Quadríceps
    'Agachamento Livre',
    'Agachamento Frontal',
    'Agachamento Hack',
    'Leg Press 45',
    'Cadeira Extensora',
    'Avanço',
    'Afundo',

    // Glúteos
    'Elevação Pélvica',
    'Glúteo no Cabo',
    'Agachamento Sumô',
    'Passada',

    // Panturrilhas
    'Panturrilha em Pé',
    'Panturrilha Sentado',
    'Panturrilha no Leg Press'
  ],

  Posterior: [
    // Posterior de Coxa
    'Mesa Flexora',
    'Flexora em Pé',
    'Stiff',
    'Levantamento Terra Romeno',

    // Costas
    'Puxada Alta',
    'Puxada Frente',
    'Barra Fixa',
    'Remada Curvada',
    'Remada Unilateral',
    'Remada Cavalinho',
    'Pulldown',

    // Lombar e estabilização
    'Levantamento Terra',
    'Hiperextensão Lombar',
    'Good Morning',
    'Face Pull'
  ],

  Core: ['Abdominal Reto', 'Abdominal Infra', 'Prancha', 'Elevação de Pernas', 'Abdominal Oblíquo']

};

export function EdicaoTreino({ nomeFicha, dia, nomePersonalizado, exercicios, onBack, onAddExercicio, novoEx, setNovoEx }) {
  return (
    <div className="animate-fadeIn">
      {/* CABEÇALHO DE CONTEXTO */}
      <div className="mb-6 border-l-4 border-red-600 pl-4">
        <h3 className="text-xl font-black text-white uppercase italic">Editando: {nomeFicha}</h3>
        <p className="text-red-500 font-bold text-xs uppercase tracking-widest">Treino {dia} {nomePersonalizado ? ` - ${nomePersonalizado}` : ''}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        <div>
          <button onClick={onBack} className="text-gray-500 mb-6 flex items-center gap-2 hover:text-white cursor-pointer text-xs font-bold uppercase transition-colors">
            <i className="fas fa-arrow-left"></i> Voltar
          </button>
          
          <div className="space-y-3">
            {exercicios?.length === 0 && <p className="text-gray-600 italic text-center py-10">Nenhum exercício ainda...</p>}
            {exercicios?.map((ex, idx) => (
              <div key={ex.id} className="bg-[#14191e] p-4 rounded-xl border border-white/5 flex justify-between items-center group hover:border-red-500/20 transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-black text-xl">{idx + 1}</span>
                  <div>
                    <h4 className="text-white font-bold uppercase text-sm">{ex.nome}</h4>
                    {/* ADICIONADO DESCANSO NA EXIBIÇÃO */}
                    <p className="text-[10px] text-gray-500 font-bold uppercase">
                        {ex.series} Séries • {ex.reps} Reps • <span className="text-red-500">{ex.carga}</span> • Descanso: {ex.descanso}s
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FORMULÁRIO LATERAL */}
        <div className="bg-[#14191e] p-6 rounded-2xl border border-red-500/20 h-fit sticky top-4">
          <h3 className="text-red-500 font-black uppercase text-xs mb-4 border-b border-white/5 pb-2 italic">Adicionar Exercício</h3>
          <div className="space-y-3">
            <select value={novoEx.tipo} onChange={e => setNovoEx({...novoEx, tipo: e.target.value, nome: ''})} className="w-full bg-black/40 border border-gray-800 p-2 rounded text-white text-xs outline-none focus:border-red-500">
              {Object.keys(EXERCICIOS_DB).map(k => <option key={k} value={k}>{k}</option>)}
            </select>
            <select value={novoEx.nome} onChange={e => setNovoEx({...novoEx, nome: e.target.value})} className="w-full bg-black/40 border border-gray-800 p-2 rounded text-white text-xs outline-none focus:border-red-500">
              <option value="">Selecione o movimento...</option>
              {EXERCICIOS_DB[novoEx.tipo].map(ex => <option key={ex} value={ex}>{ex}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="Séries" value={novoEx.series} onChange={e => setNovoEx({...novoEx, series: e.target.value})} className="bg-black/40 border border-gray-800 p-2 rounded text-white text-xs outline-none focus:border-red-500" />
              <input type="text" placeholder="Carga" value={novoEx.carga} onChange={e => setNovoEx({...novoEx, carga: e.target.value})} className="bg-black/40 border border-gray-800 p-2 rounded text-white text-xs outline-none focus:border-red-500" />
            </div>
            {/* NOVO CAMPO DE DESCANSO ADICIONADO ABAIXO */}
            <div className="flex flex-col gap-1">
                <label className="text-[9px] text-gray-500 uppercase font-bold ml-1">Descanso (segundos)</label>
                <input 
                    type="number" 
                    placeholder="Ex: 60" 
                    value={novoEx.descanso} 
                    onChange={e => setNovoEx({...novoEx, descanso: e.target.value})} 
                    className="bg-black/40 border border-gray-800 p-2 rounded text-white text-xs outline-none focus:border-red-500" 
                />
            </div>

            <button onClick={onAddExercicio} className="w-full bg-red-600 hover:bg-red-700 py-3 rounded text-xs font-bold uppercase text-white transition-all cursor-pointer shadow-lg shadow-red-900/20">Adicionar</button>
          </div>
        </div>
      </div>
    </div>
  );
}