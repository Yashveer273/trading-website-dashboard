import axios from "axios";

// Base URL for the backend API
// export const API_BASE_URL = "http://localhost:5004/"; 
// export const API_BASE_URL2 = "http://localhost:5004"; 
export const API_BASE_URL = "https://bdgwin.com.co/";
export const API_BASE_URL2 = "https://bdgwin.com.co";
export const registerUser = async (userData) => {
  
    const res = await axios.post(`${API_BASE_URL}api/users/register`, userData);
    return res;
 
};

export const P_exp = async (userId, productId,exp) => {
  try {
    const res = await axios.post(`${API_BASE_URL}api/claimROI/P_exp`, {  userId, productId,exp });
    return res.data;
  } catch (err) {
    console.error("Error fetching team:", err);
    return { success: false, message: err.response.data.message };
  }
};

export const addRechargeApi = async (utr, amount, phone) => {
  return await axios.post(`${API_BASE_URL}QR/api/Admin/recharge`, {
    utr,
    amount,
    phone,
  });
};

export const minusAmountApi = async (amount, phone) => {
  return await axios.post(`${API_BASE_URL}QR/api/Admin/recharge/minus`, {
    amount,
    phone,
  });
};
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


// ✅ GET: Fetch all explanations
export const fetchExplanationsApi = async () => {
  const res = await fetch(`${API_BASE_URL}QR/api/explanations`);
  const data = await res.json();
  if (!data.success) throw new Error("Failed to fetch explanations");
  return data;
};

// ✅ POST: Add new explanation
export const createExplanationApi = async (text) => {
  const res = await fetch(`${API_BASE_URL}QR/api/explanations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const data = await res.json();
  if (!data.success) throw new Error("Failed to create explanation");
  return data;
};

// ✅ PUT: Update explanation
export const updateExplanationApi = async (id, text) => {
  const res = await fetch(`${API_BASE_URL}QR/api/explanations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const data = await res.json();
  if (!data.success) throw new Error("Failed to update explanation");
  return data;
};

// ✅ DELETE: Remove explanation
export const deleteExplanationApi = async (id) => {
  const res = await fetch(`${API_BASE_URL}QR/api/explanations/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!data.success) throw new Error("Failed to delete explanation");
  return data;
};
export const uploadQR = async (formData) => {
   const res = await fetch(`${API_BASE_URL}QR/api/upload`, {
        method: 'POST',
        body: formData,
      });
  return res;
};


export const fetchQRs = async () => {
  const res = await fetch(`${API_BASE_URL}QR/api/qrs`);
  const data = await res.json();
  return data;
};

export const updateQR = async (id, file) => {
  const formData = new FormData();
  formData.append('qr', file);

  const res = await fetch(`${API_BASE_URL}QR/api/qrs/${id}`, {
    method: 'PUT',
    body: formData,
  });
  const data = await res.json();
  return data;
};

export const deleteQR = async (id) => {
  const res = await fetch(`${API_BASE_URL}QR/api/qrs/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  return data;
};





// ✅ 1. Get all users (paginated)
export const fetchUsers = async (page = 1, limit = 10) => {
  try {
    const res = await axios.get(`${API_BASE_URL}api/users/all?page=${page}&limit=${limit}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching users:", err);
    throw err;
  }
};

// ✅ 2. Update withdraw limit
export const updateWithdrawLimit = async (userId, limit) => {
  try {
    const res = await axios.put(`${API_BASE_URL}api/users/${userId}/withdraw-limit`, { limit });
    return res.data;
  } catch (err) {
    console.error("Error updating withdraw limit:", err);
    throw err;
  }
};

// ✅ 3. Get user details (with first 10 of each team)
export const getUserDetails = async (userId) => {
  try {
    const res = await axios.get(`${API_BASE_URL}api/users/details/${userId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching user details:", err);
    throw err;
  }
};

// ✅ 4. Get paginated team data (team1, team2, team3)
export const getTeamData = async (userId, type, page = 1, limit = 10) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}api/users/${userId}/team?type=${type}&page=${page}&limit=${limit}`
    );
    return res.data;
  } catch (err) {
    console.error(`Error fetching ${type} data:`, err);
    throw err;
  }
};

// ✅ 5. Get paginated purchase history
export const getPurchases = async (userId, page = 1, limit = 10) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}api/users/${userId}/purchases?page=${page}&limit=${limit}`
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching purchases:", err);
    throw err;
  }
};

// ✅ 6. Get paginated withdraw history
export const getWithdraws = async (userId, page = 1, limit = 10) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}api/users/${userId}/withdraws?page=${page}&limit=${limit}`
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching withdraw history:", err);
    throw err;
  }
};
// api.jsx



// ✅ Get all links
export const getSocialLinks = async () => {
  const res = await axios.get(`${API_BASE_URL}api/SocialMedia`);
  return res.data.data;
};

// ✅ Create new links
export const createSocialLinks = async (data) => {
  const res = await axios.post(`${API_BASE_URL}api/SocialMedia`, data);
  return res.data;
};

// ✅ Update existing links
export const updateSocialLinks = async (id, data) => {
  const res = await axios.put(`${API_BASE_URL}api/SocialMedia/${id}`, data);
  return res.data;
};

// ✅ Delete links
export const deleteSocialLinks = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}api/SocialMedia/${id}`);
  return res.data;
};

export const deleteUser = async (userId) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}api/users/${userId}`);
    return res.data; // returns { success: true, message, deleted: {...} }
  } catch (err) {
    console.error("Error deleting user:", err);
    throw err;
  }
};
export const searchuser = async (id) => {
    const res = await axios.get(`${API_BASE_URL}api/users/search?query=${id}`);
  return res;
};
export const getCommission = async () => {
  const res = await axios.get(`${API_BASE_URL}api/commission`);
  return res.data;
};

// ✅ Update commission percentages
export const updateCommission = async (data) => {
  const res = await axios.put(`${API_BASE_URL}api/commission/update`, data);
  return res.data;
};



// ✅ Create UPI
export const createUPI = async (formData) => {
  try {
   const {upiId,payeeName}= formData;
    const res = await fetch(`${API_BASE_URL}api/upi/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ upiId, payeeName })
    });
    return await res.json();
  } catch (err) {
    console.error("Error creating UPI", err);
    return { success: false, message: "Network error" };
  }
};

// ✅ Get All UPIs
export const getUPIs = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}api/upi/list`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching UPI list", err);
    return { success: false, message: "Network error" };
  }
};

// ✅ Get One UPI by ID
export const getUPIById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}api/upi/get/${id}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching UPI details", err);
    return { success: false, message: "Network error" };
  }
};

// ✅ Update UPI
export const updateUPI = async (id, data) => {
  try {
    const res = await fetch(`${API_BASE_URL}api/upi/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        upiId: data.upiId,        // ✅ only string
        payeeName: data.payeeName // ✅ only string
      }),
    });

    return await res.json();
  } catch (err) {
    console.error("Error updating UPI", err);
    return { success: false, message: "Network error" };
  }
};


// ✅ Delete UPI
export const deleteUPI = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}api/upi/delete/${id}`, {
      method: "DELETE"
    });
    return await res.json();
  } catch (err) {
    console.error("Error deleting UPI", err);
    return { success: false, message: "Network error" };
  }
};