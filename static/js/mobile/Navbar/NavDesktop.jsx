import React from "react";
import { Link } from "react-router-dom";
import { AddCircleOutline, Instadirectoff, InstaLoveIcon,HomeIcon, NotificationIcon } from "../icon/icons";
const NavDesktop = (props) => {
    return <header>
        <div className="top">
            <div className="container">
                <nav className="secondary-menu">
                    <ul>
                        <li>
                            <Link to={'home'}>
                                <HomeIcon height={24.25} width={24}/>
                            </Link>
                        </li>
                        <li>
                            <Link to={'home'}>
                                <Instadirectoff width={22} height={28} />
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
                                <NotificationIcon width={29} height={28.5} />
                            </Link>
                        </li>
                        
                        <li>
                            <Link to={'home'}>
                            <AddCircleOutline height={29} width={28}/>
                            </Link>
                        </li>
                        
                    </ul>
                </nav>
                <div className="logo-container">
                    <Link to="" className="logo">
                        <img src="/assets/logo.de46d783.png"/>
                    </Link>
                </div>
                <div className="dropdown drop">
                    <Link to="/profile" className="user avatar color-1">
                        <img src="http://localhost:8000/src/x150/iup/62d81eb9dc85f.jpg" />
                    </Link>
                </div>
            </div>
        </div>
    </header>
}
export default NavDesktop