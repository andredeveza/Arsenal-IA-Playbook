import MainLayout from "@/components/layout/MainLayout";
import HeroBanner from "@/components/home/HeroBanner";
import ContentCarousel from "@/components/home/ContentCarousel";
import { heroContent, homeCategories } from "@/data/mockData";
import { useEffect } from "react";

export default function Home() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <div className="pb-20">
        <HeroBanner content={heroContent} />
        
        <div className="mt-[-80px] relative z-20 flex flex-col gap-2 md:gap-4">
          {homeCategories.map((category) => (
            <ContentCarousel key={category.id} category={category} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}