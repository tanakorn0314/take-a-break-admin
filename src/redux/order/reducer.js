import { orderActionTypes } from "./action";

const initialState = {
    orders: null
}

export const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case orderActionTypes.GET_ORDER: 
            return {
                ...state,
                orders: action.payload
            }
        default: return state;
    }
}