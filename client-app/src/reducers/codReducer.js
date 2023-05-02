// cash on delivery reducer

export const codReducer = (state = false, action) => {
    switch (action.type) {
        case "CASH_ON_DELIVERY":
            return action.payload;
        default:
            return state;
    }
};
