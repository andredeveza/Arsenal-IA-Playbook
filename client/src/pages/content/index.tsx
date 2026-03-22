import { useRoute } from "wouter";
import MainLayout from "@/components/layout/MainLayout";
import VisualPreview from "@/components/shared/VisualPreview";
import { allContent } from "@/data/mockData";
import { Play, Plus, Check, Share2, ThumbsUp, Copy, ExternalLink, ArrowLeft, TerminalSquare, BookOpen, Layers, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/userStore";

export default function ContentDetails() {
  const [, params] = useRoute("/content/:id");
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [content, setContent] = useState<any>(null);
  
  const { isFavorite, toggleFavorite, addToHistory } = useUserStore();
  const isAdded = content ? isFavorite(content.id) : false;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (params?.id) {
      const found = allContent.find(c => c.id === params.id);
      if (found) {
        setContent(found);
        addToHistory(found.id);
      }
    }
  }, [params?.id, addToHistory]);

  if (!content) {
    return (
      <MainLayout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content.content);
    toast({
      title: "Copiado para a área de transferência",
      description: "Conteúdo pronto para ser executado no seu LLM.",
    });
  };

  const handleToggleFavorite = () => {
    toggleFavorite(content.id);
    toast({
      title: isAdded ? "Removido do Arsenal" : "Adicionado ao Arsenal",
      description: isAdded ? "Item removido da sua lista." : "Item salvo na sua lista para acesso rápido.",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'master_prompt': return <TerminalSquare className="w-4 h-4 mr-2" />;
      case 'architecture': return <Layers className="w-4 h-4 mr-2" />;
      case 'conversion_system': return <BookOpen className="w-4 h-4 mr-2" />;
      default: return <Sparkles className="w-4 h-4 mr-2" />;
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
    <MainLayout>
      <div className="pt-24 md:pt-32 pb-24 px-4 md:px-12 max-w-[1600px] mx-auto">
        <button 
          onClick={() => window.history.back()}
          className="mb-8 flex items-center text-gray-400 hover:text-white transition-colors group text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Main Content Area */}
          <div className="col-span-1 lg:col-span-8 order-2 lg:order-1 space-y-12">
            
            {/* Header Section */}
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3 items-center">
                <Badge className="bg-zinc-800 text-gray-200 border-white/10 font-black uppercase tracking-widest py-1.5 px-4 rounded-sm shadow-lg">
                  {getTypeIcon(content.type)}
                  {content.type.replace('_', ' ')}
                </Badge>
                {content.isPremium && (
                  <Badge className="bg-gradient-to-r from-amber-600 to-amber-800 text-white border-0 font-black tracking-widest py-1.5 px-4 rounded-sm shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                    <Sparkles className="w-3 h-3 mr-1.5" />
                    PREMIUM
                  </Badge>
                )}
                {content.isNew && (
                  <Badge className="bg-primary/20 text-primary border border-primary/30 font-black tracking-widest py-1.5 px-4 rounded-sm">
                    NOVO
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.05] text-balance">
                {content.title}
              </h1>
              
              <div className="flex items-center gap-6 text-sm font-medium border-b border-white/10 pb-8">
                <div className={cn("px-3 py-1 rounded-full border flex items-center", getLevelColor(content.level))}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current mr-2"></span>
                  Nível: <span className="ml-1 font-bold">{content.level}</span>
                </div>
                <div className="flex items-center text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mr-2"></span>
                  Ideal para: <span className="text-white ml-1 font-bold">{content.tools[0]}</span>
                </div>
              </div>
              
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light text-balance max-w-4xl">
                {content.description}
              </p>
            </div>

            {/* Visual Example Section (Rich Content) */}
            <div className="py-4">
              <VisualPreview item={content} />
            </div>

            {/* Markdown Content Area (Premium Code Block) */}
            <div className="bg-[#050505] rounded-xl border border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-orange-500 to-primary"></div>
              
              <div className="p-8 md:p-12">
                <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
                  <h3 className="text-3xl font-black text-white tracking-tight flex items-center">
                    <TerminalSquare className="w-8 h-8 mr-4 text-primary" />
                    Código Fonte
                  </h3>
                  
                  <Button 
                    variant="outline"
                    className="hidden md:flex bg-white/5 border-white/10 hover:bg-white hover:text-black transition-colors rounded-sm font-bold tracking-wide"
                    onClick={handleCopy}
                  >
                    <Copy className="w-4 h-4 mr-2" /> COPIAR TUDO
                  </Button>
                </div>
                
                <div className="prose prose-invert prose-lg md:prose-xl max-w-none 
                  prose-headings:font-black prose-headings:tracking-tight prose-headings:text-white
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-white/5
                  prose-p:text-gray-300 prose-p:leading-relaxed prose-p:font-light
                  prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/10 prose-pre:shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] prose-pre:rounded-xl prose-pre:p-8
                  prose-li:text-gray-300 prose-strong:text-white prose-strong:font-bold">
                  <div dangerouslySetInnerHTML={{ __html: content.content
                    .replace(/# (.*)/g, '') // Remove main title as it's already shown
                    .replace(/## (.*)/g, '<h2 class="flex items-center"><span class="w-3 h-8 bg-primary mr-4 rounded-sm shadow-[0_0_10px_rgba(225,29,72,0.5)]"></span>$1</h2>')
                    .replace(/```markdown([\s\S]*?)```/g, '<div class="relative group my-10"><div class="absolute right-4 top-4 text-[10px] text-gray-500 font-mono font-bold tracking-widest uppercase bg-white/5 px-3 py-1.5 rounded border border-white/10 backdrop-blur-sm">Prompt Ready</div><pre class="overflow-x-auto text-emerald-400 font-mono text-base leading-relaxed">$1</pre></div>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                    .replace(/\n\n/g, '<br/><br/>')
                    .replace(/- (.*)/g, '<li class="ml-6 list-disc mb-3 pl-2 marker:text-primary/70">$1</li>')
                  }} />
                </div>
              </div>
              
              {/* Sticky bottom bar for mobile copy */}
              <div className="md:hidden sticky bottom-0 bg-black/90 backdrop-blur-md p-4 border-t border-white/10 z-20">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-black py-6 rounded-sm shadow-[0_0_20px_rgba(225,29,72,0.4)]"
                  onClick={handleCopy}
                >
                  <Copy className="w-5 h-5 mr-2" /> COPIAR CÓDIGO FONTE
                </Button>
              </div>
            </div>
            
          </div>

          {/* Sidebar Area */}
          <div className="col-span-1 lg:col-span-4 order-1 lg:order-2">
            <div className="sticky top-28 space-y-8">
              {/* Cover Art */}
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 group aspect-[4/3]">
                <img 
                  src={content.image} 
                  alt={content.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-[10px] font-black tracking-widest text-white/70 mb-2 uppercase bg-black/50 backdrop-blur-sm inline-block px-2 py-1 rounded">{content.type.replace('_', ' ')}</div>
                  <h3 className="text-2xl font-black text-white leading-tight text-shadow-lg">{content.title.split('-')[0]}</h3>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4">
                <Button 
                  size="lg" 
                  className="w-full text-black bg-white hover:bg-gray-200 font-black text-lg py-8 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] transition-transform uppercase tracking-wide"
                  onClick={handleCopy}
                >
                  <Play className="w-6 h-6 mr-3 fill-current" /> Extrair Agora
                </Button>
                
                <div className="grid grid-cols-3 gap-3">
                  <Button 
                    variant="outline" 
                    className={`col-span-2 py-7 border-white/10 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${isAdded ? 'bg-white/10 text-white border-white/20' : 'bg-zinc-900/50 hover:bg-zinc-800 text-gray-300'}`}
                    onClick={handleToggleFavorite}
                  >
                    {isAdded ? <Check className="w-5 h-5 mr-2 text-green-500" /> : <Plus className="w-5 h-5 mr-2" />}
                    {isAdded ? 'No Arsenal' : 'Salvar'}
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      className={`w-full h-full border-white/10 rounded-xl transition-all ${isLiked ? 'bg-primary/20 text-primary border-primary/50' : 'bg-zinc-900/50 text-gray-400 hover:bg-zinc-800 hover:text-white'}`}
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <ThumbsUp className="w-5 h-5" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="w-full h-full bg-zinc-900/50 hover:bg-zinc-800 border-white/10 text-gray-400 hover:text-white rounded-xl transition-all"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast({ title: "Link copiado para compartilhar" });
                      }}
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Meta Info Box */}
              <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] pointer-events-none" />
                
                <h4 className="text-xs font-black text-white/40 uppercase tracking-widest border-b border-white/5 pb-4">Telemetria do Conteúdo</h4>
                
                <div className="space-y-5">
                  <div>
                    <div className="text-xs text-gray-500 mb-1.5 uppercase tracking-wider font-semibold">Classe da Engenharia</div>
                    <div className="text-sm text-white font-bold capitalize">{content.type.replace('_', ' ')}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 mb-1.5 uppercase tracking-wider font-semibold">Complexidade</div>
                    <div className="text-sm text-white font-bold">{content.level}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 mb-2.5 uppercase tracking-wider font-semibold">Ambientes Homologados</div>
                    <div className="flex flex-wrap gap-2">
                      {content.tools.map((tool: string) => (
                        <Badge key={tool} variant="outline" className="bg-black border-white/10 text-gray-300 font-mono text-xs py-1 px-2.5 shadow-inner">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <div className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-semibold">Matriz Temática</div>
                    <div className="flex flex-wrap gap-2">
                      {content.tags.map((tag: string) => (
                        <span key={tag} className="text-[10px] font-bold text-gray-400 bg-white/5 px-2.5 py-1 rounded-sm border border-white/5 hover:bg-white/10 hover:text-white cursor-pointer transition-colors uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}