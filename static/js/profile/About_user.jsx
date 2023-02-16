import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import Error404 from "../Components/app/NotFound"
export default function Topics() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();

  return (
   
    <div className="Fdo _mainc">
      <div className="Anv RpG Adc">
        <MenuLink activeOnlyWhenExact={true} to={`${url}`}>
          <div className="page _4EzTm ovd yC0tu">
            <div className="mWe messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
              <div className="KV-D4 fDxYl">A propos du profil</div>
            </div>
          </div>
        </MenuLink>
        <MenuLink to={`${url}/global`}>
          <div className="page _4EzTm ovd yC0tu">
            <div className="mWe messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
              <div className="KV-D4 fDxYl">Information personnels</div>
            </div>
          </div>
        </MenuLink>
      </div>
      <div className="_o6mpc ">
      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/global`}>
            <Topic/>
        </Route>
        <Route path="*" component={ Error404}/>
      </Switch>
      </div>
    </div>
  );
}

function Topic() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let { topicId } = useParams();

  return (
    <div className="Fdo ">
        <div className="profile-container-info">
        <div className="profile-info N8tH">
          <div className="column">
             <div className="about-me">
               <div className="age">
                 <span className="answer">Mon age: </span>
                 <span >24</span>
               </div>
               <div className="location">
                 <span className="answer">J'habite a: </span>
                 <span>Antananarivo</span>
               </div>
               <div className="occupation">
                 <span className="answer">Je travaille chez: </span>
                 <span>a la maison</span>
               </div>
             </div>
          </div>
          <div className="column preferences">
            <h3>Ce que je cherche</h3>
            <div className="user-preferences">
            <div className="gender-age-preferences">
                </div>
          </div>
            </div>
        </div>
        <div className="profile-info N8tH">
        <div className="column interests">
            <h3>Ce qui m'interessent</h3>
            <div className="spinner-container">
              <div className="selected-interests icons">
                <div className="interest museum-arts">
                  <div className="icon-wrapper">
                    <div className="icon"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
  );
}

function MenuLink({ to,name,onClick, activeOnlyWhenExact,children }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });
    return(
      <>
        {match ? 
            <div className="page h9nv oocd Ngt Fdo Igw0E  IwRSH   eGOV_    _4EzTm">
                <div className="rOtsg">
                  <div className="Fdo   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm">
                    {children}
                  </div>
                </div>
            </div>
         :
            <div className="page h9nv  qF0y9 Ngt Igw0E  IwRSH   eGOV_    _4EzTm">
                <div className="rOtsg">
                    <Link onClick={onClick} to={to} className="Fdo   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm">{children}</Link>
                </div>
            </div>
        }
        </>
    ) 
}