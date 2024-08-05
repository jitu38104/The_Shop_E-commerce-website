import {useNavigate} from "react-router-dom";

import "./cartBox.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

export const CartBox = () => {
    const {cartItems, cartVisibility, setCartVisibility} = useContext(CartContext);
    const navigate = useNavigate();
    
    const navigateHandler = () => {
        setCartVisibility(!cartVisibility);
        navigate("/cart");
    }


    return (
        <div className="cart-box px-4 py-2">
            <div className="items">
                {
                    cartItems.map(({id, name, price, qty, imageUrl}) => (
                        <div className="item-container w-100 d-flex align-items-center mb-3" key={id}>
                            <div className="item-img me-3 h-100"><img className="h-100 w-100" src={imageUrl} alt={name} /></div>
                            <div className="item-data">
                                <p className="name">{name}</p>  
                                <p className="price">{price} x {qty}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            
            <div className="bttn text-center w-100">
                <button className="btn btn-dark w-100" onClick={navigateHandler}>Go To Cart</button>
            </div>
        </div>
    );
}

