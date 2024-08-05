import {combineReducers} from "@reduxjs/toolkit";

import {userReducer} from "./user/user.reducer";
import {productReducer} from "./product/product.reducer";
import {cartReducer} from "./cart/cart.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    api: productReducer,
    cart: cartReducer
});
