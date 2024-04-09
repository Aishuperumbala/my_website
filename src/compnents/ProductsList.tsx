import React, { useState, useEffect } from "react";
import { Container, Row, Alert } from "react-bootstrap";
import {
  getProducts,
  addItemsCart,
  createCart,
  checkCartExist
} from "./apiService";
import Product from "./Product";

function ProductLists() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [redirectToCart, setRedirectToCart] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const addToCart = async (productId: string, quantity: number) => {
    try {
      let cartId = localStorage.getItem("cartId");
      const carts: any[] = await checkCartExist();
      const isCartExists = carts.some((cart) => cart.id === parseInt(cartId));
      if (!isCartExists) {
        localStorage.removeItem("cartId");
        cartId = null;
      }
      if (!cartId || cartId === "undefined") {
        const cart = await createCart();
        cartId = cart[0];
        localStorage.setItem("cartId", cartId);
      }

      await addItemsCart(cartId, productId, quantity);

      setShowAlert(true);

      setTimeout(() => {
        setRedirectToCart(true);
      }, 2000);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  if (redirectToCart) {
    setTimeout(() => {
      //window.location.href = "/cart";
    }, 5000);
  }

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
      <Container className="products ">
        {showAlert && (
          <Alert
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            Item added to cart successfully! Go to{" "}
            <a
              href="/cart"
              style={{ textDecoration: "underline", fontWeight: "bold" }}
            >
              Cart
            </a>
          </Alert>
        )}
        {products.map((product, index) =>
          index % 3 === 0 ? (
            <Row className="row-cols-3" key={index}>
              {products.slice(index, index + 3).map((product) => (
                <Product
                  key={product.product_id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </Row>
          ) : null
        )}
      </Container>
    </div>
  );
}

export default ProductLists;
