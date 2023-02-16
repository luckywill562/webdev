import React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";
import Login from "./Components/login";
import Register from './register/register'
import Home from './Components/Home'
import Fetch from "../util/Fetch";
import PasswordForgotten from "./Components/PasswordForgotten";
import ResetPassword from "./Components/ResetPassword";
import GeneralCondition from "../Page/GeneralCondition";
import Container from "./Container";
import Nav from "./Components/Nav";
export default class AuthProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: ''
        }
    }
    componentDidMount() {
        this.setState({ pageloading: true });
        var formData = new FormData();
        formData.append('email', this.email)
        formData.append('password', this.password)
        formData.append('url', '/RESTAPI/check_status')
        Fetch('/auth', formData, (res) => {
            this.setState({ logo: res.assets.logo });
        })
    }
    render() {
        return (

            <Routes>
                <Route path="/" element={<Home logo={this.state.logo} />} />
                <Route path="/login" element={<Login logo={this.state.logo} />} />
                <Route path="/register" element={<Register logo={this.state.logo} />} />
                <Route path="/forgotten" element={<PasswordForgotten logo={this.state.logo} />} />
                <Route path="/reset-password" element={<ResetPassword logo={this.state.logo} />} />
                <Route path="/reglements" element={
                    <div>
                        <Nav logo={this.state.logo} />
                        <div className='background'>
                            <div className='container'>
                                <div className='landing'>
                                    <GeneralCondition />
                                </div>
                            </div>
                        </div>
                    </div>
                } />
                <Route path="*" element={<h1>Aller dans Login</h1>} />
            </Routes>
        );
    }
}

