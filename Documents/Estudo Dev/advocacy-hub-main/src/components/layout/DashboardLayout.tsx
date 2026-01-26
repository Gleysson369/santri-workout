import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Outlet, useLocation} from "react-router-dom";
import { Footer } from "./Footer";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#E2E8F0]">
      <Sidebar />
      
      {/* Mudamos o overflow-auto para este container abaixo */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto"> 
        <Header />
        
        {/* Removemos o overflow-auto do main para ele crescer conforme o conteúdo */}
        <main className="flex-1 p-6">
          {children || <Outlet />}
        </main>

        {/* Agora o Footer fica no final do fluxo de rolagem */}
        {isHomePage && <Footer />}
      </div>
    </div>
  );
}