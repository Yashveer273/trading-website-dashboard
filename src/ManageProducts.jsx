import React, { useState, useEffect } from "react";
import "./ManageCategories.css";
import { getProducts, createProduct, deleteProduct, updateProduct } from "./api";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["Primary", "New", "Sessions", "Vip"]);
  const [selectedCategory, setSelectedCategory] = useState("Primary");
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => setSearchTerm(e.target.value);

  const [editingProductId, setEditingProductId] = useState(null);

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    cycleType: "day",
    cycleValue: "",
    daily: "",
    hour: "",
    image: null,
    badge: "non",
    purchaseType: "One time buy",
  });

  const badgeOptions = ["non", "popular", "new", "limited"];
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  // ---------------- API HANDLERS ----------------
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      showMessage("Error fetching products", "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((p) => p._id !== id));
        showMessage("Product deleted successfully", "success");
      } catch (err) {
        console.error(err);
        showMessage("Failed to delete product", "error");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ---------------- FORM HANDLERS ----------------
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setSelectedCategory(newCategory);
      setNewCategory("");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProductForm({ ...productForm, image: files[0] });
    } else {
      setProductForm({ ...productForm, [name]: value });
    }
  };

  const handleAddProduct = async () => {
    const { name, price, cycleType, cycleValue, daily, hour, image, badge, purchaseType } = productForm;
console.log(productForm);
    if (!name || !price || !cycleValue || (cycleType === "day" && !daily) || (cycleType === "hour" && !hour)) {
      showMessage("Please fill all required fields!", "error");
      return;
    }

    const formData = new FormData();
    formData.append("categoryName", selectedCategory ?? "");
    formData.append("productName", name ?? "");
    formData.append("price", price ?? "");
    formData.append("cycleType", cycleType ?? "");
    formData.append("cycleValue", cycleValue ?? "");
    formData.append("daily", daily || 0);
    formData.append("hour", hour || 0);
    formData.append("badge", badge ?? "");
    formData.append("purchaseType", purchaseType ?? "One time buy");
    if (image instanceof File) formData.append("image", image);

    try {
      let product;

      if (editingProductId!=null) {
    
        product = await updateProduct(editingProductId, formData);
        setProducts(products.map(p => p._id === editingProductId ? product : p));
        setEditingProductId(null);
        showMessage("Product updated successfully!", "success");
      } else {
        product = await createProduct(formData);
        setProducts([product, ...products]);
        showMessage("Product added successfully!", "success");
      }

      setProductForm({
        name: "",
        price: "",
        cycleType: "day",
        cycleValue: "",
        daily: "",
        hour: "",
        image: null,
        badge: "non",
        purchaseType: "One time buy",
      });
    } catch (err) {
      console.log(err);
      showMessage(editingProductId ? "Failed to update product" : "Failed to add product", "error");
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product._id);
   

    setSelectedCategory(product.categoryName);
    setProductForm({
      name: product.productName,
      price: product.price,
      cycleType: product.cycleType,
      cycleValue: product.cycleValue,
      daily: product.daily,
      hour: product.hour,
      image: null,
      badge: product.badge,
      purchaseType: product.purchaseType ?? "One time buy",
    });
  };

  // ---------------- MESSAGES ----------------
  const showMessage = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  // ---------------- PAGINATION ----------------
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const filteredProducts = currentProducts.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(products.length / productsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // ---------------- RENDER ----------------
  return (
    <div className="manage-container">
      <h2>Manage Products</h2>

      {message && <div className={`message-card ${messageType}`}>{message}</div>}

      <div className="add-product">
        <div>
          <label>Category</label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
            <option value="addNewCategory">Add New Category</option>
          </select>
        </div>

        {selectedCategory === "addNewCategory" && (
          <div>
            <label>New Category Name</label>
            <div style={{ display: "flex", gap: "5px" }}>
              <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
              <button onClick={handleAddCategory}>Add</button>
            </div>
          </div>
        )}

        <div>
          <label>Product Name</label>
          <input type="text" name="name" value={productForm.name} onChange={handleInputChange} />
        </div>

        <div>
          <label>Price (Rs)</label>
          <input type="number" name="price" value={productForm.price} onChange={handleInputChange} />
        </div>

        <div>
          <label>Cycle Type</label>
          <select name="cycleType" value={productForm.cycleType} onChange={handleInputChange}>
            <option value="day">Day</option>
            <option value="hour">Hour</option>
          </select>
        </div>

        <div>
          <label>{productForm.cycleType === "day" ? "Cycle (Days)" : "Cycle (Hours)"}</label>
          <input type="number" name="cycleValue" value={productForm.cycleValue} onChange={handleInputChange} />
        </div>

        {productForm.cycleType === "day" ? (
          <>
            <div>
              <label>Daily Income (Rs)</label>
              <input type="number" name="daily" value={productForm.daily} onChange={handleInputChange} />
            </div>
            <div>
              <label>Total Income Day</label>
              <input type="number" value={productForm.daily * productForm.cycleValue || 0} readOnly />
            </div>
          </>
        ) : (
          <>
            <div>
              <label>Hourly Income (Rs)</label>
              <input type="number" name="hour" value={productForm.hour} onChange={handleInputChange} />
            </div>
            <div>
              <label>Total Income Hour</label>
              <input type="number" value={productForm.hour * productForm.cycleValue || 0} readOnly />
            </div>
          </>
        )}

        <div>
          <label>Image</label>
          <input type="file" name="image" accept="image/*" required onChange={handleInputChange} />
        </div>

        <div>
          <label>Badge</label>
          <select name="badge" value={productForm.badge} onChange={handleInputChange}>
            {badgeOptions.map((b, idx) => <option key={idx} value={b}>{b}</option>)}
          </select>
        </div>

        <div>
          <label>Purchase Type</label>
          <select name="purchaseType" required value={productForm.purchaseType} onChange={handleInputChange}>
            <option value="One time buy">One time buy</option>
            <option value="All time">All time</option>
          </select>
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <button onClick={handleAddProduct}>{editingProductId ? "Update Product" : "Add Product"}</button>
        </div>
      </div>

      <h3>Product List</h3>
      <div>
        <input type="text" placeholder="Search by name or category" value={searchTerm} onChange={handleSearch} />
      </div>

      {loading ? <p>Loading...</p> : (
        <>
          <table className="product-table">
            <thead>
              <tr>
                <th>Image</th><th>Name</th><th>Category</th><th>Price</th>
                <th>Cycle Type</th><th>Cycle Value</th><th>Daily</th>
                <th>Total Day</th><th>Hourly</th><th>Total Hour</th><th>Badge</th><th>Purchase Type</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((item) => {
                const totalDay = Number(item.dailyIncome || item.daily) * Number(item.cycleValue);
                const totalHour = Number(item.hourIncome || item.hour) * Number(item.cycleValue);
                return (
                  <tr key={item._id}>
                    <td>{item.imageUrl && <img src={`http://localhost:5004${item.imageUrl}`} alt={item.productName || item.name} width="50" />}</td>
                    <td>{item.productName || item.name}</td>
                    <td>{item.categoryName || item.category}</td>
                    <td>{item.price}</td>
                    <td>{item.cycleType}</td>
                    <td>{item.cycleValue}</td>
                    <td>{item.dailyIncome || item.daily}</td>
                    <td>{totalDay}</td>
                    <td>{item.hourIncome || item.hour}</td>
                    <td>{totalHour}</td>
                    <td>{item.badge}</td>
                    <td>{item.purchaseType || "One time buy"}</td>
                    <td>
                      <button className="edit" onClick={() => handleEdit(item)}>Edit</button>
                      <button className="delete" onClick={() => handleDelete(item._id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ManageProducts;
