import React from "react";
import { IconCurrency, LoadingXlContent } from "../../../icon/icons";
import Fetch from "../../../util/Fetch";
import { Link } from 'react-router-dom'
import UpgradeAccount from "./UpgradeAccount";
import { Button } from "../../../Components/fields/Fields";
export default class Jeton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            box: false,
            solde: [],
            loading: false
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        let data = new FormData();
        data.append('url', '/RESTAPI/Accounts/Jetons');
        Fetch('/api', data, res => {
            this.setState({ loading: false })
            if (res.success === 1) {
                this.setState({ solde: res?.result });
            }
        })

    }
    
    render() {
        return (
            <div className="Fdo Pap Anv hty vgh">
                <div className="Fdo ELG Anv Vnk Kmm hty">
                    <div className="Fdo Anv Bsj Lns Aic">
                        {this.state?.loading ? <LoadingXlContent /> :
                            <div className="Fdo Anv Aic">
                                {this.state?.solde?.length === 0 ?
                                    <div className="alert alert-danger" style={{ maxWidth: 350 }}>Vous n'avez pas de jetons dans votre compte, cliquez sur <span className="mWe">Acheter </span>
                                        si vous voulez acheter des points</div>
                                    :
                                    null
                                }
                                {this.state?.solde?.map((element, index) => (
                                    <div>
                                        <span className="">vous avez {element?.total} points</span>
                                        <span className="">valable jusq'au:  {element?.expiration_date}</span>
                                    </div>
                                ))}
                                {this.state?.box === true &&
                                    <UpgradeAccount open={this.state?.box} close={()=>this.setState({box: false})} />
                                }
                                <div className="Fdo Ba2">
                                    <Button variant="_Dvgb" onClick={() => this.setState({ box: true })}>Acheter</Button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}