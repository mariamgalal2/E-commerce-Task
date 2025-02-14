import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bgImage from "../assets/bgImage.jpeg";


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });

    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    let sorted = [...products];

    if (sortType === "price") {
      sorted.sort((a, b) => (sortOption === "low-to-high" ? a.price - b.price : b.price - a.price));
      setFilteredProducts(sorted);
    } else if (sortType === "category" && sortOption) {
      fetch(`https://fakestoreapi.com/products/category/${sortOption}`)
        .then((res) => res.json())
        .then((data) => setFilteredProducts(data))
        .catch((error) => console.error("Error fetching category products:", error));
    } else {
      setFilteredProducts(products);
    }
  }, [sortType, sortOption, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,  // Enable auto sliding
    autoplaySpeed: 2000,  // Slide every 2 seconds
    pauseOnHover: false,  // Keep sliding even when hovered
  };


  if (loading) return <p className="loading-message">Loading products...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <h1>Product List</h1>

        {/* Push dropdown & buttons to the extreme right */}
        <div className="nav-right">
          {/* Dropdowns */}
          <select value={sortType} onChange={(e) => setSortType(e.target.value)} className="dropdown">
            <option value="">Sort By</option>
            <option value="price">Price</option>
            <option value="category">Category</option>
          </select>

          {sortType === "price" && (
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="dropdown">
              <option value="high-to-low">High to Low</option>
              <option value="low-to-high">Low to High</option>
            </select>
          )}

          {sortType === "category" && (
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="dropdown">
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}

          {/* Create Product Button */}
          <Link to="/create-product">
            <button className="createButton">Create Product</button>
          </Link>

          {/* Cart Page Button (now spaced correctly) */}
          <Link to="/cart">
            <button className="cartButton">Go to Cart</button>
          </Link>
        </div>
      </div>


      {/* SLIDER */}
      <div className="category-slider-container">
        <Slider {...sliderSettings} className="category-slider">
          {categories.map((category, index) => (
            <div key={index} className="category-slide flex items-center justify-center">
              <div>{category}</div>
            </div>
          ))}
        </Slider>
      </div>

      {/* IMG BACKGROUND */}
      <img src={bgImage} alt="Background" className="background-image" />


      {/* Product Grid */}
      <div className="product-grid-container">
        <div className="product-grid">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
