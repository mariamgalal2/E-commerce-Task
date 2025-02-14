import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext"; // Import the useCart hook to access addToCart function
import "../styles/productCard.css"; // Import the new TailwindCSS file

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1); // State for product quantity
  const { addToCart } = useCart(); // Get the addToCart function from the Cart context

  const handleAddToCart = () => {
    addToCart({ ...product, quantity }); // Pass the product and selected quantity to the cart
  };

  const handleQuantityChange = (e) => {
    setQuantity(Math.max(1, parseInt(e.target.value) || 1)); // Ensure quantity is at least 1
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
      />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-category">
        <strong>Category:</strong> {product.category}
      </p>
      <p className="product-price">
        <strong>Price:</strong> ${product.price}
      </p>
      <div className="product-actions">
        <Link to={`/product/${product.id}`}>
          <button className="view-details-button">View Details</button>
        </Link>

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
          onClick={handleAddToCart} // Add to cart with the selected quantity
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
