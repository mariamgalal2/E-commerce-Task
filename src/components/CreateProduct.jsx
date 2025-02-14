import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/createProduct.css"; // Import Tailwind-based CSS

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setError("Failed to fetch categories"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!title || !description || !price || !category || !image) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (parseFloat(price) <= 0) {
      setError("Price must be a positive number.");
      setLoading(false);
      return;
    }

    const newProduct = { title, description, price, category, image };

    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Failed to create product");

      setSuccess(true);
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage("");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-product-container">
      <h2>Create Product</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Product created successfully!</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>

      {/* Back Button */}
      <button onClick={() => navigate("/")} className="back-button">
        Back to Product List
      </button>
    </div>
  );
};

export default CreateProduct;
