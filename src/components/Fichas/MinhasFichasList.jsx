import { FichaCard } from './FichaCard';

export function MinhasFichasList({ fichas, onOpenFicha, onDeleteFicha, onEditFicha, onCreateNew, onBack }) {
  return (
    <div className="space-y-6">
      
      {/* BOTÃO VOLTAR (Opcional - caso queira sair da área de fichas) */}
      {onBack && (
        <button 
          onClick={onBack} 
          className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest cursor-pointer group mb-2"
        >
          <i className="fas fa-arrow-left bg-white/5 p-2 rounded-lg group-hover:bg-red-500/10"></i>
          Voltar ao Início
        </button>
      )}

      <button 
        onClick={onCreateNew} 
        className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-gray-400 hover:border-red-500 hover:text-red-500 transition-all uppercase font-bold text-xs cursor-pointer flex items-center justify-center gap-2"
      >
        <i className="fas fa-plus-circle"></i>
        Criar Nova Ficha
      </button>

      {fichas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="py-20 text-center border border-white/5 rounded-3xl bg-black/20">
          <i className="fas fa-folder-open text-gray-800 text-5xl mb-4"></i>
          <p className="text-gray-500 text-xs uppercase font-black italic">Nenhuma ficha encontrada</p>
        </div>
      )}
    </div>
  );
}