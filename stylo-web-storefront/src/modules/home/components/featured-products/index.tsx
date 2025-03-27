"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { useInView } from "react-intersection-observer";

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

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const lastVisibleBrand = useRef<number | null>(null); // Última marca cargada

  // Cargar desde caché si existe
  useEffect(() => {
    const cachedProducts = sessionStorage.getItem("cachedProducts");
    if (cachedProducts) {
      setProducts(JSON.parse(cachedProducts));
    }
  }, []);

  async function fetchProducts(brandHandle: string, index: number) {
    if (products[brandHandle]) return; // Evita recargar si ya está en caché

    setLoading((prev) => ({ ...prev, [brandHandle]: true }));

    try {
      const { data } = await axios.get(
        `http://localhost:9000/store/collections?handle=${encodeURIComponent(brandHandle)}`,
        {
          headers: {
            "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
          },
        }
      );

      if (data.collections?.length > 0) {
        const collectionId = data.collections[0].id;

        const { data: productsData } = await axios.get("http://localhost:9000/store/products", {
          params: {
            "collection_id[]": collectionId,
            region_id: "reg_01JPDTD9QAYP6TKN12J272HJD3",
          },
          headers: {
            "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
          },
        });

        setProducts((prev) => {
          const updatedProducts = { ...prev, [brandHandle]: productsData.products || [] };
          sessionStorage.setItem("cachedProducts", JSON.stringify(updatedProducts)); // Guardar en caché
          return updatedProducts;
        });

        lastVisibleBrand.current = index; // Guardar el último índice cargado
      }
    } catch (error) {
      console.error(`Error fetching products for ${brandHandle}:`, error);
    } finally {
      setLoading((prev) => ({ ...prev, [brandHandle]: false }));
    }
  }

  return (
    <div className="relative bg-gray-100 px-4 py-6 bottom-12">
      {brands.map((brand, index) => {
        const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 }); // Se carga cuando está cerca de ser visible

        useEffect(() => {
          if (inView) {
            fetchProducts(brand.handle, index);
          } else if (lastVisibleBrand.current !== null && index === lastVisibleBrand.current + 1) {
            fetchProducts(brand.handle, index); // Carga el siguiente si el último ya se cargó
          }
        }, [inView]);

        return (
          <div key={brand.handle} className="my-6" ref={ref}>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">{brand.name}</h2>
              <Link
                href={`/collections/${encodeURIComponent(brand.handle)}`}
                className="text-sm text-gray-400 hover:text-gray-600 font-medium hover:rounded-md hover:bg-gray-200 hover:p-[3px] transition-all duration-150 ease-in-out"
                >
                Ver más
              </Link>
            </div>
            <Swiper
              modules={[Navigation, Autoplay]}
              slidesPerView={8}
              navigation={{
                nextEl: `#next-${brand.handle}`,
                prevEl: `#prev-${brand.handle}`,
              }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={true}
            >
              {loading[brand.handle] ? (
                // Skeleton Loader
                Array.from({ length: 5 }).map((_, index) => (
                  <SwiperSlide key={index} className="flex justify-center">
                    <div className="w-32 h-48 bg-gray-300 animate-pulse rounded-lg"></div>
                  </SwiperSlide>
                ))
              ) : (
                products[brand.handle]?.map((product) => {
                  const firstImage = product.images?.[0]?.url || "";
                  const secondImage = product.images?.[1]?.url || firstImage;

                  return (
                    <SwiperSlide key={product.id} className="flex justify-center">
                      <Link href={`/products/${product.handle}`}>
                        <div className="group bg-white rounded-lg shadow-md overflow-hidden cursor-pointer p-1 flex flex-col items-center text-center w-32 h-48 relative">
                          <div className="relative w-28 h-28">
                            {firstImage ? (
                              <>
                                <img
                                  src={firstImage}
                                  alt={product.title}
                                  className="absolute w-full h-full object-cover rounded-md transition-opacity duration-300 group-hover:opacity-0"
                                />
                                <img
                                  src={secondImage}
                                  alt={product.title}
                                  className="absolute w-full h-full object-cover rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                />
                              </>
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
                                Sin imagen
                              </div>
                            )}
                          </div>
                          <div className="mt-1 w-full">
                            <h3 className="text-xs font-medium text-gray-800 truncate w-full">
                              {product.title}
                            </h3>
                            <p className="text-gray-600 mt-1 font-semibold text-sm">
                              ${product.variants?.[0]?.calculated_price?.calculated_amount || "-"}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })
              )}
            </Swiper>

            {/* Flechas de navegación individuales por marca */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between w-full transform -translate-y-1/2 px-4">
              <div
                id={`prev-${brand.handle}`}
                className="swiper-button-prev bg-gray-500 text-white rounded-full p-2"
              />
              <div
                id={`next-${brand.handle}`}
                className="swiper-button-next bg-gray-500 text-white rounded-full p-2"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
