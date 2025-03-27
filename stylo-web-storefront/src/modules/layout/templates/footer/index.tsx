import Link from "next/link"
import type { FC } from "react"

const Footer: FC = () => {
  return (
    <footer className="bg-white pt-16 pb-12 border-t">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand and Help Center */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Link href="/" className="text-2xl font-bold">
                STYLO
                <br />
                <span className="text-sm font-normal">EYEWEAR</span>
              </Link>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">Help Center</h3>
              <p className="text-sm text-gray-600 mb-4">Find answers to all your questions</p>

              <h3 className="text-sm font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-4">Mon-Fri from 9AM-6PM</p>

              <h3 className="text-sm font-semibold mb-2">Email Us</h3>
              <p className="text-sm text-gray-600">info@stylo.com</p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/eyeglasses" className="text-sm text-gray-600 hover:text-gray-900">
                  Eyeglasses
                </Link>
              </li>
              <li>
                <Link href="/categories/sunglasses" className="text-sm text-gray-600 hover:text-gray-900">
                  Sunglasses
                </Link>
              </li>
              <li>
                <Link href="/categories/mens" className="text-sm text-gray-600 hover:text-gray-900">
                  Men's Eyewear
                </Link>
              </li>
              <li>
                <Link href="/categories/womens" className="text-sm text-gray-600 hover:text-gray-900">
                  Women's Eyewear
                </Link>
              </li>
              <li>
                <Link href="/categories/kids" className="text-sm text-gray-600 hover:text-gray-900">
                  Kids Eyewear
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-sm text-gray-600 hover:text-gray-900">
                  Shop by Brand
                </Link>
              </li>
              <li>
                <Link href="/shapes" className="text-sm text-gray-600 hover:text-gray-900">
                  Shop by Shape
                </Link>
              </li>
              <li>
                <Link href="/materials" className="text-sm text-gray-600 hover:text-gray-900">
                  Shop by Material
                </Link>
              </li>
              <li>
                <Link href="/colors" className="text-sm text-gray-600 hover:text-gray-900">
                  Shop by Color
                </Link>
              </li>
              <li>
                <Link href="/sizes" className="text-sm text-gray-600 hover:text-gray-900">
                  Shop by Size
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-sm text-gray-600 hover:text-gray-900">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Brands</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/brands/gucci" className="text-sm text-gray-600 hover:text-gray-900">
                  Gucci
                </Link>
              </li>
              <li>
                <Link href="/brands/cartier" className="text-sm text-gray-600 hover:text-gray-900">
                  Cartier
                </Link>
              </li>
              <li>
                <Link href="/brands/ic-berlin" className="text-sm text-gray-600 hover:text-gray-900">
                  Ic! Berlin
                </Link>
              </li>
              <li>
                <Link href="/brands/sabine-be" className="text-sm text-gray-600 hover:text-gray-900">
                  Sabine Be
                </Link>
              </li>
              <li>
                <Link href="/brands/cazal" className="text-sm text-gray-600 hover:text-gray-900">
                  Cazal
                </Link>
              </li>
              <li>
                <Link href="/brands/jf-rey" className="text-sm text-gray-600 hover:text-gray-900">
                  J.F. Rey
                </Link>
              </li>
              <li>
                <Link href="/brands/lofont" className="text-sm text-gray-600 hover:text-gray-900">
                  LoFont
                </Link>
              </li>
              <li>
                <Link href="/brands/gotti" className="text-sm text-gray-600 hover:text-gray-900">
                  Gotti
                </Link>
              </li>
              <li>
                <Link href="/brands/andy-wolf" className="text-sm text-gray-600 hover:text-gray-900">
                  Andy Wolf
                </Link>
              </li>
              <li>
                <Link href="/brands/saint-laurent" className="text-sm text-gray-600 hover:text-gray-900">
                  Saint Laurent
                </Link>
              </li>
              <li>
                <Link href="/brands/balenciaga" className="text-sm text-gray-600 hover:text-gray-900">
                  Balenciaga
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-sm text-gray-600 hover:text-gray-900">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sm text-gray-600 hover:text-gray-900">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-gray-600 hover:text-gray-900">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-gray-600 hover:text-gray-900">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-sm text-gray-600 hover:text-gray-900">
                  News & Releases
                </Link>
              </li>
              <li>
                <Link href="/authenticity" className="text-sm text-gray-600 hover:text-gray-900">
                  Authenticity
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-sm text-gray-600 hover:text-gray-900">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Payments and Social */}
          <div>
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-4">Payments</h3>
              <div className="flex flex-wrap gap-2">
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs">Credit Card</div>
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs">PayPal</div>
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs">Klarna</div>
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs">Afterpay</div>
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-xs">Affirm</div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-4">Social</h3>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Pinterest</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0a12 12 0 00-4.373 23.182c-.008-.092-.015-.184-.015-.277 0-.766.293-1.532.831-2.114.538-.582 1.269-.913 2.037-.913.768 0 1.5.33 2.037.913.538.582.831 1.348.831 2.114 0 .093-.007.185-.015.277A12 12 0 0012 0zm0 4a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">YouTube</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.048 1.407-.06 4.123-.06h.08c2.643 0 2.987.012 4.043.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.048 1.407-.06 4.123-.06h.08c2.643 0 2.987.012 4.043.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.048 1.407-.06 4.123-.06h.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Newsletter */}
            {/* <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2">Get our exclusive offers and latest news</h3>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="px-3 py-2 border border-gray-300 text-sm flex-grow"
                />
                <button type="button" className="bg-black text-white px-4 py-2 text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div> */}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} STYLO EYEWEAR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

