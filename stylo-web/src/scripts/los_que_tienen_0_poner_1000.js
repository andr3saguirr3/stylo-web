const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const API_URL = "http://localhost:9000/admin";
const LOCATION_ID = "sloc_01JPNEWMG45Q70P0AV4PRQ69DQ"; // Ubicación de stock

const headers = {
  Authorization: `Basic ${API_KEY}`,
  "Content-Type": "application/json",
};

// 🔥 Obtener todos los productos con sus variantes
async function getAllProducts() {
  try {
    const response = await axios.get(`${API_URL}/products?limit=1000&offset=2002`, { headers }); //2001
    return response.data.products || [];
  } catch (error) {
    console.error(`❌ Error al obtener productos:`, error.response?.data || error.message);
    return [];
  }
}

// 🔥 Obtener las variantes de un producto
async function getVariantsOfProduct(productId) {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}/variants`, { headers });
    return response.data.variants || [];
  } catch (error) {
    console.error(`❌ Error al obtener variantes del producto ${productId}:`, error.response?.data || error.message);
    return [];
  }
}

// 🔥 Crear un inventory_item
async function createInventoryItem(variantId) {
  try {
    const data = {
      sku: null,
      weight: 400,
    };

    const response = await axios.post(`${API_URL}/inventory-items`, data, { headers });
    console.log(`📦 Inventory item creado para variante ${variantId}.`);

    return response.data.inventory_item.id;
  } catch (error) {
    console.error(`❌ Error al crear inventory_item para variante ${variantId}:`, error.response?.data || error.message);
    return null;
  }
}

// 🔥 Asociar inventory_item a la variante
async function linkInventoryItemToVariant(productId, variantId, inventoryItemId) {
  try {
    const data = {
      inventory_item_id: inventoryItemId,
      required_quantity: 1,
    };

    await axios.post(`${API_URL}/products/${productId}/variants/${variantId}/inventory-items`, data, { headers });
    console.log(`🔗 Inventory item ${inventoryItemId} asociado a variante ${variantId}.`);
  } catch (error) {
    console.error(`❌ Error al asociar inventory_item a variante ${variantId}:`, error.response?.data || error.message);
  }
}

// 🔥 Establecer nivel de stock para un inventory_item
async function updateStockLevel(inventoryItemId, quantity) {
  try {
    const data = {
      location_id: LOCATION_ID,
      stocked_quantity: quantity,
      incoming_quantity: 0,
    };

    await axios.post(`${API_URL}/inventory-items/${inventoryItemId}/location-levels`, data, { headers });
    console.log(`📦 Stock actualizado a ${quantity} para inventory_item: ${inventoryItemId}`);
  } catch (error) {
    console.error(`❌ Error al actualizar stock para ${inventoryItemId}:`, error.response?.data || error.message);
  }
}

// 🔥 Flujo principal: Recorre productos, obtiene variantes y crea o asocia inventory_items
async function updateAllInventoryItems() {
  const products = await getAllProducts();

  for (const product of products) {
    const variants = await getVariantsOfProduct(product.id);

    for (const variant of variants) {
      // Crear un nuevo inventory_item
      const inventoryItemId = await createInventoryItem(variant.id);
      if (!inventoryItemId) continue;

      // Asociar inventory_item a la variante
      await linkInventoryItemToVariant(product.id, variant.id, inventoryItemId);

      // Establecer stock inicial en la ubicación
      await updateStockLevel(inventoryItemId, 1000);
    }
  }

  console.log("✅ Proceso de actualización de inventory_items completado.");
}

// 🏃 Ejecutar script
updateAllInventoryItems();
