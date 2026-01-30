export function ActivityRing({ icon, label, colorClass, shadowColor }) {
  return (
    <div className="flex flex-col items-center group cursor-pointer transition-transform duration-500 hover:scale-105">
      <div className="relative w-40 h-40 rounded-full bg-[#12151a]/50 border border-gray-800 flex items-center justify-center transition-all overflow-visible">
        
        {/* Arco Neon - Mantive sua lógica de rotação */}
        <div 
          className={`absolute -inset-2 rounded-full border-2 border-transparent ${colorClass} transition-transform duration-700 group-hover:rotate-180`}
          style={{ filter: `drop-shadow(0 0 8px ${shadowColor})` }}
        ></div>

        {/* CONTEÚDO CENTRAL */}
        <div className="flex flex-col items-center justify-center gap-3 z-10 w-full">
          <i className={`fas ${icon} text-3xl text-white block drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-transform group-hover:scale-110`}></i>
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] text-center px-2 leading-tight">
            {label}
          </span>
        </div>

      </div>
    </div>
  );
}