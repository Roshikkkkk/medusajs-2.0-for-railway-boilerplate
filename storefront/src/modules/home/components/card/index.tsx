import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Loader } from "@medusajs/icons"
import { useState } from "react"

type Category = {
  id: string
  name: string
  handle: string
}

const Card = ({ category, index, isCentered }: { category: Category; index: number; isCentered: boolean }) => {
  const [isLoading, setIsLoading] = useState(false)

  const images = [
    '/images/5.jpg',
    '/images/3.jpg',
    '/images/1.jpg',
    '/images/4.jpg',
    '/images/3.jpg',
    '/images/2.jpg',
  ]

  const imageUrl = images[index % images.length] || '/images/default.jpg'
  console.log(`Card ${category.name}: image=${imageUrl}`); // Отладка изображения

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log(`Navigating to: /categories/${category.handle}`); // Отладка ссылки
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div
      className={`w-[309px] h-[450px] md:w-[400px] md:h-[500px] snap-center flex-shrink-0 rounded-large flex flex-col items-center justify-end bg-cover bg-center relative overflow-hidden transition-transform duration-300 shadow-md ${isCentered ? 'max-md:scale-105' : ''}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundColor: imageUrl ? 'transparent' : '#e5e5e7',
      }}
    >
      <LocalizedClientLink
        href={`/categories/${category.handle}`}
        className="w-[calc(100%-20px)] text-center bg-black/20 backdrop-blur-md text-white px-4 py-3 rounded-large hover:bg-white/20 transition-colors mb-4 flex items-center justify-center min-h-[48px] select-none"
        onClick={handleClick}
      >
        {isLoading ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          category.name
        )}
      </LocalizedClientLink>
    </div>
  )
}

export default Card