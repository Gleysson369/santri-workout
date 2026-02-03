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
      <div className="mb-6 border-l-4 border-[var(--color-primary)] pl-4">
        <h3 className="text-xl font-black text-[var(--text-main)] uppercase italic">Editando: {nomeFicha}</h3>
        <p className="text-[var(--color-primary)] font-bold text-xs uppercase tracking-widest">Treino {dia} {nomePersonalizado ? ` - ${nomePersonalizado}` : ''}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        <div>
          <button onClick={onBack} className="text-[var(--text-muted)] mb-6 flex items-center gap-2 hover:text-[var(--text-main)] cursor-pointer text-xs font-bold uppercase transition-colors">
            <i className="fas fa-arrow-left"></i> Voltar
          </button>
          
          <div className="space-y-3">
            {exercicios?.length === 0 && <p className="text-[var(--text-muted)] italic text-center py-10">Nenhum exercício ainda...</p>}
            {exercicios?.map((ex, idx) => (
              <div key={ex.id} className="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-color)] flex justify-between items-center group hover:border-[var(--color-primary)]/20 transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-[var(--text-muted)] font-black text-xl">{idx + 1}</span>
                  <div>
                    <h4 className="text-[var(--text-main)] font-bold uppercase text-sm">{ex.nome}</h4>
                    {/* ADICIONADO DESCANSO NA EXIBIÇÃO */}
                    <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase">
                        {ex.series} Séries • {ex.reps} Reps • <span className="text-[var(--color-primary)]">{ex.carga}</span> • Descanso: {ex.descanso}s
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FORMULÁRIO LATERAL */}
        <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--color-primary)]/20 h-fit lg:sticky lg:top-4">
          <h3 className="text-[var(--color-primary)] font-black uppercase text-xs mb-4 border-b border-[var(--border-color)] pb-2 italic">Adicionar Exercício</h3>
          <div className="space-y-3">
            <select value={novoEx.tipo} onChange={e => setNovoEx({...novoEx, tipo: e.target.value, nome: ''})} className="w-full bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-2 rounded text-[var(--text-main)] text-xs outline-none focus:border-[var(--color-primary)]">
              {Object.keys(EXERCICIOS_DB).map(k => <option key={k} value={k} className="bg-[var(--bg-card)]">{k}</option>)}
            </select>
            <select value={novoEx.nome} onChange={e => setNovoEx({...novoEx, nome: e.target.value})} className="w-full bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-2 rounded text-[var(--text-main)] text-xs outline-none focus:border-[var(--color-primary)]">
              <option value="" className="bg-[var(--bg-card)]">Selecione o movimento...</option>
              {EXERCICIOS_DB[novoEx.tipo].map(ex => <option key={ex} value={ex} className="bg-[var(--bg-card)]">{ex}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input type="text" placeholder="Séries" value={novoEx.series} onChange={e => setNovoEx({...novoEx, series: e.target.value})} className="bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-2 rounded text-[var(--text-main)] text-xs outline-none focus:border-[var(--color-primary)]" />
              <input type="text" placeholder="Carga" value={novoEx.carga} onChange={e => setNovoEx({...novoEx, carga: e.target.value})} className="bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-2 rounded text-[var(--text-main)] text-xs outline-none focus:border-[var(--color-primary)]" />
            </div>
            {/* NOVO CAMPO DE DESCANSO ADICIONADO ABAIXO */}
            <div className="flex flex-col gap-1">
                <label className="text-[9px] text-[var(--text-muted)] uppercase font-bold ml-1">Descanso (segundos)</label>
                <input 
                    type="number" 
                    placeholder="Ex: 60" 
                    value={novoEx.descanso} 
                    onChange={e => setNovoEx({...novoEx, descanso: e.target.value})} 
                    className="bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-2 rounded text-[var(--text-main)] text-xs outline-none focus:border-[var(--color-primary)]" 
                />
            </div>

            <button onClick={onAddExercicio} className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] py-3 rounded text-xs font-bold uppercase text-white transition-all cursor-pointer shadow-lg shadow-[var(--shadow-color)]">Adicionar</button>
          </div>
        </div>
      </div>
    </div>
  );
}