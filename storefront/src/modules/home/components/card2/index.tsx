import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useState } from "react"

type Category = {
  id: string
  name: string
  handle: string
}

const Card2 = ({ category, index, isCentered }: { category: Category; index: number; isCentered: boolean }) => {
  const [isLoading, setIsLoading] = useState(false)

  const images = [
    '/images/01.jpg',
    '/images/03.jpg',
    '/images/04.jpg',
    '/images/05.jpg',
    '/images/02.jpg',
    '/images/05.jpg',
  ]

  const imageUrl = images[index % images.length] || '/images/default.jpg'

  const handleClick = () => {
    setIsLoading(true)
  }

  return (
    <LocalizedClientLink
      href={`/categories/${category.handle}`}
      className={`w-[309px] h-[450px] md:w-[480px] md:h-[500px] snap-center flex-shrink-0 rounded-large flex flex-col items-center justify-end bg-cover bg-center relative overflow-hidden transition-transform duration-300 md:hover:scale-105 ${isCentered ? 'max-md:scale-105' : ''}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundColor: imageUrl ? 'transparent' : '#e5e5e7',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      }}
      onClick={handleClick}
    >
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[4px]">
          <div className="w-10 h-10 relative">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-[3px] h-2 bg-white rounded-[2px]"
                style={{
                  top: '50%',
                  left: '50%',
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
      <style jsx>{`
        @keyframes ios-spinner {
          0% { opacity: 1; }
          100% { opacity: 0.25; }
        }
      `}</style>
    </LocalizedClientLink>
  )
}

export default Card2