import {createContext, useEffect, useState} from "react";
import {addCollectionAndDocuments, getCollectionAndDocuments, getDirectoryCollectionDoc} from "../utils/firebase/firebase.utils";

// import {SHOP_DATA} from "../models/shop-data";

export const ProductsContext = createContext({
    products: {},
    directories: {}
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState({});
    const [directories, setDirectories] = useState({});
    const value = {products, directories};

    useEffect(() => {
        (async() => {
            //await addCollectionAndDocuments('categories', SHOP_DATA);
            const productsMap = await getCollectionAndDocuments();
            const direcotriesMap = await getDirectoryCollectionDoc();
            setProducts(productsMap);
            setDirectories(direcotriesMap);
            console.log(direcotriesMap)
        })();
    }, []);

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
