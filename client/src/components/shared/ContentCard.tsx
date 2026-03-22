import { ContentItem } from "@/data/mockData";
import { Play, Plus, ChevronDown, Check, Zap } from "lucide-react";
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

  // Handle interaction based on mobile or desktop
  const handleInteract = () => {
    setLocation(`/content/${item.id}`);
  };

  return (
    <div 
      className="relative group h-[140px] md:h-[180px] min-w-[240px] md:min-w-[320px] rounded-md transition-all duration-300 ease-in-out cursor-pointer z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleInteract}
    >
      {/* Base Image State */}
      <img 
        src={item.image} 
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover rounded-md shadow-sm group-hover:opacity-0 transition-opacity duration-300"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-md group-hover:opacity-0 transition-opacity duration-300" />
      
      <div className="absolute bottom-2 left-3 right-2 group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="text-white font-bold text-sm md:text-base leading-tight truncate">{item.title}</h3>
      </div>
      
      {item.isPremium && (
        <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-amber-500 rounded text-[10px] font-bold text-white group-hover:opacity-0">
          PRO
        </div>
      )}

      {/* Expanded Hover State (Netflix style) */}
      <div className={cn(
        "absolute -left-6 -right-6 -top-12 -bottom-12 bg-card rounded-md shadow-2xl z-50 transition-all duration-300 ease-out flex flex-col overflow-hidden border border-white/10",
        isHovered ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
      )}>
        {/* Hover Image */}
        <div className="relative h-[160px] w-full shrink-0">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          
          <div className="absolute bottom-2 left-4 right-4">
            <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">{item.title}</h3>
          </div>
        </div>

        {/* Hover Content */}
        <div className="p-4 flex-1 flex flex-col bg-background">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2">
              <button 
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
                onClick={(e) => { e.stopPropagation(); setLocation(`/content/${item.id}`); }}
              >
                <Play className="w-4 h-4 text-black fill-current ml-0.5" />
              </button>
              
              <button 
                className="w-8 h-8 rounded-full bg-transparent border-2 border-gray-500 text-white flex items-center justify-center hover:border-white transition-colors"
                onClick={(e) => { e.stopPropagation(); setIsAdded(!isAdded); }}
              >
                {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            </div>
            
            <button 
              className="w-8 h-8 rounded-full bg-transparent border-2 border-gray-500 text-white flex items-center justify-center hover:border-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setLocation(`/content/${item.id}`); }}
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-semibold mb-2">
            <span className="text-green-500">98% Relevante</span>
            <span className="text-gray-300 border border-gray-600 px-1 rounded">Nível {item.level}</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap mb-2">
            {item.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[10px] text-gray-300 flex items-center">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-gray-500 mr-1.5 inline-block"></span>}
                {tag}
              </span>
            ))}
          </div>
          
          <div className="mt-auto pt-2 flex items-center gap-2">
            <Zap className="w-3 h-3 text-amber-500" />
            <span className="text-xs text-gray-400 font-medium">Compatível: {item.tools.join(", ")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}