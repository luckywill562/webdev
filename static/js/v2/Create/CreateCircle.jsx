import React from "react";
import MyVerticallyCenteredModal from "../../Components/modal/modalCore";
import Input from "../auth/Fields";
import { ElementTitle, TemplateCheck } from "../Template/Template";
import { withRouter } from "../util/WithRouter";
import { CircleEmpty, CircleSelected, PrivateIcon, PublicIcon } from "../icon/icons";
import { Button } from "../Components/fields/Fields";
import { trim } from "../util/util";
import Fetch from "../util/Fetch";
import { AlertBottom } from "../Template/Template";
class CreateCircle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            CircleName: '',
            description: '',
            confidentiality: 2,
            loading: false,
            disabled: true,
            alert: undefined
        }
    }
    HandleChange = (event) => {
        this.setState({ CircleName: event.target.value });

    }
    handleChangeConfidentiality = (btn) => {
        this.setState({ confidentiality: btn });
    }
    confirm = () => {
        this.setState({ loading: true })
    }
    HandleSubmit = () => {
        this.setState({ loading: true })
        var formData = new FormData()
        formData.append('url', './RESTAPI/Circle/create');
        formData.append('circle_name', this.state.CircleName);
        formData.append('security', this.state.confidentiality);
        Fetch('/api', formData, (res) => {
            this.setState({ loading: false, alert: res })
            setTimeout(() => {
                this.setState({ alert: undefined })
            }, 3000);
        })
    }
    render() {
        return <MyVerticallyCenteredModal
            show={true}
            onHide={() => this.props.navigate(-1)}
            nopadding="true"
            size={'gift'}
        >
            <div className="Fdo Anv">
                {this.state.alert != undefined &&
                    <AlertBottom message={this.state.alert.message} />
                }
                <div className="Fdo circleCoverphoto">

                </div>
                <div className="page Anv Vpe Lsy  LDv">

                    <div className="Lsy LDv">
                        <ElementTitle> Donner un nom a votre cercle</ElementTitle>
                        <Input onChange={this.HandleChange} value={this.state.CircleName} name="circlename" placeholder="Donner un nom a votre cercle">

                        </Input>
                    </div>
                    <div className="Lsy LDv">
                        <div className="Fdo Ert Vpe">
                            <span className="yTZ B9u mWe">
                                Ajouter une description (facultatif)
                            </span>
                        </div>
                        <div className="Fdo aovydwv3 ">
                            <div className="Fdo ELG Anv">
                                <textarea name="bio" value={this.state.description} onChange={this.HandleChange} maxLength="300" className="Text-form Lg-textarea" placeholder="Ajouter une description"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="Fdo Anv">
                        <ElementTitle>Visibilité du cercle</ElementTitle>
                        <TemplateCheck onClick={() => this.handleChangeConfidentiality(2)}
                            active={this.state.confidentiality === 2 ? true
                                :
                                false}
                            checkbox={this.state.confidentiality === 2 ? <CircleSelected />
                                :
                                <CircleEmpty />} name="Cercle secret" legende='Le cercle ne poura pas etre visible que par les peronnes que vous inviter a le rejoindre'>
                            <PrivateIcon size={22} />
                        </TemplateCheck>
                        <TemplateCheck onClick={() => this.handleChangeConfidentiality(1)}
                            active={this.state.confidentiality === 1 ? true
                                :
                                false}
                            checkbox={this.state.confidentiality === 1 ? <CircleSelected />
                                :
                                <CircleEmpty />} name="Cercle public" legende='Tous le monde pourra voir et demmander a participer dans le cercle mais le contenu du cercle reste secret'>
                            <PublicIcon size={22} />
                        </TemplateCheck>
                    </div>
                    <div className="Fdo page Nxz ">
                        {/**disabled={trim(this.state.CircleName).length === 0 || typeof (this.state.confidentiality) != 'number' ? true : false} */}
                        <Button isLoading={this.state.loading} onClick={this.HandleSubmit} variant={`_Dvgb ELG`}>Créer</Button>
                    </div>
                </div>
            </div>
        </MyVerticallyCenteredModal>
    }
}
export default withRouter(CreateCircle)