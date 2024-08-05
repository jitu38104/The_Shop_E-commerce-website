import {CART_TYPES} from "./cart.types";
import {setReducerAction} from "../../utils/reducer/action.reducer";

export const addCartItem = (existingCart, newItem) => {
    const itemIndex = existingCart.findIndex(item => item.id === newItem.id);

    if(itemIndex >= 0) existingCart[itemIndex]["qty"] += 1;
    else existingCart.push({...newItem, qty: 1});

    const payloadSet = {cartItems: existingCart, ...setTotalPriceAndCount(existingCart)};
    return setReducerAction(CART_TYPES.UPDATE_CART_ITEM, payloadSet);
}

export const removeCartItem = (existingCart, newItem) => {
    const itemIndex = existingCart.findIndex(item => item.id === newItem.id);

    if(itemIndex >= 0 && existingCart[itemIndex]["qty"]>1) {
        existingCart[itemIndex]["qty"] -= 1;
    }

    const payloadSet = {cartItems: existingCart, ...setTotalPriceAndCount(existingCart)};
    return setReducerAction(CART_TYPES.UPDATE_CART_ITEM, payloadSet);
}

export const deleteCartItem = (existingCart, itemId) => {
    const restCart = existingCart.filter(item => item.id !== itemId);
    
    const payloadSet = {cartItems: restCart, ...setTotalPriceAndCount(restCart)};
    return setReducerAction(CART_TYPES.UPDATE_CART_ITEM, payloadSet);
}

export const setCartVisibility = (flag) => setReducerAction(CART_TYPES.SET_CART_VISIBILITY, flag);

const setTotalPriceAndCount = (existingCart) => {
    const totalPrice = existingCart.reduce((total, item) => total += (item.qty*item.price), 0);
    const totalCount = existingCart.reduce((total, item) => total += item.qty, 0);
    return {totalPrice, totalCount};
}


