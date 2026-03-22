import { Link, useLocation } from "wouter";
import { Search, Bell, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

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
    { name: "Prompts", path: "/category/prompts" },
    { name: "Frameworks", path: "/category/frameworks" },
    { name: "Copys", path: "/category/copys" },
    { name: "Scripts", path: "/category/scripts" },
    { name: "Minha Lista", path: "/my-list" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 px-4 md:px-12 py-4",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-white/5"
          : "bg-gradient-to-b from-black/80 to-transparent"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8 md:gap-12">
          {/* Logo */}
          <Link href="/">
            <div className="text-2xl md:text-3xl font-black text-primary tracking-tighter cursor-pointer">
              PLAYBOOK<span className="text-white text-xl">.IA</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.path}>
                  <div
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-white cursor-pointer",
                      location === link.path || (link.path !== "/" && location.startsWith(link.path))
                        ? "text-white font-bold"
                        : "text-gray-300"
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
          <button className="text-white hover:text-gray-300 transition-colors">
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button className="text-white hover:text-gray-300 transition-colors hidden sm:block">
            <Bell className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-gradient-to-tr from-primary to-orange-500 flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block text-xs font-medium text-white group-hover:text-gray-300">
              Membro Premium
            </div>
          </div>

          <button 
            className="lg:hidden text-white ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-white/10 p-4 shadow-2xl animate-in slide-in-from-top-2">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.path}>
                  <div
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block text-lg font-medium py-2 transition-colors cursor-pointer",
                      location === link.path || (link.path !== "/" && location.startsWith(link.path))
                        ? "text-white font-bold"
                        : "text-gray-400 hover:text-white"
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