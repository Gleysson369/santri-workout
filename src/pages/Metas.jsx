import { useState, useEffect } from 'react';
import { useToast } from '../components/ToastContext';

export function Metas() {
  const [abaAtiva, setAbaAtiva] = useState('mensal');
  const { addToast } = useToast();

  // Estado inicial com estrutura para todas as categorias e períodos
  const [metas, setMetas] = useState({
    semanal: {
      esporte: { distancia: '', tempo: '', treinos: '', vitorias: '' },
      musculacao: { frequencia: '', volume: '', pr: '' },
      dieta: { kcal: '', carbo: '', prot: '', gord: '', agua: '', peso: '' }
    },
    mensal: {
      esporte: { distancia: '', tempo: '', treinos: '', vitorias: '' },
      musculacao: { frequencia: '', volume: '', pr: '' },
      dieta: { kcal: '', carbo: '', prot: '', gord: '', agua: '', peso: '' }
    },
    anual: {
      esporte: { distancia: '', tempo: '', treinos: '', vitorias: '' },
      musculacao: { frequencia: '', volume: '', pr: '' },
      dieta: { kcal: '', carbo: '', prot: '', gord: '', agua: '', peso: '' }
    }
  });

  // Carregar dados salvos
  useEffect(() => {
    const saved = localStorage.getItem('santri_metas_db');
    if (saved) {
      try {
        setMetas(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar metas", e);
      }
    }
  }, []);

  const handleChange = (categoria, campo, valor) => {
    setMetas(prev => ({
      ...prev,
      [abaAtiva]: {
        ...prev[abaAtiva],
        [categoria]: {
          ...prev[abaAtiva][categoria],
          [campo]: valor
        }
      }
    }));
  };

  const salvarMetas = () => {
    localStorage.setItem('santri_metas_db', JSON.stringify(metas));
    addToast(`Metas ${abaAtiva}s atualizadas e sincronizadas!`, 'success');
  };

  // Helper para acessar os dados atuais de forma limpa
  const dadosAtuais = metas[abaAtiva];

  return (
    <div className="animate-fadeIn p-4 lg:p-8 pb-10">
      <header className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold italic text-[var(--text-main)] uppercase tracking-tighter">
          Performance <span className="text-[var(--color-primary)] drop-shadow-[0_0_8px_var(--color-primary)]">Metas</span>
        </h2>
        <div className="h-1 w-20 bg-[var(--color-primary)] mt-2 shadow-[0_0_10px_var(--color-primary)]"></div>
      </header>

      {/* SELETOR DE PERÍODO (ABAS) */}
      <div className="flex gap-4 mb-8 bg-[var(--bg-main)]/20 p-1 rounded-xl border border-[var(--border-color)] w-fit">
        {['semanal', 'mensal', 'anual'].map((periodo) => (
          <button
            key={periodo}
            onClick={() => setAbaAtiva(periodo)}
            className={`px-8 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
              abaAtiva === periodo 
              ? 'bg-[var(--color-primary)] text-white shadow-[0_0_15px_var(--shadow-color)]' 
              : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
            }`}
          >
            {periodo}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* COLUNA 1: ESPORTES E MUSCULAÇÃO */}
        <div className="space-y-8">
          {/* METAS ESPORTES */}
          <MetaSection title="Esportes (Geral)" icon="fa-trophy" color="text-orange-500">
            <MetaInput 
              label="Distância Alvo" unit="km" placeholder="Ex: 50" 
              value={dadosAtuais.esporte.distancia} 
              onChange={(v) => handleChange('esporte', 'distancia', v)} 
            />
            <MetaInput 
              label="Tempo em Atividade" unit="horas" placeholder="Ex: 5" 
              value={dadosAtuais.esporte.tempo} 
              onChange={(v) => handleChange('esporte', 'tempo', v)} 
            />
            <MetaInput 
              label="Qtd. Treinos" unit="sessões" placeholder="Ex: 4" 
              value={dadosAtuais.esporte.treinos} 
              onChange={(v) => handleChange('esporte', 'treinos', v)} 
            />
            <MetaInput 
              label="Vitórias (Competitivo)" unit="vitórias" placeholder="Ex: 2" 
              value={dadosAtuais.esporte.vitorias} 
              onChange={(v) => handleChange('esporte', 'vitorias', v)} 
            />
          </MetaSection>

          {/* METAS MUSCULAÇÃO */}
          <MetaSection title="Musculação & Força" icon="fa-dumbbell" color="text-[var(--color-primary)]">
            <MetaInput 
              label="Frequência de Treino" unit="dias" placeholder="Ex: 5" 
              value={dadosAtuais.musculacao.frequencia} 
              onChange={(v) => handleChange('musculacao', 'frequencia', v)} 
            />
            <MetaInput 
              label="Volume de Carga Total" unit="kg" placeholder="Ex: 50000" 
              value={dadosAtuais.musculacao.volume} 
              onChange={(v) => handleChange('musculacao', 'volume', v)} 
            />
            <MetaInput 
              label="Novos Recordes (PRs)" unit="qtd" placeholder="Ex: 1" 
              value={dadosAtuais.musculacao.pr} 
              onChange={(v) => handleChange('musculacao', 'pr', v)} 
            />
          </MetaSection>
        </div>

        {/* COLUNA 2: DIETA E SAÚDE */}
        <div className="space-y-8">
          {/* METAS DIETA */}
          <MetaSection title="Dieta & Nutrição" icon="fa-utensils" color="text-emerald-400">
            <MetaInput 
              label="Meta Calórica (Média)" unit="kcal" placeholder="Ex: 2500" 
              value={dadosAtuais.dieta.kcal} 
              onChange={(v) => handleChange('dieta', 'kcal', v)} 
            />
            <div className="grid grid-cols-3 gap-2">
              <MetaInput 
                label="Carboidratos" unit="g" placeholder="250" 
                value={dadosAtuais.dieta.carbo} 
                onChange={(v) => handleChange('dieta', 'carbo', v)} 
              />
              <MetaInput 
                label="Proteínas" unit="g" placeholder="180" 
                value={dadosAtuais.dieta.prot} 
                onChange={(v) => handleChange('dieta', 'prot', v)} 
              />
              <MetaInput 
                label="Gorduras" unit="g" placeholder="70" 
                value={dadosAtuais.dieta.gord} 
                onChange={(v) => handleChange('dieta', 'gord', v)} 
              />
            </div>
            <MetaInput 
              label="Consumo de Água" unit="ml" placeholder="Ex: 3000" 
              value={dadosAtuais.dieta.agua} 
              onChange={(v) => handleChange('dieta', 'agua', v)} 
            />
          </MetaSection>

          {/* METAS FÍSICAS */}
          <MetaSection title="Composição Corporal" icon="fa-weight" color="text-cyan-400">
            <MetaInput 
              label="Peso Alvo" unit="kg" placeholder="Ex: 80.5" 
              value={dadosAtuais.dieta.peso} 
              onChange={(v) => handleChange('dieta', 'peso', v)} 
            />
          </MetaSection>
        </div>

      </div>
      
      {/* BOTÃO SALVAR */}
      <div className="mt-10 flex justify-end">
        <button 
          onClick={salvarMetas}
          className="bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-color)] font-black px-10 py-4 rounded-full uppercase italic hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-xl cursor-pointer"
        >
          Salvar Metas {abaAtiva}s
        </button>
      </div>
    </div>
  );
}

// Sub-componentes para manter o código limpo
function MetaSection({ title, icon, color, children }) {
  return (
    <div className="bg-[var(--bg-card)]/60 backdrop-blur-xl rounded-2xl border border-[var(--border-color)] p-6 shadow-2xl overflow-hidden relative group">
      <div className={`absolute top-0 left-0 w-1 h-full bg-current ${color}`}></div>
      <h3 className={`text-xl font-black italic uppercase tracking-tighter mb-6 flex items-center gap-3 ${color}`}>
        <i className={`fas ${icon}`}></i> {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );
}

function MetaInput({ label, unit, placeholder, value, onChange }) {
  return (
    <div className="bg-[var(--bg-main)]/30 p-3 rounded-lg border border-[var(--border-color)] hover:border-[var(--color-primary)]/30 transition-colors w-full">
      <label className="text-[10px] text-[var(--text-muted)] uppercase font-bold block mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input 
          type="text" 
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent text-[var(--text-main)] font-bold italic w-full outline-none focus:text-[var(--color-primary)] transition-colors"
        />
        <span className="text-[9px] text-[var(--text-muted)] font-black uppercase italic">{unit}</span>
      </div>
    </div>
  );
}