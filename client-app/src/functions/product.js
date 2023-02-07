import axios from "axios";

export const createProduct = async (product, idtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
      headers: {
        idtoken
      }  
    });
};

export const getProductsByCount = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
};