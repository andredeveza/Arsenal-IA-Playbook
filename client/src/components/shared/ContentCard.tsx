import { ContentItem } from "@/data/mockData";
import { Play, Plus, ChevronDown, Check, Zap, Sparkles } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/button";

interface ContentCardProps {
  item: ContentItem;
}

export default function ContentCard({ item }: ContentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [, setLocation] = useLocation();
  const { isFavorite, toggleFavorite } = useUserStore();
  
  const isAdded = isFavorite(item.id);

  const handleInteract = () => {
    setLocation(`/content/${item.id}`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(item.id);
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

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Iniciante': return 'text-green-400 border-green-500/30 bg-green-500/10';
      case 'Intermediário': return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
      case 'Avançado': return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
      case 'Mestre': return 'text-red-500 border-red-500/50 bg-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)] font-black tracking-widest';
      default: return 'text-gray-300 border-white/10 bg-white/5';
    }
  };

  return (
    <div 
      className="relative group h-[180px] md:h-[220px] min-w-[280px] sm:min-w-[300px] md:min-w-[400px] rounded-lg transition-all duration-300 ease-in-out cursor-pointer z-10 bg-[#0a0a0a] border border-white/5 shadow-xl select-none"
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
      
      <div className="absolute bottom-4 left-4 right-4 group-hover:opacity-0 transition-opacity duration-300">
        <div className="flex items-center gap-2 mb-2">
          <div className={cn("text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm border", getLevelColor(item.level))}>
            {item.level}
          </div>
          {item.isNew && (
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          )}
        </div>
        <h3 className="text-white font-black text-lg md:text-xl leading-[1.1] text-balance line-clamp-2">{item.title}</h3>
      </div>
      
      {item.isPremium && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-br from-amber-500 to-amber-700 rounded-sm text-[10px] font-black tracking-widest text-white shadow-lg flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> PRO
        </div>
      )}

      {/* Mobile visible action button (always visible on touch screens to fix interaction issue) */}
      <div className="absolute top-3 left-3 md:hidden">
         <button 
            className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all shadow-lg active:scale-95"
            onClick={handleToggleFavorite}
          >
            {isAdded ? <Check className="w-4 h-4 text-green-500" /> : <Plus className="w-4 h-4" />}
          </button>
      </div>

      {/* Expanded Hover State (Cinematic Netflix style - Hidden on mobile, uses base click instead) */}
      <div className={cn(
        "hidden md:flex absolute -left-8 -right-8 -top-16 -bottom-16 bg-[#0a0a0a] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 transition-all duration-300 ease-out flex-col overflow-hidden border border-white/10 ring-1 ring-white/5",
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
                onClick={handleToggleFavorite}
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
            <span className={cn("px-2 py-0.5 rounded text-xs border", getLevelColor(item.level))}>{item.level}</span>
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