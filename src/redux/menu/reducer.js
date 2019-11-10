import { menuActionTypes } from "./action";


const initialState = {
    menus: null
}

export const MenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case menuActionTypes.GET_MENU: 
            return {
                ...state,
                menus: action.payload
            }
        default: return state;
    }
}