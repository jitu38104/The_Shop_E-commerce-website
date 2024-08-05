import {useDispatch, useSelector} from "react-redux";

import "./cart.styles.scss";
import { selectCartItems, selectTotalPrice } from "../../store/cart/cart.selector";
import { deleteCartItem, addCartItem, removeCartItem } from "../../store/cart/cart.action";


const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice); 

    const removeCartItemHandle = (item) => {
        if(item?.qty > 1) dispatch(removeCartItem(cartItems, item));
    }

    const addCartItemHandle = (item) => dispatch(addCartItem(cartItems, item));

    const deleteCartItemHandle = (id) => dispatch(deleteCartItem(cartItems, id));

    return (
        <div className="cart-container w-100 d-flex align-items-center justify-content-center">
            <div className="cart-table w-50">
                <div className="table-container">
                    <table className="w-100">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartItems.map((item) => (
                                    <tr key={item?.id}>
                                        <td>
                                            <div className="prod-img">
                                                <img className="w-100 h-100" src={item?.imageUrl} alt={item?.name} />
                                            </div>
                                        </td>

                                        <td>{item?.name}</td>
                                        
                                        <td>
                                            <div className="qty-controller d-flex align-items-center justify-content-center">
                                                <i className="fa-solid fa-angle-left me-2" onClick={() => removeCartItemHandle(item)}></i>
                                                <div className="qty">{item?.qty}</div>
                                                <i className="fa-solid fa-angle-right ms-2" onClick={() => addCartItemHandle(item)}></i>
                                            </div>
                                        </td>
                                        
                                        <td>${item?.qty*item?.price}</td>
                                        
                                        <td><i className="fa-solid fa-xmark" onClick={() => deleteCartItemHandle(item?.id)}></i></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="total-price text-end pt-4">TOTAL: ${totalPrice}</div>
            </div>
        </div>
    )
}

export default Cart;
