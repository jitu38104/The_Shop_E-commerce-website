import {createSlice} from "@reduxjs/toolkit";

const INITIAL_VALUES = {
    products: {},
    directories: {}
}

const productSlice = createSlice({
    name: "product",
    initialState: INITIAL_VALUES,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        },
        setDirectories(state, action) {
            state.directories = action.payload;
        }
    }
})

export const {setProducts, setDirectories} = productSlice.actions;

export const productReducer = productSlice.reducer;

