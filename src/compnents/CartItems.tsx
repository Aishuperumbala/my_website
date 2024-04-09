// CartItems.js
import React from "react";
import { FaTrash } from "react-icons/fa";

interface CartItemsProps {
  items: {
    id: number;
    price: number;
    qty: number;
    products: {
      product_id: number;
      product_name: string;
      products_image: string;
      // Add any other properties of the product here
    }[];
  }[];
  deleteCartItem: (itemId: number) => void;
  handleQuantityChange: (itemId: number, newQuantity: number) => void;
}

function CartItems({ items, deleteCartItem, handleQuantityChange }: CartItemsProps) {
  return (
    <tbody>
      {items.map((item, index) => (
        <tr key={index}>
          {item.products.map((product, productIndex) => (
            <td key={productIndex}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={product.products_image}
                  alt={product.product_name}
                  style={{
                    width: "150px",
                    height: "150px",
                    marginBottom: "10px",
                  }}
                />
                <div
                  style={{
                    textAlign: "left",
                    marginLeft: "20px",
                    fontWeight: "bold",
                    color: "grey",
                  }}
                >
                  <div>{product.product_id}</div>
                  <div>{product.product_name}</div>
                </div>
              </div>
            </td>
          ))}
          <td style={{ textAlign: "center", verticalAlign: "middle" }}>
            {item.price}
          </td>
          <td style={{ textAlign: "center", verticalAlign: "middle" }}>
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) =>
                handleQuantityChange(item.id, parseInt(e.target.value))
              }
              style={{ width: "50px" }}
            />
          </td>
          <td style={{ textAlign: "center", verticalAlign: "middle" }}>
            {item.qty * item.price}
          </td>
          <td style={{ textAlign: "center", verticalAlign: "middle" }}>
            <button onClick={() => deleteCartItem(item.id)}>
              <FaTrash />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default CartItems;
