import { sdk } from "@lib/config"

export const listCategories = async function () {
  return sdk.store.category
    .list(
      { fields: "id,name,handle,description,category_children" },
      { next: { tags: ["categories"] } }
    )
    .then(({ product_categories }) => product_categories)
}

export const getCategoriesList = async function (
  offset: number = 0,
  limit: number = 100
) {
  const response = await sdk.store.category.list(
    {
      limit,
      offset,
      fields: "id,name,handle,description",
    },
    // @ts-ignore
    { next: { tags: ["categories"] }, headers: { "Cache-Control": "no-cache" } }
  )
  console.log("Raw API response:", response.product_categories)
  return response
}

export const getCategoryByHandle = async function (categoryHandle: string[]) {
  return sdk.store.category.list(
    {
      handle: categoryHandle,
      fields: "id,name,handle,description",
    },
    { next: { tags: ["categories"] } }
  )
}