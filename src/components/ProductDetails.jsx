import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../cartContext"; // Import CartContext
import "../styles/productDetails.css"; // Import the new CSS file

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity

  // Use the addToCart function from CartContext
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch product details.");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, parseInt(e.target.value) || 1)); // Ensure quantity is at least 1
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity }); // Pass the product and selected quantity to the cart
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="product-details-container">
      <h2 className="product-title">{product.title}</h2>
      <img src={product.image} alt={product.title} className="product-image" />
      <p className="product-description"><strong>Description:</strong> {product.description}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p className="product-price"><strong>Price:</strong> ${product.price}</p>

      {/* Quantity Selector */}
      <div className="quantity-selector">
        <button
          className="quantity-button"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          -
        </button>
        <input
          type="number"
          className="quantity-input"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
        <button
          className="quantity-button"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        className="add-to-cart-button"
        onClick={handleAddToCart} // Add product with quantity to cart
      >
        Add to Cart
      </button>

      <Link to="/">
        <button className="back-button">Back to Products</button>
      </Link>
    </div>
  );
};

export default ProductDetails;
