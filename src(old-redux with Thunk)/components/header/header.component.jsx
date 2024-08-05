import {Fragment} from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import {signOutUser} from "../../utils/firebase/firebase.utils";
import {CartBox} from "../cartBox/cartBox.components";
import {userSelector} from "../../store/user/user.selector";
import {selectCartVisibility, selectTotalCount} from "../../store/cart/cart.selector";
import {setCartVisibility} from "../../store/cart/cart.action";

import "./header.styles.scss";


const Header = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(userSelector);
    const cartVisibility = useSelector(selectCartVisibility);
    const totalCount = useSelector(selectTotalCount);

    const cartVisibilityHandle = () => dispatch(setCartVisibility(!cartVisibility));

    const logoutHandle = async() => await signOutUser();

    return (
        <div className="header sticky-top bg-white w-100 d-flex align-items-center justify-content-between px-5 py-3">
            <div className="logo">
                <Link to="/"><img src="/images/hero.png" alt="brand-logo" /> </Link>
            </div>

            <div className="links-container d-flex align-items-end">
                <Link className="nav-link" to="/shop">SHOP</Link>
                {
                    currentUser 
                    ? <Fragment>
                        {/* <Link className="nav-link ps-4">CONTACT</Link> */}
                        <Link className="nav-link ps-4" onClick={logoutHandle}>LOGOUT</Link>
                      </Fragment>
                    : <Link className="nav-link ps-4" to='/login'>LOGIN</Link>
                }
                <div className="add-to-cart ps-5 position-relative" onClick={cartVisibilityHandle}>
                    <img src="/images/shopping-cart.png" alt="cart" />
                    <div className="counter position-absolute">{totalCount}</div>
                </div>
            </div>

            {cartVisibility && <CartBox/>}
        </div>
    )
}

export default Header;
