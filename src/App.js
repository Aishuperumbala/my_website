import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./compnents/NavBar";
import { Routes, Route } from "react-router-dom";
import Product from "./compnents/ProductsList";
import Cart from "./compnents/Cart";
import Home from "./compnents/Home";
import AddProduct from "./compnents/AddProduct";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/addproduct" element={<AddProduct />}></Route>
      </Routes>
    </div>
  );
}

export default App;
