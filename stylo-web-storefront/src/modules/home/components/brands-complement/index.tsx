import Link from "next/link"
import Image from "next/image"

const BrandsComplement = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <h2 className="text-3xl font-light mb-4 text-center">Brands to Complement Your Style</h2>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Express your vision with STYLO and world-famous luxury brands. Show off your personality and enjoy unique styles
        and trendy designs from all over the world.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Tom Ford */}
        <div className="relative overflow-hidden group">
          <div className="aspect-[3/4] relative">
            <Image
              src="/placeholder.svg?height=600&width=450"
              alt="Tom Ford Eyewear"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 text-white">
              <h3 className="text-xl font-medium mb-2">Meet Timeless Elegance and Bold Style with Tom Ford</h3>
              <Link
                href="/brands/tom-ford"
                className="inline-block bg-white text-black px-6 py-2 mt-2 font-medium hover:bg-gray-100 transition-colors"
              >
                Shop Tom Ford
              </Link>
            </div>
          </div>
        </div>

        {/* Saint Laurent */}
        <div className="relative overflow-hidden group">
          <div className="aspect-[3/4] relative">
            <Image
              src="/placeholder.svg?height=600&width=450"
              alt="Saint Laurent Eyewear"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 text-white">
              <h3 className="text-xl font-medium mb-2">Experience the Perfection of Saint Laurent</h3>
              <Link
                href="/brands/saint-laurent"
                className="inline-block bg-white text-black px-6 py-2 mt-2 font-medium hover:bg-gray-100 transition-colors"
              >
                Shop Saint Laurent
              </Link>
            </div>
          </div>
        </div>

        {/* Andy Wolf */}
        <div className="relative overflow-hidden group">
          <div className="aspect-[3/4] relative">
            <Image
              src="/placeholder.svg?height=600&width=450"
              alt="Andy Wolf Eyewear"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 text-white">
              <h3 className="text-xl font-medium mb-2">Cherish the Excellence of Craftsmanship with Andy Wolf</h3>
              <Link
                href="/brands/andy-wolf"
                className="inline-block bg-white text-black px-6 py-2 mt-2 font-medium hover:bg-gray-100 transition-colors"
              >
                Shop Andy Wolf
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandsComplement

