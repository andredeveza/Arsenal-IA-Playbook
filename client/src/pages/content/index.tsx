import { useRoute } from "wouter";
import MainLayout from "@/components/layout/MainLayout";
import { allContent } from "@/data/mockData";
import { Play, Plus, Check, Share2, ThumbsUp, Copy, ExternalLink, ArrowLeft, TerminalSquare, BookOpen, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ContentDetails() {
  const [, params] = useRoute("/content/:id");
  const { toast } = useToast();
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (params?.id) {
      const found = allContent.find(c => c.id === params.id);
      if (found) {
        setContent(found);
      }
    }
  }, [params?.id]);

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
      description: "Prompt/Framework pronto para ser colado no LLM.",
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

  return (
    <MainLayout>
      <div className="pt-24 md:pt-32 pb-24 px-4 md:px-8 max-w-[1400px] mx-auto">
        <button 
          onClick={() => window.history.back()}
          className="mb-8 flex items-center text-gray-400 hover:text-white transition-colors group text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar para Biblioteca
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Right Column: Details & Content (Swapped to be main focus) */}
          <div className="col-span-1 lg:col-span-8 order-2 lg:order-1 space-y-10">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3 items-center">
                <Badge className="bg-zinc-800 text-gray-200 border-white/10 font-bold uppercase tracking-wider py-1 px-3">
                  {getTypeIcon(content.type)}
                  {content.type.replace('_', ' ')}
                </Badge>
                {content.isPremium && (
                  <Badge className="bg-amber-500/20 text-amber-500 border-amber-500/30 font-bold tracking-wider py-1 px-3">
                    <Sparkles className="w-3 h-3 mr-1.5" />
                    ARSENAL PREMIUM
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1] text-balance">
                {content.title}
              </h1>
              
              <div className="flex items-center gap-6 text-sm font-medium border-b border-white/5 pb-8">
                <span className="text-green-500 font-bold text-base tracking-wide">99% Relevância</span>
                <div className="flex items-center text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mr-2"></span>
                  Nível: <span className="text-white ml-1">{content.level}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mr-2"></span>
                  Ideal para: <span className="text-white ml-1">{content.tools[0]}</span>
                </div>
              </div>
              
              <p className="text-xl text-gray-300 leading-relaxed font-light text-balance">
                {content.description}
              </p>
            </div>

            {/* Markdown Content Area (Premium Styling) */}
            <div className="bg-zinc-950/50 rounded-xl border border-white/10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-orange-500 to-primary"></div>
              
              <div className="p-6 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-white tracking-tight flex items-center">
                    <TerminalSquare className="w-6 h-6 mr-3 text-primary" />
                    Engenharia do Prompt
                  </h3>
                  
                  <Button 
                    variant="outline"
                    className="hidden md:flex border-white/10 hover:bg-white hover:text-black transition-colors"
                    onClick={handleCopy}
                  >
                    <Copy className="w-4 h-4 mr-2" /> Copiar Código
                  </Button>
                </div>
                
                <div className="prose prose-invert prose-lg max-w-none 
                  prose-headings:font-black prose-headings:tracking-tight prose-headings:text-white
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-white/5
                  prose-p:text-gray-300 prose-p:leading-relaxed prose-p:font-light
                  prose-pre:bg-[#0d0d0d] prose-pre:border prose-pre:border-white/10 prose-pre:shadow-2xl prose-pre:rounded-lg
                  prose-li:text-gray-300 prose-strong:text-white prose-strong:font-bold">
                  {/* Robust mock markdown rendering */}
                  <div dangerouslySetInnerHTML={{ __html: content.content
                    .replace(/# (.*)/g, '<h1 class="text-3xl font-black mt-8 mb-6 tracking-tight">$1</h1>')
                    .replace(/## (.*)/g, '<h2 class="text-2xl font-bold mt-10 mb-4 text-gray-100 flex items-center"><span class="w-2 h-6 bg-primary mr-3 rounded-sm"></span>$1</h2>')
                    .replace(/```markdown([\s\S]*?)```/g, '<div class="relative group my-8"><div class="absolute right-3 top-3 text-[10px] text-gray-500 font-mono font-bold tracking-widest uppercase bg-white/5 px-2 py-1 rounded">Raw Prompt</div><pre class="bg-[#0a0a0a] p-6 rounded-lg overflow-x-auto text-green-400 font-mono text-sm leading-relaxed border border-white/10 shadow-2xl">$1</pre></div>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                    .replace(/\n\n/g, '<br/><br/>')
                    .replace(/- (.*)/g, '<li class="ml-6 list-disc mb-2 pl-2 marker:text-primary">$1</li>')
                  }} />
                </div>
              </div>
              
              <div className="bg-[#0a0a0a] p-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-sm text-gray-500 font-mono">Pronto para execução em ambientes de IA de alta capacidade.</span>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white font-bold"
                  onClick={handleCopy}
                >
                  <Copy className="w-4 h-4 mr-2" /> Copiar Tudo
                </Button>
              </div>
            </div>
            
            {/* Tags */}
            <div className="pt-8">
              <h4 className="text-xs text-gray-500 mb-4 uppercase tracking-widest font-bold">Matriz Temática</h4>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {content.tags.map((tag: string) => (
                  <span key={tag} className="text-sm font-medium text-gray-300 bg-zinc-900 px-4 py-2 rounded-md border border-white/5 hover:bg-zinc-800 hover:border-white/20 cursor-pointer transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Left Column: Media & Actions (Sticky Sidebar) */}
          <div className="col-span-1 lg:col-span-4 order-1 lg:order-2">
            <div className="sticky top-24 space-y-8">
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 group aspect-video lg:aspect-square">
                <img 
                  src={content.image} 
                  alt={content.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-xs font-bold tracking-widest text-primary mb-2 uppercase">{content.type.replace('_', ' ')}</div>
                  <h3 className="text-xl font-bold text-white leading-tight">{content.title.split('-')[0]}</h3>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button 
                  size="lg" 
                  className="w-full text-black bg-white hover:bg-gray-200 font-black text-lg py-7 rounded-lg shadow-xl hover:scale-[1.02] transition-transform"
                  onClick={handleCopy}
                >
                  <Copy className="w-5 h-5 mr-3" /> Extrair Prompt
                </Button>
                
                <div className="grid grid-cols-3 gap-3">
                  <Button 
                    variant="outline" 
                    className={`col-span-2 py-6 border-white/10 rounded-lg text-sm font-bold transition-colors ${isAdded ? 'bg-white/10 text-white' : 'bg-zinc-900 hover:bg-zinc-800 text-gray-300'}`}
                    onClick={() => setIsAdded(!isAdded)}
                  >
                    {isAdded ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Plus className="w-4 h-4 mr-2" />}
                    {isAdded ? 'No Arsenal' : 'Adicionar'}
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      className={`w-full h-full border-white/10 rounded-lg ${isLiked ? 'bg-primary/20 text-primary border-primary/50' : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800 hover:text-white'}`}
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="w-full h-full bg-zinc-900 hover:bg-zinc-800 border-white/10 text-gray-400 hover:text-white rounded-lg"
                      onClick={() => {
                        toast({ title: "Link copiado para compartilhar" });
                      }}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/80 border border-white/5 p-6 rounded-xl space-y-5 backdrop-blur-md">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Especificações Técnicas</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Engenharia Base</div>
                    <div className="text-sm text-gray-200 font-medium capitalize">{content.type.replace('_', ' ')}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Complexidade Estrutural</div>
                    <div className="text-sm text-gray-200 font-medium">{content.level}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500 mb-2">Ambiente de Execução Ideal</div>
                    <div className="flex flex-wrap gap-2">
                      {content.tools.map((tool: string) => (
                        <Badge key={tool} variant="outline" className="bg-black/50 border-white/10 text-gray-300 font-mono text-xs">
                          {tool}
                        </Badge>
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