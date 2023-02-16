import React from "react";
import { Link } from "react-router-dom";
import { AddCircleOutline, Instadirectoff, InstaLoveIcon,HomeIcon } from "../icon/icons";

const Navbar = () => {
    return <div className="bottom_bar">
        <nav className="secondary-menu">
            <ul>
                <li>
                    <Link to={'home'}>
                        <HomeIcon height={24.25} width={24} />
                    </Link>
                </li>
                <li>
                    <Link to={'home'}>
                        <span className="bull"></span>
                        <InstaLoveIcon height={28} width={22} />
                    </Link>
                </li>
                <li>
                    <Link to={'home'}>
                        <Instadirectoff width={22} height={28} />
                    </Link>
                </li>
                <li>
                    <Link to={'home'}>
                        <AddCircleOutline height={29} width={28} />
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
}
export default Navbar