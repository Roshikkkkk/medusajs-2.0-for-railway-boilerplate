import { Metadata } from "next"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import HeroSlider from "@modules/home/components/hero-slider"
import HeroSliderProducts from "@modules/home/components/hero-slider-products"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getCategoriesList } from "@lib/data/categories"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)
  const { product_categories } = await getCategoriesList(0, 100) // Запрашиваем до 100 категорий

  // Отладка: выводим данные категорий
  console.log(
    "Categories from API:",
    product_categories.map(cat => ({
      name: cat.name,
      handle: cat.handle,
      description: cat.description,
    }))
  )

  if (!collections || !region || !product_categories) {
    return null
  }

  return (
    <>
      <div className="mb-3">
        <Hero />
      </div>
      <HeroSlider categories={product_categories} />
      <HeroSliderProducts categories={product_categories} />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}