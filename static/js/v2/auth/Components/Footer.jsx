import React from "react";
import { Link } from "react-router-dom";
import Brand from '../../../../images/brand.png'
function Footer() {
    return <footer>
        <div className="container">
            <div className="three-col">
                <div className="first">
                    <div className="logo">
                        <Link to={'/'}>
                            <img src={Brand} />
                        </Link>
                    <span className="copy" dangerouslySetInnerHTML={{ __html: '&copy tafaray, reseaux social de rencontre pour tout le monde.' }}></span>
                    </div>
                    <div className="Fdo bi6gxh9e">
                        developper par <Link target={'_blank'} className="LmP" to={'www.zarao-lab.com'}> zarao-lab</Link> 
                    </div>
                </div>
                <div className="second">
                    <h2>A propos</h2>
                    <ul className="link-list">
                        <li>
                            <Link to={''} className="">C'est quoi tafaray?</Link>
                        </li>
                        <li>
                            <Link to={''} className="">Conditions générales & Cookies</Link>
                        </li>
                        <li>
                            <Link to="" className="">Aide</Link>
                        </li>
                        <li>
                            <Link to="/reglements" className="">Règlement de la comunauté</Link>
                        </li>
                    </ul>
                </div>
                <div className="third">
                    <h2>Publicité</h2>
                    <ul className="link-list">
                        <li>
                            <Link to={''} className="">créer une Publicité sur tafaray</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
}
export default Footer