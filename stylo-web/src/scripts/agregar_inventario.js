const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const API_URL = "http://localhost:9000/admin";
const LOCATION_ID = "sloc_01JPNEWMG45Q70P0AV4PRQ69DQ"; // ID de la ubicación de stock
const DEFAULT_STOCK = 1000; // Cantidad por defecto si se eliminan todos los inventarios

const headers = {
  "Authorization": `Basic ${API_KEY}`,
  "Content-Type": "application/json",
};

// 🔥 Función para obtener `inventory_items` de una variante
async function getInventoryItems(productId, variantId) {
  try {
    const response = await axios.get(
      `${API_URL}/products/${productId}/variants/${variantId}?fields=inventory_items.*`,
      { headers }
    );

    return response.data.variant.inventory_items || [];
  } catch (error) {
    console.error(`❌ Error al obtener Inventory Items:`, error.response?.data || error.message);
    return [];
  }
}

// 🔥 Función para eliminar `inventory_item`
async function deleteInventoryItem(inventoryItemId) {
  try {
    await axios.delete(`${API_URL}/inventory-items/${inventoryItemId}`, { headers });
    console.log(`🗑️ Inventory Item ${inventoryItemId} eliminado`);
  } catch (error) {
    console.error(`❌ Error al eliminar Inventory Item:`, error.response?.data || error.message);
  }
}

// 🔥 Función para crear un nuevo `inventory_item`
async function createInventoryItem(title) {
  try {
    const response = await axios.post(
      `${API_URL}/inventory-items`,
      { title },
      { headers }
    );

    console.log(`✅ Inventory Item creado: ${response.data.inventory_item.id}`);
    return response.data.inventory_item.id;
  } catch (error) {
    console.error(`❌ Error al crear Inventory Item:`, error.response?.data || error.message);
    return null;
  }
}

// 🔥 Función para asociar `inventory_item` a una variante
async function associateInventoryItem(productId, variantId, inventoryItemId) {
  try {
    await axios.post(
      `${API_URL}/products/${productId}/variants/${variantId}/inventory-items`,
      { inventory_item_id: inventoryItemId, required_quantity: 1 },
      { headers }
    );
    console.log(`🔗 Inventory Item ${inventoryItemId} asociado a variante ${variantId}`);
  } catch (error) {
    console.error(`❌ Error al asociar Inventory Item:`, error.response?.data || error.message);
  }
}

// 🔥 Función para actualizar stock en una ubicación
async function updateStock(inventoryItemId, quantity) {
  try {
    await axios.post(
      `${API_URL}/inventory-items/${inventoryItemId}/location-levels`,
      { location_id: LOCATION_ID, stocked_quantity: quantity },
      { headers }
    );

    console.log(`✅ Stock actualizado para ${inventoryItemId} con ${quantity}`);
  } catch (error) {
    console.error(`❌ Error al actualizar stock:`, error.response?.data || error.message);
  }
}

// 🔥 Flujo principal
(async () => {
  const products = await axios.get(`${API_URL}/products?limit=1000offset=2716`, { headers }) //731
    .then(res => res.data.products)
    .catch(error => {
      console.error("❌ Error al obtener productos:", error.response?.data || error.message);
      return [];
    });

  for (const product of products) {
    for (const variant of product.variants) {
      const variantId = variant.id;

      // 1️⃣ Obtener `inventory_items`
      const inventoryItems = await getInventoryItems(product.id, variantId);

      // 2️⃣ Eliminar `inventory_items` con `stocked_quantity: 0`
      for (const item of inventoryItems) {
        if (item.stocked_quantity === 0) {
          await deleteInventoryItem(item.inventory_item_id);
        }
      }

      // 3️⃣ Si TODOS los `inventory_items` tenían `0`, crear uno nuevo
      const remainingItems = await getInventoryItems(product.id, variantId);
      let inventoryItemId = remainingItems.length > 0
        ? remainingItems[0].inventory_item_id
        : await createInventoryItem(product.title);

      if (!inventoryItemId) continue; // Si no se pudo crear, pasar al siguiente

      // 4️⃣ Asociar `inventory_item` a la variante si es nuevo
      if (remainingItems.length === 0) {
        await associateInventoryItem(product.id, variantId, inventoryItemId);
      }

      // 5️⃣ Actualizar stock en la ubicación
      await updateStock(inventoryItemId, DEFAULT_STOCK);
    }
  }

  console.log(`✅ Proceso completado.`);
})();
