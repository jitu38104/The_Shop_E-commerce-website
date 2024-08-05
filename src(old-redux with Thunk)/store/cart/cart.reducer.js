import {CART_TYPES} from "./cart.types";

const INITIAL_VALUES = {
    cartVisibility: false,
    cartItems: [],
    totalPrice: 0,
    totalCount: 0
}

export const cartReducer = (state=INITIAL_VALUES, action={}) => {
    const {type, payload} = action;
    
    switch(type) {
        case CART_TYPES.UPDATE_CART_ITEM:
            return { ...state, ...payload };
        case CART_TYPES.SET_CART_VISIBILITY:
            return { ...state, cartVisibility: payload };
        default:
            return state;
    }
}
