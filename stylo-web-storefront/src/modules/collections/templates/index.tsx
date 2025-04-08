import { Suspense } from "react"
import { notFound } from "next/navigation"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import type { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import type { HttpTypes } from "@medusajs/types"
import SearchBar from "@modules/common/components/search-bar"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? Number.parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!collection) {
    return notFound()
  }

  return (
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl-semi mb-2">{collection.title}</h1>
          <SearchBar placeholder={`Search in ${collection.title}...`} collectionId={collection.id} />
        </div>
        <Suspense fallback={<SkeletonProductGrid numberOfProducts={collection.products?.length} />}>
          <PaginatedProducts sortBy={sort} page={pageNumber} collectionId={collection.id} countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}

