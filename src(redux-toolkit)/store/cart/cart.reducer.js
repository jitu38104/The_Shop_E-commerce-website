import {createSlice} from "@reduxjs/toolkit";

const INITIAL_VALUES = {
    cartVisibility: false,
    cartItems: [],
    totalPrice: 0,
    totalCount: 0
}

const addNewCartItem = (existingCart, newItem) => {
    const itemIndex = existingCart.findIndex(item => item.id === newItem.id);

    if(itemIndex >= 0) existingCart[itemIndex]["qty"] += 1;
    else existingCart.push({...newItem, qty: 1});

    return existingCart;
}

const removeSingleCartItem = (existingCart, newItem) => {
    const itemIndex = existingCart.findIndex(item => item.id === newItem.id);

    if(itemIndex >= 0 && existingCart[itemIndex]["qty"]>1) {
        existingCart[itemIndex]["qty"] -= 1;
    }

    return existingCart;
}

const deleteSingleCartItem = (existingCart, itemId) => {
    const restCart = existingCart.filter(item => item.id !== itemId);
    
    return restCart;
}

const setTotalPrice = (existingCart) => {
    const totalPrice = existingCart.reduce((total, item) => total += (item.qty*item.price), 0);
    return totalPrice;
}
const setTotalCount = (existingCart) => {
    const totalCount = existingCart.reduce((total, item) => total += item.qty, 0);
    return totalCount;
}

const cartSlice = createSlice({
    name: "cart",
    initialState: INITIAL_VALUES,
    reducers: {
        addCartItem(state, action) {
            state.cartItems = addNewCartItem(state.cartItems, action.payload);
            state.totalCount = setTotalCount(state.cartItems);
            state.totalPrice = setTotalPrice(state.cartItems); 
        },
        removeCartItem(state, action) {
            state.cartItems = removeSingleCartItem(state.cartItems, action.payload);
            state.totalCount = setTotalCount(state.cartItems);
            state.totalPrice = setTotalPrice(state.cartItems); 
        },
        deleteCartItem(state, action) {
            state.cartItems = deleteSingleCartItem(state.cartItems, action.payload);
            state.totalCount = setTotalCount(state.cartItems);
            state.totalPrice = setTotalPrice(state.cartItems); 
        },
        setCartVisibility(state, action) {
            state.cartVisibility = action.payload
        }
    }
});

export const {addCartItem, removeCartItem, deleteCartItem, setCartVisibility} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
