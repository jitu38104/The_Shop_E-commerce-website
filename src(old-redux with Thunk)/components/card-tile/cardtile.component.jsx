import "./cardtile.styles.scss";

const CardTile = ({cardTitle, cardImg}) => {
    return (
        <div className="card-tile-container w-100 h-100 position-relative">
            <img className="w-100 h-100" src={cardImg} alt="card-img" />

            <div className="card-tag p-4 text-center position-absolute">
                <h4>{cardTitle.toUpperCase()}</h4>
                <p>SHOP NOW</p>
            </div>
        </div>
    )
}

export default CardTile;
