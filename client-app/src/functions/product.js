import axios from "axios";

export const createProduct = async (product, idtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
      headers: {
        idtoken
      }  
    });
};
