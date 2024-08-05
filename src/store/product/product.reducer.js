import {PRODUCT_TYPES} from "./product.types";

const INITIAL_VALUES = {
    products: {},
    directories: {},
    isLoading: false,
    error: ""
}

export const productReducer = (state=INITIAL_VALUES, action={}) => {
    const {type, payload} = action;

    switch(type) {
        case PRODUCT_TYPES.FETCHING_START:
            return {...state, isLoading: payload};
        case PRODUCT_TYPES.UPDATE_PRODUCT:
            return {...state, products: payload, isLoading: false};
        case PRODUCT_TYPES.UPDATE_DIRECTRY:
            return {...state, directories: payload, isLoading: false};
        case PRODUCT_TYPES.FETCHING_FAILED:
            return {...state, error: payload, isLoading: false}
        default:
            return state;
    }
}
