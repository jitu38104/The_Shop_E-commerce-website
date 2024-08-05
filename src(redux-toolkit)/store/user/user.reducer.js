import {createSlice} from "@reduxjs/toolkit";

const INITIAL_VALUES = {
    currentUser: {}
}

const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_VALUES,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        }
    }
});

export const {setCurrentUser} = userSlice.actions;

export const userReducer = userSlice.reducer;


