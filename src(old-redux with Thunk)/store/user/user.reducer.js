import {USER_TYPES} from "./user.types";

const INITIAL_VALUES = {
    currentUser: {}
}

export const userReducer = (state=INITIAL_VALUES, action={}) => {
    const {type, payload} = action;

    switch(type) {
        case USER_TYPES.CREATE_USER:
            return {...state, currentUser: payload};
        default:
            return state;
    }
}

