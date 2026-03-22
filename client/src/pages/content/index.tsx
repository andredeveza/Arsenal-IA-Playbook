import { useRoute } from "wouter";
import MainLayout from "@/components/layout/MainLayout";
import { allContent } from "@/data/mockData";
import { Play, Plus, Check, Share2, ThumbsUp, Copy, ExternalLink, ArrowLeft } from "lucide-react";
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
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content.content);
    toast({
      title: "Copiado para a área de transferência",
      description: "Agora você pode colar o conteúdo na sua ferramenta de IA preferida.",
    });
  };

  return (
    <MainLayout>
      <div className="pt-20 md:pt-24 pb-20 px-4 md:px-12 max-w-7xl mx-auto">
        {/* Back Button for mobile */}
        <button 
          onClick={() => window.history.back()}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column: Media & Actions */}
          <div className="col-span-1 space-y-6">
            <div className="relative rounded-lg overflow-hidden shadow-2xl border border-white/10 group aspect-video lg:aspect-auto lg:h-[400px]">
              <img 
                src={content.image} 
                alt={content.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent lg:hidden" />
            </div>

            <div className="flex flex-col gap-3">
              <Button 
                size="lg" 
                className="w-full text-black bg-white hover:bg-gray-200 font-bold text-lg py-6"
                onClick={handleCopy}
              >
                <Copy className="w-5 h-5 mr-2" /> Copiar Conteúdo
              </Button>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 bg-white/5 hover:bg-white/10 border-white/10 text-white"
                  onClick={() => setIsAdded(!isAdded)}
                >
                  {isAdded ? <Check className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
                  Minha Lista
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className={`w-12 shrink-0 border-white/10 ${isLiked ? 'bg-primary/20 text-primary border-primary/50' : 'bg-white/5 text-white hover:bg-white/10'}`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <ThumbsUp className="w-5 h-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-12 shrink-0 bg-white/5 hover:bg-white/10 border-white/10 text-white"
                  onClick={() => {
                    toast({ title: "Link copiado para compartilhar" });
                  }}
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-lg space-y-4">
              <h4 className="font-bold text-gray-300 border-b border-white/10 pb-2">Informações</h4>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Tipo:</span>
                  <span className="text-white capitalize">{content.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Nível:</span>
                  <span className="text-white">{content.level}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-500">Ferramentas:</span>
                  <div className="text-right flex flex-col gap-1 items-end">
                    {content.tools.map((tool: string) => (
                      <Badge key={tool} variant="secondary" className="bg-white/10 text-white hover:bg-white/20 text-xs py-0">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Content */}
          <div className="col-span-1 lg:col-span-2 space-y-8">
            <div>
              <div className="flex gap-2 items-center mb-3">
                <Badge className="bg-primary/20 text-primary border-primary/50 font-bold">
                  {content.type.toUpperCase()}
                </Badge>
                {content.isNew && (
                  <Badge variant="destructive" className="bg-green-600 font-bold">NOVO</Badge>
                )}
                {content.isPremium && (
                  <Badge variant="secondary" className="bg-gradient-to-r from-amber-500 to-amber-700 text-white border-0 font-bold">
                    PREMIUM
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
                {content.title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm font-semibold mb-6">
                <span className="text-green-500 font-bold">98% Relevância</span>
                <span className="text-gray-400 border border-gray-600 px-1.5 py-0.5 rounded">2024</span>
              </div>
              
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                {content.description}
              </p>
            </div>

            {/* Markdown Content Area (Simulated) */}
            <div className="glass-panel p-6 md:p-8 rounded-lg border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
              <h3 className="text-xl font-bold mb-6 text-white flex items-center">
                <ExternalLink className="w-5 h-5 mr-2 text-primary" />
                Conteúdo Completo
              </h3>
              
              <div className="prose prose-invert max-w-none prose-pre:bg-black prose-pre:border prose-pre:border-white/10 prose-headings:text-white prose-a:text-primary">
                {/* Normally we'd use a markdown parser here, but for mockup we simulate it */}
                <div dangerouslySetInnerHTML={{ __html: content.content
                  .replace(/# (.*)/g, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
                  .replace(/## (.*)/g, '<h2 class="text-xl font-bold mt-6 mb-3 text-gray-200">$1</h2>')
                  .replace(/```markdown([\s\S]*?)```/g, '<div class="relative"><div class="absolute right-2 top-2 text-xs text-gray-500 font-mono">markdown</div><pre class="bg-black/50 p-4 rounded-md my-4 overflow-x-auto text-gray-300 font-mono text-sm border border-white/5">$1</pre></div>')
                  .replace(/\n\n/g, '<br/><br/>')
                  .replace(/1\. (.*)/g, '<li class="ml-4 list-decimal">$1</li>')
                  .replace(/2\. (.*)/g, '<li class="ml-4 list-decimal">$1</li>')
                  .replace(/3\. (.*)/g, '<li class="ml-4 list-decimal">$1</li>')
                }} />
              </div>
            </div>
            
            {/* Tags */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="text-sm text-gray-400 mb-3 uppercase tracking-wider font-bold">Tags Relacionadas</h4>
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag: string) => (
                  <span key={tag} className="text-sm text-gray-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 cursor-pointer transition-colors">
                    #{tag.toLowerCase().replace(' ', '')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}