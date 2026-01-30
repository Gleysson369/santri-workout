import { FichasManager } from '../components/Fichas/FichasManager';
import { useNavigate } from 'react-router-dom';

export function MinhasFichas() {
  const navigate = useNavigate();

  // Esta função será chamada quando o utilizador clicar em "Voltar ao Início"
  const voltarParaMusculacao = () => {
    navigate('/musculacao'); // Altera para a rota exata do teu ficheiro Musculacao.jsx
  };

  return (
    <div className="container mx-auto">
       {/* Passamos a função de navegar para dentro do Manager */}
       <FichasManager onBackHome={voltarParaMusculacao} />
    </div>
  );
}