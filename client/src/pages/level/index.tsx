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
        <div className="min-h-[70vh] flex flex-col items-center justify-center pt-20">
          <ShieldAlert className="w-16 h-16 text-gray-500 mb-4" />
          <h2 className="text-2xl font-bold text-white">Nível não encontrado</h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={`pt-32 pb-20 px-4 md:px-12 bg-gradient-to-b ${getLevelHeaderStyle(levelName).split(' ').slice(0, 2).join(' ')}`}>
        <div className="max-w-7xl mx-auto mb-16">
          <h1 className={`text-5xl md:text-7xl font-black mb-4 tracking-tighter ${getLevelHeaderStyle(levelName).split(' ').pop()}`}>
            Nível {levelName}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            {levelDescriptions[levelName as keyof typeof levelDescriptions]}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          <ContentCarousel 
            category={{
              id: "prompts",
              title: "Master Prompts",
              items: items.filter(i => i.type === 'master_prompt')
            }} 
          />
          <ContentCarousel 
            category={{
              id: "arch",
              title: "Arquiteturas Sistêmicas",
              items: items.filter(i => i.type === 'architecture')
            }} 
          />
          <ContentCarousel 
            category={{
              id: "conv",
              title: "Sistemas de Conversão",
              items: items.filter(i => i.type === 'conversion_system')
            }} 
          />
          <ContentCarousel 
            category={{
              id: "narr",
              title: "Motores Narrativos",
              items: items.filter(i => i.type === 'narrative_engine')
            }} 
          />
        </div>
      </div>
    </MainLayout>
  );
}