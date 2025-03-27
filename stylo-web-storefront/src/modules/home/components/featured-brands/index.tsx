import Image from "next/image"
import Link from "next/link"

const brands = [
  { name: "PRADA", logo: "/placeholder.svg?height=60&width=120", href: "/brands/prada" },
  { name: "GUCCI", logo: "/placeholder.svg?height=60&width=120", href: "/brands/gucci" },
  { name: "Ray-ban", logo: "/placeholder.svg?height=60&width=120", href: "/brands/ray-ban" },
  { name: "OAKLEY", logo: "/placeholder.svg?height=60&width=120", href: "/brands/oakley" },
  { name: "DOLCE GABBANA", logo: "/placeholder.svg?height=60&width=120", href: "/brands/dolce-gabbana" },
  { name: "BOSS", logo: "/placeholder.svg?height=60&width=120", href: "/brands/boss" },
  { name: "TIFFANY & Co.", logo: "/placeholder.svg?height=60&width=120", href: "/brands/tiffany" },
  { name: "MONCLER", logo: "/placeholder.svg?height=60&width=120", href: "/brands/moncler" },
]

const FeaturedBrands = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {brands.map((brand) => (
          <Link
            key={brand.name}
            href={brand.href}
            className="flex items-center justify-center hover:opacity-80 transition-opacity"
          >
            <Image
              src={brand.logo || "/placeholder.svg"}
              alt={brand.name}
              width={120}
              height={60}
              className="object-contain h-12"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FeaturedBrands

