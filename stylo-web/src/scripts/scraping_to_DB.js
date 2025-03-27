const puppeteer = require("puppeteer");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
require("dotenv").config(); // Cargar variables del .env

// 📌 Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📌 URL base y configuración
const BASE_URL = "https://sunnies.cx/busqueda?s=Dolce&page=";
const MAX_PAGES = 2;
const API_URL = "http://localhost:9000/admin/products"; // 🔥 Reemplaza con la URL real

// 🔹 Subir imágenes a Cloudinary
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
    console.error(`❌ Error subiendo imagen ${imageUrl}:`, error.message);
    return "";
  }
}

// 🔥 Enviar producto a la API
async function sendProductToAPI(product) {
  try {
    const response = await axios.post(API_URL, product, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.API_KEY}`,
      },
    });
    console.log(`✅ Producto registrado: ${product.title} (ID: ${response.data.id})`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error al registrar ${product.title}:`, error.message);
  }
}

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log(`🚀 Scrapeando ${MAX_PAGES} páginas...`);

  for (let i = 1; i <= MAX_PAGES; i++) {
    console.log(`📄 Página ${i}/${MAX_PAGES}`);
    await page.goto(`${BASE_URL}${i}`, { waitUntil: "load", timeout: 0 });

    const products = await page.evaluate(() => {
      const cleanData = (data) => (typeof data === "string" ? data.trim().replace(/\s+/g, " ") : "");
      const cleanPrice = (price) => price.replace(/[$,]/g, "").trim();
      const createSafeHandle = (text) =>
        text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9\-_]/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "");

      return Array.from(document.querySelectorAll(".js-product-miniature")).map((product) => {
        const title = product.querySelector(".product-title a")?.textContent || "";
        const price = product.querySelector(".product-price")?.textContent || "";
        const url = product.querySelector(".product-title a")?.href || "";

        return {
          title: cleanData(title),
          handle: createSafeHandle(title),
          price: cleanPrice(price),
          url: url.startsWith("http") ? url : url
        };
      });
    });

    for (const productData of products) {
      console.log(`🔍 Procesando producto: ${productData.title}`);

      // Ir a la página del producto para obtener más detalles
      await page.goto(productData.url, { waitUntil: "load", timeout: 0 });

      // Extraer descripción e imágenes adicionales
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

      // Unir imágenes principales y adicionales
      

      // Subir imágenes a Cloudinary
      const imageUrls = [];
      for (let j = 0; j < Math.min(extraImages.length, 5); j++) {
        console.log(`  📸 Subiendo imagen ${j + 1}`);
        const cloudinaryUrl = await uploadToCloudinary(extraImages[j], productData.handle, j + 1);
        if (cloudinaryUrl) imageUrls.push(cloudinaryUrl);
      }

      // 🔥 Crear payload para la API de MedusaJS
      const productPayload = {
        title: productData.title,
        handle: productData.handle,
        status: "published", // 📌 Agregar descripción
        thumbnail: imageUrls[0] || "",
        images: imageUrls.map((url) => ({ url })),
        weight: 400,
        sales_channels: [{ id: "sc_01JPDNT9C673ANA5BKZNJDZ6BD" }],
        collection_id: "pcol_01JPP2SDZP3GMTFWQVV4MANN0W",
        options: [{ title: "Size", values: ["One Size"] }],
        variants: [
          {
            title: "One Size",
            allow_backorder: false,
            manage_inventory: true,
            weight: 400,
            options: { Size: "One Size" },
            prices: [{ currency_code: "mxn", amount: Number(productData.price) }],
          },
        ],
      };

      // 🔥 Enviar producto a la API
      await sendProductToAPI(productPayload);
    }
  }

  await browser.close();
  console.log(`✅ Proceso completado.`);
})().catch((error) => {
  console.error("❌ Error en el scraping:", error);
});
