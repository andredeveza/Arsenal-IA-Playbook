import MainLayout from "@/components/layout/MainLayout";
import { allContent } from "@/data/mockData";
import ContentCard from "@/components/shared/ContentCard";
import { useUserStore } from "@/store/userStore";
import { BookmarkIcon } from "lucide-react";

export default function MyList() {
  const { favorites } = useUserStore();
  const items = favorites.map(id => allContent.find(c => c.id === id)).filter(Boolean) as any[];

  return (
    <MainLayout>
      <div className="pt-32 pb-20 px-4 md:px-12 min-h-screen">
        <div className="max-w-7xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight flex items-center">
            <BookmarkIcon className="w-8 h-8 mr-4 text-primary" />
            Meu Arsenal
          </h1>
          <p className="text-gray-400 text-lg">Seus conteúdos e frameworks salvos para acesso rápido.</p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-white/5 rounded-2xl bg-zinc-900/20">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <BookmarkIcon className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Seu arsenal está vazio</h3>
            <p className="text-gray-400 max-w-md">Navegue pela biblioteca e adicione itens à sua lista para ter acesso rápido aos prompts e frameworks que você mais usa.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {items.map(item => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}