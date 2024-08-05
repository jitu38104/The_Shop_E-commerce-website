import {createContext, useReducer} from "react";

export const CartContext = createContext({
    cartVisibility: false,
    cartItems: [],
    totalPrice: 0,
    setCartVisibility: () => {},
    addProductToCart: () => {},
    decreaseProductQty: () => {},
    deleteProductFromCart: () => {},
});

const INITIAL_STATE = {
    cartVisibility: false,
    cartItems: [],
    totalPrice: 0
}

const CART_ACTION_TYPES = {
    SET_CART_VISIBILITY: "SET_CART_VISIBILITY",
    UPDATE_CART_ITEM: "UPDATE_CART_ITEM"
}

export const cartReducer = (state, action) => {
    const {type, payload} = action;
    
    switch(type) {
        case CART_ACTION_TYPES.UPDATE_CART_ITEM:
            return {...state, ...payload}
        case CART_ACTION_TYPES.SET_CART_VISIBILITY:
            return {...state, cartVisibility:payload}
        default:
            throw new Error(`${type} is an unknown reducer type`)
    }
}

export const CartProvider = ({children}) => {
    const [{cartItems, totalPrice, cartVisibility}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const totalCartPrice = cartItems.reduce((total, item) => total+(item.qty*item.price), 0);

        dispatch({type: CART_ACTION_TYPES.UPDATE_CART_ITEM, payload: {
            cartItems: newCartItems,
            totalPrice: totalCartPrice
        }});
    }

    const setCartVisibility = (visiblityBool) => {
        dispatch({type: CART_ACTION_TYPES.SET_CART_VISIBILITY, payload: visiblityBool});
    }


    const addProductToCart = (product) => {
        const indexOfItem = cartItems.findIndex(item => item.id === product.id);
        if(indexOfItem>=0) {
            cartItems[indexOfItem]["qty"] += 1;
            updateCartItemsReducer([...cartItems]);
        } else {
            updateCartItemsReducer([...cartItems, {...product, qty: 1}]);
        }
    }

    const decreaseProductQty = (id) => {
        const indexOfItem = cartItems.findIndex(item => item.id === id);
        
        if(indexOfItem>=0) {
            cartItems[indexOfItem]["qty"] -= 1;
            updateCartItemsReducer([...cartItems]);
        }
    }

    const deleteProductFromCart = (id) => {
        const updatedCartItems = cartItems.filter(item => item.id!=id);
        updateCartItemsReducer(updatedCartItems);
    }

    const value = {cartVisibility, setCartVisibility, cartItems, totalPrice, addProductToCart, deleteProductFromCart, decreaseProductQty};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
