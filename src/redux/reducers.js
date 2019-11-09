import { combineReducers } from 'redux';

import { PromotionReducer } from './promotion/reducer'

export default combineReducers({
    Promotion: PromotionReducer,
})