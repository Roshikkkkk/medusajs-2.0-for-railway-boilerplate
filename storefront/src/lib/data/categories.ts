import { sdk } from "@lib/config"
import { cache } from "react"

export const listCategories = cache(async function () {
  return sdk.store.category
    .list(
      { fields: "id,name,handle,description,+category_children" },
      { next: { tags: ["categories"] } }
    )
    .then(({ product_categories }) => product_categories)
})

export const getCategoriesList = cache(async function (
  offset: number = 0,
  limit: number = 100
) {
  return sdk.store.category.list(
    // @ts-ignore
    { limit, offset, fields: "id,name,handle,description" },
    { next: { tags: ["categories"] } }
  )
})

export const getCategoryByHandle = cache(async function (
  categoryHandle: string[]
) {
  return sdk.store.category.list(
    // @ts-ignore
    { handle: categoryHandle, fields: "id,name,handle,description" },
    { next: { tags: ["categories"] } }
  )
})