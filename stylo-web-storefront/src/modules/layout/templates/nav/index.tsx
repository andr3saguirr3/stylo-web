import { Suspense } from "react"
import Link from "next/link"
import { User, ChevronDown } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SearchModal from "@modules/common/components/search-modal"

const brands = [
  { name: "Ray-Ban", handle: "ray-ban" },
  { name: "Oakley", handle: "oakley" },
  { name: "Carrera", handle: "carrera" },
  { name: "Costa", handle: "costa" },
  { name: "Moscot", handle: "moscot" },
  { name: "Saint Laurent", handle: "saint-laurent" },
  { name: "Balenciaga", handle: "balenciaga" },
  { name: "Dolce & Gabbana", handle: "dolce" },
  { name: "Versace", handle: "versace" },
  { name: "Miu Miu", handle: "miu-miu" },
  { name: "Prada", handle: "prada" },
  { name: "Gucci", handle: "gucci" },
  { name: "Dior", handle: "dior" },
  { name: "Fendi", handle: "fendi" },
]

const mainCategories = [
  { name: "Eyeglasses", path: "/categories/eyeglasses" },
  { name: "Sunglasses", path: "/categories/sunglasses" },
]

export default function Nav() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            STYLO
            <br />
            {/* <span className="text-sm font-normal">EYEWEAR</span> */}
          </Link>

          {/* Main Categories - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {mainCategories.map((category) => (
              <Link key={category.path} href={category.path} className="text-sm font-medium hover:text-gray-600">
                {category.name}
              </Link>
            ))}

            {/* Our Brands Dropdown */}
            <div className="relative group">
              <button className="text-sm font-medium hover:text-gray-600 flex items-center">
                Our Brands
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>

              {/* Dropdown Menu - Two Columns, No Scrolling */}
              <div className="absolute left-0 top-full z-10 bg-white shadow-lg border border-gray-200 py-4 px-2 w-96 hidden group-hover:block">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {brands.map((brand) => (
                    <Link
                      key={brand.handle}
                      href={`/collections/${brand.handle}`}
                      className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 block"
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            {/* Search Icon */}
            <SearchModal />

            {/* Cart Button - Using the existing component */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="text-gray-700 hover:text-black"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>

            {/* Account Link - Using LocalizedClientLink */}
            <LocalizedClientLink
              href="/account"
              className="text-gray-700 hover:text-black"
              data-testid="nav-account-link"
            >
              <User className="h-5 w-5" />
            </LocalizedClientLink>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700 hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

