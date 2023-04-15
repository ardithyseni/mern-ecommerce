import axios from "axios";

export const saveUserCart = async (cart, idtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/user/cart`,
        { cart },
        {
            headers: {
                idtoken
            }
        }
    )
};

export const getUserCart = async (idtoken) => {
    return await axios.get(
        `${process.env.REACT_APP_API}/user/cart`,
        {
            headers: {
                idtoken
            }
        }
    )
};