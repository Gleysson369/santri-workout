import { Link } from 'react-router-dom';
import { RankItem, StatItem } from '../components/TrainingComponents';

export function Musculacao() {
  return (
    <div className="animate-fadeIn p-4 lg:p-8">
      <header className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold italic text-[var(--text-main)] uppercase tracking-tighter">
          Treino de<span className="text-[var(--color-primary)] drop-shadow-[0_0_8px_var(--color-primary)]"> Musculação</span>
        </h2>
        <div className="h-1 w-20 bg-[var(--color-primary)] mt-2 shadow-[0_0_10px_var(--color-primary)]"></div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-10">
        <aside className="space-y-8">
          {/* FORMULÁRIO COMPLETO */}
          <div className="bg-[var(--bg-card)]/60 backdrop-blur-xl p-6 rounded-2xl border border-[var(--color-primary)]/10 shadow-2xl">
            <h3 className="text-[var(--color-primary)] font-bold mb-6 uppercase tracking-widest text-sm italic border-b border-[var(--color-primary)]/10 pb-2">Novo Registro de Força</h3>
            
            <div className="space-y-4">
              <Link to="/MinhasFichas" className="w-full block text-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-black py-3 rounded shadow-[0_0_15px_var(--shadow-color)] transition-all uppercase tracking-tighter italic text-sm">
                Minhas Fichas
              </Link>
            </div>
          </div>

          {/* Ranking Musculação */}
          <div className="bg-[var(--bg-card)]/60 backdrop-blur-xl p-6 rounded-2xl border border-[var(--color-primary)]/10 shadow-2xl">
            <h3 className="text-[var(--text-main)] font-bold mb-6 uppercase tracking-widest text-sm italic flex items-center">
              <i className="fas fa-dumbbell text-yellow-500 mr-2"></i> Frequência <span className="ml-2 text-[var(--color-primary)]">Treinos</span>
            </h3>
            <div className="space-y-4">
              <RankItem pos="1" name="Nilvam Junio" km="22" isTop unit="TREINOS" />
              <RankItem pos="2" name="Gleysson Flavio" km="18" unit="TREINOS" />
            </div>
          </div>
        </aside>

        {/* FEED DE MUSCULAÇÃO */}
        <section className="space-y-6">
          <h3 className="text-lg md:text-xl font-light italic text-[var(--text-main)] uppercase tracking-widest border-b border-[var(--border-color)] pb-2">Atividade Recente</h3>

          <article className="bg-[var(--bg-card)]/5 backdrop-blur-sm p-6 rounded-2xl border border-[var(--border-color)] hover:border-[var(--color-primary)]/30 transition-all group max-w-3xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold shadow-[0_0_10px_var(--color-primary)]">N</div>
                <div>
                  <h4 className="font-bold text-[var(--text-main)] uppercase italic leading-none">Nilvam Junio</h4>
                  <small className="text-[var(--color-primary)] text-[10px] uppercase font-bold tracking-widest"><i className="far fa-calendar-alt mr-1"></i> 21/01/2026</small>
                </div>
              </div>
              <div className="text-right">
                <span className="bg-[var(--color-primary)]/20 text-[var(--color-primary)] text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-tighter">Bodybuilding</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Foto do Treino (Vertical) */}
              <div className="w-full md:w-56 h-80 rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-main)]/40 shrink-0 relative group">
                <img src="https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?w=400" alt="Treino" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                
                {/* Botão Editar Foto */}
                <button className="absolute top-3 right-3 bg-[var(--bg-main)]/60 hover:bg-[var(--color-primary)] text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-lg backdrop-blur-sm border border-[var(--border-color)]">
                  <i className="fas fa-camera text-xs"></i>
                </button>
              </div>

              {/* Detalhes do Treino */}
              <div className="flex-1 space-y-4">
                
                {/* Novas Métricas Detalhadas */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                   <div className="bg-[var(--bg-main)]/40 p-2 rounded-lg border border-[var(--border-color)] text-center">
                      <span className="text-[var(--text-muted)] text-[9px] uppercase font-bold block mb-1">Tempo Total</span>
                      <span className="text-[var(--text-main)] font-black italic text-sm">01:15:00</span>
                   </div>
                   <div className="bg-[var(--bg-main)]/40 p-2 rounded-lg border border-[var(--border-color)] text-center">
                      <span className="text-[var(--text-muted)] text-[9px] uppercase font-bold block mb-1">Descanso</span>
                      <span className="text-[var(--color-primary)] font-black italic text-sm">25:00</span>
                   </div>
                   <div className="bg-[var(--bg-main)]/40 p-2 rounded-lg border border-[var(--border-color)] text-center">
                      <span className="text-[var(--text-muted)] text-[9px] uppercase font-bold block mb-1">Tempo/Série</span>
                      <span className="text-[var(--text-main)] font-black italic text-sm">45s</span>
                   </div>
                   <div className="bg-[var(--bg-main)]/40 p-2 rounded-lg border border-[var(--border-color)] text-center">
                      <span className="text-[var(--text-muted)] text-[9px] uppercase font-bold block mb-1">Tempo/Exer</span>
                      <span className="text-[var(--text-main)] font-black italic text-sm">12:00</span>
                   </div>
                </div>

                <div className="bg-[var(--bg-main)]/40 p-3 rounded-lg border border-[var(--border-color)] flex justify-between items-center">
                   <span className="text-[var(--text-muted)] text-[10px] uppercase font-bold">Grupamento</span>
                   <span className="text-[var(--color-primary)] font-black italic text-sm uppercase">Superiores</span>
                </div>

                <div className="bg-[var(--bg-main)]/40 p-4 rounded-lg border border-[var(--color-primary)]/20 relative group">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-[var(--text-muted)] text-[10px] uppercase font-bold block underline decoration-[var(--color-primary)]/50">Relato do Atleta</span>
                     <button className="text-[var(--text-muted)] hover:text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-all cursor-pointer" title="Editar Relato">
                       <i className="fas fa-pen text-xs"></i>
                     </button>
                   </div>
                   <p className="text-[var(--text-main)] text-sm italic leading-relaxed opacity-80">
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