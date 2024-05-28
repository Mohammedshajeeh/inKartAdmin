import { LOGIN, SIGNOUT } from "./constant";

// const initialState = {
//     isLoggedIN: true,
//     userId: ""
// };

const initialState = {
    isLoggedIN: false, // Corrected to false
    userId: ""
};


export const inKartReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                userId: action.payload.userId,
                isLoggedIN: true // <-- Corrected value
            };
        case SIGNOUT:
            return {
                ...state,
                userId: "",
                isLoggedIN: false,
            };
        default:
            return state;
    }
};

