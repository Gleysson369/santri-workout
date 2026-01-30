import { Link } from 'react-router-dom';
import { ActivityRing } from '../components/ActivityRing';
import { useState, useEffect } from 'react';

export function Home() {
  // Simulação de dados integrados (Idealmente viriam de um Context/Redux)
  const [dashboardData, setDashboardData] = useState({
    musculacao: {
      ultimoTreino: "Peito e Tríceps",
      frequenciaSemanal: 3,
      metaSemanal: 5,
      volumeTotal: "12.5 ton"
    },
    esporte: {
      ultimo: "Corrida 5km",
      distanciaSemanal: "12.5 km",
      tempoAtividade: "02:15:00"
    },
    dieta: {
      kcalAtual: 1850,
      kcalMeta: 2500,
      macros: { carbo: 45, prot: 30, gord: 25 }, // porcentagem
      agua: 1.5, // litros
      aguaMeta: 3.0
    }
  });

  // Tenta carregar metas do localStorage para atualizar a visualização
  useEffect(() => {
    const savedMetas = localStorage.getItem('santri_metas_db');
    if (savedMetas) {
      try {
        const parsed = JSON.parse(savedMetas);
        setDashboardData(prev => ({
          ...prev,
          dieta: {
            ...prev.dieta,
            kcalMeta: parsed.mensal?.dieta?.kcal || 2500,
            aguaMeta: (parsed.mensal?.dieta?.agua || 3000) / 1000
          }
        }));
      } catch (e) {
        console.error("Erro ao ler metas", e);
      }
    }
  }, []);

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-4 lg:p-8 animate-fadeIn pb-24">
      
      {/* HEADER */}
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-light italic uppercase tracking-tighter text-white leading-none">
            Red-G <span className="font-bold text-red-500 drop-shadow-[0_0_10px_#ff0000]">Dashboard</span>
          </h1>
          <p className="text-gray-500 mt-2 uppercase text-[10px] tracking-[0.3em]">
            Visão Geral de Performance
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-white font-bold italic text-lg">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
      </header>

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* CARD 1: RESUMO DIETA (MACROS) */}
        <div className="bg-[#14191e]/80 backdrop-blur-xl p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-green-500/30 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <i className="fas fa-apple-alt text-6xl text-green-500"></i>
          </div>
          <h3 className="text-green-500 font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
            <i className="fas fa-utensils"></i> Nutrição Hoje
          </h3>
          
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-black text-white italic">{dashboardData.dieta.kcalAtual}</span>
            <span className="text-gray-500 text-xs font-bold mb-2">/ {dashboardData.dieta.kcalMeta} kcal</span>
          </div>

          {/* Barra de Progresso Kcal */}
          <div className="w-full bg-gray-800 h-2 rounded-full mb-6 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-600 to-emerald-400" 
              style={{ width: `${(dashboardData.dieta.kcalAtual / dashboardData.dieta.kcalMeta) * 100}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <MacroItem label="Carbo" val={`${dashboardData.dieta.macros.carbo}%`} color="text-orange-500" />
            <MacroItem label="Prot" val={`${dashboardData.dieta.macros.prot}%`} color="text-blue-500" />
            <MacroItem label="Gord" val={`${dashboardData.dieta.macros.gord}%`} color="text-yellow-500" />
          </div>
        </div>
        
        {/* CARD 2: RESUMO TREINOS (MUSCULAÇÃO) */}
        <div className="bg-[#14191e]/80 backdrop-blur-xl p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-red-500/30 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <i className="fas fa-dumbbell text-6xl text-red-500"></i>
          </div>
          <h3 className="text-red-500 font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
            <i className="fas fa-heartbeat"></i> Musculação
          </h3>

          <div className="mb-6">
            <p className="text-gray-400 text-[10px] uppercase font-bold">Último Treino</p>
            <p className="text-xl font-black text-white italic uppercase">{dashboardData.musculacao.ultimoTreino}</p>
          </div>

          <div className="flex justify-between items-end border-t border-white/5 pt-4">
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-bold">Frequência Semanal</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white italic">{dashboardData.musculacao.frequenciaSemanal}</span>
                <span className="text-gray-600 text-xs font-bold">/ {dashboardData.musculacao.metaSemanal}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-[10px] uppercase font-bold">Volume Total</p>
              <p className="text-xl font-black text-red-500 italic">{dashboardData.musculacao.volumeTotal}</p>
            </div>
          </div>
        </div>

        {/* CARD 3: RESUMO ESPORTES */}
        <div className="bg-[#14191e]/80 backdrop-blur-xl p-6 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <i className="fas fa-running text-6xl text-blue-500"></i>
          </div>
          <h3 className="text-blue-500 font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
            <i className="fas fa-trophy"></i> Esportes
          </h3>

          <div className="mb-6">
            <p className="text-gray-400 text-[10px] uppercase font-bold">Atividade Recente</p>
            <p className="text-xl font-black text-white italic uppercase">{dashboardData.esporte.ultimo}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-bold">Distância (Sem)</p>
              <p className="text-2xl font-black text-white italic">{dashboardData.esporte.distanciaSemanal}</p>
            </div>
            <div>
              <p className="text-gray-400 text-[10px] uppercase font-bold">Tempo Ativo</p>
              <p className="text-2xl font-black text-blue-500 italic">{dashboardData.esporte.tempoAtividade}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO DE NAVEGAÇÃO RÁPIDA (Activity Rings) */}
      <div className="mb-8">
        <h3 className="text-white text-sm font-bold uppercase italic tracking-widest mb-6 border-l-4 border-red-600 pl-3">
          Acesso Rápido
        </h3>
        <div className="flex flex-wrap justify-center sm:justify-start gap-8">
          <Link to="/Esportes" className="transition-transform hover:scale-105 active:scale-95">
            <ActivityRing icon="fa-running" label="Esportes" colorClass="border-t-blue-600 border-r-blue-600" shadowColor="#2563eb" />
          </Link>
          <Link to="/Musculacao" className="transition-transform hover:scale-105 active:scale-95">
            <ActivityRing icon="fa-dumbbell" label="Musculação" colorClass="border-t-red-600 border-r-red-600" shadowColor="#dc2626" />
          </Link>
          <Link to="/Dieta" className="transition-transform hover:scale-105">
            <ActivityRing icon="fa-utensils" label="Dieta" colorClass="border-t-green-500 border-r-green-500" shadowColor="#10b981" />
          </Link>
          <Link to="/Metas" className="transition-transform hover:scale-105">
            <ActivityRing icon="fa-bullseye" label="Metas" colorClass="border-t-orange-500 border-r-orange-500" shadowColor="#f97316" />
          </Link>
          <Link to="/MeusTreinos" className="transition-transform hover:scale-105">
            <ActivityRing icon="fa-history" label="Histórico" colorClass="border-t-gray-500 border-r-gray-500" shadowColor="#6b7280" />
          </Link>
        </div>
      </div>

      {/* GRÁFICO DE EVOLUÇÃO (MOCK) */}
      <div className="bg-[#14191e]/60 border border-white/5 rounded-3xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white text-sm font-bold uppercase italic tracking-widest">
            Evolução Semanal
          </h3>
          <div className="flex gap-2">
            <span className="text-[10px] uppercase font-bold text-red-500 flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Musculação</span>
            <span className="text-[10px] uppercase font-bold text-blue-500 flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Cardio</span>
          </div>
        </div>
        
        {/* Gráfico de Barras Simplificado com CSS */}
        <div className="flex justify-between items-end h-32 gap-2 sm:gap-4">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((dia, i) => {
            const hMusc = Math.floor(Math.random() * 60) + 20;
            const hCardio = Math.floor(Math.random() * 40) + 10;
            return (
              <div key={dia} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                <div className="w-full flex gap-1 items-end justify-center h-full relative">
                  <div className="w-2 sm:w-4 bg-red-600 rounded-t-sm transition-all group-hover:bg-red-500" style={{ height: `${hMusc}%` }}></div>
                  <div className="w-2 sm:w-4 bg-blue-600 rounded-t-sm transition-all group-hover:bg-blue-500" style={{ height: `${hCardio}%` }}></div>
                </div>
                <span className="text-[10px] text-gray-500 font-bold uppercase">{dia}</span>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  );
}

function MacroItem({ label, val, color }) {
  return (
    <div className="bg-black/20 rounded-lg p-2">
      <p className="text-[9px] text-gray-500 uppercase font-bold">{label}</p>
      <p className={`text-lg font-black italic ${color}`}>{val}</p>
    </div>
  );
}
