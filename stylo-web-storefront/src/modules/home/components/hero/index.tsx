import Link from "next/link"
import Image from "next/image"

const HeroSection = () => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/placeholder.svg?height=600&width=1920"
          alt="Oliver Peoples 2025 Collection"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black/30">
        <div className="container mx-auto h-full flex flex-col justify-center px-4 md:px-6 lg:px-8">
          <div className="max-w-xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-4">Oliver Peoples 2025</h1>
            <p className="text-lg md:text-xl mb-8 font-light">
              Experience a refined blend of timeless sophistication and contemporary charm of excellent eyewear
            </p>
            <Link
              href="/collections/oliver-peoples"
              className="inline-block bg-white text-black px-8 py-3 font-medium hover:bg-gray-100 transition-colors"
            >
              Discover Oliver Peoples 2025
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection

