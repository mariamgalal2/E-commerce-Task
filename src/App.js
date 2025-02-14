import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import CreateProduct from "./components/CreateProduct";
import CartPage from "./components/CartPage"; // Import Cart Page component
import { CartProvider } from "./context/cartContext"; // Import CartContext
import "./styles/global.css";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/cart" element={<CartPage />} /> {/* Add route for cart */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
