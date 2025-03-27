import { Suspense } from "react";
import Link from "next/link";
import LocalizedClientLink from "../../../common/components/localized-client-link";
import CartButton from "../../../layout/components/cart-button";

const brands = [
  { name: "Ray-Ban", handle: "ray-ban" },
  { name: "Oakley", handle: "oakley" },
  { name: "Carrera", handle: "carrera" },
  { name: "Costa", handle: "costa" },
  { name: "Moscot", handle: "moscot" },
  { name: "Saint Laurent", handle: "saint-laurent" },
  { name: "Balenciaga", handle: "balenciaga" },
  { name: "Dolce & Gabbana", handle: "dolce" },
  { name: "Versace", handle: "versace" },
  { name: "Miu Miu", handle: "miu-miu" },
  { name: "Prada", handle: "prada" },
  { name: "Gucci", handle: "gucci" },
  { name: "Dior", handle: "dior" },
  { name: "Fendi", handle: "fendi" },
];

export default function Nav() {
  return (
    <nav className="w-full bg-white shadow-md py-4 flex justify-around items-center px-6 md:px-12 text-gray-700 text-sm">
      {/* Menú hamburguesa para móviles */}
      <div className="md:hidden">
        <button className="text-gray-700 focus:outline-none">☰</button>
      </div>
      
      {/* Marcas */}
      <div className="hidden md:flex gap-6 ">
        {brands.map((brand) => (
          <Link key={brand.handle} href={`/collections/${brand.handle}`} className="hover:text-black">
            {brand.name}
          </Link>
        ))}
      </div>
      
      {/* Cuenta y Carrito */}
      <div className="flex items-center gap-x-6">
        <LocalizedClientLink className="hover:text-black" href="/account" data-testid="nav-account-link">
          Account
        </LocalizedClientLink>
        <Suspense fallback={<LocalizedClientLink className="hover:text-black" href="/cart" data-testid="nav-cart-link">Cart (0)</LocalizedClientLink>}>
          <CartButton />
        </Suspense>
      </div>
    </nav>
  );
}
