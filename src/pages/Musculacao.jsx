import { RankItem, StatItem } from '../components/TrainingComponents';

export function Musculacao() {
  return (
    <div className="animate-fadeIn">
      <header className="mb-8">
        <h2 className="text-3xl font-bold italic text-white uppercase tracking-tighter">
          Dashboard <span className="text-red-500 drop-shadow-[0_0_8px_#ff0000]">Musculação & Força</span>
        </h2>
        <div className="h-1 w-20 bg-red-600 mt-2 shadow-[0_0_10px_#ff0000]"></div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-10">
        <aside className="space-y-8">
          {/* FORMULÁRIO COMPLETO */}
          <div className="bg-[#14191e]/60 backdrop-blur-xl p-6 rounded-2xl border border-red-500/10 shadow-2xl">
            <h3 className="text-red-500 font-bold mb-6 uppercase tracking-widest text-sm italic border-b border-red-500/10 pb-2">Novo Registro de Força</h3>
            
            <div className="space-y-4">
              {/* Linha 1: Data e Tempo */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Data</label>
                  <input type="date" className="w-full bg-black/40 border border-gray-800 p-2 rounded text-white text-xs focus:border-red-500 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Duração</label>
                  <input type="time" className="w-full bg-black/40 border border-gray-800 p-2 rounded text-white text-xs focus:border-red-500 outline-none" />
                </div>
              </div>

              {/* Modalidade */}
              <div>
                <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Modalidade</label>
                <select className="w-full bg-black/40 border border-gray-800 p-2 rounded text-white text-xs focus:border-red-500 outline-none">
                  <option className="bg-gray-900">Musculação</option>
                  <option className="bg-gray-900">CrossFit</option>
                  <option className="bg-gray-900">Calistenia</option>
                  <option className="bg-gray-900">Treinamento Funcional</option>
                  <option className="bg-gray-900">HIIT</option>
                  <option className="bg-gray-900">Powerlifting</option>
                  <option className="bg-gray-900">Levantamento Olímpico (LPO)</option>
                  <option className="bg-gray-900">Pilates</option>
                  <option className="bg-gray-900">Bodybuilding</option>
                </select>
              </div>

              {/* Divisão de Treino */}
              <div>
                <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Divisão/Grupamento</label>
                <select className="w-full bg-black/40 border border-gray-800 p-2 rounded text-white text-xs focus:border-red-500 outline-none">
                  <optgroup label="Superiores" className="bg-gray-900 text-red-500">
                    <option value="sup_completo">Superiores (Peito, Costas, Ombros, Braços, Core)</option>
                  </optgroup>
                  <optgroup label="Inferiores" className="bg-gray-900 text-red-500">
                    <option value="inf_completo">Inferiores (Quadríceps, Posterior, Glúteos, Panturrilhas, Core)</option>
                  </optgroup>
                  <optgroup label="Outros" className="bg-gray-900 text-red-500">
                    <option value="full_body">Corpo Inteiro (Full Body)</option>
                    <option value="hybrid">Mais de um tipo (Híbrido)</option>
                  </optgroup>
                </select>
              </div>

              {/* Imagem */}
              <div>
                <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Foto do Shape/Treino</label>
                <input type="file" className="w-full text-[10px] text-gray-500 file:bg-red-600 file:text-white file:rounded file:border-0 file:px-2 file:py-1 cursor-pointer" />
              </div>

              {/* Observação */}
              <div>
                <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Observações / Relato</label>
                <textarea rows="3" placeholder="Ex: Supino 40kg cada lado, foco em progressão..." className="w-full bg-black/40 border border-gray-800 p-2 rounded text-white text-xs focus:border-red-500 outline-none resize-none"></textarea>
              </div>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all uppercase tracking-tighter italic text-sm">
                Registrar Treino
              </button>
            </div>
          </div>

          {/* Ranking Musculação */}
          <div className="bg-[#14191e]/60 backdrop-blur-xl p-6 rounded-2xl border border-red-500/10 shadow-2xl">
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-sm italic flex items-center">
              <i className="fas fa-dumbbell text-yellow-500 mr-2"></i> Frequência <span className="ml-2 text-red-500">Treinos</span>
            </h3>
            <div className="space-y-4">
              <RankItem pos="1" name="Nilvam Junio" km="22" isTop unit="TREINOS" />
              <RankItem pos="2" name="Gleysson Flavio" km="18" unit="TREINOS" />
            </div>
          </div>
        </aside>

        {/* FEED DE MUSCULAÇÃO */}
        <section className="space-y-6">
          <h3 className="text-xl font-light italic text-white uppercase tracking-widest border-b border-gray-800 pb-2">Atividade Recente</h3>

          <article className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all group max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold shadow-[0_0_10px_#ff0000]">N</div>
                <div>
                  <h4 className="font-bold text-white uppercase italic leading-none">Nilvam Junio</h4>
                  <small className="text-red-500 text-[10px] uppercase font-bold tracking-widest"><i className="far fa-calendar-alt mr-1"></i> 21/01/2026</small>
                </div>
              </div>
              <div className="text-right">
                <span className="bg-red-600/20 text-red-500 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-tighter">Bodybuilding</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Foto do Treino (Vertical) */}
              <div className="w-full md:w-56 h-80 rounded-xl overflow-hidden border border-white/5 bg-black/40 shrink-0">
                <img src="https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?w=400" alt="Treino" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Detalhes do Treino */}
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                      <span className="text-gray-500 text-[10px] uppercase font-bold block mb-1">Duração</span>
                      <span className="text-white font-black italic text-lg">01:15:00</span>
                   </div>
                   <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                      <span className="text-gray-500 text-[10px] uppercase font-bold block mb-1">Grupamento</span>
                      <span className="text-red-500 font-black italic text-sm uppercase">Superiores</span>
                   </div>
                </div>

                <div className="bg-black/40 p-4 rounded-lg border border-red-500/20">
                   <span className="text-gray-500 text-[10px] uppercase font-bold block mb-2 underline decoration-red-500/50">Relato do Atleta</span>
                   <p className="text-gray-300 text-sm italic leading-relaxed">
                     "Foco total em Peito e Tríceps. Supino reto com 100kg totais, 4 séries de 8-10 reps. Pump absurdo!"
                   </p>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}