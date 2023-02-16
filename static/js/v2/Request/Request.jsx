import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Main } from "./Components/Main";
import { withRouter } from "../util/WithRouter";
import Received from "./Components/Received";
import Sended from "./Components/Sended";
const Request = (props) => {
    const background = props.location.state && props.location.state.background;
    return <div className="Fdo aBv FGM nF1 CenterContainer">
        <Routes location={background || location}>
            <Route path="/" element={<Main />}>
                <Route index element={<Received />} />
                <Route path="/sended" element={<Sended/>}/>
            </Route>
        </Routes>
    </div>
}
export default withRouter(Request)