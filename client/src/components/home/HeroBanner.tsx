import { ContentItem } from "@/data/mockData";
import { Play, Plus, Info, Check, Copy } from "lucide-react";
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
    <div className="relative w-full h-[70vh] md:h-[85vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${content.image})` }}
        />
        {/* Gradient overlays for Netflix look */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-12 w-full md:w-2/3 lg:w-1/2 pt-20">
        <div className="flex gap-2 items-center mb-4">
          <Badge variant="destructive" className="font-bold tracking-wider rounded-sm text-xs bg-primary">
            Nº 1 HOJE
          </Badge>
          <Badge variant="outline" className="border-white/20 text-white bg-black/40 backdrop-blur-sm">
            {content.type.toUpperCase()}
          </Badge>
          {content.isPremium && (
            <Badge variant="secondary" className="bg-gradient-to-r from-amber-500 to-amber-700 text-white border-0">
              PREMIUM
            </Badge>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 text-shadow-lg leading-tight">
          {content.title}
        </h1>
        
        <div className="flex items-center gap-4 text-sm md:text-base font-semibold text-gray-300 mb-6 drop-shadow-md">
          <span className="text-green-500 font-bold">98% Relevância</span>
          <span>Nível {content.level}</span>
          <span className="border border-gray-500 px-1 rounded text-xs text-gray-400">
            {content.tools.join(", ")}
          </span>
        </div>

        <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-8 max-w-2xl text-shadow-md leading-relaxed line-clamp-3">
          {content.description}
        </p>

        <div className="flex flex-wrap gap-4">
          <Button 
            size="lg" 
            className="text-black bg-white hover:bg-gray-200 font-bold text-lg px-6 md:px-8 py-6 rounded-md"
            onClick={() => setLocation(`/content/${content.id}`)}
          >
            <Play className="w-6 h-6 mr-2 fill-current" /> Acessar Agora
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-gray-500/40 hover:bg-gray-500/60 border-0 text-white font-bold text-lg px-6 py-6 rounded-md backdrop-blur-sm transition-colors"
            onClick={() => setIsAdded(!isAdded)}
          >
            {isAdded ? (
              <><Check className="w-6 h-6 mr-2" /> Na sua lista</>
            ) : (
              <><Plus className="w-6 h-6 mr-2" /> Minha Lista</>
            )}
          </Button>
          
          <Button 
            size="icon" 
            variant="outline" 
            className="w-14 h-14 bg-gray-500/40 hover:bg-gray-500/60 border-2 border-gray-400/50 rounded-full text-white backdrop-blur-sm transition-colors"
            onClick={() => setLocation(`/content/${content.id}`)}
          >
            <Info className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}