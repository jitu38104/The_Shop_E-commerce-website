import {PRODUCT_TYPES} from "./product.types";
import {setReducerAction} from "../../utils/reducer/action.reducer";
import { getCollectionAndDocuments, getDirectoryCollectionDoc } from "../../utils/firebase/firebase.utils";

const startFetchingData = () => setReducerAction(PRODUCT_TYPES.FETCHING_START, true);
const setProducts = (products) => setReducerAction(PRODUCT_TYPES.UPDATE_PRODUCT, products);
const setDirectories = (directories) => setReducerAction(PRODUCT_TYPES.UPDATE_DIRECTRY, directories);
const fetchingDataError = (error) => setReducerAction(PRODUCT_TYPES.FETCHING_FAILED, error);

export const fetchProductProcessAsync = () => {
    return async(dispatch) => {
        dispatch(startFetchingData());
    
        try {
            const products = await getCollectionAndDocuments();
            dispatch(setProducts(products));
        } catch (error) {
            dispatch(fetchingDataError(error));
        }
    };
}

export const fetchCategoryProcessAsync = () => {
    return async(dispatch) => {
        dispatch(startFetchingData());
    
        try {
            const directories = await getDirectoryCollectionDoc();
            dispatch(setDirectories(directories));
        } catch (error) {
            dispatch(fetchingDataError(error));
        }
    }
}
