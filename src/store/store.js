import {compose, legacy_createStore as createStore, applyMiddleware} from "redux";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {logger} from "redux-logger";
import {thunk} from "redux-thunk";

import {rootReducer} from "./root-reducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart"],
    // blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV!=="production" && 
    logger, thunk
].filter(Boolean);

const composeEnhancer = (
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV!=="production" && window 
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedLogger = composeEnhancer(applyMiddleware(...middleware));

export const store = createStore(persistedReducer, undefined, composedLogger);

export const persistor = persistStore(store);
