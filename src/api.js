import axios from "axios";

// Base URL for the backend API
const API_BASE_URL = "http://localhost:5004/"; // replace with your backend URL

// Get all giftcodes (optional limit)
export const getGiftcodes = async (limit = 0) => {
  try {
    const res = await axios.get(`${API_BASE_URL}api/giftcodes?limit=${limit}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching giftcodes:", err);
    throw err;
  }
};

// Get giftcode by ID
export const getGiftcodeById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE_URL}api/giftcodes/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching giftcode:", err);
    throw err;
  }
};

// Create a new giftcode
export const createGiftcode = async (giftcodeData) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}api/giftcodes/add`,
      giftcodeData
    );
    return res.data;
  } catch (err) {
    console.error("Error creating giftcode:", err);
    throw err;
  }
};

// Update giftcode by ID
export const updateGiftcode = async (id, giftcodeData) => {
  try {
    const res = await axios.put(
      `${API_BASE_URL}api/giftcodes/${id}`,
      giftcodeData
    );
    return res.data;
  } catch (err) {
    console.error("Error updating giftcode:", err);
    throw err;
  }
};

// Delete giftcode by ID
export const deleteGiftcode = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}api/giftcodes/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting giftcode:", err);
    throw err;
  }
};

// -----------------Product api -------------------------
export const getProducts = async (limit = 0) => {
  try {
    const res = await axios.get(`${API_BASE_URL}api/products?limit=${limit}`);
    return res.data.products;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE_URL}api/products/${id}`);
    return res.data.product;
  } catch (err) {
    console.error("Error fetching product:", err);
    throw err;
  }
};

// Create product
export const createProduct = async (productData) => {
  console.log(productData);
  try {
    const res = await axios.post(
      `${API_BASE_URL}api/products/add`,
      productData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return res.data.product;
  } catch (err) {
    console.error("Error creating product:", err);
    throw err;
  }
};

// Update product
export const updateProduct = async (id, productData) => {

  try {
    const res = await axios.put(
      `${API_BASE_URL}api/products/${id}`,
      productData
    );
    return res.data.product;
  } catch (err) {
    console.error("Error updating product:", err);
    throw err;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}api/products/${id}`);
    return res.data.message;
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err;
  }
};
export const fetchUsers = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}api/users`);
    return res;
  } catch (err) {
    return err;
  }
};
