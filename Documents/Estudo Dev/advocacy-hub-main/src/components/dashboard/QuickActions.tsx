import { Plus, UserPlus, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    label: "Novo Processo",
    icon: Plus,
    path: "/processos",
    variant: "default" as const,
    colorClass: "bg-[#0f172a] hover:bg-[#1e293b] text-[#fbbf24] border border-slate-700", // Padrão da imagem
  },
  {
    label: "Novo Cliente",
    icon: UserPlus,
    path: "/clientes",
    variant: "outline" as const,
  },
  {
    label: "Nova Petição",
    icon: FileText,
    path: "/peticoes",
    variant: "outline" as const,
  },
  {
    label: "Agendar",
    icon: Calendar,
    path: "/agenda",
    variant: "outline" as const,
  },
];

export function QuickActions() {
  const navigate = useNavigate();

  const handleAction = (path: string) => {
    // Navega para a página e envia um sinal 'openModal: true' no state
    navigate(path, { state: { openModal: true } });
  };

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <Button
          key={action.label}
          variant={action.variant}
          onClick={() => handleAction(action.path)}
          className={`gap-2 ${action.colorClass || ""}`}
        >
          <action.icon className="w-4 h-4" />
          {action.label}
        </Button>
      ))}
    </div>
  );
}