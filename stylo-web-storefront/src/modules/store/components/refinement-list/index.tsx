"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import SortProducts, { type SortOptions } from "./sort-products"
import { ChevronDown, ChevronUp } from 'lucide-react'

type RefinementListProps = {
  sortBy?: SortOptions
}

const RefinementList = ({ sortBy = "created_at" }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    sort: true,
  })

  const setQueryParams = (name: string, value: SortOptions) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === "created_at") {
      params.delete("sortBy")
    } else {
      params.set("sortBy", value)
    }

    // Use shallow routing to avoid full page reload
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="w-full small:w-[250px] small:min-w-[250px] small:pr-6 mb-8 small:mb-0">
      <div className="flex flex-col gap-4 sticky top-20">
        {/* Sort section */}
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-4 bg-gray-50 text-gray-800 font-medium text-sm"
            onClick={() => toggleSection("sort")}
          >
            <span>Sort by</span>
            {openSections.sort ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {openSections.sort && (
            <div className="p-4">
              <SortProducts
                sortBy={sortBy}
                setQueryParams={setQueryParams}
                data-testid="refinement-list-sort-products"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RefinementList
