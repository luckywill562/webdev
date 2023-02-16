import React from "react";
import Input from "../../../auth/Fields";
import { Button } from "../../../Components/fields/Fields";
import { AlertBottom } from "../../../Template/Template";
import Fetch from '../../../util/Fetch'
export default class Information extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.session_user.username,
            name: this.props.session_user.first_name,
            bio: this.props.session_user.bio,
            loading: false,
            message_show: '',
            alert: undefined,
            disabled: true
        }
    }
    HandleChange = (e) => {
        const names = e.target.name;
        this.setState({ [names]: e.target.value,disabled: false });
    }
    HandleSubmit = (e) => {
        this.setState({ loading: true });
        e.preventDefault();
        let data = new FormData();
        data.append('url', '/RESTAPI/Users/Settings/settings');
        data.append('name', this.state.name);
        data.append('username', this.state.username);
        data.append('bio', this.state.bio);
        Fetch('/api', data, res => {
            this.setState({ alert: res, loading: false ,disabled: true});
           
            setTimeout(() => {
                this.setState({ alert: undefined })
            }, 3000);
        })
    }
    render() {
        return (
            <div className="Fdo Pap ELG Anv">
                {this.state.alert != undefined &&
                    <AlertBottom message={this.state.alert.message} />
                }

                <div className="Fdo ELG Anv Vnk Kmm ">
                    <h2 className="SH1 tlK SMy Vft">Informations personnelles</h2>
                </div>
                <div className="page  qF0y9  Igw0E  IwRSH   eGOV_    _4EzTm" >
                    <div className="page Ngt">
                        <div className="Fdo qF0y9   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm">
                            <div className="page _4EzTm ovd yC0tu Vgd">
                                <div className="_2dbep " style={{ width: "36px", height: "36px" }}>
                                    <img src={this.props.session_user.avatar.x56} className="hty ELG hrt" />
                                </div>
                            </div>
                            <div className="messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
                                <div className="_7UhW9   xLCgt KV-D4  Vgd  fDxYl" style={{ fontWeight: "600", fontSize: "16px" }} dangerouslySetInnerHTML={{ __html:this.props.session_user.first_name}}></div>
                                <div className=" qF0y9    Igw0E  IwRSH      eGOV_  _4EzTm DhRcB" style={{ marginTop: "8px" }}>
                                    <div className="_7UhW9   xLCgt   fDxYl  ">
                                        <span className="R19PB">
                                            <span className="_7UhW9   xLCgt  se6yk" style={{ fontSize: ".875rem", color: "#65676B" }}>@{this.state.username}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Fdo ELG ">
                    <form className="ELG Fdo Anv" action="" method="POST" onSubmit={this.HandleSubmit} style={{ maxWidth: 350 }}>
                        <div className="Fdo aovydwv3  f10w8fjw ">
                            <Input type="text" onChange={this.HandleChange} value={this.state.name} name="name" placeholder="changer le nom">
                                changer le nom
                            </Input>
                        </div>

                        <div className="Fdo aovydwv3 f10w8fjw ">
                            <Input type="text" onChange={this.HandleChange} value={this.state.username} name="username" placeholder="changer le nom d'utilisateur">
                                changer le nom d'utilisateur
                            </Input>
                        </div>

                        <div className="Fdo aovydwv3 f10w8fjw ">
                            <div className="Fdo ELG Anv">
                                <label htmlFor="bio">Changer la biographie</label>
                                <textarea name="bio" value={this.state.bio} onChange={this.HandleChange} maxLength="300" className="Text-form Lg-textarea" placeholder="Changer la Biographie"></textarea>
                            </div>
                        </div>

                        <div className="Fdo aovydwv3  f10w8fjw ">
                            <Button variant={`${this.state.disabled ? "hdBtn": "_Dvgb"}`} isLoading={this.state.loading} disabled={this.state.disabled}>Enregitrer les modifications</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}