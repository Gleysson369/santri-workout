import { useState, useEffect, useRef, useMemo } from 'react';
import { RankItem, StatItem } from '../components/TrainingComponents';
import { LISTA_ESPORTES } from '../components/esportesDados.js';
import { useToast } from '../components/ToastContext';

export function Esportes({ searchTerm }) {
  const { addToast } = useToast();
  const [dataTreino, setDataTreino] = useState(new Date().toISOString().split('T')[0]);
  const [esporteSelecionado, setEsporteSelecionado] = useState('');
  const [tipoEsporte, setTipoEsporte] = useState('distancia');

  // Estados de Performance
  const [distancia, setDistancia] = useState(0);
  const [placarMeu, setPlacarMeu] = useState(0);
  const [placarAdversario, setPlacarAdversario] = useState(0);
  
  const [treinoAtivo, setTreinoAtivo] = useState(false);
  const [tempoSegundos, setTempoSegundos] = useState(0);
  const timerRef = useRef(null);

  // Estado para armazenar o histórico de atividades (Simulando banco de dados)
  const [historico, setHistorico] = useState([
    { id: 101, esporte: 'Corrida', tipo: 'distancia', data: '2026-01-20', tempo: 3600, distancia: 10.5, placar: {}, imagem: null, relato: 'Treino regenerativo, sensação boa.' },
    { id: 102, esporte: 'Tênis', tipo: 'pontos', data: '2026-01-20', tempo: 5400, distancia: 0, placar: { meu: 6, adv: 4 }, imagem: null, relato: '' }
  ]);

  // Filtra atividades pela data selecionada
  const atividadesDoDia = useMemo(() => {
    return historico.filter(h => h.data === dataTreino).reverse();
  }, [historico, dataTreino]);

  // Cálculos para o Ranking/Estatísticas
  const statsGerais = useMemo(() => {
    const dadosFiltrados = esporteSelecionado ? historico.filter(h => h.esporte === esporteSelecionado) : historico;
    
    const diasUnicos = new Set(dadosFiltrados.map(h => h.data)).size;
    const esportesUnicos = new Set(dadosFiltrados.map(h => h.esporte)).size;
    const totalDistancia = dadosFiltrados.reduce((acc, curr) => acc + (curr.distancia || 0), 0);
    const totalVitorias = dadosFiltrados.filter(h => h.tipo === 'pontos' && h.placar.meu > h.placar.adv).length;

    return { diasUnicos, esportesUnicos, totalDistancia, totalVitorias };
  }, [historico, esporteSelecionado]);

  useEffect(() => {
    const esporteEncontrado = LISTA_ESPORTES.find(e => e.nome === esporteSelecionado);
    if (esporteEncontrado) {
      setTipoEsporte(esporteEncontrado.tipo);
    }
  }, [esporteSelecionado]);

  const alternarTreino = () => {
    if (treinoAtivo) {
      clearInterval(timerRef.current);
      setTreinoAtivo(false);
    } else {
      setTreinoAtivo(true);
      timerRef.current = setInterval(() => {
        setTempoSegundos(prev => prev + 1);
        if (tipoEsporte === 'distancia') {
          setDistancia(prev => parseFloat((prev + 0.001).toFixed(3)));
        }
      }, 1000);
    }
  };

  const formatarTempo = (totalSegundos) => {
    const hrs = Math.floor(totalSegundos / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSegundos % 3600) / 60).toString().padStart(2, '0');
    const segs = (totalSegundos % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${segs}`;
  };

  // Funções para edição do Card
  const atualizarAtividade = (id, campo, valor) => {
    setHistorico(prev => prev.map(item => 
      item.id === id ? { ...item, [campo]: valor } : item
    ));
  };

  const handleImageUpdate = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => atualizarAtividade(id, 'imagem', reader.result);
      reader.readAsDataURL(file);
    }
  };

  const editarRelato = (id, textoAtual) => {
    const novoTexto = prompt("Editar Relato do Atleta:", textoAtual || "");
    if (novoTexto !== null) {
      atualizarAtividade(id, 'relato', novoTexto);
    }
  };

  const finalizarAtividade = () => {
    if (!esporteSelecionado) return addToast("Selecione um esporte!", 'error');
    
    // Para o timer se estiver rodando
    if (treinoAtivo) {
      clearInterval(timerRef.current);
      setTreinoAtivo(false);
    }

    const novaAtividade = {
      id: Date.now(),
      esporte: esporteSelecionado,
      tipo: tipoEsporte,
      data: dataTreino,
      tempo: tempoSegundos,
      distancia: distancia,
      placar: { meu: placarMeu, adv: placarAdversario },
      imagem: null,
      relato: ''
    };

    setHistorico([novaAtividade, ...historico]);
    
    // Resetar campos para novo registro
    setTempoSegundos(0); setDistancia(0); setPlacarMeu(0); setPlacarAdversario(0);
    addToast("Atividade registrada com sucesso!", 'success');
  };

  return (
    <div className="animate-fadeIn p-4 lg:p-8">
      <header className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold italic text-[var(--text-main)] uppercase tracking-tighter">
          Atividades <span className="text-[var(--color-primary)] drop-shadow-[0_0_8px_var(--color-primary)]">Esportivas</span>
        </h2>
        <div className="h-1 w-20 bg-[var(--color-primary)] mt-2"></div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-10">
        <aside className="space-y-8">
          <div className="bg-[var(--bg-card)]/80 backdrop-blur-xl p-6 rounded-2xl border border-[var(--color-primary)]/20 shadow-2xl">
            <h3 className="text-[var(--color-primary)] font-bold mb-6 uppercase tracking-widest text-xs italic border-b border-[var(--color-primary)]/10 pb-2">Novo Registro</h3>
            
            <div className="space-y-5">
              <div>
                <label className="text-[10px] text-[var(--text-muted)] uppercase font-bold mb-1 block">Esporte</label>
                <input 
                  list="esportes-list"
                  value={esporteSelecionado}
                  onChange={(e) => setEsporteSelecionado(e.target.value)}
                  className="w-full bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-2 rounded text-[var(--text-main)] text-sm focus:border-[var(--color-primary)] outline-none"
                  placeholder="Selecione o esporte..."
                />
                <datalist id="esportes-list">
                  {LISTA_ESPORTES.map(esp => <option key={esp.nome} value={esp.nome} />)}
                </datalist>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {tipoEsporte === 'pontos' ? (
                  <>
                    <div className="animate-in slide-in-from-left-2">
                      <label className="text-[10px] text-green-500 uppercase font-bold mb-1 block">Meu Placar</label>
                      <input type="number" value={placarMeu} onChange={(e) => setPlacarMeu(parseInt(e.target.value) || 0)} className="w-full bg-green-500/10 border border-green-500/30 p-2 rounded text-[var(--text-main)] text-center font-bold outline-none" />
                    </div>
                    <div className="animate-in slide-in-from-right-2">
                      <label className="text-[10px] text-[var(--color-secondary)] uppercase font-bold mb-1 block">Adversário</label>
                      <input type="number" value={placarAdversario} onChange={(e) => setPlacarAdversario(parseInt(e.target.value) || 0)} className="w-full bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/30 p-2 rounded text-[var(--text-main)] text-center font-bold outline-none" />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-[10px] text-[var(--text-muted)] uppercase font-bold mb-1 block">Data</label>
                      <input type="date" value={dataTreino} onChange={(e) => setDataTreino(e.target.value)} className="w-full bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-2 rounded text-[var(--text-main)] text-[12px] outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] text-[var(--text-muted)] uppercase font-bold mb-1 block">KM Ajustável</label>
                      <input type="number" step="0.1" value={distancia} onChange={(e) => setDistancia(parseFloat(e.target.value) || 0)} className="w-full bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-2 rounded text-[var(--color-primary)] font-bold text-sm outline-none" />
                    </div>
                  </>
                )}
              </div>

              <div className="bg-[var(--bg-main)]/60 p-4 rounded-xl border border-[var(--border-color)] text-center shadow-inner">
                <div className="text-2xl md:text-3xl font-mono text-[var(--text-main)] mb-4 tracking-[0.2em]">{formatarTempo(tempoSegundos)}</div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={alternarTreino} className={`py-3 rounded-lg font-black uppercase text-xs transition-all ${treinoAtivo ? 'bg-yellow-500 text-black' : 'bg-green-600 text-[var(--text-main)]'}`}>
                    {treinoAtivo ? 'Pausar' : 'Iniciar'}
                  </button>
                  <button onClick={finalizarAtividade} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-lg font-black uppercase text-xs transition-all shadow-[0_0_15px_var(--shadow-color)]">
                    Finalizar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--bg-card)]/60 p-6 rounded-2xl border border-[var(--border-color)]">
            <h3 className="text-[var(--text-main)] font-bold mb-6 uppercase text-[10px] italic flex items-center justify-between">
              <span>Ranking {esporteSelecionado || "Geral"}</span>
              <span className="text-[9px] bg-[var(--color-primary)] px-2 py-0.5 rounded text-white tracking-tighter">
                {tipoEsporte === 'pontos' ? 'VITÓRIAS' : 'DISTÂNCIA'}
              </span>
            </h3>
            
            {/* ESTATÍSTICAS DINÂMICAS */}
            <div className="grid grid-cols-3 gap-2 mb-6 text-center bg-[var(--bg-main)]/40 p-3 rounded-xl border border-[var(--border-color)]">
              <div><p className="text-[9px] text-[var(--text-muted)] font-bold">DIAS</p><p className="text-[var(--text-main)] font-black">{statsGerais.diasUnicos}</p></div>
              <div><p className="text-[9px] text-[var(--text-muted)] font-bold">ESPORTES</p><p className="text-[var(--text-main)] font-black">{statsGerais.esportesUnicos}</p></div>
              <div><p className="text-[9px] text-[var(--text-muted)] font-bold">TOTAL</p><p className="text-[var(--color-primary)] font-black">{tipoEsporte === 'pontos' ? statsGerais.totalVitorias : statsGerais.totalDistancia.toFixed(1)}</p></div>
            </div>

            <div className="space-y-4">
              <RankItem pos="1" name="Fabio Rosa" km={tipoEsporte === 'pontos' ? "12 Vit" : "450.2 KM"} isTop />
              <RankItem pos="2" name="Gleysson Flavio" km={tipoEsporte === 'pontos' ? "08 Vit" : "380.8 KM"} />
              <RankItem pos="3" name="João Castro" km={tipoEsporte === 'pontos' ? "05 Vit" : "210.5 KM"} />
            </div>
          </div>
        </aside>

        <section className="space-y-6">
           <h3 className="text-lg md:text-xl font-light italic text-[var(--text-main)] uppercase tracking-widest border-b border-[var(--border-color)] pb-2">
             Atividades de {dataTreino.split('-').reverse().join('/')}
           </h3>

           {atividadesDoDia.length === 0 ? (
             <div className="text-center py-10 border border-dashed border-[var(--border-color)] rounded-2xl">
               <p className="text-[var(--text-muted)] text-xs uppercase font-bold">Nenhuma atividade registrada nesta data.</p>
             </div>
           ) : (
             atividadesDoDia.filter(a => {
                if (!searchTerm) return true;
                const term = searchTerm.toLowerCase();
                return (
                  a.esporte.toLowerCase().includes(term) ||
                  (a.relato && a.relato.toLowerCase().includes(term))
                );
             }).map((atividade) => (
               <article key={atividade.id} className="bg-gradient-to-br from-[var(--bg-card)]/5 to-transparent p-0 rounded-3xl border border-[var(--border-color)] relative overflow-hidden group hover:border-[var(--color-primary)]/30 transition-all mb-6">
                  {/* HEADER DO CARD NO FEED */}
                  <div className="p-8 pb-4 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-xl font-black shadow-lg text-white">G</div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-black text-[var(--text-main)] italic uppercase leading-none">{atividade.esporte}</h4>
                      <p className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest mt-1">
                        <i className="far fa-calendar-alt mr-1"></i> {atividade.data.split('-').reverse().join('/')}
                      </p>
                    </div>
                  </div>

                  {/* CORPO DO CARD - EXIBE IMAGEM OU ICONE */}
                  <div className="px-8 py-4">
                    {atividade.imagem ? (
                      <div className="w-full h-64 rounded-2xl overflow-hidden border border-[var(--border-color)] mb-6 relative group">
                        <img src={atividade.imagem} alt="Treino" className="w-full h-full object-cover" />
                        <label className="absolute top-3 right-3 bg-[var(--bg-main)]/60 hover:bg-[var(--color-primary)] text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-lg backdrop-blur-sm border border-[var(--border-color)]">
                          <i className="fas fa-camera text-xs"></i>
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpdate(atividade.id, e)} />
                        </label>
                      </div>
                    ) : (
                      <div className="mb-6 flex justify-end relative z-10">
                        <label className="text-[10px] text-[var(--text-muted)] hover:text-[var(--text-main)] flex items-center gap-2 cursor-pointer transition-colors uppercase font-bold bg-[var(--bg-main)]/20 px-3 py-1 rounded-full border border-[var(--border-color)] hover:border-[var(--color-primary)]/50">
                            <i className="fas fa-camera"></i> Adicionar Foto
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpdate(atividade.id, e)} />
                        </label>
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none -z-10">
                            <i className={`fas ${atividade.tipo === 'pontos' ? 'fa-medal' : 'fa-running'} text-9xl text-[var(--text-main)]`}></i>
                        </div>
                      </div>
                    )}

                    {atividade.tipo === 'pontos' ? (
                      <div className="flex items-center justify-center gap-10 py-10 bg-[var(--bg-main)]/20 rounded-2xl border border-[var(--border-color)]">
                        <div className="text-center">
                          <p className="text-[10px] text-[var(--text-muted)] uppercase font-black mb-2">Você</p>
                          <span className="text-5xl md:text-7xl font-black text-[var(--text-main)] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{atividade.placar.meu}</span>
                        </div>
                        <div className="text-3xl text-red-600 font-black italic tracking-tighter">VS</div>
                        <div className="text-center">
                          <p className="text-[10px] text-[var(--text-muted)] uppercase font-black mb-2">Oponente</p>
                          <span className="text-5xl md:text-7xl font-black text-[var(--text-main)]/20">{atividade.placar.adv}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-8 py-6 border-y border-[var(--border-color)]">
                        <StatItem label="Km Total" value={atividade.distancia.toFixed(2)} unit="KM" highlight />
                        <StatItem label="Tempo" value={formatarTempo(atividade.tempo)} unit="" />
                        <StatItem label="Status" value="Finalizado" unit="" />
                      </div>
                    )}

                    {/* RELATO DO ATLETA */}
                    <div className="mt-6 bg-[var(--bg-main)]/20 p-4 rounded-xl border border-[var(--border-color)] relative group hover:border-[var(--color-primary)]/20 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold underline decoration-[var(--color-primary)]/30">Relato do Atleta</span>
                            <button 
                                onClick={() => editarRelato(atividade.id, atividade.relato)}
                                className="text-[var(--text-muted)] hover:text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-all cursor-pointer" 
                                title="Editar Relato"
                            >
                                <i className="fas fa-pen text-xs"></i>
                            </button>
                        </div>
                        <p className="text-[var(--text-main)] text-sm italic leading-relaxed opacity-80">
                            {atividade.relato || <span className="text-[var(--text-muted)] not-italic text-xs">Nenhum relato adicionado...</span>}
                        </p>
                    </div>
                  </div>

                  <div className="px-8 pb-8 mt-2 text-[var(--text-muted)] text-[11px] italic uppercase tracking-widest">
                    <i className="fas fa-info-circle mr-2 text-[var(--color-primary)]"></i>
                    Atividade registrada no Arena Dashboard.
                  </div>
               </article>
             ))
           )}
        </section>
      </div>
    </div>
  );
}