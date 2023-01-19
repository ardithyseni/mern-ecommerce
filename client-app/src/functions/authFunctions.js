import axios from "axios";

export const createOrUpdateUser = async (idToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`,
        {
            idToken: idToken
        })
}


export const getCurrentUser = async (idToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/current-user`,
    {
        idToken: idToken
    })
}


export const getCurrentAdmin = async (idToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/current-admin`,
    {
        idToken: idToken
    })
}