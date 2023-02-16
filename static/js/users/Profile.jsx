import React from "react";
import { BrowserRouter as Router, Route, Switch, Link, useLocation, useParams } from 'react-router-dom'

import { withRouter } from "react-router";
class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
        console.log(this.props);
    } 

    render(){
        return (
            <div>
                <nav>
                    <Link to="about">My Profile</Link>
                    <Link to="Phots">My Profile</Link>
                </nav>
    
                <Router>
                    <Route path="about" element={<UserProfile />} />
                    <Route path="photos" element={<OwnUserProfile />} />
                    <Route path="*" element={<h1>introuvable</h1>} />
                </Router>
            </div>
        );

    }
}
export default withRouter(Profile)

function UserProfile(){
    return(
        <h1>about</h1>
    )
}
function OwnUserProfile(){
    return(
        <h1>photos</h1>
    )
}
