import "./loader.styles.scss";

const Loader = () => {
    return (
        <div className="loading-container w-100 d-flex justify-content-center align-items-center">
            <div className="loader">
                <i className="fa-solid fa-circle-notch fa-spin"></i>
            </div>
        </div>
    );
}

export default Loader;
