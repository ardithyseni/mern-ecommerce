import axios from "axios";

export const createOrUpdateUser = async (idtoken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/create-or-update-user`,
      {},
      {
        headers: {
          idtoken,
        },
      }
    );
  };


  export const getCurrentUser = async (idtoken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/current-user`,
      {},
      {
        headers: {
          idtoken,
        },
      }
    );
  };
  


  export const getCurrentAdmin = async (idtoken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/current-admin`,
      {},
      {
        headers: {
          idtoken,
        },
      }
    );
  };