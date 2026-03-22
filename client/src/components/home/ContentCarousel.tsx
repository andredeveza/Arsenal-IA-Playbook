import { Category } from "@/data/mockData";
import ContentCard from "../shared/ContentCard";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ContentCarouselProps {
  category: Category;
}

export default function ContentCarousel({ category }: ContentCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });
  
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    
    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!category || !category.items || !category.items.length) return null;

  return (
    <div 
      className="relative py-4 md:py-6 pl-4 md:pl-12 group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4 px-2 hover:text-gray-300 transition-colors cursor-pointer inline-flex items-center group/title">
        {category.title}
        <ChevronRight className="w-5 h-5 ml-1 opacity-0 group-hover/title:opacity-100 transition-opacity text-primary" />
      </h2>
      
      <div className="relative">
        <div className="overflow-visible" ref={emblaRef}>
          <div className="flex gap-2 md:gap-3 py-4 md:py-8 pr-12">
            {category.items.map((item) => (
              <div key={item.id} className="flex-none">
                <ContentCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          className={cn(
            "absolute left-0 top-0 bottom-0 w-12 z-20 bg-black/60 hover:bg-black/80 flex items-center justify-center transition-all duration-300 opacity-0",
            isHovered && !prevBtnDisabled ? "opacity-100" : "pointer-events-none"
          )}
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
        >
          <ChevronLeft className="w-8 h-8 text-white transition-transform hover:scale-125" />
        </button>

        <button
          className={cn(
            "absolute right-0 top-0 bottom-0 w-12 z-20 bg-black/60 hover:bg-black/80 flex items-center justify-center transition-all duration-300 opacity-0",
            isHovered && !nextBtnDisabled ? "opacity-100" : "pointer-events-none"
          )}
          onClick={scrollNext}
          disabled={nextBtnDisabled}
        >
          <ChevronRight className="w-8 h-8 text-white transition-transform hover:scale-125" />
        </button>
      </div>
    </div>
  );
}