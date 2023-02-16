import React, { Suspense, lazy } from "react";
import {
    Routes,
    Route,
    Link,
    Outlet,
    useNavigate,
} from "react-router-dom";
import '../../css/mobile/app.css'
import Home from "./Home/Home";
import Navbar from "./Navbar/Navbar";
import NavDesktop from "./Navbar/NavDesktop";
const App = () => {
    return <Routes>

        <Route path="/" element={
            <>
                <NavDesktop />
                <Home />
                <Navbar />
            </>
        }></Route>
    </Routes>
}
export default App