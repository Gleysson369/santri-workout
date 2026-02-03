import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MinhasFichasList } from './MinhasFichasList';
import { CriarFichaForm } from './CriarFichaForm';
import { ImportExportFichas } from './ImportExportFichas';
import { EdicaoTreino } from './EdicaoTreino';
import { ExecucaoTreino } from './ExecucaoTreino';
import { useToast } from '../ToastContext';

export function FichasManager({ onBackHome }) {
  const navigate = useNavigate();
  const { addToast } = useToast();
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [fichaToDelete, setFichaToDelete] = useState(null);
  const [novoEx, setNovoEx] = useState({ tipo: 'Superior', nome: '', series: 4, reps: '10', descanso: 60, carga: '10kg' });
  const [execucao, setExecucao] = useState({ iniciado: false, tempoAtual: 0, timerAtivo: false });
  
  const timerRef = useRef(null);

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

  const getMetrics = (exercicios) => {
    if (!exercicios || exercicios.length === 0) return { total: 0, descanso: 0, qtd: 0 };
    const TEMPO_MEDIO_SERIE = 45; 
    let totalSegundos = 0;
    let totalDescansoSegundos = 0;
    exercicios.forEach(ex => {
      const s = parseInt(ex.series) || 0;
      const d = parseInt(ex.descanso) || 0;
      totalSegundos += (s * TEMPO_MEDIO_SERIE) + (s > 0 ? (s - 1) * d : 0);
      totalDescansoSegundos += s > 0 ? (s - 1) * d : 0;
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
    addToast(`Treino finalizado! Tempo total: ${mins}m ${segs}s`, 'success');
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
    if (!novoEx.nome) return addToast("Selecione um exercício!", 'error');
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
    addToast("Exercício adicionado!", 'success');
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
    addToast(fichaEmEdicao ? "Ficha atualizada!" : "Ficha criada com sucesso!", 'success');
  };

  const handleDeleteFicha = (id) => {
    setFichaToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (fichaToDelete) {
      setFichas(prev => prev.filter(f => f.id !== fichaToDelete));
      addToast("Ficha deletada com sucesso!", "success");
    }
    setShowDeleteConfirm(false);
    setFichaToDelete(null);
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
      {view !== 'execute' && (
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold italic text-[var(--text-main)] uppercase tracking-tighter">
              Minhas <span className="text-[var(--color-primary)] drop-shadow-[0_0_8px_var(--color-primary)]">Fichas</span>
            </h2>
            <div className="h-1 w-20 bg-[var(--color-primary)] mt-2 shadow-[0_0_10px_var(--color-primary)]"></div>
          </div>
          <button 
            onClick={() => onBackHome ? onBackHome() : navigate('/')} 
            className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors text-[10px] font-black uppercase tracking-widest flex items-center gap-2 cursor-pointer group"
          >
            <i className="fas fa-arrow-left bg-[var(--bg-main)]/5 p-2 rounded-lg group-hover:bg-[var(--color-primary)]/10"></i> 
            Voltar ao Início
          </button>
        </header>
      )}

      {view !== 'execute' && (
        <div className="flex gap-4 mb-6 border-b border-[var(--border-color)] pb-4">
          <button onClick={() => { setAbaAtiva('fichas'); setView('list'); }} className={`text-sm font-bold uppercase cursor-pointer pb-2 ${abaAtiva === 'fichas' ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}>Fichas</button>
          <button onClick={() => setAbaAtiva('importar')} className={`text-sm font-bold uppercase cursor-pointer pb-2 ${abaAtiva === 'importar' ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}>Backup</button>
        </div>
      )}

      {abaAtiva === 'fichas' && (
        <div className="mt-4">
          {view === 'list' && (
            <MinhasFichasList 
              fichas={fichas} 
              onOpenFicha={(f) => { setFichaSelecionada(f); setView('details'); }} 
              onDeleteFicha={handleDeleteFicha}
              onEditFicha={(f) => { setFichaEmEdicao(f); setView('create'); }}
              onCreateNew={() => { setFichaEmEdicao(null); setView('create'); }}
            />
          )}

          {view === 'create' && (
            <div className="animate-fadeIn">
              <button onClick={() => setView('list')} className="text-[var(--text-muted)] mb-6 flex items-center gap-2 hover:text-[var(--text-main)] uppercase text-xs font-bold cursor-pointer">
                <i className="fas fa-arrow-left"></i> Cancelar e Voltar
              </button>
              <CriarFichaForm onSave={salvarFicha} onCancel={() => setView('list')} initialData={fichaEmEdicao} />
            </div>
          )}

          {view === 'details' && (
            <div className="animate-fadeIn">
              <button onClick={() => setView('list')} className="text-[var(--text-muted)] mb-6 flex items-center gap-2 hover:text-[var(--text-main)] uppercase text-xs font-bold cursor-pointer">
                <i className="fas fa-arrow-left"></i> Voltar para Lista
              </button>

              <div className="mb-8 border-l-4 border-[var(--color-primary)] pl-4">
                <h3 className="text-2xl font-black text-[var(--text-main)] uppercase italic leading-none">
                   Treinos da ficha: <span className="text-[var(--color-primary)]">{fichaSelecionada?.nome}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {fichaSelecionada?.divisao.map(dia => {
                  const metrics = getMetrics(fichaSelecionada.treinos[dia]);
                  return (
                    <div key={dia} className="bg-[var(--bg-card)]/80 border border-[var(--border-color)] p-6 rounded-2xl text-center group hover:border-[var(--color-primary)]/30 transition-all">
                      <div className="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-2xl font-black text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                        {dia}
                      </div>
                      <input 
                        type="text"
                        placeholder="Nome do treino"
                        value={fichaSelecionada.nomesDivisao?.[dia] || ''}
                        onChange={(e) => handleNomeTreinoCustom(dia, e.target.value)}
                        className="w-full bg-[var(--bg-main)]/20 border border-[var(--border-color)] rounded p-2 text-[10px] text-center text-[var(--text-muted)] uppercase font-bold mb-4 focus:border-[var(--color-primary)] outline-none"
                      />
                      <div className="grid grid-cols-2 gap-2 mb-4 p-2 bg-[var(--bg-main)]/40 rounded-xl border border-[var(--border-color)]">
                        <div className="text-center">
                          <p className="text-[8px] text-[var(--text-muted)] uppercase font-black">Tempo Est.</p>
                          <p className="text-xs font-mono text-[var(--text-main)]">{metrics.total} min</p>
                        </div>
                        <div className="text-center border-l border-[var(--border-color)]">
                          <p className="text-[8px] text-[var(--text-muted)] uppercase font-black">Descanso</p>
                          <p className="text-xs font-mono text-[var(--color-primary)]">{metrics.descanso} min</p>
                        </div>
                        <div className="text-center border-t border-[var(--border-color)] pt-1">
                          <p className="text-[8px] text-[var(--text-muted)] uppercase font-black">Séries</p>
                          <p className="text-[10px] font-mono text-[var(--text-muted)]">45s/méd</p>
                        </div>
                        <div className="text-center border-t border-l border-[var(--border-color)] pt-1">
                          <p className="text-[8px] text-[var(--text-muted)] uppercase font-black">Exercícios</p>
                          <p className="text-xs font-mono text-[var(--text-main)]">{metrics.qtd}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button onClick={() => abrirDia(dia, 'edit')} className="bg-[var(--bg-main)] hover:bg-[var(--bg-card-hover)] py-2 rounded text-[10px] font-bold uppercase text-[var(--text-main)] cursor-pointer transition-colors">Editar Treino</button>
                        <button onClick={() => abrirDia(dia, 'execute')} className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] py-2 rounded text-[10px] font-bold uppercase text-white cursor-pointer transition-colors shadow-lg shadow-[var(--shadow-color)]">Iniciar Treino</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {view === 'edit_day' && (
            <EdicaoTreino 
              nomeFicha={fichaSelecionada?.nome} 
              dia={diaSelecionado} 
              nomePersonalizado={fichaSelecionada?.nomesDivisao?.[diaSelecionado]}
              exercicios={fichaSelecionada?.treinos?.[diaSelecionado]} 
              onBack={() => setView('details')} 
              onAddExercicio={adicionarExercicio} 
              novoEx={novoEx} 
              setNovoEx={setNovoEx} 
            />
          )}

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

      {abaAtiva === 'importar' && (
        <div className="animate-fadeIn">
          <button onClick={() => setAbaAtiva('fichas')} className="text-[var(--text-muted)] mb-6 flex items-center gap-2 hover:text-[var(--text-main)] uppercase text-xs font-bold cursor-pointer">
            <i className="fas fa-arrow-left"></i> Voltar para Fichas
          </button>
          <ImportExportFichas />
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden p-6 text-center">
            <div className="w-16 h-16 bg-[var(--color-secondary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-trash-alt text-2xl text-[var(--color-secondary)]"></i>
            </div>
            <h3 className="text-[var(--text-main)] font-bold text-lg mb-2">Excluir Ficha?</h3>
            <p className="text-[var(--text-muted)] text-sm mb-6">Esta ação não pode ser desfeita.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-3 rounded-xl font-bold uppercase text-xs bg-[var(--bg-main)] text-[var(--text-muted)] cursor-pointer">Cancelar</button>
              <button onClick={confirmDelete} className="flex-1 py-3 rounded-xl font-bold uppercase text-xs bg-[var(--color-secondary)] text-white cursor-pointer">Sim, Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 