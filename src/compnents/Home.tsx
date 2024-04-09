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
    }
    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const displayedProducts = products.slice(0, 2);
  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        margin: "0",
        padding: "0",
      }}
    >
      <Carousel style={{ backgroundColor: "white" }}>
        <h1 style={{ color: "Grey", textAlign: "center",  marginBottom :'30px', marginTop :'30px'}}>
          Welcome to my website
        </h1>
        {displayedProducts.map((product, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={product.products_image}
              alt={`Slide ${index + 1}`}
              style={{ maxHeight: "700px", objectFit: "contain" }}
            />
            <Carousel.Caption>
              <h3 style={{ color: "black" }}>{product.product_name}</h3>
              <p style={{ color: "black" }}>{product.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Home;
