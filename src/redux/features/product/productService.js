import axios from "axios";
import { SERVER_URL } from "../../../services/server_url";


const API_URL = `${SERVER_URL}/api/products/`;

// Create New Product
export const createProduct = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all products
export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Product
export const deleteProduct = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Product
export const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Product
export const updateProduct = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
}

export default  productService
