import { useState, useEffect } from 'react';
import { useToast } from '../ToastContext';

export function ExecucaoTreino({ nomeFicha, dia, nomePersonalizado, tempo, exercicios, onFinish }) {
  const [indexAtivo, setIndexAtivo] = useState(0);
  const [serieAtual, setSerieAtual] = useState(1);
  const [descansoRestante, setDescansoRestante] = useState(0);
  const [isDescansando, setIsDescansando] = useState(false);
  const { addToast } = useToast();

  const exAtual = exercicios.length > 0 ? exercicios[indexAtivo] : null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let timer;
    if (isDescansando && descansoRestante > 0) {
      timer = setInterval(() => setDescansoRestante(prev => prev - 1), 1000);
    } else if (descansoRestante === 0 && isDescansando) {
      setIsDescansando(false);
    }
    return () => clearInterval(timer);
  }, [isDescansando, descansoRestante]);

  const handleConcluirSerie = () => {
    const tempoDescanso = parseInt(exAtual?.descanso) || 60;
    
    if (serieAtual < parseInt(exAtual?.series)) {
      setSerieAtual(prev => prev + 1);
      setDescansoRestante(tempoDescanso);
      setIsDescansando(true);
    } 
    else if (indexAtivo < exercicios.length - 1) {
      setIndexAtivo(prev => prev + 1);
      setSerieAtual(1);
      setDescansoRestante(tempoDescanso);
      setIsDescansando(true);
    } 
    else {
      addToast("🔥 Treino concluído! Agora é só finalizar a sessão.", 'success');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[var(--bg-card)] min-h-screen lg:min-h-fit rounded-3xl border border-[var(--border-color)] shadow-2xl animate-fadeIn">
      
      {/* 🔙 BOTÃO VOLTAR / SAIR DISCRETO */}
      <button 
        onClick={onFinish} 
        className="mb-4 text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest cursor-pointer group"
      >
        <i className="fas fa-times bg-[var(--bg-main)]/5 p-2 rounded-lg group-hover:bg-[var(--color-primary)]/10"></i>
        Abandonar Sessão
      </button>

      {/* 🔝 HEADER DA TELA */}
      <div className="flex justify-between items-center mb-8 bg-[var(--bg-main)]/30 p-5 rounded-2xl border border-[var(--border-color)]">
        <div className="text-left">
          <p className="text-[var(--color-primary)] text-[10px] font-black uppercase tracking-widest">Sessão Ativa</p>
          <h3 className="text-xl font-black text-[var(--text-main)] uppercase italic leading-tight">{nomeFicha}</h3>
          <p className="text-[var(--text-muted)] text-[10px] uppercase font-bold">
            Treino {dia} {nomePersonalizado && `• ${nomePersonalizado}`}
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-mono text-[var(--text-main)] leading-none">{formatTime(tempo)}</h2>
          <p className="text-[9px] text-[var(--text-muted)] uppercase font-black">Tempo Total</p>
        </div>
      </div>

      {/* 🧠 ÁREA CENTRAL – EXERCÍCIO ATIVO / DESCANSO */}
      {exAtual ? (
        <div className="space-y-6">
          <div className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 p-10 rounded-[2rem] relative overflow-hidden text-center">
            <i className="fas fa-dumbbell absolute -right-6 -bottom-6 text-[var(--text-muted)]/5 text-9xl -rotate-12 pointer-events-none"></i>

            {isDescansando ? (
              <div className="relative z-10 animate-fadeIn">
                <p className="text-[var(--color-primary)] font-black uppercase text-xs mb-2 tracking-widest">Descanso</p>
                <h2 className="text-5xl md:text-7xl font-mono text-[var(--text-main)] tracking-tighter">{descansoRestante}s</h2>
                <button 
                  onClick={() => setIsDescansando(false)}
                  className="mt-6 text-[10px] text-[var(--text-muted)] uppercase font-bold hover:text-[var(--text-main)] transition-colors cursor-pointer"
                >
                  Pular Descanso
                </button>
              </div>
            ) : (
              <div className="relative z-10">
                <span className="bg-[var(--color-primary)] text-white text-[10px] font-black px-4 py-1 rounded-full mb-4 inline-block uppercase tracking-tighter">
                  Exercício {indexAtivo + 1} de {exercicios.length}
                </span>
                <h4 className="text-2xl md:text-4xl font-black text-[var(--text-main)] uppercase italic mb-4 leading-none">{exAtual.nome}</h4>
                
                <div className="flex justify-center items-center gap-3 text-[var(--text-muted)] font-bold uppercase text-xs">
                  <span>{exAtual.series} Séries</span>
                  <span className="text-[var(--color-primary)] text-lg">•</span>
                  <span>{exAtual.reps} Reps</span>
                  <span className="text-[var(--color-primary)] text-lg">•</span>
                  <span className="text-[var(--text-main)] bg-[var(--bg-main)]/5 px-2 py-1 rounded">{exAtual.carga}</span>
                </div>
              </div>
            )}
          </div>

          {!isDescansando && (
            <button 
              onClick={handleConcluirSerie}
              className="w-full bg-[var(--text-main)] text-[var(--bg-main)] py-5 rounded-2xl font-black uppercase italic text-lg hover:bg-[var(--color-primary)] hover:text-white transition-all cursor-pointer shadow-lg active:scale-95 transform"
            >
              Concluir Série {serieAtual} de {exAtual.series}
            </button>
          )}
        </div>
      ) : (
        <div className="py-20 text-center">
            <p className="text-[var(--text-muted)] text-xs uppercase font-black italic">Nenhum exercício na ficha</p>
        </div>
      )}

      {/* 📋 FILA DE EXERCÍCIOS */}
      <div className="mt-10 pt-6 border-t border-[var(--border-color)]">
        <h5 className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-widest mb-4 text-left">Fila de Exercícios</h5>
        <div className="space-y-2">
          {exercicios?.map((ex, idx) => {
            const isAtivo = idx === indexAtivo;
            const isConcluido = idx < indexAtivo;
            
            return (
              <div 
                key={idx} 
                className={`flex justify-between items-center p-4 rounded-xl border transition-all ${
                  isAtivo 
                    ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/50 scale-[1.02]' 
                    : isConcluido 
                      ? 'opacity-30 border-transparent bg-transparent' 
                      : 'bg-[var(--bg-main)]/20 border-[var(--border-color)]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`font-mono text-sm ${isAtivo ? 'text-[var(--color-primary)]' : 'text-[var(--text-muted)]'}`}>
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-tight ${isAtivo ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}>
                    {ex.nome}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-[var(--text-muted)] uppercase">{ex.series} Sets</span>
                  {isConcluido && <i className="fas fa-check-circle text-[var(--color-primary)] text-xs"></i>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🟥 BOTÃO FINAL – FINALIZAR SESSÃO */}
      <button 
        onClick={onFinish} 
        className="w-full mt-10 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-4 rounded-xl uppercase font-black italic transition-all cursor-pointer shadow-xl shadow-[var(--shadow-color)] border border-[var(--color-primary)]/20"
      >
        Finalizar Sessão
      </button>
    </div>
  );
}