export function ImportExportFichas() {
  return (
    <div className="bg-[#14191e]/60 border border-white/5 p-10 rounded-2xl text-center animate-fadeIn">
      <div className="w-20 h-20 bg-black/40 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
        <i className="fas fa-exchange-alt text-3xl text-gray-500"></i>
      </div>
      <h3 className="text-white font-bold uppercase mb-2 text-xl">Importar / Exportar</h3>
      <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">Gerencie seus backups de fichas. Você pode exportar suas fichas atuais para um arquivo JSON ou importar um backup existente.</p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-8 py-3 bg-blue-600/10 text-blue-500 border border-blue-500/30 rounded-xl hover:bg-blue-600 hover:text-white transition-all uppercase text-xs font-bold flex items-center justify-center gap-2 cursor-pointer">
          <i className="fas fa-file-export"></i> Exportar JSON
        </button>
        <button className="px-8 py-3 bg-green-600/10 text-green-500 border border-green-500/30 rounded-xl hover:bg-green-600 hover:text-white transition-all uppercase text-xs font-bold flex items-center justify-center gap-2 cursor-pointer">
          <i className="fas fa-file-import"></i> Importar JSON
        </button>
      </div>
    </div>
  );
}
