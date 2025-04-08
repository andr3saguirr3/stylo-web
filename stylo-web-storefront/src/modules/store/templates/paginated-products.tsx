import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductCard from "@modules/products/components/product-card"
import { Pagination } from "@modules/store/components/pagination"
import type { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Get search query from URL if it exists
  const url = new URL(globalThis.location?.href || "http://localhost")
  const searchQuery = url.searchParams.get("q")?.toLowerCase()

  // Fetch products
  const {
    response: { products: fetchedProducts, count: totalCount },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  // Filter products by search query if needed
  let filteredProducts = fetchedProducts
  let filteredCount = totalCount

  if (searchQuery && searchQuery.length > 0) {
    console.log("Filtering by search query:", searchQuery)

    filteredProducts = fetchedProducts.filter((product) => {
      const title = product.title?.toLowerCase() || ""
      const description = product.description?.toLowerCase() || ""
      const tags = product.tags?.map((tag) => tag.value?.toLowerCase()).join(" ") || ""
      const handle = product.handle?.toLowerCase() || ""

      return (
        title.includes(searchQuery) ||
        description.includes(searchQuery) ||
        tags.includes(searchQuery) ||
        handle.includes(searchQuery)
      )
    })

    filteredCount = filteredProducts.length
    console.log(`Found ${filteredCount} products matching "${searchQuery}"`)
  }

  // Apply additional sorting if needed
  if (sortBy === "title_asc") {
    filteredProducts.sort((a, b) => (a.title || "").localeCompare(b.title || ""))
  } else if (sortBy === "title_desc") {
    filteredProducts.sort((a, b) => (b.title || "").localeCompare(a.title || ""))
  }

  const totalPages = Math.ceil(filteredCount / PRODUCT_LIMIT)

  return (
    <>
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">No products found</h2>
          <p className="text-gray-500">
            {searchQuery
              ? `No products match "${searchQuery}". Try a different search term.`
              : "Try adjusting your filter to find what you're looking for."}
          </p>
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-4" data-testid="products-list">
            {filteredProducts.map((p) => (
              <li key={p.id} className="h-full">
                <ProductCard product={p} region={region} />
              </li>
            ))}
          </ul>
          {totalPages > 1 && <Pagination data-testid="product-pagination" page={page} totalPages={totalPages} />}
        </>
      )}
    </>
  )
}
