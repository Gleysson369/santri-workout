import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../components/ToastContext';

export function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    gender: '',
    weight: '',
    height: '',
    goal: 'Hipertrofia',
    activityLevel: 'Sedentário'
  });

  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      addToast("As senhas não coincidem!", 'error');
      return;
    }
    setIsLoading(true);

    // Simulação de envio
    setTimeout(() => {
      console.log("Dados do Registro:", formData);
      addToast(`Cadastro realizado com sucesso! Bem-vindo, ${formData.name.split(' ')[0]}!`, 'success');
      setIsLoading(false);
      // Aqui você redirecionaria para o Login ou Dashboard
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[var(--bg-main)]">
      
      {/* Elementos Decorativos de Fundo (Glows) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-primary)]/10 rounded-full blur-[120px] z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-primary)]/10 rounded-full blur-[120px] z-0"></div>

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-main)]/80 to-[var(--bg-main)] z-0"></div>

      <div className="w-full max-w-2xl relative z-10 my-10">
        <div className="bg-[var(--bg-card)]/80 backdrop-blur-2xl border border-[var(--border-color)] p-8 md:p-10 rounded-[2.5rem] shadow-2xl overflow-hidden group">
          
          {/* Linha de brilho no topo */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50"></div>

          <header className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-[var(--text-main)]">
              Crie sua Conta <span className="text-[var(--color-primary)]">RED-G</span>
            </h1>
            <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-[0.2em] font-bold mt-2 opacity-70">
              Junte-se à elite do treinamento
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* SEÇÃO 1: DADOS DE ACESSO */}
            <div className="space-y-4">
              <h3 className="text-[var(--color-primary)] text-[10px] font-black uppercase tracking-widest border-b border-[var(--border-color)] pb-2 mb-4">
                <i className="fas fa-id-card mr-2"></i> Credenciais
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup icon="fa-user" type="text" name="name" placeholder="Nome Completo" value={formData.name} onChange={handleChange} />
                <InputGroup icon="fa-envelope" type="email" name="email" placeholder="Seu E-mail" value={formData.email} onChange={handleChange} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup icon="fa-lock" type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} />
                <InputGroup icon="fa-lock" type="password" name="confirmPassword" placeholder="Confirmar Senha" value={formData.confirmPassword} onChange={handleChange} />
              </div>
            </div>

            {/* SEÇÃO 2: PERFIL FÍSICO */}
            <div className="space-y-4">
              <h3 className="text-[var(--color-primary)] text-[10px] font-black uppercase tracking-widest border-b border-[var(--border-color)] pb-2 mb-4">
                <i className="fas fa-heartbeat mr-2"></i> Perfil Físico
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                   <label className="text-[9px] text-[var(--text-muted)] uppercase font-bold ml-2 mb-1 block">Data de Nascimento</label>
                   <InputGroup icon="fa-calendar" type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                </div>
                
                <div className="relative">
                   <label className="text-[9px] text-[var(--text-muted)] uppercase font-bold ml-2 mb-1 block">Gênero</label>
                   <div className="relative">
                     <i className="fas fa-venus-mars absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xs"></i>
                     <select 
                        name="gender" 
                        value={formData.gender} 
                        onChange={handleChange}
                        className="w-full bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-4 pl-12 rounded-2xl text-[var(--text-main)] text-sm outline-none focus:border-[var(--color-primary)]/50 focus:bg-[var(--bg-main)]/60 transition-all appearance-none"
                     >
                        <option value="" className="bg-[var(--bg-card)]">Selecione...</option>
                        <option value="masculino" className="bg-[var(--bg-card)]">Masculino</option>
                        <option value="feminino" className="bg-[var(--bg-card)]">Feminino</option>
                        <option value="outro" className="bg-[var(--bg-card)]">Outro</option>
                     </select>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputGroup icon="fa-weight" type="number" name="weight" placeholder="Peso (kg)" value={formData.weight} onChange={handleChange} />
                <InputGroup icon="fa-ruler-vertical" type="number" name="height" placeholder="Altura (cm)" value={formData.height} onChange={handleChange} />
              </div>
            </div>

            {/* SEÇÃO 3: OBJETIVOS */}
            <div className="space-y-4">
              <h3 className="text-[var(--color-primary)] text-[10px] font-black uppercase tracking-widest border-b border-[var(--border-color)] pb-2 mb-4">
                <i className="fas fa-bullseye mr-2"></i> Objetivos
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                   <label className="text-[9px] text-[var(--text-muted)] uppercase font-bold ml-2 mb-1 block">Objetivo Principal</label>
                   <div className="relative">
                     <i className="fas fa-trophy absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xs"></i>
                     <select 
                        name="goal" 
                        value={formData.goal} 
                        onChange={handleChange}
                        className="w-full bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-4 pl-12 rounded-2xl text-[var(--text-main)] text-sm outline-none focus:border-[var(--color-primary)]/50 focus:bg-[var(--bg-main)]/60 transition-all appearance-none"
                     >
                        <option value="Hipertrofia" className="bg-[var(--bg-card)]">Hipertrofia (Ganho de Massa)</option>
                        <option value="Emagrecimento" className="bg-[var(--bg-card)]">Emagrecimento</option>
                        <option value="Resistencia" className="bg-[var(--bg-card)]">Resistência / Condicionamento</option>
                        <option value="Forca" className="bg-[var(--bg-card)]">Força Pura (Powerlifting)</option>
                     </select>
                   </div>
                </div>

                <div className="relative">
                   <label className="text-[9px] text-[var(--text-muted)] uppercase font-bold ml-2 mb-1 block">Nível de Atividade</label>
                   <div className="relative">
                     <i className="fas fa-running absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xs"></i>
                     <select 
                        name="activityLevel" 
                        value={formData.activityLevel} 
                        onChange={handleChange}
                        className="w-full bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-4 pl-12 rounded-2xl text-[var(--text-main)] text-sm outline-none focus:border-[var(--color-primary)]/50 focus:bg-[var(--bg-main)]/60 transition-all appearance-none"
                     >
                        <option value="Sedentário" className="bg-[var(--bg-card)]">Sedentário</option>
                        <option value="Leve" className="bg-[var(--bg-card)]">Levemente Ativo</option>
                        <option value="Moderado" className="bg-[var(--bg-card)]">Moderadamente Ativo</option>
                        <option value="Muito Ativo" className="bg-[var(--bg-card)]">Muito Ativo</option>
                        <option value="Extremamente Ativo" className="bg-[var(--bg-card)]">Atleta Profissional</option>
                     </select>
                   </div>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full relative group overflow-hidden rounded-2xl mt-6 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <div className="absolute inset-0 bg-[var(--color-primary)] group-hover:bg-[var(--color-primary-hover)] transition-colors"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 duration-500 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
              
              <div className="relative px-6 py-4 flex items-center justify-center gap-3">
                {isLoading ? (
                    <i className="fas fa-circle-notch animate-spin text-white"></i>
                ) : (
                    <>
                        <span className="text-white font-black uppercase italic tracking-[0.2em] text-sm">Finalizar Cadastro</span>
                        <i className="fas fa-chevron-right text-[10px] text-white/50 group-hover:translate-x-1 transition-transform"></i>
                    </>
                )}
              </div>
            </button>
          </form>

          <footer className="mt-8 text-center">
             <p className="text-[var(--text-muted)] text-[10px] uppercase font-bold">
                Já possui uma conta? <Link to="/" className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] cursor-pointer transition-colors">Faça Login</Link>
             </p>
          </footer>
        </div>
        
        <p className="text-center mt-8 text-[var(--text-muted)] text-[9px] uppercase tracking-widest font-medium">
            &copy; 2024 RED-G Systems - Protocolo de Treinamento Avançado
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}} />
    </div>
  );
}

function InputGroup({ icon, type, name, placeholder, value, onChange }) {
  return (
    <div className="relative">
      <i className={`fas ${icon} absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xs opacity-70`}></i>
      <input 
        type={type} 
        name={name}
        required
        value={value}
        onChange={onChange}
        className="w-full bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-4 pl-12 rounded-2xl text-[var(--text-main)] text-sm outline-none focus:border-[var(--color-primary)]/50 focus:bg-[var(--bg-main)]/60 transition-all placeholder-[var(--text-muted)]/50"
        placeholder={placeholder}
      />
    </div>
  );
}