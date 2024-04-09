import axios from "axios";

const BASE_URL = "https://mdn-test.onrender.com";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getProductsById = async (id : string) => {
  try {
    const response = await axios.get(`${BASE_URL}/product/${id}`);
   // console.log("getProductsById", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getCartItems = async () => {
  let cartId = localStorage.getItem("cartId");
  try {
    const carts : any[]= await checkCartExist();
    const isCartExists = carts.some((cart) => cart.id === parseInt(cartId));
    if (isCartExists) {
      const response = await axios.get(`${BASE_URL}/cart/${cartId}`);
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const createCart = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/cart`);
    console.log("cart", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const checkCartExist = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cart`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const addItemsCart = async ( cartId : string , productId : string, quantity : number ) => {
  console.log("add item", cartId, productId, quantity);

  try {
    const response = await axios.post(
      `${BASE_URL}/cart/add/${cartId}?product_id=${productId}&quantity=${quantity}`
    );
    console.log("add item2222", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};


export const DeleteCart = async () => {
  let cartId = localStorage.getItem("cartId");
  try {
    const response = await axios.delete(
      `${BASE_URL}/cart/${cartId}`
    );
    console.log("delete item2222", response.data);
    return response.data;
  } catch (error) {
    console.error("delete:", error);
    throw error;
  }
};

export const DeleteCartItems = async (id : number) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/cart_items/${id}`
    );
    console.log("delete item2222", response.data);
    return response.data;
  } catch (error) {
    console.error("delete:", error);
    throw error;
  }
};

export const UpdateCartItemsQty = async (id : number, qty : number) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/cart/quantity/${id}?quantity=${qty}`
    );
    console.log("update item2222", response.data);
    return response.data;
  } catch (error) {
    console.error("update:", error);
    throw error;
  }
};