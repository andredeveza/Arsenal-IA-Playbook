import { useRoute } from "wouter";
import MainLayout from "@/components/layout/MainLayout";
import ContentCarousel from "@/components/home/ContentCarousel";
import { getItemsByLevel, ContentLevel } from "@/data/mockData";
import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";

export default function LevelView() {
  const [, params] = useRoute("/level/:levelName");
  const [items, setItems] = useState<any[]>([]);
  const levelName = decodeURIComponent(params?.levelName || "") as ContentLevel;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (levelName) {
      setItems(getItemsByLevel(levelName));
    }
  }, [levelName]);

  const levelDescriptions = {
    Iniciante: "Fundamentos sólidos para quem está começando. Entenda a lógica básica e tenha resultados rápidos.",
    Intermediário: "Estruturas aprimoradas para maior controle. Comece a ditar regras e formatos específicos.",
    Avançado: "Engenharia profunda e frameworks complexos. Domine a persuasão e automação através da IA.",
    Mestre: "O topo absoluto. Chain-of-thought, agentes autônomos e estratégias para dominar qualquer mercado."
  };

  const getLevelHeaderStyle = (level: string) => {
    switch(level) {
      case 'Iniciante': return 'from-green-900/40 to-background text-green-400';
      case 'Intermediário': return 'from-blue-900/40 to-background text-blue-400';
      case 'Avançado': return 'from-purple-900/40 to-background text-purple-400';
      case 'Mestre': return 'from-red-900/40 to-background text-red-500';
      default: return 'from-zinc-900 to-background text-white';
    }
  };

  if (!items.length) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center pt-20 px-4 text-center">
          <ShieldAlert className="w-12 h-12 md:w-16 md:h-16 text-gray-500 mb-4" />
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Nível não encontrado</h2>
          <p className="text-gray-400 text-sm md:text-base">Não conseguimos localizar o conteúdo para este nível.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={`pt-24 md:pt-32 pb-20 md:px-12 bg-gradient-to-b ${getLevelHeaderStyle(levelName).split(' ').slice(0, 2).join(' ')}`}>
        <div className="max-w-7xl mx-auto mb-8 md:mb-16 px-4 md:px-0">
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-widest uppercase mb-4 text-white/70">
            Filtro de Catálogo
          </div>
          <h1 className={`text-4xl md:text-7xl font-black mb-4 tracking-tighter ${getLevelHeaderStyle(levelName).split(' ').pop()}`}>
            Nível {levelName}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed font-light">
            {levelDescriptions[levelName as keyof typeof levelDescriptions]}
          </p>
        </div>

        <div className="flex flex-col gap-6 md:gap-12">
          {items.filter(i => i.type === 'master_prompt').length > 0 && (
            <ContentCarousel 
              category={{
                id: "prompts",
                title: "Master Prompts",
                items: items.filter(i => i.type === 'master_prompt')
              }} 
            />
          )}
          
          {items.filter(i => i.type === 'architecture').length > 0 && (
            <ContentCarousel 
              category={{
                id: "arch",
                title: "Arquiteturas Sistêmicas",
                items: items.filter(i => i.type === 'architecture')
              }} 
            />
          )}
          
          {items.filter(i => i.type === 'conversion_system').length > 0 && (
            <ContentCarousel 
              category={{
                id: "conv",
                title: "Sistemas de Conversão",
                items: items.filter(i => i.type === 'conversion_system')
              }} 
            />
          )}
          
          {items.filter(i => i.type === 'narrative_engine').length > 0 && (
            <ContentCarousel 
              category={{
                id: "narr",
                title: "Motores Narrativos",
                items: items.filter(i => i.type === 'narrative_engine')
              }} 
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}