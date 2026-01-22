export function ActivityRing({ icon, label, colorClass, shadowColor }) {
  return (
    <div className="flex flex-col items-center group cursor-pointer transition-transform duration-500 hover:scale-110">
      <div className="relative w-44 h-44 rounded-full bg-[#12151a]/50 border border-gray-800 flex items-center justify-center transition-all">
        {/* Arco Neon */}
        <div className={`absolute -inset-2 rounded-full border-3 border-transparent ${colorClass} transition-transform duration-700 group-hover:rotate-180`}
             style={{ filter: `drop-shadow(0 0 8px ${shadowColor})` }}>
        </div>
        <div className="text-center z-10">
          <i className={`fas ${icon} text-4xl text-white mb-2 block`}></i>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest">{label}</span>
        </div>
      </div>
    </div>
  );
}