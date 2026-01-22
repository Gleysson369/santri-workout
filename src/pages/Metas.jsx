import { useState } from 'react';

export function Metas() {
  const [abaAtiva, setAbaAtiva] = useState('mensal');

  return (
    <div className="animate-fadeIn pb-10">
      <header className="mb-8">
        <h2 className="text-3xl font-bold italic text-white uppercase tracking-tighter">
          Performance <span className="text-red-500 drop-shadow-[0_0_8px_#ff0000]">Metas</span>
        </h2>
        <div className="h-1 w-20 bg-red-600 mt-2 shadow-[0_0_10px_#ff0000]"></div>
      </header>

      {/* SELETOR DE PERÍODO (ABAS) */}
      <div className="flex gap-4 mb-8 bg-black/20 p-1 rounded-xl border border-white/5 w-fit">
        {['semanal', 'mensal', 'anual'].map((periodo) => (
          <button
            key={periodo}
            onClick={() => setAbaAtiva(periodo)}
            className={`px-8 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
              abaAtiva === periodo 
              ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]' 
              : 'text-gray-500 hover:text-white'
            }`}
          >
            {periodo}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* COLUNA 1: CORRIDA E CICLISMO */}
        <div className="space-y-8">
          {/* METAS CORRIDA */}
          <MetaSection title="Corrida" icon="fa-running" color="text-orange-500">
            <MetaInput label="Ritmo Alvo (Pace)" unit="min/km" placeholder="4:30" />
            <MetaInput label="Velocidade Média" unit="km/h" placeholder="12.5" />
            <MetaInput label="Freq. Cardíaca Alvo" unit="bpm" placeholder="155" />
            <MetaInput label="Cadência Média" unit="spm" placeholder="180" />
            <MetaInput label="Ganho de Elevação" unit="m" placeholder="500" />
            <MetaInput label="Tempo em Zona 2" unit="min" placeholder="120" />
          </MetaSection>

          {/* METAS CICLISMO */}
          <MetaSection title="Ciclismo" icon="fa-bicycle" color="text-cyan-400">
            <MetaInput label="Potência Média (NP)" unit="watts" placeholder="250" />
            <MetaInput label="Ganho de Elevação" unit="m" placeholder="1200" />
            <MetaInput label="Vel. Média Sustentada" unit="km/h" placeholder="30.0" />
            <MetaInput label="Zonas de Esforço" unit="h/semana" placeholder="10" />
          </MetaSection>
        </div>

        {/* COLUNA 2: MUSCULAÇÃO E GERAIS */}
        <div className="space-y-8">
          {/* METAS MUSCULAÇÃO */}
          <MetaSection title="Musculação" icon="fa-dumbbell" color="text-red-500">
            <MetaInput label="Volume Total (S x R x C)" unit="kg" placeholder="50000" />
            <MetaInput label="Repetições Máximas (RM)" unit="kg" placeholder="120" />
            <MetaInput label="Tempo Sob Tensão (TUT)" unit="seg" placeholder="45" />
            <MetaInput label="Frequência por Músculo" unit="x/semana" placeholder="2" />
          </MetaSection>

          {/* METAS FÍSICAS GERAIS */}
          <MetaSection title="Físico & Saúde" icon="fa-heartbeat" color="text-emerald-400">
            <MetaInput label="Regularidade" unit="dias/mês" placeholder="22" />
            <MetaInput label="Qualidade Recuperação" unit="%" placeholder="90" />
            <MetaInput label="Gordura Corporal" unit="%" placeholder="12" />
            <MetaInput label="Peso Alvo" unit="kg" placeholder="85" />
          </MetaSection>
        </div>

      </div>
      
      {/* BOTÃO SALVAR FIXO NO RODAPÉ DA PÁGINA */}
      <div className="mt-10 flex justify-end">
        <button className="bg-white text-black font-black px-10 py-4 rounded-full uppercase italic hover:bg-red-600 hover:text-white transition-all shadow-xl">
          Salvar Metas {abaAtiva}s
        </button>
      </div>
    </div>
  );
}

// Sub-componentes para manter o código limpo
function MetaSection({ title, icon, color, children }) {
  return (
    <div className="bg-[#14191e]/60 backdrop-blur-xl rounded-2xl border border-white/5 p-6 shadow-2xl overflow-hidden relative group">
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

function MetaInput({ label, unit, placeholder }) {
  return (
    <div className="bg-black/30 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
      <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input 
          type="text" 
          placeholder={placeholder}
          className="bg-transparent text-white font-bold italic w-full outline-none focus:text-red-500 transition-colors"
        />
        <span className="text-[9px] text-gray-600 font-black uppercase italic">{unit}</span>
      </div>
    </div>
  );
}