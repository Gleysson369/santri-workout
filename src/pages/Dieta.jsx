import { useState, useEffect } from 'react';

export function Dieta() {
  // Estado para Perfil Físico
  const [perfil, setPerfil] = useState({ peso: '', altura: '', imc: 0, statusImc: '' });
  
  // Estado para Metas Diárias
  const [metas, setMetas] = useState({ kcal: 2000, carbo: 250, prot: 150, gord: 60 });

  // Estado para Consumo de Água e Jejum
  const [agua, setAgua] = useState(0);
  const [jejum, setJejum] = useState("");

  // Estado para Refeições
  const [refeicoes, setRefeicoes] = useState({
    cafe: { nome: 'Café da Manhã', carbo: 0, prot: 0, gord: 0 },
    lancheManha: { nome: 'Lanche da Manhã', carbo: 0, prot: 0, gord: 0 },
    almoco: { nome: 'Almoço', carbo: 0, prot: 0, gord: 0 },
    lancheTarde: { nome: 'Lanche da Tarde', carbo: 0, prot: 0, gord: 0 },
    janta: { nome: 'Janta', carbo: 0, prot: 0, gord: 0 },
  });

  // Cálculo automático de IMC
  useEffect(() => {
    if (perfil.peso && perfil.altura) {
      const altMetros = perfil.altura / 100;
      const valorImc = (perfil.peso / (altMetros * altMetros)).toFixed(2);
      let status = "";
      if (valorImc < 18.5) status = "Abaixo do peso";
      else if (valorImc < 25) status = "Peso Normal";
      else if (valorImc < 30) status = "Sobrepeso";
      else status = "Obesidade";
      setPerfil(prev => ({ ...prev, imc: valorImc, statusImc: status }));
    }
  }, [perfil.peso, perfil.altura]);

  // Cálculo de Totais Consumidos
  const totais = Object.values(refeicoes).reduce((acc, curr) => ({
    carbo: acc.carbo + Number(curr.carbo),
    prot: acc.prot + Number(curr.prot),
    gord: acc.gord + Number(curr.gord),
    kcal: acc.kcal + (Number(curr.carbo) * 4) + (Number(curr.prot) * 4) + (Number(curr.gord) * 9)
  }), { carbo: 0, prot: 0, gord: 0, kcal: 0 });

  return (
    <div className="animate-fadeIn p-4 lg:p-8 pb-10">
      <header className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold italic text-[var(--text-main)] uppercase tracking-tighter">
          Nutrição & <span className="text-[var(--color-primary)] drop-shadow-[0_0_8px_var(--color-primary)]">Alimentação</span>
        </h2>
        <div className="h-1 w-20 bg-[var(--color-primary)] mt-2 shadow-[0_0_10px_var(--color-primary)]"></div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        
        {/* COLUNA 1: PERFIL E METAS */}
        <div className="space-y-6">
          <div className="bg-[var(--bg-card)]/60 p-6 rounded-2xl border border-[var(--border-color)] shadow-xl">
            <h3 className="text-[var(--color-primary)] font-black uppercase text-xs mb-4 italic italic tracking-widest">Avaliação Física</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input type="number" placeholder="Peso (kg)" onChange={(e) => setPerfil({...perfil, peso: e.target.value})} className="bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-2 rounded text-[var(--text-main)] text-sm outline-none focus:border-[var(--color-primary)]" />
              <input type="number" placeholder="Altura (cm)" onChange={(e) => setPerfil({...perfil, altura: e.target.value})} className="bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-2 rounded text-[var(--text-main)] text-sm outline-none focus:border-[var(--color-primary)]" />
            </div>
            {perfil.imc > 0 && (
              <div className="bg-[var(--color-primary)]/10 p-4 rounded-xl border border-[var(--color-primary)]/20 text-center">
                <p className="text-[var(--text-muted)] text-[10px] uppercase font-bold">Seu IMC</p>
                <p className="text-2xl font-black text-[var(--text-main)] italic">{perfil.imc}</p>
                <p className="text-[var(--color-primary)] text-[10px] font-black uppercase tracking-tighter">{perfil.statusImc}</p>
              </div>
            )}
          </div>

          <div className="bg-[var(--bg-card)]/60 p-6 rounded-2xl border border-[var(--border-color)]">
            <h3 className="text-cyan-400 font-black uppercase text-xs mb-4 tracking-widest italic">Metas de Macros</h3>
            <div className="space-y-3">
              <MetaField label="Meta Kcal" val={metas.kcal} onChange={(v) => setMetas({...metas, kcal: v})} />
              <MetaField label="Carbo (g)" val={metas.carbo} onChange={(v) => setMetas({...metas, carbo: v})} />
              <MetaField label="Prot (g)" val={metas.prot} onChange={(v) => setMetas({...metas, prot: v})} />
              <MetaField label="Gord (g)" val={metas.gord} onChange={(v) => setMetas({...metas, gord: v})} />
            </div>
          </div>
        </div>

        {/* COLUNA 2: DIÁRIO ALIMENTAR */}
        <div className="lg:col-span-1 xl:col-span-2 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-center">
             <ProgressCircle label="Kcal" atual={totais.kcal} meta={metas.kcal} color="text-[var(--color-primary)]" />
             <ProgressCircle label="Carbo" atual={totais.carbo} meta={metas.carbo} color="text-orange-500" />
             <ProgressCircle label="Prot" atual={totais.prot} meta={metas.prot} color="text-blue-500" />
             <ProgressCircle label="Gord" atual={totais.gord} meta={metas.gord} color="text-yellow-500" />
          </div>

          {Object.keys(refeicoes).map((key) => (
            <div key={key} className="bg-[var(--bg-card)]/5 p-4 rounded-xl border border-[var(--border-color)] hover:border-[var(--color-primary)]/20 transition-all">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[var(--text-main)] font-black italic uppercase text-xs">{refeicoes[key].nome}</span>
                <span className="text-[10px] text-[var(--text-muted)]">{((refeicoes[key].carbo*4)+(refeicoes[key].prot*4)+(refeicoes[key].gord*9)).toFixed(0)} kcal</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input type="number" placeholder="C" onChange={(e) => setRefeicoes({...refeicoes, [key]: {...refeicoes[key], carbo: e.target.value}})} className="bg-[var(--bg-main)]/20 p-2 rounded text-[10px] text-[var(--text-main)] outline-none focus:border-orange-500" />
                <input type="number" placeholder="P" onChange={(e) => setRefeicoes({...refeicoes, [key]: {...refeicoes[key], prot: e.target.value}})} className="bg-[var(--bg-main)]/20 p-2 rounded text-[10px] text-[var(--text-main)] outline-none focus:border-blue-500" />
                <input type="number" placeholder="G" onChange={(e) => setRefeicoes({...refeicoes, [key]: {...refeicoes[key], gord: e.target.value}})} className="bg-[var(--bg-main)]/20 p-2 rounded text-[10px] text-[var(--text-main)] outline-none focus:border-yellow-500" />
              </div>
            </div>
          ))}

          {/* ÁGUA E JEJUM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-600/10 p-6 rounded-2xl border border-blue-500/20">
              <h4 className="text-blue-500 font-black uppercase text-[10px] mb-2 flex items-center gap-2">
                <i className="fas fa-tint"></i> Consumo de Água
              </h4>
              <div className="flex items-center gap-4">
                <input type="number" step="250" placeholder="ml" onChange={(e) => setAgua(e.target.value)} className="bg-[var(--bg-main)]/40 p-2 rounded text-[var(--text-main)] w-24 outline-none border border-blue-500/30" />
                <span className="text-blue-500 font-black italic">{agua} ml</span>
              </div>
            </div>
            <div className="bg-purple-600/10 p-6 rounded-2xl border border-purple-500/20">
              <h4 className="text-purple-500 font-black uppercase text-[10px] mb-2 flex items-center gap-2">
                <i className="fas fa-clock"></i> Jejum Intermitente
              </h4>
              <input type="text" placeholder="Ex: 16h concluídas" onChange={(e) => setJejum(e.target.value)} className="w-full bg-[var(--bg-main)]/40 p-2 rounded text-[var(--text-main)] outline-none border border-purple-500/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componentes Auxiliares
function MetaField({ label, val, onChange }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-[var(--text-muted)] uppercase font-bold">{label}</span>
      <input type="number" value={val} onChange={(e) => onChange(e.target.value)} className="bg-transparent text-right text-[var(--text-main)] font-black italic outline-none w-16" />
    </div>
  );
}

function ProgressCircle({ label, atual, meta, color }) {
  const percent = Math.min((atual / meta) * 100, 100).toFixed(0);
  return (
    <div className="bg-[var(--bg-main)]/40 p-3 rounded-2xl border border-[var(--border-color)]">
      <p className="text-[9px] text-[var(--text-muted)] uppercase font-black">{label}</p>
      <p className={`text-lg font-black italic ${color}`}>{atual.toFixed(0)}</p>
      <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
        <div className={`h-full ${color.replace('text-', 'bg-')} transition-all duration-500`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}