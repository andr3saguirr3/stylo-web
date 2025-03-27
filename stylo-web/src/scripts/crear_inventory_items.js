const axios = require("axios");
require("dotenv").config();

const API_BASE_URL = "http://localhost:9000/admin";
const API_KEY = process.env.API_KEY;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Basic ${API_KEY}`,
};

async function getProducts() {
  try {
    const response = await axios.get(`${API_BASE_URL}/products?limit=2&offset=936`, { headers });
    return response.data.products;
  } catch (error) {
    console.error("❌ Error al obtener productos:", error.message);
    return [];
  }
}

async function createInventoryItem(sku, title) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/inventory-items`,
      { sku, title },
      { headers }
    );
    return response.data.inventory_item.id;
  } catch (error) {
    console.error(`❌ Error al crear inventory item para ${sku}:`, error.message);
    return null;
  }
}

async function linkInventoryItem(productId, variantId, inventoryItemId) {
  try {
    await axios.post(
      `${API_BASE_URL}/products/${productId}/variants/${variantId}/inventory-items`,
      { inventory_item_id: inventoryItemId, required_quantity: 1 },
      { headers }
    );
    console.log(`✅ Vinculado inventory item ${inventoryItemId} a variante ${variantId}`);
  } catch (error) {
    console.error(`❌ Error al vincular inventory item ${inventoryItemId}:`, error.message);
  }
}

(async () => {
  const products = await getProducts();
  
  for (const product of products) {
    for (const variant of product.variants) {
      if (!variant.inventory_items || variant.inventory_items.length === 0) {
        console.log(`🔍 Creando inventory item para producto ${product.title}...`);
        const inventoryItemId = await createInventoryItem(variant.sku, "One Size");

        if (inventoryItemId) {
          await linkInventoryItem(product.id, variant.id, inventoryItemId);
        }
      } else {
        console.log(`⏩ El producto ${product.title} ya tiene inventory item.`);
      }
    }
  }

  console.log("✅ Proceso completado.");
})();
