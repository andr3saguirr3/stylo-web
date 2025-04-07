import Image from "next/image"
import Link from "next/link"

const brands = [
  { name: "PRADA", logo: "/LOGOS-11.png", href: "/collections/prada" },
  { name: "GUCCI", logo: "/LOGOS-18.png", href: "/collections/gucci" },
  { name: "Ray-ban", logo: "/LOGOS-14.png", href: "/collections/ray-ban" },
  { name: "OAKLEY", logo: "/LOGOS-12.png", href: "/collections/oakley" },
  { name: "DOLCE GABBANA", logo: "/LOGOS-06.png", href: "/collections/dolce-gabbana" },
  { name: "CARRERA", logo: "/LOGOS-09.png", href: "/collections/boss" },
  { name: "MIU MIU", logo: "/LOGOS-07.png", href: "/collections/tiffany" },
  { name: "VERSACE", logo: "/LOGOS-08.png", href: "/collections/versace" },
  { name: "BALENCIAGA", logo: "/LOGOS-10.png", href: "/collections/balenciaga" },
  { name: "SANINT LAURENT", logo: "/LOGOS-13.png", href: "/collections/saint-laurent" },
  { name: "LOUIS VUITON", logo: "/LOGOS-15.png", href: "/collections/louis" },
  { name: "DIOR", logo: "/LOGOS-16.png", href: "/collections/dior" },
  { name: "CHANNEL", logo: "/LOGOS-17.png", href: "/collections/chanel" },
  { name: "FENDI", logo: "/LOGOS-19.png", href: "/collections/fendi" },
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
              className="object-contain "
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FeaturedBrands

