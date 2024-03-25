// Cart.js
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import {
  getCartItems,
  DeleteCart,
  DeleteCartItems,
  UpdateCartItemsQty,
  getProductsById,
} from "./apiService";
import CartItems from "./CartItems";

function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartItems = await getCartItems();
        if (!cartItems || cartItems.length === 0) {
          setItems([]);
          setLoading(false);
          return;
        }

        const items = [];

        for (const item of cartItems) {
          const products = await getProductsById(item.product_id);
          items.push({
            products,
            qty: item.quantity,
            price: item.price,
            id: item.id,
          });
        }

        setItems(items);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteCartItem = async (id) => {
    try {
      await DeleteCartItems({ id });
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };


  const deleteCart = async (id) => {
    try {
      await DeleteCart({ id });
      //setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleQuantityChange = async (id, qty) => {
    try {
      await UpdateCartItemsQty({ id, qty });
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty };
          }
          return item;
        })
      );
      setMessage("Quantity updated successfully!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating quantity:", error);
      setMessage("Error updating quantity. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (items.length === 0) {
    return <h1>Your cart is empty</h1>;
  }

  return (
    <div className="mx-5">
      {message && <p>{message}</p>}

      <div style={{ display: "flex", alignItems: "center" }}>
        <h1
          className="text-muted"
          style={{
            textAlign: "left",
            marginBottom: "30px",
            marginTop: "20px",
            flex: "1",
          }}
        >
          Shopping Basket
        </h1>
        <button style={{  marginRight: "5px"  }} onClick={() => deleteCart(items.id)}>Clear Cart</button>
      </div>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <CartItems
          items={items}
          deleteCartItem={deleteCartItem}
          handleQuantityChange={handleQuantityChange}
        />
      </Table>
    </div>
  );
}

export default Cart;
