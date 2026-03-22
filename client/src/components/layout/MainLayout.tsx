import { ReactNode } from "react";
import Navbar from "./Navbar";

interface MainLayoutProps {
  children: ReactNode;
  hideNavbar?: boolean;
}

export default function MainLayout({ children, hideNavbar = false }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
      
      {!hideNavbar && (
        <footer className="mt-20 py-12 px-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-xl font-black text-primary tracking-tighter">
                PLAYBOOK<span className="text-white text-base">.IA</span>
              </span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Suporte</a>
            </div>
            <div>&copy; 2024 Playbook IA. Todos os direitos reservados.</div>
          </div>
        </footer>
      )}
    </div>
  );
}