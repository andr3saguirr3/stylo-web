import Link from "next/link"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Gucci-001402SA",
    price: 270.0,
    image: "/placeholder.svg?height=300&width=300",
    href: "/products/gucci-001402sa",
  },
  {
    id: 2,
    name: "Tom Ford-FT1104 Aurora",
    price: 299.2,
    image: "/placeholder.svg?height=300&width=300",
    href: "/products/tom-ford-ft1104-aurora",
  },
  {
    id: 3,
    name: "Tiffany TF42ID",
    price: 235.21,
    image: "/placeholder.svg?height=300&width=300",
    href: "/products/tiffany-tf42id",
  },
  {
    id: 4,
    name: "Saint Laurent SL 740",
    price: 382.5,
    image: "/placeholder.svg?height=300&width=300",
    href: "/products/saint-laurent-sl-740",
  },
  {
    id: 5,
    name: "Miu Miu MU OBYS",
    price: 249.62,
    image: "/placeholder.svg?height=300&width=300",
    href: "/products/miu-miu-mu-obys",
  },
  {
    id: 6,
    name: "Gucci 0018425",
    price: 416.25,
    image: "/placeholder.svg?height=300&width=300",
    href: "/products/gucci-0018425",
  },
]

const SunglassesOfTheWeek = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <h2 className="text-3xl font-light mb-8 text-center">Sunglasses of the Week</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {products.map((product) => (
          <Link key={product.id} href={product.href} className="group">
            <div className="bg-white p-4 mb-3 flex items-center justify-center">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={200}
                height={120}
                className="object-contain h-32 w-full group-hover:scale-105 transition-transform"
              />
            </div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SunglassesOfTheWeek

