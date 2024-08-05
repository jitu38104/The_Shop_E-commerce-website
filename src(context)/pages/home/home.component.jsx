import { useContext } from "react";
import {Link} from "react-router-dom";

import CardTile from "../../components/card-tile/cardtile.component";
import {ProductsContext} from "../../context/products.context";

import "./home.styles.scss";

const Home = () => {
    const {directories} = useContext(ProductsContext);

    return (
        <div className="home-container px-5 row gy-3 gx-0">
            {
                Object.keys(directories).map((dirKey, index) => {
                    const {id, title, imageUrl} = directories[dirKey];
                    return (
                        <div className={`card-container ${index<3?'col-4':'col-6'}`} key={id}>
                            <Link to={`/shop/${title.toLowerCase()}`}>
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
