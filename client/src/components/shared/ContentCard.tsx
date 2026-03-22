import { ContentItem } from "@/data/mockData";
import { Play, Plus, ChevronDown, Check, Zap, Sparkles } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  item: ContentItem;
}

export default function ContentCard({ item }: ContentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [, setLocation] = useLocation();

  const handleInteract = () => {
    setLocation(`/content/${item.id}`);
  };

  return (
    <div 
      className="relative group h-[160px] md:h-[200px] min-w-[280px] md:min-w-[360px] rounded-md transition-all duration-300 ease-in-out cursor-pointer z-10 bg-zinc-900 border border-white/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleInteract}
    >
      {/* Base Image State */}
      <img 
        src={item.image} 
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover rounded-md shadow-sm group-hover:opacity-0 transition-opacity duration-300 opacity-80 mix-blend-luminosity group-hover:mix-blend-normal"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-md group-hover:opacity-0 transition-opacity duration-300" />
      
      <div className="absolute bottom-3 left-4 right-3 group-hover:opacity-0 transition-opacity duration-300">
        <div className="text-xs text-primary font-bold tracking-wider mb-1 opacity-80 uppercase">{item.type.replace('_', ' ')}</div>
        <h3 className="text-white font-bold text-base md:text-lg leading-tight truncate">{item.title}</h3>
      </div>
      
      {item.isPremium && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-br from-amber-500 to-amber-700 rounded-sm text-[10px] font-bold text-white group-hover:opacity-0 shadow-lg flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> PRO
        </div>
      )}

      {/* Expanded Hover State (Cinematic Netflix style) */}
      <div className={cn(
        "absolute -left-8 -right-8 -top-16 -bottom-16 bg-zinc-950 rounded-lg shadow-2xl z-50 transition-all duration-300 ease-out flex flex-col overflow-hidden border border-white/10 ring-1 ring-black/50",
        isHovered ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
      )}>
        {/* Hover Image */}
        <div className="relative h-[200px] w-full shrink-0">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          
          <div className="absolute bottom-3 left-5 right-5">
            <h3 className="text-white font-black text-xl leading-tight line-clamp-2 text-shadow-md">{item.title}</h3>
          </div>
        </div>

        {/* Hover Content */}
        <div className="p-5 flex-1 flex flex-col bg-zinc-950">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-3">
              <button 
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg hover:scale-105 active:scale-95"
                onClick={(e) => { e.stopPropagation(); setLocation(`/content/${item.id}`); }}
              >
                <Play className="w-5 h-5 text-black fill-current ml-1" />
              </button>
              
              <button 
                className="w-10 h-10 rounded-full bg-zinc-900 border border-white/20 text-white flex items-center justify-center hover:border-white hover:bg-zinc-800 transition-colors shadow-lg hover:scale-105 active:scale-95"
                onClick={(e) => { e.stopPropagation(); setIsAdded(!isAdded); }}
              >
                {isAdded ? <Check className="w-5 h-5 text-green-500" /> : <Plus className="w-5 h-5" />}
              </button>
            </div>
            
            <button 
              className="w-10 h-10 rounded-full bg-zinc-900 border border-white/20 text-white flex items-center justify-center hover:border-white hover:bg-zinc-800 transition-colors shadow-lg hover:scale-105 active:scale-95"
              onClick={(e) => { e.stopPropagation(); setLocation(`/content/${item.id}`); }}
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-3 text-sm font-semibold mb-3">
            <span className="text-green-500 tracking-wide">99% Relevante</span>
            <span className="text-gray-400 border border-white/10 bg-white/5 px-2 py-0.5 rounded text-xs">{item.level}</span>
            {item.isPremium && <span className="text-amber-500 text-xs flex items-center gap-1"><Sparkles className="w-3 h-3"/> PRO</span>}
          </div>

          <p className="text-gray-400 text-xs line-clamp-2 mb-3 leading-relaxed">
            {item.description}
          </p>

          <div className="flex items-center gap-2 flex-wrap mb-3 mt-auto">
            {item.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-xs font-medium text-gray-300 bg-white/5 px-2 py-1 rounded-sm border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="pt-3 border-t border-white/5 flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs text-gray-400 font-medium">Otimizado para: <span className="text-gray-200">{item.tools[0]}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}