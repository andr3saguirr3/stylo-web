"use client"

import type React from "react"

import { useState, useEffect, Fragment } from "react"
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import { Search, X } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const pathname = usePathname()

  // Extract country code from pathname (e.g., /mx/collections/...)
  const countryCode = pathname.split("/")[1] || "mx"

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/${countryCode}/search?q=${encodeURIComponent(searchTerm.trim())}`)
      setIsOpen(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-700 hover:text-black focus:outline-none"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Search Products
                    </DialogTitle>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSearch} className="mt-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="search"
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-white focus:ring-black focus:border-black"
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="absolute right-2.5 bottom-2.5 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none"
                      >
                        Search
                      </button>
                    </div>
                  </form>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Popular searches</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Sunglasses", "Eyeglasses", "Ray-Ban", "Gucci", "Prada"].map((term) => (
                        <button
                          key={term}
                          className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
                          onClick={() => {
                            router.push(`/${countryCode}/search?q=${encodeURIComponent(term)}`)
                            setIsOpen(false)
                          }}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
