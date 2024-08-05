import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

import ProdTile from "../../components/prod-tile/prodTile.component";
import Loader from "../../components/loader/loader.component";
import {productSelector, isLoading} from "../../store/product/product.selector";

import "./product.styles.scss";

const Product = () => {
    const {category} = useParams();
    const products = useSelector(productSelector);
    const isLoadingProgress = useSelector(isLoading);
    console.log(category, isLoadingProgress, products);

    return (
        isLoadingProgress 
        ?   <Loader />
        :   <div className="products-container pb-5 px-5 w-100">
                <div className="row gy-4">
                    {
                        Object.keys(products).length && products[category].map((item) => (
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
