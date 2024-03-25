import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { getProducts } from "./apiService";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getProducts();
        setProducts(products);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        margin: "0",
        padding: "0",
      }}
    >
      <h1> Welcome to my website</h1>
      <Carousel style={{ backgroundColor: "blue" }}>
        {products.map((product, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={product.products_image}
              alt={`Slide ${index + 1}`}
              style={{ maxHeight: "500px", objectFit: "contain" }}
            />
            <Carousel.Caption>
              <h3>{product.product_name}</h3>
              <p>{product.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Home;
