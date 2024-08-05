import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";

import Loader from "../../components/loader/loader.component";
import {directorySelector, isLoading} from "../../store/product/product.selector"
import {fetchCategoryProcessAsync} from "../../store/product/product.action"
import CardTile from "../../components/card-tile/cardtile.component";

import "./home.styles.scss";

const Home = () => {
    const dispatch = useDispatch();
    const directories = useSelector(directorySelector);
    const isLoadingProgress = useSelector(isLoading);

    useEffect(() => {
        dispatch(fetchCategoryProcessAsync());
    }, []);

    return (
        isLoadingProgress 
        ?   <Loader /> 
        :   <div className="home-container px-5 row gy-3 gx-0">
                {
                    Object.keys(directories).map((dirKey, index) => {
                        const {id, title, imageUrl} = directories[dirKey];
                        return (
                            <div className={`card-container ${index<3?'col-4':'col-6'}`} key={id}>
                                <Link to={`shop/${title.toLowerCase()}`}>
                                    <CardTile cardTitle={title} cardImg={imageUrl} />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
    );
}
    

export default Home;
