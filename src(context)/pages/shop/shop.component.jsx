import {useContext} from "react";
import {useNavigate} from "react-router-dom";

import {ProductsContext} from "../../context/products.context";

import "./shop.styles.scss";

const Shop = () => {
    const navigate = useNavigate();
    const {products} = useContext(ProductsContext);

    const navigationHandle = (slug) => navigate(`/shop/${slug.toLowerCase()}`);
    
    return (
        <div className="category-container py-4 px-5">
            {
                Object.keys(products).map((prodTitle, idx) => (
                    <div className="category-type" key={idx+1}>
                        <h2 className="mb-3" onClick={() => navigationHandle(prodTitle)}>{prodTitle.toUpperCase()}</h2>
                        <div className="category-list row">
                            {
                                products[prodTitle].map((product, prodIdx) => {
                                    if(prodIdx < 4) {
                                        return (
                                            <div className="category-card col-3 h-100" key={product.id}>
                                                <div className="category-img h-100 w-100" onClick={() => navigationHandle(prodTitle)}>
                                                    <img className="h-100 w-100" src={product.imageUrl} alt="" />
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Shop;
