"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { StoreProduct, StoreRegion } from "@medusajs/types";

export default function ProductCard({
  product,
  region,
}: {
  product: StoreProduct;
  region: StoreRegion;
}) {
  const [hover, setHover] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const price = product.variants?.[0]?.calculated_price?.calculated_amount || "-";

  return (
    <div
      className="relative w-40 h-64 bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer p-2 flex flex-col items-center text-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href={`/products/${product.handle}`}>
        <div className="w-32 h-32 relative">
          {product.images?.length > 1 ? (
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
              src={product.thumbnail || "/placeholder.jpg"}
              alt={product.title}
              fill
              className="object-contain"
            />
          )}
        </div>
      </Link>
      <div className="mt-2 flex flex-col items-center w-full">
        <h3 className="text-xs font-medium text-gray-800 truncate w-32">
          {product.title}
        </h3>
        <p className="text-gray-600 mt-1 font-semibold">{price}</p>
        <div className="mt-2 flex items-center gap-2 w-full justify-center">
          <input
            type="number"
            value={quantity}
            min="1"
            className="w-12 text-center border rounded"
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          />
          <button className="bg-black text-white px-3 py-1 text-xs rounded hover:bg-gray-800 w-full max-w-[100px]">
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
