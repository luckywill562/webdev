import React from "react";
import MyVerticallyCenteredModal from "../../../../Components/modal/modalCore";
import Input from "../../../auth/Fields";
import { IconCurrency, LoadingXlContent } from "../../../icon/icons";
import Fetch from "../../../util/Fetch";
class PurchasseJeton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: [],
            password: '',
            process: false,
            choice: undefined,
            List: [],
        }
    }
    componentDidMount() {
        var formData = new FormData();
        formData.append('url', 'RESTAPI/Jeton/offres')
        Fetch('/api', formData, res => {
            this.setState({ List: res?.List })
        })
    }
    UpgradeAccount = () => {
        this.setState({ process: true });
        let data = new FormData();
        data.append('url', 'RESTAPI/Payments/Jetons');
        data.append('choice', this.state.choice);
        Fetch('/payments', data, res => {
            this.setState({ message: res, process: false, choice: 0 });
        })
    }

    choice = (id) => {
        this.setState({ choice: id });
    }
    handleChange = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }
    render() {
        return (
            <MyVerticallyCenteredModal
                show={this.props.open}
                titre="Jeton"
                onHide={this.props.close}
                size="gift">

                <div className="Fdo Anv Aic ELG eGOV_ Aic">
                    {this.state.message.length != 0 &&
                        <div className='Fdo RpE Lns' style={{ zIndex: 1 }}>
                            <div className={this.state.message.success === 1 ?
                                "alert alert-success " : "alert alert-danger"} role="alert">
                                <div className='Fdo Aic'>
                                    <div className='Fdo Bsj'>
                                        <span className="gtb">{this.state.message.message}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {this.state.process &&
                        <LoadingXlContent />
                    }
                    <div className="Fdo Anv Aic ELG Lns Bsj Lns">
                        <span className="RtGi">
                            <IconCurrency size={52} />
                        </span>
                    </div>
                    {this.state.List?.length > 0 ?
                        <div className="Fdo Vnk Kmm">
                            {this.state.List.map((e, index) => (
                                <div className="Fdo Anv Lbdf Aic" key={index}>
                                    <button className={`Fdo ELG Aic sqdOP Xdg L3NKy ZIAjV  Lns Bgrio ${this.state.choice === e._id ? "Bgu " : " _8A5w5 "}`} onClick={() => this.choice(e._id)}>
                                        <span className="Fdo PLP" ><IconCurrency size={20} /></span>
                                        <span>{e._name}</span>
                                    </button>
                                    <div className="Fdo v2ao Lsy LDv">
                                        <span className="">{e._price}</span>
                                        <span className="Lsy">{e.devise}</span>
                                    </div>
                                </div>
                            ))}

                        </div>
                        :
                        <LoadingXlContent />
                    }
                    {this.state.choice &&
                        <Input type='password' value={this.state?.password} placeholder={'mot de passe'} name="password" onChange={this.handleChange}/>
                    }
                    <div className="Fdo Kmm"></div>
                    <div className="Fdo Kmm ELG">
                        {this.state.choice > 0 && !this.state.process && this.state?.password.length > 0 ?
                            <button className="sqdOP Xdg L3NKy ZIAjV _Dvgb Bsj" onClick={this.UpgradeAccount}>Acheter</button>
                            :
                            <button className="sqdOP Xdg L3NKy ZIAjV Bsj hdBtn">Acheter</button>
                        }
                    </div>
                </div>
            </MyVerticallyCenteredModal>
        )
    }
}
export default PurchasseJeton