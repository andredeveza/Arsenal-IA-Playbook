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
  // Configured to be more mobile friendly with drag tracking
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
    breakpoints: {
      '(min-width: 768px)': { dragFree: false }
    }
  });
  
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    setScrollSnaps(emblaApi.scrollSnapList());
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
      className="relative py-4 md:py-8 pl-4 md:pl-16 group/carousel mb-4 md:mb-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-baseline gap-4 mb-2 md:mb-6 px-2">
        <h2 className="text-xl md:text-3xl font-black text-white hover:text-gray-300 transition-colors cursor-pointer inline-flex items-center group/title tracking-tight">
          {category.title}
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 ml-1 opacity-0 -translate-x-4 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all text-primary hidden md:block" />
        </h2>
        <div className="hidden md:block h-[2px] flex-grow bg-gradient-to-r from-white/10 to-transparent ml-4 rounded-full"></div>
      </div>
      
      <div className="relative">
        <div className="overflow-hidden md:overflow-visible" ref={emblaRef}>
          <div className="flex gap-3 md:gap-4 py-4 md:py-8 pr-6 md:pr-24 touch-pan-y">
            {category.items.map((item) => (
              <div key={item.id} className="flex-none">
                <ContentCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Pagination Indicators (Visible only on touch/small screens) */}
        <div className="flex md:hidden justify-center gap-1.5 mt-2 pr-4">
          {scrollSnaps.slice(0, 5).map((_, index) => (
            <div 
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === selectedIndex ? "w-4 bg-primary" : "w-1.5 bg-white/20"
              )}
            />
          ))}
          {scrollSnaps.length > 5 && (
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          )}
        </div>

        {/* Navigation Buttons - Visible on hover on desktop */}
        <button
          className={cn(
            "hidden md:flex absolute left-0 top-0 bottom-0 w-16 z-20 bg-gradient-to-r from-background via-background/80 to-transparent items-center justify-center transition-all duration-500 opacity-0 group-hover/carousel:opacity-100",
            prevBtnDisabled ? "opacity-0 pointer-events-none" : ""
          )}
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
        >
          <div className="w-10 h-10 rounded-full bg-black/50 border border-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-colors hover:scale-110 active:scale-95">
            <ChevronLeft className="w-6 h-6 transition-transform" />
          </div>
        </button>

        <button
          className={cn(
            "hidden md:flex absolute right-0 top-0 bottom-0 w-16 md:w-24 z-20 bg-gradient-to-l from-background via-background/80 to-transparent items-center justify-center transition-all duration-500 opacity-0 group-hover/carousel:opacity-100",
            nextBtnDisabled ? "opacity-0 pointer-events-none" : ""
          )}
          onClick={scrollNext}
          disabled={nextBtnDisabled}
        >
          <div className="w-10 h-10 rounded-full bg-black/50 border border-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black transition-colors hover:scale-110 active:scale-95">
            <ChevronRight className="w-6 h-6 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
}