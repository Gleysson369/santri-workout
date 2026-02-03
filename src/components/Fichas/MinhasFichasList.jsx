import { FichaCard } from './FichaCard';

export function MinhasFichasList({ fichas, onOpenFicha, onDeleteFicha, onEditFicha, onCreateNew, onBack }) {
  return (
    <div className="space-y-6">
      
      {/* BOTÃO VOLTAR (Opcional - caso queira sair da área de fichas) */}
      {onBack && (
        <button 
          onClick={onBack} 
          className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest cursor-pointer group mb-2"
        >
          <i className="fas fa-arrow-left bg-[var(--bg-main)]/5 p-2 rounded-lg group-hover:bg-[var(--color-primary)]/10"></i>
          Voltar ao Início
        </button>
      )}

      <button 
        onClick={onCreateNew} 
        className="w-full py-4 border-2 border-dashed border-[var(--border-color)] rounded-xl text-[var(--text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all uppercase font-bold text-xs cursor-pointer flex items-center justify-center gap-2"
      >
        <i className="fas fa-plus-circle"></i>
        Criar Nova Ficha
      </button>

      {fichas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {fichas.map(ficha => (
            <FichaCard 
              key={ficha.id} 
              ficha={ficha} 
              onOpen={onOpenFicha} 
              onDelete={onDeleteFicha} 
              onEdit={onEditFicha}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-[var(--border-color)] rounded-3xl bg-[var(--bg-main)]/20">
          <i className="fas fa-folder-open text-[var(--text-muted)] text-5xl mb-4"></i>
          <p className="text-[var(--text-muted)] text-xs uppercase font-black italic">Nenhuma ficha encontrada</p>
        </div>
      )}
    </div>
  );
}