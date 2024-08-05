import {Route, Routes} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Shop from "../../pages/shop/shop.component";
import Product from "../../pages/product/product.component";
import { fetchProductProcessAsync } from "../../store/product/product.action";

const Navigation = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductProcessAsync());
    });

    return (
        <Routes>
            <Route index element={<Shop/>} />
            <Route path=":category" element={<Product/>} />
        </Routes>
    );
}

export default Navigation;
