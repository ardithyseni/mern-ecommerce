import axios from "axios";

export const getSubcategories = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/subcategories`);
};

export const getSubcategory = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/subcategory/${slug}`);
};

export const removeSubcategory = async (slug, idtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/subcategory/${slug}`, {
      headers: {
        idtoken
      }  
    });
};

export const updateSubcategory = async (slug, subcategory, idtoken) => {
    return await axios.put(`${process.env.REACT_APP_API}/subcategory/${slug}`, subcategory,{
      headers: {
        idtoken
      }  
    });
};

export const createSubcategory = async (subcategory, idtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/subcategory`, subcategory, {
      headers: {
        idtoken
      }  
    });
};

