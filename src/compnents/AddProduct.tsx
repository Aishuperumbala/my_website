import React, { Component, FormEvent} from 'react'
import Button from 'react-bootstrap/Button';
import { Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';


export default class AddProduct extends Component {

  addProduct = (event: FormEvent<HTMLFormElement>)=>{
    console.log("test");
    const formData={
      name : event.currentTarget.name,
      description : event.currentTarget.description.value,
      quantity: event.currentTarget.quantity.value,
      price: event.currentTarget.price.value,
      imagepath: event.currentTarget.image.value
    }
    console.log("test22");
    // Send form data to API endpoint using Axios
    axios.post('https://mdn-test.onrender.com/product/', formData)
      .then(response => {
        console.log('Form data posted successfully:', response.data);
        // Optionally, you can redirect the user or show a success message here
      })
      .catch(error => {
        console.error('Error posting form data:', error);
        // Optionally, you can show an error message to the user here
      });
  }
  
  
  render() {
    return (
      <Form onSubmit={this.addProduct}>
      <Form.Group  as={Row} className="mb-3 mt-5" controlId="name">
        <Form.Label column sm="2">Product Name</Form.Label>
        <Col sm="5">
        <Form.Control type="text" placeholder="Enter product name" />
        </Col>
      </Form.Group>
      <Form.Group  as={Row} className="mb-3" controlId="description">
        <Form.Label column sm="2">Product Description</Form.Label>
        <Col sm="5">
        <Form.Control as="textarea"  type="description" placeholder="Enter product description" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="quantity">
        <Form.Label column sm="2">Quantity</Form.Label>
        <Col sm="5">
        <Form.Control type="number" placeholder="Enter Quantity" />
        </Col>
         </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="price">
        <Form.Label column sm="2">Price</Form.Label>
        <Col sm="5">
        <Form.Control type="number" placeholder="Enter Price" />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="image">
        <Form.Label column sm="2">Image Path</Form.Label>
        <Col sm="5">
        <Form.Control type="text"  disabled defaultValue="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" />
        </Col>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Add
      </Button>
    </Form>
    )
  }
}
