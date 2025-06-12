import { Metadata } from "next"
import { revalidateTag } from "next/cache"
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
  revalidateTag("categories")
  revalidateTag("collections")

  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)
  const { product_categories } = await getCategoriesList(0, 100)

  console.log(
    "Categories from API:",
    product_categories.map((cat) => ({
      name: cat.name,
      handle: cat.handle,
      description: cat.description,
    }))
  )
  console.log(
    "Collections from API:",
    collections?.map((col) => ({
      id: col.id,
      title: col.title,
      handle: col.handle,
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
      <div className="mb-3">
        <HeroSlider categories={product_categories} />
      </div>
      <HeroSliderProducts
        categories={product_categories}
        collections={collections}
      />
      <div className="py-12"></div>
    </>
  )
}