import React from "react";
import { useCart } from "../context/cartContext"; 
import "../styles/cartPage.css"; // Import the external Tailwind CSS file

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart(); // Access cart functions

  if (cart.length === 0) return <p>Your cart is empty!</p>;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <div className="quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="total-price">
        <p>Total: ${getTotalPrice()}</p>
      </div>
    </div>
  );
};

export default CartPage;
