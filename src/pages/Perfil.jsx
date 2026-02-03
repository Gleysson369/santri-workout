import { useState } from 'react';
import { useToast } from '../components/ToastContext';

// Mock data, em uma aplicação real, isso viria de um contexto de usuário ou API
const initialUserData = {
  name: 'Gleysson Flavio',
  email: 'atleta@santri.com',
  birthDate: '1990-05-15',
  gender: 'masculino',
  weight: '85',
  height: '180',
  goal: 'Hipertrofia',
  activityLevel: 'Muito Ativo',
  avatar: null // ou uma URL para uma imagem existente
};

export function Perfil() {
  const [userData, setUserData] = useState(initialUserData);
  const [avatarPreview, setAvatarPreview] = useState(userData.avatar);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação de salvamento
    setTimeout(() => {
      console.log("Dados do Perfil Salvos:", { ...userData, avatar: avatarPreview });
      addToast("Seus dados foram atualizados com sucesso!", 'success');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="p-4 lg:p-8 animate-fadeIn pb-24">
      <header className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold italic text-[var(--text-main)] uppercase tracking-tighter">
          Meu <span className="text-[var(--color-primary)] drop-shadow-[0_0_8px_var(--color-primary)]">Perfil</span>
        </h2>
        <div className="h-1 w-20 bg-[var(--color-primary)] mt-2"></div>
      </header>

      <div className="max-w-4xl mx-auto">
        <div className="bg-[var(--bg-card)]/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-[var(--border-color)] shadow-2xl">
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10">
            
            {/* COLUNA DA FOTO */}
            <div className="flex flex-col items-center gap-4 pt-4">
              <div className="relative w-40 h-40 rounded-full group">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] p-1 shadow-[0_0_20px_var(--shadow-color)]">
                  <div className="w-full h-full rounded-full bg-[var(--bg-card)] flex items-center justify-center overflow-hidden">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="font-black text-5xl text-[var(--text-main)]">{userData.name.charAt(0)}</span>
                    )}
                  </div>
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <i className="fas fa-camera text-white text-2xl"></i>
                  <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                </label>
              </div>
              <p className="text-center text-sm text-[var(--text-muted)]">Clique na foto para alterar</p>
            </div>

            {/* COLUNA DO FORMULÁRIO */}
            <div className="space-y-8">
              {/* SEÇÃO 1: DADOS PESSOAIS */}
              <div className="space-y-4">
                <h3 className="text-[var(--color-primary)] text-[10px] font-black uppercase tracking-widest border-b border-[var(--border-color)] pb-2 mb-4">
                  <i className="fas fa-id-card mr-2"></i> Dados Pessoais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup label="Nome Completo" icon="fa-user" type="text" name="name" value={userData.name} onChange={handleChange} />
                  <InputGroup label="E-mail" icon="fa-envelope" type="email" name="email" value={userData.email} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup label="Data de Nascimento" icon="fa-calendar" type="date" name="birthDate" value={userData.birthDate} onChange={handleChange} />
                  <SelectGroup label="Gênero" icon="fa-venus-mars" name="gender" value={userData.gender} onChange={handleChange}>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                  </SelectGroup>
                </div>
              </div>

              {/* SEÇÃO 2: PERFIL FÍSICO */}
              <div className="space-y-4">
                <h3 className="text-[var(--color-primary)] text-[10px] font-black uppercase tracking-widest border-b border-[var(--border-color)] pb-2 mb-4">
                  <i className="fas fa-heartbeat mr-2"></i> Perfil Físico
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <InputGroup label="Peso (kg)" icon="fa-weight" type="number" name="weight" value={userData.weight} onChange={handleChange} />
                  <InputGroup label="Altura (cm)" icon="fa-ruler-vertical" type="number" name="height" value={userData.height} onChange={handleChange} />
                </div>
              </div>

              {/* BOTÃO SALVAR */}
              <div className="pt-4 border-t border-[var(--border-color)]">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`w-full relative group overflow-hidden rounded-xl ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  <div className="absolute inset-0 bg-[var(--color-primary)] group-hover:bg-[var(--color-primary-hover)] transition-colors"></div>
                  <div className="relative px-6 py-3 flex items-center justify-center gap-3">
                    {isLoading ? (
                        <i className="fas fa-circle-notch animate-spin text-white"></i>
                    ) : (
                        <span className="text-white font-black uppercase italic tracking-[0.2em] text-sm">Salvar Alterações</span>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Componentes auxiliares para os inputs
function InputGroup({ label, icon, type, name, value, onChange }) {
  return (
    <div>
      <label className="text-[9px] text-[var(--text-muted)] uppercase font-bold ml-2 mb-1 block">{label}</label>
      <div className="relative">
        <i className={`fas ${icon} absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xs`}></i>
        <input 
          type={type} 
          name={name}
          required
          value={value}
          onChange={onChange}
          className="w-full bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-3 pl-10 rounded-lg text-[var(--text-main)] text-sm outline-none focus:border-[var(--color-primary)]/50 focus:bg-[var(--bg-main)]/60 transition-all"
        />
      </div>
    </div>
  );
}

function SelectGroup({ label, icon, name, value, onChange, children }) {
  return (
    <div>
      <label className="text-[9px] text-[var(--text-muted)] uppercase font-bold ml-2 mb-1 block">{label}</label>
      <div className="relative">
        <i className={`fas ${icon} absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xs`}></i>
        <select 
          name={name} 
          value={value} 
          onChange={onChange}
          className="w-full bg-[var(--bg-main)]/40 border border-[var(--border-color)] p-3 pl-10 rounded-lg text-[var(--text-main)] text-sm outline-none focus:border-[var(--color-primary)]/50 focus:bg-[var(--bg-main)]/60 transition-all appearance-none"
        >
          {children}
        </select>
      </div>
    </div>
  );
}