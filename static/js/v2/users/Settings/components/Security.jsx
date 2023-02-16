import React from "react";
import Input from "../../../auth/Fields";
import { Button } from "../../../Components/fields/Fields";
import { AlertBottom } from "../../../Template/Template";
import Fetch from '../../../util/Fetch'
import { trim } from "../../../util/util";
export default class Security extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            newPassword: '',
            newPasswordConfirm: '',
            loading: false,
            disabled: true,
            message_show: '',
            alert: undefined
        }
    }
    HandleChange = (e) => {
        const names = e.target.name;
        this.setState({ [names]: e.target.value });
        if (trim(this.state.password).length >= 7 && trim(this.state.newPassword).length >= 7 && trim(this.state.newPasswordConfirm).length >= 7) {
            this.setState({ disabled: false })
        } else {
            this.setState({ disabled: true })
        }
    }
    HandleSubmit = (e) => {
        this.setState({ loading: true });
        e.preventDefault();
        let data = new FormData();
        data.append('url', '/RESTAPI/Users/settings/password');
        data.append('password', this.state.password);
        data.append('newPassword', this.state.newPassword);
        data.append('newPasswordConfirm', this.state.newPasswordConfirm)
        Fetch('/api', data, res => {
            this.setState({ alert: res, loading: false });
            setTimeout(() => {
                this.setState({ alert: undefined })
            }, 3000);
            if (res.success === 1) {
                this.setState({ password: '', newPassword: '', newPasswordConfirm: '', disabled: true })
            }
        })
    }
    render() {
        return (
            <div className="Fdo Pap ELG Anv">


                <div className="Fdo ELG Anv Vnk Kmm ">
                    <h2 className="SH1 tlK SMy Vft">Paramètres de securité</h2>
                </div>
                <div className="Fdo Vpe">
                    <div className="yTZ B9u mWe">
                        Changer le mot de passe
                    </div>
                </div>
                <div className="Fdo ELG ">
                    <form className="ELG Fdo Anv" action="" method="POST" onSubmit={this.HandleSubmit} style={{ maxWidth: 350 }}>
                        <div className="Fdo aovydwv3  f10w8fjw ">
                            <Input type="password" onChange={this.HandleChange} value={this.state.password} name="password" placeholder="Mot de passe actuelle">
                                Mot de passe actuelle
                            </Input>
                        </div>

                        <div className="Fdo aovydwv3 f10w8fjw ">
                            <Input type="password" onChange={this.HandleChange} value={this.state.newPassword} name="newPassword" placeholder="Créer un nouveau mot de passe">
                                Nouveau mot de passe
                            </Input>
                        </div>

                        <div className="Fdo aovydwv3 f10w8fjw ">
                            <Input type="password" onChange={this.HandleChange} value={this.state.newPasswordConfirm} name="newPasswordConfirm" placeholder="Confirmez le nouveau mot de passe">
                                confirmez le nouveau mot de passe
                            </Input>
                        </div>
                        <div className="Fdo aovydwv3  f10w8fjw ">
                            <Button variant={`${this.state.disabled ? "hdBtn" : "_Dvgb"}`} isLoading={this.state.loading} disabled={this.state.disabled}>Enregitrer les modifications</Button>
                        </div>
                        {this.state.alert != undefined &&
                            <>
                                <AlertBottom message={this.state.alert.message} />
                                <div className="">{this.state.alert.message}</div>
                            </>
                        }
                    </form>
                </div>
            </div>
        )
    }
}