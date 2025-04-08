"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import type { StoreProduct, StoreRegion } from "@medusajs/types"
import { addToCart } from "@lib/data/cart"
import { useParams } from "next/navigation"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { toast } from "@medusajs/ui"

export default function ProductCard({
  product,
  region,
}: {
  product: StoreProduct
  region: StoreRegion
}) {
  const [hover, setHover] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const { countryCode } = useParams()

  const price = product.variants?.[0]?.calculated_price?.calculated_amount || "-"
  const formattedPrice = typeof price === "number" ? `$${price.toFixed(2)}` : price
  const variantId = product.variants?.[0]?.id

  const handleAddToCart = async () => {
    if (!variantId) return

    setIsAdding(true)
    try {
      await addToCart({
        variantId,
        quantity,
        countryCode: countryCode as string,
      })
      toast.success(`Added ${product.title} to cart`)
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Failed to add to cart")
    } finally {
      setIsAdding(false)
    }
  }

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 10))
  }

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1))
  }

  return (
    <div
      className="relative w-full bg-white border border-gray-100 rounded-md overflow-hidden transition-all hover:shadow-md cursor-pointer flex flex-col h-full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href={`/products/${product.handle}`} className="block w-full p-3 pb-0">
        <div className="w-full h-40 relative mb-3">
          {product.images && product.images.length > 1 ? (
            <>
              <Image
                src={hover ? product.images[1].url : product.images[0].url}
                alt={product.title}
                fill
                className="object-contain transition-opacity duration-300"
              />
            </>
          ) : (
            <Image
              src={product.thumbnail || "/placeholder.svg?height=300&width=300"}
              alt={product.title}
              fill
              className="object-contain"
            />
          )}
        </div>
        <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-1">{product.title}</h3>
        <p className="text-gray-700 font-semibold mb-2">{formattedPrice}</p>
      </Link>

      <div className="mt-auto p-3 pt-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center border rounded-md">
            <button
              onClick={decrementQuantity}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              disabled={quantity <= 1}
              type="button"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2 py-1 w-6 text-center text-sm">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100"
              disabled={quantity >= 10}
              type="button"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAdding || !variantId}
            className="flex items-center justify-center gap-1 bg-black text-white px-3 py-1.5 rounded hover:bg-gray-800 transition-colors w-full disabled:bg-gray-400 text-sm"
            type="button"
          >
            {isAdding ? (
              "Adding..."
            ) : (
              <>
                <ShoppingCart className="w-3 h-3" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

