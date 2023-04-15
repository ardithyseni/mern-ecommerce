import axios from "axios";

export const userCart = async (cart, idtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/user/cart`,
        { cart },
        {
            headers: {
                idtoken
            }
        }
    )
}