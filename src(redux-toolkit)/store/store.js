import {configureStore} from "@reduxjs/toolkit";
import {logger} from "redux-logger";

import {rootReducer} from "./root-reducer";

// eslint-disable-next-line no-undef
const middleware = [process.env.NODE_ENV==="development" && logger].filter(Boolean);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(middleware)
}) 


// const composedLogger = compose(applyMiddleware(...middleware));
// import {compose, legacy_createStore as createStore, applyMiddleware} from "redux";
// import {persistReducer, persistStore} from "redux-persist";
// import storage from "redux-persist/lib/storage";



// const persistConfig = {
//     key: "root",
//     storage,
//     blacklist: ["user"]
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);



// export const store = createStore(persistedReducer, undefined, composedLogger);

// export const persistor = persistStore(store);
