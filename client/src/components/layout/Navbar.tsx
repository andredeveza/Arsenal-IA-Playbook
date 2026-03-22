import { Link, useLocation } from "wouter";
import { Search, Bell, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Nível Mestre", path: "/level/Mestre" },
    { name: "Nível Avançado", path: "/level/Avançado" },
    { name: "Intermediário", path: "/level/Intermediário" },
    { name: "Iniciante", path: "/level/Iniciante" },
    { name: "Meu Arsenal", path: "/my-list" },
  ];

  const handleSearch = () => {
    toast({
      title: "Busca global",
      description: "Recurso de busca será implementado em breve.",
    });
  };

  const handleNotification = () => {
    toast({
      title: "Notificações",
      description: "Você não tem novas notificações no momento.",
    });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 px-4 md:px-12 py-4",
        isScrolled || mobileMenuOpen
          ? "bg-background/95 backdrop-blur-sm border-b border-white/5"
          : "bg-gradient-to-b from-black/80 to-transparent"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8 md:gap-12">
          {/* Logo */}
          <Link href="/">
            <div className="text-2xl md:text-3xl font-black text-primary tracking-tighter cursor-pointer flex items-center">
              PLAYBOOK<span className="text-white text-xl ml-0.5">.IA</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.path}>
                  <div
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-white cursor-pointer px-2 py-1 rounded-md",
                      location === link.path || (link.path !== "/" && location.startsWith(link.path))
                        ? "text-white font-bold bg-white/5"
                        : "text-gray-300 hover:bg-white/5"
                    )}
                  >
                    {link.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            className="text-white hover:text-gray-300 transition-all hover:scale-110 active:scale-95"
            onClick={handleSearch}
          >
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button 
            className="text-white hover:text-gray-300 transition-all hover:scale-110 active:scale-95 hidden sm:block relative"
            onClick={handleNotification}
          >
            <Bell className="w-5 h-5 md:w-6 md:h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all shadow-lg group-active:scale-95">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block text-xs font-medium text-white group-hover:text-gray-300">
              Membro Premium
            </div>
          </div>

          <button 
            className="lg:hidden text-white ml-2 p-1 active:bg-white/10 rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-white/10 p-4 shadow-2xl animate-in slide-in-from-top-2 h-screen overflow-y-auto pb-32">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.path}>
                  <div
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block text-lg font-medium p-4 rounded-lg transition-colors cursor-pointer",
                      location === link.path || (link.path !== "/" && location.startsWith(link.path))
                        ? "text-white font-bold bg-white/10 border border-white/5"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}