import MainLayout from "@/components/layout/MainLayout";
import HeroBanner from "@/components/home/HeroBanner";
import ContentCarousel from "@/components/home/ContentCarousel";
import { heroContent, homeCategories, allContent } from "@/data/mockData";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

export default function Home() {
  const { favorites, history } = useUserStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dynamically create rows based on user interaction
  const displayCategories = [...homeCategories];

  if (history.length > 0) {
    const historyItems = history.map(id => allContent.find(c => c.id === id)).filter(Boolean) as any[];
    if (historyItems.length > 0) {
      displayCategories.unshift({
        id: "continue-watching",
        title: "Continue Explorando",
        items: historyItems,
      });
    }
  }

  if (favorites.length > 0) {
    const favoriteItems = favorites.map(id => allContent.find(c => c.id === id)).filter(Boolean) as any[];
    if (favoriteItems.length > 0) {
      displayCategories.splice(1, 0, {
        id: "my-list",
        title: "Seu Arsenal",
        items: favoriteItems,
      });
    }
  }

  return (
    <MainLayout>
      <div className="pb-20">
        <HeroBanner content={heroContent} />
        
        <div className="mt-[-80px] md:mt-[-120px] relative z-20 flex flex-col gap-2 md:gap-4">
          {displayCategories.map((category) => (
            <ContentCarousel key={category.id} category={category} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}