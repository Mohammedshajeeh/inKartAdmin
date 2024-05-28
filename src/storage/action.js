import { LOGIN, SIGNOUT } from "./constant";

export const login = data => ({
    type: LOGIN,
    payload: {
        userId: data.userId,
        FirstName: data.FirstName,
        LastName: data.LastName,
        email: data.email,
        mobilenumber: data.mobilenumber,
        catagories:[], 
    }
})

export const signout = data => ({
    type: SIGNOUT,
    payload: {}
})
