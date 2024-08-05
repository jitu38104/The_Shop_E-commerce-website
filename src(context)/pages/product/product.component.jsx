import {useParams} from "react-router-dom";
import {useContext} from "react";

import ProdTile from "../../components/prod-tile/prodTile.component";
import {ProductsContext} from "../../context/products.context";

import "./product.styles.scss";

const Product = () => {
    const {category} = useParams();
    const {products} = useContext(ProductsContext)

    return (
        <div className="products-container pb-5 px-5 w-100">
            <div className="row gy-4">
                {
                    products[category].map((item) => (
                        <div className="col-3" key={item.id}>
                            <ProdTile {...item} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Product;
