"use client";

import Card from "../card";
import { useEffect, useRef, useState } from "react";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { useParams } from "next/navigation";

type Category = {
  id: string;
  name: string;
  handle: string;
  description?: string;
};

type HeroSliderProps = {
  categories: Category[];
  countryCode?: string; // Добавляем countryCode как опциональный пропс
};

const HeroSlider: React.FC<HeroSliderProps> = ({ categories, countryCode }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [centeredIndex, setCenteredIndex] = useState(0);

  // Ограничиваем до 7 категорий
  const displayedCategories = categories.slice(0, 7);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);

      if (window.innerWidth < 768) {
        const cardWidth = 309;
        const gap = 20;
        const scrollAmount = cardWidth + gap;
        const centerPosition = scrollLeft + clientWidth / 2 - cardWidth / 2;
        const newCenteredIndex = Math.floor(centerPosition / scrollAmount);
        setCenteredIndex(Math.max(0, Math.min(displayedCategories.length - 1, newCenteredIndex)));
      } else {
        setCenteredIndex(-1);
      }
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const cardWidth = window.innerWidth >= 768 ? 480 : 309;
      const gap = 20;
      const scrollAmount = cardWidth + gap;
      const scrollDistance = window.innerWidth >= 768 ? 2 * scrollAmount : scrollAmount;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollDistance : scrollDistance,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", checkScroll, { passive: true });
      checkScroll();
      return () => slider.removeEventListener("scroll", checkScroll);
    }
  }, [displayedCategories]);

  // Если countryCode не передан через пропсы, берём из useParams
  const params = useParams();
  const currentCountryCode = countryCode || (params?.countryCode as string);

  return (
    <div className="w-full border-t border-transparent relative bg-[#F5F5F7]">
      <h2 className="text-[24px] md:text-[28px] font-bold pl-[45px] md:pl-[150px] mt-8 text-[#1D1D1F]">
        Популярні категорії
      </h2>
      <div
        ref={sliderRef}
        className="w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar px-[30px] py-[50px] mt-0 md:mt-[3vh] md:py-[75px] max-md:scroll-px-[15px]"
        style={{ scrollPadding: "100px" }}
      >
        <div className="w-max h-full flex items-center gap-5">
          <div className="w-[100px] max-md:w-[1px] h-full flex-shrink-0 snap-align-start" />
          {displayedCategories.map((category, index) => (
            <Card
              key={category.id}
              category={category}
              isCentered={index === centeredIndex}
            />
          ))}
          <div className="w-[100px] h-full flex-shrink-0 snap-align-start" />
        </div>
      </div>

      <div className="flex justify-center items-center h-8 pb-4 md:hidden">
        <div className="relative flex justify-center items-center">
          <div
            className={`absolute flex justify-center items-center gap-2 transition-all duration-300 ease-in-out ${
              centeredIndex === displayedCategories.length - 1
                ? "opacity-0 scale-95 pointer-events-none"
                : "opacity-100 scale-100"
            }`}
          >
            {displayedCategories.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === centeredIndex ? "bg-[#007AFF] scale-125" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
          <LocalizedClientLink
            href={`/[countryCode]/store`}
            as={`/${currentCountryCode}/store`}
            className={`flex items-center gap-1 px-5 py-2 bg-[#DEDEE2] text-[#626263] rounded-full text-[15px] font-medium transition-all duration-300 ease-in-out hover:bg-[#D0D0D4] ${
              centeredIndex === displayedCategories.length - 1
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            Усі категорії
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </LocalizedClientLink>
        </div>
      </div>

      <div className="flex justify-center gap-4 pb-8 md:flex hidden" style={{ marginLeft: "1500px" }}>
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out ${
            canScrollLeft
              ? "bg-[#DEDEE2] text-[#626263] hover:bg-[#D0D0D4]"
              : "bg-[#ECECEE] text-[#B8B8B9]"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out ${
            canScrollRight
              ? "bg-[#DEDEE2] text-[#626263] hover:bg-[#D0D0D4]"
              : "bg-[#ECECEE] text-[#B8B8B9]"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;