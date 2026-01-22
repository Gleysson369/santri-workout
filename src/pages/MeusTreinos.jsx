import { useState } from 'react';

export function MeusTreinos() {
  const [filtro, setFiltro] = useState('todas');

  // Simulação de dados (Isso viria do seu banco de dados futuramente)
  const treinos = [
    {
      id: 1,
      tipo: 'corrida',
      data: '20/01/2026',
      usuario: 'GLEYSSON FLAVIO GOMES DE SOUZA',
      distancia: '6.73 km',
      tempo: '01:04:00',
      pace: '09:30/km',
      velMedia: '6.31 km/h',
      obs: 'Treino com o filho.',
      icon: 'fas fa-running'
    },
    {
      id: 2,
      tipo: 'musculacao',
      data: '21/01/2026',
      usuario: 'GLEYSSON FLAVIO GOMES DE SOUZA',
      modalidade: 'Bodybuilding',
      divisao: 'Superiores',
      tempo: '01:00:00',
      obs: 'Foco total na progressão de carga.',
      icon: 'fas fa-dumbbell'
    }
  ];

  const treinosFiltrados = filtro === 'todas' 
    ? treinos 
    : treinos.filter(t => t.tipo === filtro);

  return (
    <div className="animate-fadeIn">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3 tracking-tighter uppercase italic">
          <i className="fas fa-clipboard-list text-cyan-400"></i> Meus <span className="text-red-500">Treinos</span>
        </h2>
        <p className="text-gray-400 text-sm mt-2 font-bold uppercase tracking-widest">
          {treinosFiltrados.length} treinos realizados
        </p>
      </header>

      {/* SISTEMA DE ABAS (Baseado na sua imagem) */}
      <div className="flex flex-wrap gap-2 mb-8 p-1 bg-black/20 w-fit rounded-lg border border-white/5">
        <TabButton active={filtro === 'todas'} onClick={() => setFiltro('todas')} label="Todas" />
        <TabButton active={filtro === 'corrida'} onClick={() => setFiltro('corrida')} label="Corrida" icon="fas fa-running" />
        <TabButton active={filtro === 'ciclismo'} onClick={() => setFiltro('ciclismo')} label="Ciclismo" icon="fas fa-bicycle" />
        <TabButton active={filtro === 'musculacao'} onClick={() => setFiltro('musculacao')} label="Musculação" icon="fas fa-dumbbell" />
      </div>

      {/* LISTA DE CARDS */}
      <div className="space-y-4">
        {treinosFiltrados.map((treino) => (
          <article key={treino.id} className="bg-[#14191e]/80 backdrop-blur-md border border-white/5 rounded-xl p-6 relative group hover:border-red-500/30 transition-all">
            <button className="absolute top-6 right-6 text-red-500 border border-red-500/30 px-4 py-1 rounded text-xs uppercase font-bold hover:bg-red-500 hover:text-white transition-colors">
              Excluir
            </button>

            <span className="text-gray-500 text-xs font-bold block mb-2">{treino.data}</span>
            <h4 className="text-white font-black italic uppercase tracking-tighter text-lg mb-4">
              {treino.usuario}
            </h4>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white font-bold italic">
                <i className={`${treino.icon} text-red-500`}></i>
                <span>{treino.distancia || treino.modalidade}</span>
              </div>

              {/* Badges de estatísticas (conforme imagem) */}
              <div className="flex flex-wrap gap-2">
                <StatBadge icon="fas fa-clock" label="Tempo" value={treino.tempo} color="bg-blue-600" />
                {treino.pace && <StatBadge icon="fas fa-bolt" label="Pace" value={treino.pace} color="bg-blue-600" />}
                {treino.velMedia && <StatBadge icon="fas fa-rocket" label="Vel. média" value={treino.velMedia} color="bg-blue-600" />}
              </div>

              {treino.obs && (
                <p className="text-gray-400 text-sm italic mt-2 border-l-2 border-gray-700 pl-4 uppercase font-medium tracking-tight">
                  {treino.obs}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// Sub-componentes auxiliares
function TabButton({ active, onClick, label, icon }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-md text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
        active 
        ? 'bg-cyan-900/40 text-cyan-400 border border-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.2)]' 
        : 'text-gray-500 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon && <i className={icon}></i>}
      {label}
    </button>
  );
}

function StatBadge({ icon, label, value, color }) {
  return (
    <div className={`flex items-center gap-2 ${color} text-white px-3 py-1.5 rounded text-[11px] font-bold uppercase italic tracking-tighter`}>
      <i className={icon}></i>
      <span>{label}: {value}</span>
    </div>
  );
}