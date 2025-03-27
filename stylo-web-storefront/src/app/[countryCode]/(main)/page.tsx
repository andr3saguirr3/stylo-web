import HeroSection from "@modules/home/components/hero"
import FeaturedBrands from "@modules/home/components/featured-brands"
import SunglassesOfTheWeek from "@modules/home/components/sunglasses-of-week"
import BrandsComplement from "@modules/home/components/brands-complement"
import AuthenticProducts from "@modules/home/components/authentic-products"
import ShippingInfo from "@modules/home/components/shipping-info"

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="py-12">
        <FeaturedBrands />
      </div>
      <div className="py-12 bg-gray-50">
        <SunglassesOfTheWeek />
      </div>
      <div className="py-12">
        <BrandsComplement />
      </div>
      <div className="py-12 bg-gray-50">
        <AuthenticProducts />
      </div>
      <div className="py-8">
        <ShippingInfo />
      </div>
    </>
  )
}

