import {Route, Routes} from "react-router-dom";
import Shared from "./shared/shared.component";
import Home from "./pages/home/home.component";
import Login from "./pages/login/login.component";
import Cart from "./pages/cart/cart.component";
import Product from "./pages/product/product.component";
import Shop from "./pages/shop/shop.component";

const App = () => {
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
