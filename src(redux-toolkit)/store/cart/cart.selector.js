import {createSelector} from "reselect";


const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
);

export const selectCartVisibility = createSelector(
    [selectCartReducer],
    (cart) => cart.cartVisibility
);

export const selectTotalPrice = createSelector(
    [selectCartReducer],
    (cart) => cart.totalPrice
)

export const selectTotalCount = createSelector(
    [selectCartReducer],
    (cart) => cart.totalCount
)
