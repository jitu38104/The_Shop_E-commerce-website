import { useContext, useEffect, useState } from "react";

import "./cart.styles.scss";

import { CartContext } from "../../context/cart.context";

const Cart = () => {
    const {cartItems, totalPrice, addProductToCart, deleteProductFromCart, decreaseProductQty} = useContext(CartContext);

    const decreaseQtyHandle = (id, qty) => {
        if(qty > 1) decreaseProductQty(id);
    }

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
                                cartItems.map(({id, name, price, qty, imageUrl}) => (
                                    <tr key={id}>
                                        <td>
                                            <div className="prod-img">
                                                <img className="w-100 h-100" src={imageUrl} alt={name} />
                                            </div>
                                        </td>

                                        <td>{name}</td>
                                        
                                        <td>
                                            <div className="qty-controller d-flex align-items-center justify-content-center">
                                                <i className="fa-solid fa-angle-left me-2" onClick={() => decreaseQtyHandle(id, qty)}></i>
                                                <div className="qty">{qty}</div>
                                                <i className="fa-solid fa-angle-right ms-2" onClick={() => addProductToCart({id})}></i>
                                            </div>
                                        </td>
                                        
                                        <td>${qty*price}</td>
                                        
                                        <td><i className="fa-solid fa-xmark" onClick={() => deleteProductFromCart(id)}></i></td>
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
