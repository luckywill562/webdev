import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
function OldSchoolMenuLink({ to,name,onClick, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });
    return(
      <>
        {match ? 
            <li className="Y8-fY Gty Ncf Vfr">
                <div className="DrL">
                    <div className="">{name}</div>
                </div>
            </li>
         :
            <li className="Y8-fY Ncf Vfr">
                <div className="DrL">
                    <Link onClick={onClick} to={to} className="-nal3">{name}</Link>
                </div>
            </li>
        }
        </>
    ) 
}
export default class Topics extends React.Component { 
  constructor(props){
    super(props)
    this.state = {
    }
  }

  component = ()=>{
    return (
      <div className="Fdo messagerie-container sLayout">
        <div className="container-box messages-wrapper">
          <div className="Fdo messages-listing">
            <div className="messages-list-wrapper">
              <div className="messages-list-header">
                <div className="messages-list-title">Parametres</div>
                <div className="icon-message-seting">
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="#000000"><g><path d="M 27.526,12.682c-0.252-0.876-0.594-1.71-1.028-2.492l 1.988-4.182c-0.738-0.92-1.574-1.756-2.494-2.494 l-4.182,1.988c-0.78-0.432-1.616-0.776-2.492-1.028L 17.762,0.102C 17.184,0.038, 16.596,0, 16,0S 14.816,0.038, 14.238,0.102L 12.682,4.474 C 11.808,4.726, 10.972,5.070, 10.192,5.502L 6.008,3.514c-0.92,0.738-1.756,1.574-2.494,2.494l 1.988,4.182 c-0.432,0.78-0.776,1.616-1.028,2.492L 0.102,14.238C 0.038,14.816,0,15.404,0,16s 0.038,1.184, 0.102,1.762l 4.374,1.556 c 0.252,0.876, 0.594,1.71, 1.028,2.492l-1.988,4.182c 0.738,0.92, 1.574,1.758, 2.494,2.494l 4.182-1.988 c 0.78,0.432, 1.616,0.776, 2.492,1.028l 1.556,4.374C 14.816,31.962, 15.404,32, 16,32s 1.184-0.038, 1.762-0.102l 1.556-4.374 c 0.876-0.252, 1.71-0.594, 2.492-1.028l 4.182,1.988c 0.92-0.738, 1.758-1.574, 2.494-2.494l-1.988-4.182 c 0.432-0.78, 0.776-1.616, 1.028-2.492l 4.374-1.556C 31.962,17.184, 32,16.596, 32,16s-0.038-1.184-0.102-1.762L 27.526,12.682z M 16,24 c-4.418,0-8-3.582-8-8c0-4.418, 3.582-8, 8-8s 8,3.582, 8,8C 24,20.418, 20.418,24, 16,24zM 12,16A4,4 1080 1 0 20,16A4,4 1080 1 0 12,16z"></path></g></svg>
                </div>
              </div>
                <div className="conversation-list-content">
                  <div className="side-bar-message-wrapper message-scrollabled-list">
                      <div> 
                        <OldSchoolMenuLink activeOnlyWhenExact={true} to="/account/" name="vue d'ensemble"/>
                        <OldSchoolMenuLink  to="/account/upgrade/" name="Upgrade"/>
                      </div>
                  </div>
                </div>
            </div>
          </div>
          <div className="messages-text-container">
            <div className="conversation-container">
              <Switch>
                <Route exact path="/account/">
                  <h3>modifier le parametres</h3>
                </Route>
                <Route exact path="/account/upgrade/">
                  <div className="conversation-header"></div>
                  <div className="conversation-main">
                      <h1>upgrade</h1>
                  </div>
                  <div className="conversation-footer">
                  </div>
                </Route>
              </Switch>
            </div>
          </div>
      </div>
      </div>
    );

  }
  render(){
    return(<this.component/>)
  }
}
