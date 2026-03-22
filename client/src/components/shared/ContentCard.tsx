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

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'master_prompt': return 'from-purple-500 to-indigo-600';
      case 'architecture': return 'from-blue-500 to-cyan-600';
      case 'conversion_system': return 'from-emerald-500 to-teal-600';
      case 'narrative_engine': return 'from-orange-500 to-red-600';
      default: return 'from-primary to-orange-500';
    }
  };

  return (
    <div 
      className="relative group h-[180px] md:h-[220px] min-w-[300px] md:min-w-[400px] rounded-lg transition-all duration-300 ease-in-out cursor-pointer z-10 bg-[#0a0a0a] border border-white/5 shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleInteract}
    >
      {/* Visual Accent Line */}
      <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r rounded-t-lg opacity-70 group-hover:opacity-100 transition-opacity", getTypeColor(item.type))} />

      {/* Base Image State */}
      <img 
        src={item.image} 
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-sm group-hover:opacity-0 transition-opacity duration-300 opacity-[0.65] mix-blend-luminosity"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent rounded-lg group-hover:opacity-0 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent rounded-lg group-hover:opacity-0 transition-opacity duration-300" />
      
      <div className="absolute bottom-4 left-5 right-4 group-hover:opacity-0 transition-opacity duration-300">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-[10px] text-gray-300 font-bold tracking-widest uppercase bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-sm border border-white/5">
            {item.type.replace('_', ' ')}
          </div>
          {item.isNew && (
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          )}
        </div>
        <h3 className="text-white font-black text-lg md:text-xl leading-[1.1] text-balance">{item.title}</h3>
      </div>
      
      {item.isPremium && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-br from-amber-500 to-amber-700 rounded-sm text-[10px] font-black tracking-widest text-white shadow-lg flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> PRO
        </div>
      )}

      {/* Expanded Hover State (Cinematic Netflix style) */}
      <div className={cn(
        "absolute -left-8 -right-8 -top-16 -bottom-16 bg-[#0a0a0a] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 transition-all duration-300 ease-out flex flex-col overflow-hidden border border-white/10 ring-1 ring-white/5",
        isHovered ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
      )}>
        {/* Hover Image */}
        <div className="relative h-[220px] w-full shrink-0">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6">
            <h3 className="text-white font-black text-2xl leading-tight line-clamp-2 text-shadow-xl tracking-tight">{item.title}</h3>
          </div>
        </div>

        {/* Hover Content */}
        <div className="px-6 pb-6 pt-2 flex-1 flex flex-col bg-[#0a0a0a]">
          <div className="flex items-center justify-between mb-5">
            <div className="flex gap-3">
              <button 
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-all shadow-xl hover:scale-105 active:scale-95 group/play"
                onClick={(e) => { e.stopPropagation(); setLocation(`/content/${item.id}`); }}
              >
                <Play className="w-6 h-6 text-black fill-current ml-1 group-hover/play:text-primary transition-colors" />
              </button>
              
              <button 
                className="w-12 h-12 rounded-full bg-white/5 border border-white/20 text-white flex items-center justify-center hover:border-white hover:bg-white/10 transition-all shadow-lg hover:scale-105 active:scale-95 backdrop-blur-md"
                onClick={(e) => { e.stopPropagation(); setIsAdded(!isAdded); }}
              >
                {isAdded ? <Check className="w-6 h-6 text-green-500" /> : <Plus className="w-6 h-6" />}
              </button>
            </div>
            
            <button 
              className="w-10 h-10 rounded-full bg-white/5 border border-white/20 text-white flex items-center justify-center hover:border-white hover:bg-white/10 transition-all shadow-lg hover:scale-105 active:scale-95 backdrop-blur-md"
              onClick={(e) => { e.stopPropagation(); setLocation(`/content/${item.id}`); }}
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-3 text-sm font-bold mb-3">
            <span className="text-green-500 tracking-wide">99% Match</span>
            <span className="text-gray-300 border border-white/10 bg-white/5 px-2 py-0.5 rounded text-xs">{item.level}</span>
            {item.isPremium && <span className="text-amber-500 text-xs flex items-center gap-1"><Sparkles className="w-3 h-3"/> PREMIUM</span>}
          </div>

          <div className="text-xs text-primary font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
            <Zap className="w-3 h-3" />
            <span className={cn("text-transparent bg-clip-text bg-gradient-to-r", getTypeColor(item.type))}>
              {item.type.replace('_', ' ')}
            </span>
          </div>

          <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed font-light">
            {item.description}
          </p>

          <div className="flex items-center gap-2 flex-wrap mb-4 mt-auto">
            {item.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-xs font-medium text-gray-300 bg-white/5 px-2.5 py-1 rounded-full border border-white/5 cursor-default hover:bg-white/10 transition-colors">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="pt-3 border-t border-white/10 flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Otimizado para: <span className="text-gray-200 font-bold">{item.tools[0]}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}