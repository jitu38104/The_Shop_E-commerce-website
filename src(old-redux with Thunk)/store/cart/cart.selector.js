import {createSelector} from "reselect";

// export const cartItemsSelector = (state) => state.cart.cartItems;
// export const cartPriceSelector = (state) => state.cart.totalPrice;
// export const cartCountSelector = (state) => state.cart.totalCount;
// export const visibilitySelector = (state) => state.cart.cartVisibility;

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
