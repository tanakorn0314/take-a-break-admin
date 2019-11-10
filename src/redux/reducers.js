import { combineReducers } from 'redux';

import { PromotionReducer } from './promotion/reducer'
import { MenuReducer } from './menu/reducer';
import { OrderReducer } from './order/reducer';

export default combineReducers({
    Promotion: PromotionReducer,
    Menu: MenuReducer,
    Order: OrderReducer
})