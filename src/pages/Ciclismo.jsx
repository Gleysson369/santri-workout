import { RankItem, StatItem } from '../components/TrainingComponents';

export function Ciclismo() {
  return (
    <div className="animate-fadeIn">
      <header className="mb-8">
        <h2 className="text-3xl font-bold italic text-white uppercase tracking-tighter">
          Dashboard <span className="text-red-500 drop-shadow-[0_0_8px_#ff0000]">Ciclismo</span>
        </h2>
        <div className="h-1 w-20 bg-red-600 mt-2 shadow-[0_0_10px_#ff0000]"></div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10">
        <aside className="space-y-8">
          {/* FORMULÁRIO DE CICLISMO COMPLETO */}
          <div className="bg-[#14191e]/60 backdrop-blur-xl p-6 rounded-2xl border border-red-500/10 shadow-2xl">
            <h3 className="text-red-500 font-bold mb-6 uppercase tracking-widest text-sm italic border-b border-red-500/10 pb-2">Registrar Pedal</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Data</label>
                  <input type="date" className="w-full bg-black/40 border border-gray-800 p-2 rounded text-white text-sm focus:border-red-500 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Distância KM</label>
                  <input type="number" step="0.1" placeholder="0.0" className="w-full bg-black/40 border border-gray-800 p-2 rounded text-white text-sm focus:border-red-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Tempo</label>
                  <input type="time" className="w-full bg-black/40 border border-gray-800 p-2 rounded text-white text-sm focus:border-red-500 outline-none" />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Foto do Pedal</label>
                  <input type="file" className="w-full text-[10px] text-gray-500 file:bg-red-600 file:text-white file:rounded file:border-0 file:px-2 file:py-1 cursor-pointer" />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-gray-500 uppercase font-bold mb-1 block">Observação</label>
                <textarea rows="2" placeholder="Como foi o trajeto?" className="w-full bg-black/40 border border-gray-800 p-2 rounded text-white text-sm focus:border-red-500 outline-none resize-none"></textarea>
              </div>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all uppercase tracking-tighter italic text-sm">
                Postar Pedal
              </button>
            </div>
          </div>

          {/* RANKING DE CICLISMO */}
          <div className="bg-[#14191e]/60 backdrop-blur-xl p-6 rounded-2xl border border-red-500/10 shadow-2xl">
            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-sm italic flex items-center">
              <i className="fas fa-bicycle text-yellow-500 mr-2"></i> Ranking <span className="ml-2 text-red-500">Pedal</span>
            </h3>
            <div className="space-y-4">
              <RankItem pos="1" name="Fabio Rosa" km="450.2" isTop unit="KM" />
              <RankItem pos="2" name="Ricardo Souza" km="380.5" unit="KM" />
            </div>
          </div>
        </aside>

        {/* FEED DE ATIVIDADES DE CICLISMO */}
        <section className="space-y-6">
          <h3 className="text-xl font-light italic text-white uppercase tracking-widest border-b border-gray-800 pb-2">
            <i className="fas fa-stream text-red-500 mr-3"></i>Últimos Pedais
          </h3>

          <article className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold shadow-[0_0_10px_#ff0000]">F</div>
                <div>
                  <h4 className="font-bold text-white uppercase italic leading-none">Fabio Rosa</h4>
                  <small className="text-red-500 text-[10px] uppercase font-bold tracking-widest">
                    <i className="far fa-calendar-alt mr-1"></i> 21/01/2026
                  </small>
                </div>
              </div>
              <span className="bg-red-600/20 text-red-500 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-tighter">Ciclismo</span>
            </div>

            {/* IMAGEM DO PEDAL NO FEED */}
            <div className="w-full h-80 rounded-xl overflow-hidden mb-4 border border-white/5 bg-black/40">
               <img src="https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800" alt="Treino" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/5 mb-4">
              <StatItem label="Distância" value="25.40" unit="KM" highlight />
              <StatItem label="Tempo" value="01:10:00" unit="" />
              <StatItem label="Velocidade" value="21.8" unit="KM/H" />
            </div>

            {/* OBSERVAÇÃO NO FEED */}
            <div className="text-gray-400 text-sm italic border-l-2 border-red-600 pl-4 py-2 bg-white/5 rounded-r">
              "Treino focado em resistência! Me senti muito bem e o clima ajudou bastante hoje."
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}