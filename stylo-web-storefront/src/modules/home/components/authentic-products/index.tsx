import Image from "next/image"

const AuthenticProducts = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="w-full md:w-1/3">
          <Image
            src="/placeholder.svg?height=300&width=300"
            alt="Authentic Products"
            width={300}
            height={300}
            className="mx-auto"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-3xl font-light mb-4">Only Authentic Products</h2>
          <p className="text-gray-600 mb-4">
            Over 150 brands at awesome prices and a guarantee of authenticity. We emphasize that all sunglasses and
            eyeglasses sold on STYLO.com are genuine brand-name products and are 100% Authentic.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthenticProducts

