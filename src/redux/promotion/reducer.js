import { promotionActionTypes } from "./action";


const initialState = {
    promotions: null
}

export const PromotionReducer = (state = initialState, action) => {
    switch (action.type) {
        case promotionActionTypes.GET_PROMOTIONS: 
            return {
                ...state,
                promotions: action.payload
            }
        default: return state;
    }
}