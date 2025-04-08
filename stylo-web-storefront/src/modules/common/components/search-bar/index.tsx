"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Search } from 'lucide-react'

type SearchBarProps = {
  placeholder?: string
  collectionId?: string
}

const SearchBar = ({ placeholder = "Search products...", collectionId }: SearchBarProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())

    if (query.trim()) {
      params.set("q", query.trim())
    } else {
      params.delete("q")
    }

    // Use shallow routing to avoid full page reload
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="search"
        className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white focus:ring-black focus:border-black"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        data-testid="search-input"
      />
      <button
        type="submit"
        className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1.5 rounded-md hover:bg-gray-800 focus:outline-none text-sm"
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar
