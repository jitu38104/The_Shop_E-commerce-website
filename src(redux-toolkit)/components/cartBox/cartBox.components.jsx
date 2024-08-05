import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./cartBox.styles.scss";

import {setCartVisibility} from "../../store/cart/cart.reducer";
import {selectCartItems, selectCartVisibility} from "../../store/cart/cart.selector";

export const CartBox = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);
    const cartVisibility = useSelector(selectCartVisibility);
    
    const updateCartVisibility = () => dispatch(setCartVisibility(!cartVisibility));
    
    const navigateHandler = () => {
        updateCartVisibility();
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

