// Componente de Item do Ranking
export function RankItem({ pos, name, km, isTop,unit }) {
  return (
    <div className={`flex items-center justify-between p-2 rounded-lg ${isTop ? 'bg-red-500/10 border border-red-500/20' : ''}`}>
      <div className="flex items-center gap-3">
        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${isTop ? 'bg-red-600 text-white shadow-[0_0_5px_#ff0000]' : 'bg-gray-800 text-gray-400'}`}>
          {pos}
        </span>
        <span className="text-xs font-medium text-gray-200 uppercase tracking-tighter">{name}</span>
      </div>
      <span className="text-xs font-black text-red-500 italic">{km} <small className="text-[8px]">{unit}</small></span>
    </div>
  );
}

// Componente de Estatística do Card
export function StatItem({ label, value, unit, highlight }) {
  return (
    <div className="text-center">
      <span className="block text-gray-500 text-[10px] uppercase font-bold tracking-tighter">{label}</span>
      <span className={`${highlight ? 'text-red-500' : 'text-white'} font-black text-xl italic tracking-tighter`}>
        {value} <small className="text-[10px] uppercase">{unit}</small>
      </span>
    </div>
  );
}