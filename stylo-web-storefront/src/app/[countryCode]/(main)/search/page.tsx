import { Suspense } from "react"
import type { Metadata } from "next"
import type { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import RefinementList from "@modules/store/components/refinement-list"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import SearchBar from "@modules/common/components/search-bar"

export const metadata: Metadata = {
  title: "Search Products",
  description: "Search for products in our store",
}

type Params = {
  searchParams: {
    q?: string
    sortBy?: SortOptions
    page?: string
  }
  params: {
    countryCode: string
  }
}

export default async function SearchPage({ searchParams, params }: Params) {
  const { q, sortBy, page } = searchParams
  const { countryCode } = params

  const pageNumber = page ? Number.parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-2xl-semi mb-4">{q ? `Search results for "${q}"` : "Search Products"}</h1>
          <SearchBar placeholder="Search products..." />
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts sortBy={sort} page={pageNumber} countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}

