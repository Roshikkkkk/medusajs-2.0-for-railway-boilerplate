  import { useState } from "react";
  import LocalizedClientLink from "@modules/common/components/localized-client-link";

  // Типизация для категории
  interface Category {
    id: string;
    name: string;
    handle: string;
    description?: string;
  }

  // Типизация пропсов карточки
  interface CardProps {
    category: Category;
    isCentered?: boolean; // Флаг для центральной карточки (для слайдера)
  }

  // Компонент карточки
  const Card: React.FC<CardProps> = ({ category, isCentered = false }) => {
    const [isLoading, setIsLoading] = useState(false);

    // Формируем URL изображения на основе handle
    const imageUrl = `/images/${category.handle}.jpg`;

    const handleClick = () => {
      setIsLoading(true);
    };

    return (
      <LocalizedClientLink
        href={`/categories/${category.handle}`}
        className={`w-[260px] h-[406px] md:w-[372px] md:h-[580px] snap-center flex-shrink-0 rounded-large flex flex-col items-center justify-end bg-cover bg-center relative overflow-hidden transition-transform duration-300 md:hover:scale-105 ${
          isCentered ? "max-md:scale-105" : ""
        }`}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundColor: imageUrl ? "transparent" : "#ffffff", // Белый фон вместо #e5e5e7
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
        onClick={handleClick}
      >
        {/* Название категории */}
        <span
          className="absolute top-4 left-4 text-[#1D1D1F] text-xl md:text-3xl font-bold text-left"
          style={{ textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)" }}
        >
          {category.name}
        </span>

        {/* Описание категории (если есть) */}
        {category.description && (
          <span
            className="absolute top-12 left-4 text-[#1D1D1F] text-base md:text-xl font-medium md:font-normal text-left max-w-[220px] md:max-w-[320px]"
            style={{ textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)" }}
          >
            {category.description}
          </span>
        )}

        {/* Кнопка-стрелка (видна только на мобильных) */}
        <button
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out max-md:flex hidden ${
            isCentered
              ? "bg-[#DEDEE2] text-[#626263] hover:bg-[#D0D0D4]"
              : "bg-[#ECECEE] text-[#B8B8B9]"
          }`}
        >
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
        </button>

        {/* Лоадер при загрузке */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[4px]">
            <div className="w-10 h-10 relative">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-[3px] h-2 bg-white rounded-[2px]"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${i * 30}deg) translateY(-12px)`,
                    opacity: 0.25 + (i / 12) * 0.75,
                    animation: `ios-spinner 1s linear infinite`,
                    animationDelay: `${(i * -0.0833).toFixed(3)}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Встроенные стили для анимации лоадера */}
        <style jsx>{`
          @keyframes ios-spinner {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0.25;
            }
          }
        `}</style>
      </LocalizedClientLink>
    );
  };

  export default Card;