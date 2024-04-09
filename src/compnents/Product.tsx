import React, { useState } from "react";
import { Card, Col, Button } from "react-bootstrap";


interface ProductProps {
  product: {
    product_id: string;
    product_name: string;
    price: number;
    products_image: string;
    // Add any other properties of the product here
  };
  addToCart: (productId: string, quantity: number) => void;
}

function Product({ product, addToCart }: ProductProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <Col className="mt-5">
      <Card style={{ height: "100%", borderColor: "#c71585", borderWidth: "2px"}}>
        <div style={{ height:"500px", overflow: "hidden" }}>
          <Card.Img
            className="px-5 pt-5 pb-2"
            variant="top"
            src={product.products_image}
          />
        </div>
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title>{product.product_name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {product.product_id}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              {product.price}
            </Card.Subtitle>
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
              style={{ width: "50px",  outline: "1px solid #c71585" }}
            />
          </div>
          <Button
            variant="outline-dark"
            style={{ backgroundColor: "#C71585", color : 'white', borderColor: "#c71585" }}
            onClick={() => addToCart(product.product_id, quantity)}
          >
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Product;
