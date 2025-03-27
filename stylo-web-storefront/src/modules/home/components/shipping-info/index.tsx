import Image from "next/image"

const ShippingInfo = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="w-full md:w-1/4">
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Shipping Information"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl font-light mb-2">Shipping Info</h2>
          <p className="text-gray-600">Free shipping is valid on orders of $95 or more</p>
        </div>
      </div>
    </div>
  )
}

export default ShippingInfo

