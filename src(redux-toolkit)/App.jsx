import { useEffect } from "react";
import {Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";

import Shared from "./shared/shared.component";
import Home from "./pages/home/home.component";
import Login from "./pages/login/login.component";
import Cart from "./pages/cart/cart.component";
import Product from "./pages/product/product.component";
import Shop from "./pages/shop/shop.component";
import {setCurrentUser} from "./store/user/user.reducer";
import {setDirectories, setProducts} from "./store/product/product.reducer";
import { 
  createUserDocFromAuth, 
  getCollectionAndDocuments, 
  getDirectoryCollectionDoc, 
  onAuthStateChangedListener 
} from "./utils/firebase/firebase.utils";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener({
        next: async(user) => {
            if(user) await createUserDocFromAuth(user);
            dispatch(setCurrentUser(user));
        }, error: (err) => console.log(err)
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    (async() => {
      const productsMap = await getCollectionAndDocuments();
      const direcotriesMap = await getDirectoryCollectionDoc();
      dispatch(setProducts(productsMap));
      dispatch(setDirectories(direcotriesMap));
      console.log(direcotriesMap)
    })();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Shared/>}>
        <Route index element={<Home/>} />
        <Route path="home" element={<Home/>} />
        <Route path="login" element={<Login/>} />
        <Route path="cart" element={<Cart/>} />
        <Route path="shop" element={<Shop/>} />
        <Route path="shop/:category" element={<Product/>} />
      </Route>
    </Routes>
  )
};

export default App;
