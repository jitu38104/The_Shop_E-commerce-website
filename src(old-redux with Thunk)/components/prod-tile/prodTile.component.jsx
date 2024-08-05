import {useDispatch, useSelector} from "react-redux";

import "./prodTile.styles.scss";
import {selectCartItems} from "../../store/cart/cart.selector";
import {addCartItem} from "../../store/cart/cart.action";


const ProdTile = (product) => {
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const {name, imageUrl, price} = product;

    const addProductToCart = (prodItem) => dispatch(addCartItem(cartItems, prodItem)); 

    return (
        <div className="product-container w-100 h-100 position-relative">
            <div className="prod-img w-100">
                <img src={imageUrl} className="w-100 h-100" alt={name} />
            </div>

            <div className="add-to-cart position-absolute" onClick={() => addProductToCart(product)}>ADD TO CART</div>

            <div className="prod-detail px-4 d-flex justify-content-between align-items-center">
                <div className="prod-name">{name}</div>
                <div className="prod-price">${price}</div>
            </div>
        </div>
    )
}

export default ProdTile;
