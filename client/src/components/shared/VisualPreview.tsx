import { ContentItem } from "@/data/mockData";
import { TerminalSquare, Layers, BookOpen, Video, ArrowDown, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface VisualPreviewProps {
  item: ContentItem;
}

export default function VisualPreview({ item }: VisualPreviewProps) {
  const { visualType, visualData } = item;

  if (visualType === "prompt_anatomy") {
    return (
      <div className="bg-[#0a0a0a] rounded-xl border border-white/5 p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-[80px]" />
        
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <TerminalSquare className="w-5 h-5 mr-3 text-purple-400" />
          Anatomia do Prompt
        </h3>
        
        <div className="space-y-4 relative">
          <div className="absolute left-4 top-4 bottom-4 w-px bg-white/10" />
          
          {visualData.blocks.map((block: any, idx: number) => (
            <div key={idx} className="relative pl-10">
              <div className={cn("absolute left-[13px] top-4 w-2 h-2 rounded-full ring-4 ring-[#0a0a0a] -translate-x-1/2", block.color.replace('border-', 'bg-'))} />
              <div className={cn("bg-white/[0.02] border border-white/5 rounded-lg p-4 hover:bg-white/[0.04] transition-colors group", `hover:${block.color}`)}>
                <div className={cn("text-xs font-black tracking-widest uppercase mb-1", block.text)}>
                  {block.name}
                </div>
                <div className="text-gray-400 text-sm font-medium">
                  {block.role}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/5">
          <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">Output Esperado</div>
          <div className="bg-zinc-900/50 rounded-md p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <div className="text-xs font-mono text-gray-300">Geração Otimizada</div>
            </div>
            <p className="text-sm text-gray-400 italic">"{visualData.outputPreview}"</p>
          </div>
        </div>
      </div>
    );
  }

  if (visualType === "framework_map") {
    return (
      <div className="bg-zinc-950 rounded-xl border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-60" />
        
        <h3 className="text-xl font-bold text-white mb-8 flex items-center">
          <Layers className="w-5 h-5 mr-3 text-blue-400" />
          Mapa da Arquitetura
        </h3>
        
        <div className="flex flex-col gap-2 relative z-10">
          {visualData.nodes.map((node: any, idx: number) => (
            <div key={node.id} className="flex flex-col items-center">
              <div className="w-full bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm hover:border-blue-500/50 transition-colors flex items-center justify-between group">
                <div>
                  <div className="text-blue-400 font-black text-sm tracking-widest mb-1 uppercase">{node.title}</div>
                  <div className="text-gray-300 text-sm">{node.desc}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-blue-500/50 group-hover:text-blue-400 transition-colors group-hover:translate-x-1" />
              </div>
              
              {idx < visualData.nodes.length - 1 && (
                <div className="h-6 w-px bg-gradient-to-b from-blue-500/50 to-transparent my-1 relative">
                  <ArrowDown className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 text-blue-500/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visualType === "funnel_illustration") {
    return (
      <div className="bg-[#0a0a0a] rounded-xl border border-white/5 p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent" />
        
        <h3 className="text-xl font-bold text-white mb-8 flex items-center">
          <BookOpen className="w-5 h-5 mr-3 text-emerald-400" />
          Sistema de Conversão
        </h3>
        
        <div className="flex flex-col items-center w-full px-4 relative z-10">
          {visualData.stages.map((stage: any, idx: number) => {
            const width = 100 - (idx * 15);
            return (
              <div 
                key={idx} 
                className="relative flex flex-col items-center mb-2 group"
                style={{ width: `${width}%` }}
              >
                <div className="w-full bg-gradient-to-b from-emerald-500/20 to-emerald-500/5 border-t-2 border-emerald-500/50 h-14 rounded-b-xl flex items-center justify-between px-6 shadow-[0_0_15px_rgba(16,185,129,0.1)] group-hover:from-emerald-500/30 transition-colors backdrop-blur-md">
                  <span className="font-bold text-white text-sm tracking-wide">{stage.name}</span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-2 py-1 rounded border border-emerald-500/20">{stage.metric}</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full border border-emerald-500/20">
            <Zap className="w-3 h-3" /> Output Otimizado para Escala
          </div>
        </div>
      </div>
    );
  }

  // script_storyboard
  return (
    <div className="bg-zinc-950 rounded-xl border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center">
        <Video className="w-5 h-5 mr-3 text-orange-400" />
        Motor Narrativo (Storyboard)
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visualData.scenes.map((scene: any, idx: number) => (
          <div key={idx} className="bg-black/50 border border-white/5 rounded-lg overflow-hidden group hover:border-orange-500/30 transition-colors">
            <div className="h-24 bg-zinc-900 relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-60 transition-all" style={{ backgroundImage: `url(${scene.img})` }} />
              <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-orange-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-orange-500/20">
                {scene.time}
              </div>
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
                {idx + 1}
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-white text-sm mb-1">{scene.name}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{scene.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}