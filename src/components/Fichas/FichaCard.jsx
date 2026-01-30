export function FichaCard({ ficha, onOpen, onDelete, onEdit }) {
  return (
    <div className="bg-[#14191e]/60 border border-white/5 p-6 rounded-2xl group relative hover:border-red-500/30 transition-all">
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(ficha); }} 
          className="text-blue-500 hover:scale-110 transition-transform cursor-pointer"
          title="Editar Ficha"
        >
          <i className="fas fa-pen"></i>
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(ficha.id); }} 
          className="text-red-500 hover:scale-110 transition-transform cursor-pointer"
          title="Excluir Ficha"
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
      <h3 className="text-xl font-black text-white italic uppercase mb-2">{ficha.nome}</h3>
      <p className="text-xs text-gray-500 font-bold uppercase mb-6">Divisão: {ficha.divisao.join(' - ')}</p>
      <button 
        onClick={() => onOpen(ficha)} 
        className="w-full bg-white/5 hover:bg-red-600 py-2 rounded font-bold uppercase text-xs transition-colors cursor-pointer"
      >
        Abrir Ficha
      </button>
    </div>
  );
}
