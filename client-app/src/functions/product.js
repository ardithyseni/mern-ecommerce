import axios from "axios";

export const createProduct = async (product, idtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
        headers: {
            idtoken,
        },
    });
};

export const getProductsByCount = async (count) => {
    return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
};

export const getProductBySlug = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);
};

export const updateProduct = async (slug, product, idtoken) => {
    return await axios.put(
        `${process.env.REACT_APP_API}/product/${slug}`,
        product,
        {
            headers: {
                idtoken,
            },
        }
    );
};

export const deleteProduct = async (slug, idtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
        headers: {
            idtoken,
        },
    });
};

export const getProductsByFilter = async (sort, order, pageNumber) => {
    return await axios.post(`${process.env.REACT_APP_API}/products`, {
        sort,
        order,
        pageNumber,
    });
};

export const countProducts = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/products/total`);
};

export const rateProductFunction = async (productId, star, idtoken) => {
    return await axios.put(
        `${process.env.REACT_APP_API}/product/rate/${productId}`,
        { star },
        {
            headers: {
                idtoken,
            },
        }
    );
};

export const getRelated = async (productId) =>
    await axios.get(
        `${process.env.REACT_APP_API}/product/related/${productId}`
    );

export const fetchProductsByFilter = async (arg) => {
    return await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
};
