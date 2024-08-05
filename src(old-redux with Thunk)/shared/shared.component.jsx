import { Fragment } from "react";
import {Outlet} from "react-router-dom";
import Header from "../components/header/header.component";

const Shared = () => {
    return (
        <Fragment>
            <Header />
            <Outlet />
        </Fragment>
    );
}

export default Shared;
