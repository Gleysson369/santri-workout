import { useState, useRef, useEffect } from 'react';
import { MinhasFichasList } from './MinhasFichasList';
import { CriarFichaForm } from './CriarFichaForm';
import { ImportExportFichas } from './ImportExportFichas';
import { EdicaoTreino } from './EdicaoTreino';
import { ExecucaoTreino } from './ExecucaoTreino';

// Adicionamos a prop onBackHome que será enviada pelo componente pai
export function FichasManager({ onBackHome }) {
  const [abaAtiva, setAbaAtiva] = useState('fichas');
  const [view, setView] = useState('list');
  
  const [fichas, setFichas] = useState([
    {
      id: 1,
      nome: "Hiper Foco",
      divisao: ['A', 'B', 'C'],
      nomesDivisao: { A: "Peito e Tríceps", B: "Costas e Bíceps", C: "Pernas" },
      treinos: { A: [], B: [], C: [] }
    }
  ]);

  const [fichaSelecionada, setFichaSelecionada] = useState(null);
  const [fichaEmEdicao, setFichaEmEdicao] = useState(null);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [novoEx, setNovoEx] = useState({ tipo: 'Superior', nome: '', series: 4, reps: '10', descanso: 60, carga: '10kg' });
  const [execucao, setExecucao] = useState({ iniciado: false, tempoAtual: 0, timerAtivo: false });
  
  const timerRef = useRef(null);

  // Lógica do Cronômetro Global
  useEffect(() => {
    if (execucao.timerAtivo) {
      timerRef.current = setInterval(() => {
        setExecucao(prev => ({ ...prev, tempoAtual: prev.tempoAtual + 1 }));
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [execucao.timerAtivo]);

  // --- FUNÇÃO DE MÉTRICAS PARA OS CARDS ---
  const getMetrics = (exercicios) => {
    if (!exercicios || exercicios.length === 0) return { total: 0, descanso: 0, qtd: 0 };
    
    const TEMPO_MEDIO_SERIE = 45; 
    let totalSegundos = 0;
    let totalDescansoSegundos = 0;

    exercicios.forEach(ex => {
      const s = parseInt(ex.series) || 0;
      const d = parseInt(ex.descanso) || 0;
      const tempoExecucao = s * TEMPO_MEDIO_SERIE;
      const tempoDescanso = s > 0 ? (s - 1) * d : 0;
      totalSegundos += (tempoExecucao + tempoDescanso);
      totalDescansoSegundos += tempoDescanso;
    });

    return {
      total: Math.ceil(totalSegundos / 60),
      descanso: Math.ceil(totalDescansoSegundos / 60),
      qtd: exercicios.length
    };
  };

  const finalizarTreino = () => {
    setExecucao(prev => ({ ...prev, timerAtivo: false }));
    const mins = Math.floor(execucao.tempoAtual / 60);
    const segs = execucao.tempoAtual % 60;
    alert(`Treino finalizado!\nTempo total: ${mins}m ${segs}s`);
    setView('details');
  };

  const handleNomeTreinoCustom = (dia, valor) => {
    const novasFichas = fichas.map(f => {
      if (f.id === fichaSelecionada.id) {
        return { ...f, nomesDivisao: { ...f.nomesDivisao, [dia]: valor } };
      }
      return f;
    });
    setFichas(novasFichas);
    setFichaSelecionada(novasFichas.find(f => f.id === fichaSelecionada.id));
  };

  const adicionarExercicio = () => {
    if (!novoEx.nome) return alert("Selecione um exercício!");
    const exCompleto = { ...novoEx, id: Date.now() };
    const novasFichas = fichas.map(f => {
      if (f.id === fichaSelecionada.id) {
        return {
          ...f,
          treinos: { ...f.treinos, [diaSelecionado]: [...(f.treinos[diaSelecionado] || []), exCompleto] }
        };
      }
      return f;
    });
    setFichas(novasFichas);
    setFichaSelecionada(novasFichas.find(f => f.id === fichaSelecionada.id));
    setNovoEx({ ...novoEx, nome: '' }); 
  };

  const salvarFicha = ({ nome, divisao }) => {
    if (fichaEmEdicao) {
      const atualizada = { ...fichaEmEdicao, nome, divisao };
      setFichas(fichas.map(f => f.id === fichaEmEdicao.id ? atualizada : f));
    } else {
      const nova = {
        id: Date.now(),
        nome,
        divisao,
        nomesDivisao: {},
        treinos: divisao.reduce((acc, key) => ({ ...acc, [key]: [] }), {})
      };
      setFichas([nova, ...fichas]);
    }
    setView('list');
  };

  const abrirDia = (dia, modo = 'edit') => {
    setDiaSelecionado(dia);
    if (modo === 'edit') setView('edit_day');
    if (modo === 'execute') {
      setExecucao({ iniciado: true, timerAtivo: true, tempoAtual: 0 });
      setView('execute');
    }
  };

  return (
    <div className="animate-fadeIn pb-10">
      {/* HEADER DINÂMICO */}
      {view !== 'execute' && (
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold italic text-white uppercase tracking-tighter">
              Minhas <span className="text-red-500 drop-shadow-[0_0_8px_#ff0000]">Fichas</span>
            </h2>
            <div className="h-1 w-20 bg-red-600 mt-2 shadow-[0_0_10px_#ff0000]"></div>
          </div>
          
          {/* AJUSTADO: Agora usa onBackHome em vez de reload */}
          <button 
            onClick={onBackHome} 
            className="text-gray-500 hover:text-red-500 transition-colors text-[10px] font-black uppercase tracking-widest flex items-center gap-2 cursor-pointer group"
          >
            <i className="fas fa-arrow-left bg-white/5 p-2 rounded-lg group-hover:bg-red-500/10"></i> 
            Voltar ao Início
          </button>
        </header>
      )}

      {/* NAVEGAÇÃO POR ABAS */}
      {view !== 'execute' && (
        <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
          <button onClick={() => { setAbaAtiva('fichas'); setView('list'); }} className={`text-sm font-bold uppercase cursor-pointer pb-2 ${abaAtiva === 'fichas' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500 hover:text-white'}`}>Fichas</button>
          <button onClick={() => setAbaAtiva('importar')} className={`text-sm font-bold uppercase cursor-pointer pb-2 ${abaAtiva === 'importar' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500 hover:text-white'}`}>Backup</button>
        </div>
      )}

      {abaAtiva === 'fichas' && (
        <div className="mt-4">
          {/* TELA 1: LISTAGEM DE FICHAS */}
          {view === 'list' && (
            <MinhasFichasList 
              fichas={fichas} 
              onOpenFicha={(f) => { setFichaSelecionada(f); setView('details'); }} 
              onDeleteFicha={(id) => setFichas(fichas.filter(f => f.id !== id))}
              onEditFicha={(f) => { setFichaEmEdicao(f); setView('create'); }}
              onCreateNew={() => { setFichaEmEdicao(null); setView('create'); }}
              onBack={onBackHome} // Passa para o botão dentro da lista também
            />
          )}

          {/* TELA 2: FORMULÁRIO DE CRIAÇÃO */}
          {view === 'create' && (
            <div className="animate-fadeIn">
              <button onClick={() => setView('list')} className="text-gray-500 mb-6 flex items-center gap-2 hover:text-white uppercase text-xs font-bold cursor-pointer">
                <i className="fas fa-arrow-left"></i> Cancelar e Voltar
              </button>
              <CriarFichaForm onSave={salvarFicha} onCancel={() => setView('list')} initialData={fichaEmEdicao} />
            </div>
          )}

          {/* TELA 3: DETALHES */}
          {view === 'details' && (
            <div className="animate-fadeIn">
              <button onClick={() => setView('list')} className="text-gray-500 mb-6 flex items-center gap-2 hover:text-white uppercase text-xs font-bold cursor-pointer">
                <i className="fas fa-arrow-left"></i> Voltar para Lista
              </button>

              <div className="mb-8 border-l-4 border-red-600 pl-4">
                <h3 className="text-2xl font-black text-white uppercase italic leading-none">
                   Treinos da ficha: <span className="text-red-500">{fichaSelecionada?.nome}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {fichaSelecionada?.divisao.map(dia => {
                  const metrics = getMetrics(fichaSelecionada.treinos[dia]);
                  return (
                    <div key={dia} className="bg-[#14191e]/80 border border-white/10 p-6 rounded-2xl text-center group hover:border-red-500/30 transition-all">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-2xl font-black text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                        {dia}
                      </div>
                      
                      <input 
                        type="text"
                        placeholder="Nome do treino"
                        value={fichaSelecionada.nomesDivisao?.[dia] || ''}
                        onChange={(e) => handleNomeTreinoCustom(dia, e.target.value)}
                        className="w-full bg-black/20 border border-white/5 rounded p-2 text-[10px] text-center text-gray-400 uppercase font-bold mb-4 focus:border-red-500 outline-none"
                      />

                      <div className="grid grid-cols-2 gap-2 mb-4 p-2 bg-black/40 rounded-xl border border-white/5">
                        <div className="text-center">
                          <p className="text-[8px] text-gray-500 uppercase font-black">Tempo Est.</p>
                          <p className="text-xs font-mono text-white">{metrics.total} min</p>
                        </div>
                        <div className="text-center border-l border-white/5">
                          <p className="text-[8px] text-gray-500 uppercase font-black">Descanso</p>
                          <p className="text-xs font-mono text-red-500">{metrics.descanso} min</p>
                        </div>
                        <div className="text-center border-t border-white/5 pt-1">
                          <p className="text-[8px] text-gray-500 uppercase font-black">Séries</p>
                          <p className="text-[10px] font-mono text-gray-400">45s/méd</p>
                        </div>
                        <div className="text-center border-t border-l border-white/5 pt-1">
                          <p className="text-[8px] text-gray-500 uppercase font-black">Exercícios</p>
                          <p className="text-xs font-mono text-white">{metrics.qtd}</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button onClick={() => abrirDia(dia, 'edit')} className="bg-gray-800 hover:bg-gray-700 py-2 rounded text-[10px] font-bold uppercase text-white cursor-pointer transition-colors">Editar Treino</button>
                        <button onClick={() => abrirDia(dia, 'execute')} className="bg-green-600 hover:bg-green-700 py-2 rounded text-[10px] font-bold uppercase text-white cursor-pointer transition-colors">Iniciar Treino</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TELA 4: EDIÇÃO DE EXERCÍCIOS */}
          {view === 'edit_day' && (
            <EdicaoTreino 
              nomeFicha={fichaSelecionada?.nome} 
              dia={diaSelecionado} 
              nomePersonalizado={fichaSelecionada.nomesDivisao?.[diaSelecionado]}
              exercicios={fichaSelecionada?.treinos[diaSelecionado]} 
              onBack={() => setView('details')} 
              onAddExercicio={adicionarExercicio} 
              novoEx={novoEx} 
              setNovoEx={setNovoEx} 
            />
          )}

          {/* TELA 5: EXECUÇÃO DO TREINO */}
          {view === 'execute' && (
            <ExecucaoTreino 
              nomeFicha={fichaSelecionada?.nome} 
              dia={diaSelecionado} 
              nomePersonalizado={fichaSelecionada?.nomesDivisao?.[diaSelecionado]}
              exercicios={fichaSelecionada?.treinos?.[diaSelecionado] || []}
              tempo={execucao.tempoAtual} 
              onFinish={finalizarTreino} 
            />
          )}
        </div>
      )}

      {/* ABA DE BACKUP */}
      {abaAtiva === 'importar' && (
        <div className="animate-fadeIn">
          <button onClick={() => setAbaAtiva('fichas')} className="text-gray-500 mb-6 flex items-center gap-2 hover:text-white uppercase text-xs font-bold cursor-pointer">
            <i className="fas fa-arrow-left"></i> Voltar para Fichas
          </button>
          <ImportExportFichas />
        </div>
      )}
    </div>
  );
}