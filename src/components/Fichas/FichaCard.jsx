export function FichaCard({ ficha, onOpen, onDelete, onEdit }) {
  return (
    <div className="bg-[var(--bg-card)]/60 border border-[var(--border-color)] p-6 rounded-2xl group relative hover:border-[var(--color-primary)]/30 transition-all">
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(ficha); }} 
          className="text-[var(--text-muted)] hover:text-[var(--color-primary)] hover:scale-110 transition-transform cursor-pointer"
          title="Editar Ficha"
        >
          <i className="fas fa-pen"></i>
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(ficha.id); }} 
          className="text-[var(--color-secondary)] hover:scale-110 transition-transform cursor-pointer"
          title="Excluir Ficha"
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
      <h3 className="text-xl font-black text-[var(--text-main)] italic uppercase mb-2">{ficha.nome}</h3>
      <p className="text-xs text-[var(--text-muted)] font-bold uppercase mb-6">Divisão: {ficha.divisao.join(' - ')}</p>
      <button 
        onClick={() => onOpen(ficha)} 
        className="w-full bg-[var(--bg-main)]/5 hover:bg-[var(--color-primary)] py-2 rounded font-bold uppercase text-xs transition-colors cursor-pointer text-[var(--text-main)] hover:text-white"
      >
        Abrir Ficha
      </button>
    </div>
  );
}
