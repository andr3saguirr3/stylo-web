"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type SortOptions = "price_asc" | "price_desc" | "created_at" | "title_asc" | "title_desc"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  {
    value: "created_at" as SortOptions,
    label: "Latest Arrivals",
  },
  {
    value: "title_asc" as SortOptions,
    label: "Name: A-Z",
  },
  {
    value: "title_desc" as SortOptions,
    label: "Name: Z-A",
  },
  {
    value: "price_asc" as SortOptions,
    label: "Price: Low → High",
  },
  {
    value: "price_desc" as SortOptions,
    label: "Price: High → Low",
  },
]

const SortProducts = ({ "data-testid": dataTestId, sortBy, setQueryParams }: SortProductsProps) => {
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <FilterRadioGroup<SortOptions>
      title="Sort by"
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
      data-testid={dataTestId}
    />
  )
}

export default SortProducts
