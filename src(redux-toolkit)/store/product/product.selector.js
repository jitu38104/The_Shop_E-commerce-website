import {createSelector} from "reselect";

const selectProductReducer = (state) => state.api;

export const selectProducts = createSelector(
    [selectProductReducer],
    (api) => api.products
);

export const selectDirectories = createSelector(
    [selectProductReducer],
    (api) => api.directories
)



