const puppeteer = require("puppeteer");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
require("dotenv").config(); // Cargar variables del .env

// 📌 Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📌 URL base y número máximo de páginas a scrapear
const BASE_URL = "https://sunnies.cx/busqueda?s=Saint&page=";
const MAX_PAGES = 1;
const API_URL = "http://localhost:9000/admin/products"; // 🔥 Reemplaza con la URL real de tu API

// 🔹 Función para subir imágenes a Cloudinary
async function uploadToCloudinary(imageUrl, productHandle, index) {
  try {
    if (!imageUrl) return "";
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${Buffer.from(response.data).toString("base64")}`,
      {
        folder: "productos",
        public_id: `${productHandle}-${index}`,
        overwrite: true,
      }
    );
    return result.secure_url;
  } catch (error) {
    console.error(`Error al subir imagen ${imageUrl}:`, error.message);
    return "";
  }
}

// 🔥 Función para obtener el ID del producto en Medusa por su handle
async function getProductIdByHandle(handle) {
  console.log("handle", handle);
  try {
    const response = await axios.get(`${API_URL}?handle=${handle}`, {
      headers: {
        "Authorization": `Basic ${process.env.API_KEY}`,
      },
    });

    if (response.data.products.length > 0) {
      return response.data.products[0].id;
    } else {
      console.warn(`⚠️ Producto no encontrado en Medusa: ${handle}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error al buscar el producto ${handle}:`, error.message);
    return null;
  }
}

// 🔥 Función para actualizar el producto en Medusa
async function updateProductInAPI(productId, imageUrls) {
  console.log("product id", productId)
  try {
    // Primero actualiza con un array vacío para eliminar las imágenes existentes
    await axios.post(
      `${API_URL}/${productId}`,
      {
        images: []
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${process.env.API_KEY}`,
        },
      }
    );
    
    // Luego actualiza con las nuevas imágenes
    const response = await axios.post(
      `${API_URL}/${productId}`,
      {
        images: imageUrls.map((url) => ({ url })),
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${process.env.API_KEY}`,
        },
      }
    );

    console.log(`✅ Producto actualizado: ${productId}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error al actualizar producto ${productId}:`, error.message);
  }
}

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log(`🚀 Scrapeando ${MAX_PAGES} páginas y actualizando productos...`);

  for (let i = 1; i <= MAX_PAGES; i++) {
    console.log(`📄 Página ${i}/${MAX_PAGES}`);
    await page.goto(`${BASE_URL}${i}`, { waitUntil: "load", timeout: 0 });

    const products = await page.evaluate(() => {
      const createSafeHandle = (text) =>
        text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9\-_]/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "");

      return Array.from(document.querySelectorAll(".js-product-miniature")).map((product) => {
        const title = product.querySelector(".product-title a")?.textContent || "";
        const url = product.querySelector(".product-title a")?.href || "";

        return {
          title: title.trim(),
          handle: createSafeHandle(title),
          url,
        };
      });
    });

    for (const productData of products) {
      console.log(`🔍 Procesando producto: ${productData.title} (Handle: ${productData.handle})`);
    
      await page.goto(productData.url, { waitUntil: "load", timeout: 0 });
    
      const { extraImages, selectorsUsed } = await page.evaluate(() => {
        const selector = ".swiper-wrapper .thumb-container img"; // Guarda el selector utilizado
        const images = Array.from(document.querySelectorAll(selector)).map((img) =>
          img.getAttribute("data-image-large-src") ||
          img.getAttribute("data-image-medium-src") ||
          img.getAttribute("src")
        ).filter((url) => url);
    
        return {
          extraImages: images,
          selectorsUsed: selector, // Devuelve el selector usado
        };
      });


      // Subir imágenes a Cloudinary
      const imageUrls = [];
      for (let j = 0; j < Math.min(extraImages.length, 5); j++) {
        console.log(`  📸 Subiendo imagen ${j + 1}`);
        const cloudinaryUrl = await uploadToCloudinary(extraImages[j], productData.handle, j + 1);
        if (cloudinaryUrl) imageUrls.push(cloudinaryUrl);
      }

      // Obtener el ID del producto en Medusa
      const productId = await getProductIdByHandle(productData.handle);
      if (!productId) continue;

      // Actualizar el producto en Medusa
      await updateProductInAPI(productId, imageUrls);
    }
  }

  await browser.close();
  console.log(`✅ Proceso completado.`);
})().catch((error) => {
  console.error("❌ Error en el scraping:", error);
});
