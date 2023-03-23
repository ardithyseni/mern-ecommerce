let initialState = [];

// Load cart from local storage

// make sure we have window object so that we have localStorage
if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
        initialState = JSON.parse(localStorage.getItem("cart"));
    } else {
        initialState = [];
    }
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return action.payload;
        default:
            return state;
    }
};
