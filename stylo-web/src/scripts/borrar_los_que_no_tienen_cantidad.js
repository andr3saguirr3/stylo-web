const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const API_URL = "http://localhost:9000/admin";
const LOCATION_ID = "sloc_01JPNEWMG45Q70P0AV4PRQ69DQ"; // Ubicación de stock

const headers = {
  Authorization: `Basic ${API_KEY}`,
  "Content-Type": "application/json",
};

// 🔥 Función para obtener todos los productos con sus variantes
async function getAllProducts() {
  try {
    const response = await axios.get(`${API_URL}/products?limit=631&offset=2180`, { headers }); //2180
    return response.data.products || [];
  } catch (error) {
    console.error(`❌ Error al obtener productos:`, error.response?.data || error.message);
    return [];
  }
}

// 🔥 Función para obtener las variantes de un producto
async function getVariantsOfProduct(productId) {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}/variants`, { headers });
    return response.data.variants || [];
  } catch (error) {
    console.error(`❌ Error al obtener variantes del producto ${productId}:`, error.response?.data || error.message);
    return [];
  }
}

// 🔥 Función para obtener los `inventory_items` de una variante
async function getInventoryItems(productId, variantId) {
  try {
    const response = await axios.get(
      `${API_URL}/products/${productId}/variants/${variantId}?fields=inventory_items.*`,
      { headers }
    );

    return response.data.variant.inventory_items || [];
  } catch (error) {
    console.error(`❌ Error al obtener inventory_items de variante ${variantId} del producto ${productId}:`, error.response?.data || error.message);
    return [];
  }
}

// 🔥 Función para obtener el nivel de stock de un `inventory_item`
async function getStockLevel(inventoryItemId) {
  try {
    const response = await axios.get(
      `${API_URL}/inventory-items/${inventoryItemId}/location-levels/${LOCATION_ID}`,
      { headers }
    );

    return response.data.stocked_quantity;
  } catch (error) {
    if (error.response?.status === 404) return 0; // Si no existe, asumimos cantidad 0
    console.error(`❌ Error al obtener stock level:`, error.response?.data || error.message);
    return null;
  }
}

// 🔥 Función para eliminar un `inventory_item`
async function deleteInventoryItem(inventoryItemId) {
  try {
    await axios.delete(`${API_URL}/inventory-items/${inventoryItemId}`, { headers });
    console.log(`🗑️ Eliminado inventory_item: ${inventoryItemId}`);
  } catch (error) {
    console.error(`❌ Error al eliminar inventory_item:`, error.response?.data || error.message);
  }
}

// 🔥 Flujo Principal: Recorre todos los productos, obtiene variantes y limpia los `inventory_items`
async function cleanAllInventoryItems() {
  const products = await getAllProducts();

  for (const product of products) {
    // Obtiene las variantes del producto
    const variants = await getVariantsOfProduct(product.id);

    for (const variant of variants) {
      // Obtiene los `inventory_items` de la variante
      const inventoryItems = await getInventoryItems(product.id, variant.id);

      for (const item of inventoryItems) {
        const stockQuantity = await getStockLevel(item.inventory_item_id);
        if (stockQuantity === 0) {
          await deleteInventoryItem(item.inventory_item_id);
        }
      }
    }
  }

  console.log("✅ Proceso de limpieza de inventory_items completado.");
}

// 🏃 Ejecutar script
cleanAllInventoryItems();
