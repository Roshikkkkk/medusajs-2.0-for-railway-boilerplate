"use client"

import Card from "../card"
import { useEffect, useRef, useState } from "react"

type Category = {
  id: string
  name: string
  handle: string
}

type HeroSliderProps = {
  categories: Category[]
}

const HeroSlider = ({ categories }: HeroSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [centeredIndex, setCenteredIndex] = useState(0)

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)

      if (window.innerWidth < 768) {
        const cardWidth = 260 // ширина карточки на мобильных
        const gap = 20
        const scrollAmount = cardWidth + gap
        const centerPosition = scrollLeft + clientWidth / 2 - cardWidth / 2
        const newCenteredIndex = Math.floor(centerPosition / scrollAmount)
        setCenteredIndex(Math.max(0, Math.min(categories.length - 1, newCenteredIndex)))
      } else {
        setCenteredIndex(-1)
      }
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const cardWidth = window.innerWidth >= 768 ? 372 : 260
      const gap = 20
      const scrollAmount = cardWidth + gap
      const scrollDistance = window.innerWidth >= 768 ? 2 * scrollAmount : scrollAmount
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollDistance : scrollDistance,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const slider = sliderRef.current
    if (slider) {
      slider.addEventListener("scroll", checkScroll, { passive: true })
      checkScroll()
      return () => slider.removeEventListener("scroll", checkScroll)
    }
  }, [categories])

  return (
    <div className="w-full border-t border-transparent relative bg-[#F5F5F7]">
      <h2 className="text-[28px] md:text-[56px] font-bold pl-[45px] md:pl-[150px] mt-8 text-[#1D1D1F]">
        Популярні категорії
      </h2>
      <div
        ref={sliderRef}
        className="w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar px-[30px] py-[50px] mt-0 md:mt-[3vh] md:py-[75px] max-md:scroll-px-[15px]"
        style={{ scrollPadding: "100px" }}
      >
        <div className="w-max h-full flex items-center gap-5">
          <div className="w-[100px] max-md:w-[1px] h-full flex-shrink-0 snap-align-start" />
          {categories.map((category, index) => (
            <Card
              key={category.id}
              category={category}
              index={index}
              isCentered={index === centeredIndex}
            />
          ))}
          <div className="w-[100px] h-full flex-shrink-0 snap-align-start" />
        </div>
      </div>

      <div className="flex justify-center gap-2 pb-4 md:hidden">
        {categories.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === centeredIndex ? "bg-[#007AFF] scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className={`absolute left-6 top-[60%] -translate-y-1/2 z-30 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out md:flex hidden ${
          canScrollLeft
            ? "bg-[#212121]/50 backdrop-blur-md text-white hover:bg-gray-900/50"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className={`absolute right-6 top-[60%] -translate-y-1/2 z-30 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out md:flex hidden ${
          canScrollRight
            ? "bg-[#212121]/50 backdrop-blur-md text-white hover:bg-gray-900/50"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
          scroll-behavior: smooth;
        }
        @media (min-width: 768px) {
          .card:hover {
            transform: scale(1.05);
            transition: transform 0.3s ease-in-out;
          }
        }
      `}</style>
    </div>
  )
}

export default HeroSlider