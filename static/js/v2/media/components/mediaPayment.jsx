import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { PrivateIcon, Close } from "../../icon/icons";
import Fetch from "../../util/Fetch";
import Input from '../../auth/Fields';
import { withRouter } from "../../util/WithRouter";
import { Button } from "../../Components/fields/Fields";
import { ModalShowHeader } from "../../Posts/Templates/Templates";
class MediaPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            message: [],
            step: 1,
            password: '',
            process: false
        }
    }
    ConfirmDeblockage = () => {
        this.setState({ process: true })
        let data = new FormData();
        const type = this.props.location.pathname.split('&');
        data.append('url', 'RESTAPI/Payments/Payments');
        data.append('media', this.props.media.media);
        data.append('media_id', this.props.media.media_id)
        data.append('element_id', this.props.element)
        data.append('media_type', this.props.media.media_type)
        data.append('media_appartenance', this.props.media.content_type);
        Fetch('/payments', data, res => {
            this.setState({ message: res, step: res.step, process: false });
        })
    }
    paymentProcess = () => {
        this.setState({ process: true })
        let data = new FormData();
        const type = this.props.location.pathname.split('/');
        data.append('url', 'RESTAPI/Payments/Payments');
        data.append('media', this.props.media.media);
        data.append('media_id', this.props.media.media_id)
        data.append('password', this.state.password);
        data.append('element_id', this.props.element)
        data.append('media_appartenance', this.props.media.content_type);
        data.append('media_type', this.props.media.media_type)
        Fetch('/payments', data, res => {
            this.setState({ message: res, step: res.step, process: false });
            if (res.success === 1 && res.data && res.data.type === "DEBLOCAGE_SUCCESS") {
                this.props.media_change(res.data.media_src);
                this.setState({ modal: false })
            }
        })
    }
    

    HandleChange = (e) => {
        const name = e.target.name;
        this.setState({ [name]: e.target.value });
    }
    render() {
        return (
            <div className="Fdo aovydwv3">
                <button className="sqdOP Xdg L3NKy ZIAjV _Dvgb RlF" onClick={() => this.setState({ modal: true })}>{this.props.text ?`Débloquer ce contenu pour`:''} {this.props?.media?.price} {this.props?.session?.currency}</button>
                <ModalCenter show={this.state.modal} onHide={() => this.setState({ modal: false })} nopadding="true">
                    <div className="Fdo Anv Bsj">
                        <ModalShowHeader onClick={() => this.props.navigate(-1)} title={`Debloquer ce contenu`}/>
                        {this.state.message.length != 0 &&
                            <div className='Fdo RpE Lns' style={{ zIndex: 1 }}>
                                <div className={this.state.message.success === 1 ?
                                    "alert alert-success " : "alert alert-danger"} role="alert">
                                    <div className='Fdo Aic'>
                                        <div className='Fdo Bsj'>
                                            <span>{this.state.message.message}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="Fdo Lns Aic Anv">
                            <div className="Fdo">
                                <PrivateIcon size={50} />
                            </div>
                            <div className="Fdo">
                                <span>{this.props?.media?.price}</span>
                                <span>{this.props?.session?.currency}</span>
                            </div>
                        </div>
                        {this.state.step === 2 && (
                            <div className="Fdo Lns Aic Anv Pap" style={{ transitionDuration: '2s' }}>
                                <Input type="password" onChange={this.HandleChange} value={this.state.password} name="password" placeholder="Votre mot de passe">
                                    veuillez Taper votre mot de passe
                                </Input>
                            </div>
                        )}
                        <div className="Fdo pybr56ya tw6a2znq f10w8fjw vcx Lns">

                            {this.state.step === 2 ?
                                <div className="Fdo ">
                                    <Button variant="_Dvgb" disabled={this.state.password.length >= 8 ? false : true} onClick={this.paymentProcess} isLoading={this.state.process}>Envoyer</Button>
                                </div> :
                                <div className="Fdo ">
                                    <Button isLoading={this.state.process} variant={`_sdb`} onClick={this.ConfirmDeblockage}>
                                        {this.state.message.success === 0 ? 'Réessayer' : 'Débloquer'}
                                    </Button>
                                </div>
                            }

                            <div className="Fdo tw6a2znq">
                                <Button variant="_8A5w5" onClick={() => this.setState({ modal: false })}>Annuler</Button>
                            </div>

                        </div>
                    </div>
                </ModalCenter>
            </div>
        )
    }
}
export default withRouter(MediaPayment);
function ModalCenter(props) {
    return (
        <Modal
            {...props}
            size={props.size}
            aria-labelledby="modal-payment"
            centered
        >

            <div className="Fdo">
                {props.children}
            </div>
        </Modal>
    );
}