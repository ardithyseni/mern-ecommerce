import axios from "axios";

export const getCategories = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/categories`);
};

export const getCategory = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
};

export const removeCategory = async (slug, idtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
      headers: {
        idtoken
      }  
    });
};

export const updateCategory = async (slug, category, idtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, category,{
      headers: {
        idtoken
      }  
    });
};

export const createCategory = async (category, idtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/category`, category, {
      headers: {
        idtoken
      }  
    });
};

export const getCategorySubs = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API}/category/subcategories/${_id}`);
};