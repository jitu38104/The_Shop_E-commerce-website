import { useEffect, lazy, Suspense } from "react";
import {Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";

import Shared from "./shared/shared.component";
import Loader from "./components/loader/loader.component";
import {setCurrentUser} from "./store/user/user.action";
import { 
  createUserDocFromAuth,
  onAuthStateChangedListener 
} from "./utils/firebase/firebase.utils";

const Home = lazy(() => import("./pages/home/home.component"));
const Login = lazy(() => import("./pages/login/login.component"));
const Cart = lazy(() => import("./pages/cart/cart.component"));
const Navigation = lazy(() => import("./components/navigation/navigation.component"));


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

  return (
    <Suspense fallback={Loader}>
      <Routes>
        <Route path="/" element={<Shared/>}>
          <Route index element={<Home/>} />
          <Route path="home" element={<Home/>} />
          <Route path="login" element={<Login/>} />
          <Route path="cart" element={<Cart/>} />
          <Route path="shop/*" element={<Navigation/>} />
        </Route>
      </Routes>
    </Suspense>
  )
};

export default App;
