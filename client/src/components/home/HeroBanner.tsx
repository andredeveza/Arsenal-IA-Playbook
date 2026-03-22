import { ContentItem } from "@/data/mockData";
import { Play, Plus, Info, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useLocation } from "wouter";

interface HeroBannerProps {
  content: ContentItem;
}

export default function HeroBanner({ content }: HeroBannerProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [, setLocation] = useLocation();

  return (
    <div className="relative w-full h-[85vh] md:h-[95vh] flex items-center mb-10 md:mb-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-top bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url(${content.image})` }}
        />
        {/* Deeper, cinematic gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-16 w-full md:w-2/3 lg:w-[60%] pt-24 md:pt-32">
        <div className="flex gap-3 items-center mb-6 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards" style={{ animationDelay: '100ms' }}>
          <Badge className="bg-red-600 hover:bg-red-700 text-white font-black tracking-widest rounded-sm text-[10px] md:text-xs px-2 py-1 shadow-lg shadow-red-900/20 uppercase">
            DESTAQUE DA SEMANA
          </Badge>
          <Badge variant="outline" className="border-white/10 text-gray-300 bg-black/60 backdrop-blur-md font-medium tracking-wide uppercase text-[10px] md:text-xs py-1">
            {content.type.replace('_', ' ')}
          </Badge>
          {content.isPremium && (
            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold tracking-wider">
              <Sparkles className="w-3 h-3" /> PREMIUM
            </div>
          )}
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white mb-6 text-shadow-xl leading-[1.1] tracking-tighter opacity-0 animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-forwards" style={{ animationDelay: '300ms' }}>
          {content.title}
        </h1>
        
        <div className="flex items-center gap-4 md:gap-6 text-sm md:text-base font-medium text-gray-300 mb-8 drop-shadow-md opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards" style={{ animationDelay: '500ms' }}>
          <span className="text-green-500 font-bold tracking-wide">99% Relevância</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Nível {content.level}</span>
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> {content.tools[0]}</span>
        </div>

        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl text-shadow-md leading-relaxed font-light opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards" style={{ animationDelay: '700ms' }}>
          {content.description}
        </p>

        <div className="flex flex-wrap gap-4 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards" style={{ animationDelay: '900ms' }}>
          <Button 
            size="lg" 
            className="text-black bg-white hover:bg-gray-200 font-bold text-lg px-8 md:px-10 py-7 md:py-8 rounded-md shadow-2xl transition-all hover:scale-105 active:scale-95"
            onClick={() => setLocation(`/content/${content.id}`)}
          >
            <Play className="w-6 h-6 mr-3 fill-current" /> Acessar Arsenal
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-zinc-900/60 hover:bg-zinc-800 border border-white/10 text-white font-bold text-lg px-8 py-7 md:py-8 rounded-md backdrop-blur-md transition-all hover:border-white/30"
            onClick={() => setIsAdded(!isAdded)}
          >
            {isAdded ? (
              <><Check className="w-6 h-6 mr-3 text-green-500" /> Adicionado</>
            ) : (
              <><Plus className="w-6 h-6 mr-3" /> Coleção</>
            )}
          </Button>
          
          <Button 
            size="icon" 
            variant="outline" 
            className="w-14 h-14 md:w-16 md:h-16 bg-zinc-900/60 hover:bg-zinc-800 border border-white/10 rounded-full text-white backdrop-blur-md transition-all hover:border-white/30 hover:scale-105 hidden sm:flex"
            onClick={() => setLocation(`/content/${content.id}`)}
          >
            <Info className="w-6 h-6 md:w-7 md:h-7" />
          </Button>
        </div>
      </div>
      
      {/* Vignette fade at bottom to blend with content below */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </div>
  );
}