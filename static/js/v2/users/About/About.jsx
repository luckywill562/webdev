import React from "react";
import MyVerticallyCenteredModal from "../../../Components/modal/modalCore";
import Fetch from "../../util/Fetch";
import { BoxItemTitle, DayOfBirth, YearOfBirth } from "../../Template/Template";
import { withRouter } from "../../util/WithRouter";
import { LoadingXlContent } from "../../icon/icons";
import Button from "../../../Components/button/button";
import Input from "../../auth/Fields";
import { month } from "../../util/util";
import { AboutItem } from "../Components/Template";
import { Link } from "react-router-dom";
const About = (props) => {
    React.useEffect(() => {
        let formData = new FormData();
        formData.append('url', './RESTAPI/Users/About');
        formData.append('user_id', props.profile.user_id)
        Fetch('/api', formData, data => {
            props.UpdateAboutColumn(data.about);
        });
    }, [])
    const about_me = props.profile.about.me
    return <MyVerticallyCenteredModal
        show={true}
        titre={"A propos"}
        onHide={() => { props.navigate(-1) }}
        size="about">
        <div className="Anv">
            <div className="Fdo Anv Aic Lns">
                <div className="_2dbep" style={{ height: 100, width: 100 }}>
                    <img src={props.profile.avatar} className="hty ELG hrt" />
                </div>
                <div className="Fdo  Aic">
                    <h2 className="SH1 tlK SMy Vft">{props.profile.first_name}</h2>
                </div>
                <div className="few-words Vpe Fdo ">
                    <span className="SubContent v2ao" style={{ lineHeight: 1 }} dangerouslySetInnerHTML={{ __html: props.profile.bio }}></span>
                </div>
                {props.profile.viewer ?
                    <Link to="/profile/edit">editer mes informations</Link>
                    : <span></span>
                }
            </div>

            {about_me &&
                <>
                    <div className="Fdo Vpe">
                        <div className="SH1 tlK SMy Vft">A propos de moi</div>
                    </div>
                    <div className="Fdo  Bsj lhclo0ds">
                        {about_me?.map((e, index) => (
                            <AboutItem title={e?.title} content={e?.content} key={index} />
                        ))}
                    </div>
                    <div className="Fdo Vpe">
                        <div className="SH1 tlK SMy Vft">Les critères que j'accepte</div>
                    </div>
                    <div className="Fdo  Bsj lhclo0ds">
                        {props?.profile?.about?.i_need.map((e, index) => (
                            <AboutItem title={e?.title} content={e?.content} key={index} />
                        ))}
                    </div>
                    <div className="Fdo Vpe">
                        <div className="SH1 tlK SMy Vft">Mes Crush</div>
                    </div>
                </>
            }

        </div>
    </MyVerticallyCenteredModal>
}
class Abou extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            Loading: false,
            edit: false,
            about: []
        }
    }
    componentDidMount() {
        let formData = new FormData();
        this.setState({ Loading: true });
        formData.append('url', './RESTAPI/Users/About');
        formData.append('user_id', this.props.profile.user_id)
        Fetch('/api', formData, data => {
            this.props.UpdateAboutColumn(data);
            this.setState({ about: data.about, Loading: false });
        });
        if (this.props.profile.about.length === 0) {
        }
    }
    HandleChangeChoice = (e, position) => {
        const about = this.state.about.me;
        about[position].key = e.target.value;
        this.setState({ about })
    }
    render() {
        const about_me = this.state.about.me
        let change = this.state.about
        return <MyVerticallyCenteredModal
            show={true}
            titre={this.state.edit ? "Editer mes informations" : "A propos"}
            onHide={() => {
                if (this.state.edit) {
                    this.setState({ edit: false })
                } else {
                    this.props.navigate(-1)
                }
            }}
            size="about">

            <div className="Anv">
                <div className="Fdo Anv Aic Lns">
                    <div className="_2dbep" style={{ height: 100, width: 100 }}>
                        <img src={this.props.profile.avatar} className="hty ELG hrt" />
                    </div>
                    <div className="Fdo  Aic">
                        <h2 className="SH1 tlK SMy Vft">{this.props.profile.first_name}</h2>
                    </div>
                    <div className="few-words Vpe Fdo ">
                        <span className="SubContent v2ao" style={{ lineHeight: 1 }} dangerouslySetInnerHTML={{ __html: this.props.profile.bio }}></span>
                    </div>
                </div>
                {this.state.Loading ? <LoadingXlContent /> :
                    <>
                        {this.state.edit ?
                            <div>
                                <BoxItemTitle title="Editer mes informations" />
                                <div className="Fdo Anv">
                                    <div className="editable-section">
                                        <EditableSection className={`lg`}>
                                            <div className="Fdo Anv">
                                                <label htmlFor="day">Genre</label>
                                                <select className="custom-select" value={change.me[0].key} onChange={(e) => this.HandleChangeChoice(e, 0)} name="sexe">
                                                    <option>Genre</option>
                                                    <option value="M">Homme</option>
                                                    <option value="F">Femme</option>
                                                </select>
                                            </div>
                                        </EditableSection>
                                        <EditableSection className={`lg`}>
                                            <div className="Fdo Anv">
                                                <label htmlFor="day">Date de naissance</label>
                                                <div className="Fdo Cbn" style={{ flexDirection: 'row' }}>
                                                    <div className="LPN ELG SFD">
                                                        <DayOfBirth value={this.state.DayOfBirth} onchange={this.HandleChangeChoice} />
                                                        <label htmlFor="day">Jour</label>
                                                    </div>
                                                    <div className="LPN SFD Pag vcx ELG ">
                                                        <select className="custom-select" value={this.state.monthOfBirth} onChange={this.HandleChangeAge} name="monthOfBirth">
                                                            <option>Mois</option>
                                                            {month.map((e, index) => (
                                                                <option key={index} value={e.id}>{e.name}</option>
                                                            ))}
                                                        </select>
                                                        <label htmlFor="day">Mois</label>
                                                    </div>
                                                    <div className="LPN SFD ELG ">
                                                        <YearOfBirth value={this.state.YearOfBirth} onchange={this.HandleChangeAge} />
                                                        <label htmlFor="day">Année</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </EditableSection>
                                        <EditableSection>
                                            <div className="Fdo Anv vcx ">
                                                <Input type={'number'} value={120}>Vous pesez combien? </Input>
                                                <span>Kg</span>
                                            </div>
                                        </EditableSection>
                                        <EditableSection>
                                            <div className="Fdo Anv Pag">
                                                <Input type={'number'} value={120}>Vous mesurez combien? </Input>
                                                <span>cm</span>
                                            </div>
                                        </EditableSection>
                                        <EditableSection>
                                            <div className="Fdo Anv vcx ">
                                                <label htmlFor="day">Situation amoureuse</label>
                                                <select className="custom-select" value={this.state.sexe} onChange={this.HandleChange} name="sexe">
                                                    <option>Situation amoureuse</option>
                                                    <option value="Y">En couple</option>
                                                    <option value="N">Célibataire</option>
                                                </select>
                                            </div>
                                        </EditableSection>
                                        <EditableSection>
                                            <div className="Fdo Anv Pag ">
                                                <label htmlFor="day">Avez vous d'enfants?</label>
                                                <select className="custom-select" value={this.state.sexe} onChange={this.HandleChange} name="sexe">
                                                    <option>Avez vous des enfants ?</option>
                                                    <option value="Y">Oui</option>
                                                    <option value="N">Non</option>
                                                </select>
                                            </div>
                                        </EditableSection>

                                        <EditableSection>
                                            <div className="Fdo Anv vcx ">
                                                <label htmlFor="day">Origine</label>
                                                <select className="custom-select" value={this.state.sexe} onChange={this.HandleChange} name="sexe">
                                                    <option>Origine</option>
                                                    <option value="Y">Gasy petaka</option>
                                                    <option value="N">Métisse</option>
                                                    <option value="Y">Asiatique</option>
                                                    <option value="N">Africains</option>
                                                    <option value="N">Européens</option>
                                                    <option value="N">Arabe</option>
                                                </select>
                                            </div>
                                        </EditableSection>
                                        <EditableSection>
                                            <div className="Fdo Anv  Pag">
                                                <label htmlFor="day">Type de votre corp</label>
                                                <select className="custom-select" value={this.state.sexe} onChange={this.HandleChange} name="sexe">
                                                    <option>type de votre corp ?</option>
                                                    <option value="Y">Taille fine</option>
                                                    <option value="N">Normal</option>
                                                    <option value="N">Musclé</option>
                                                    <option value="N">Sportifs</option>
                                                    <option value="N">Gros(se)</option>
                                                </select>
                                            </div>
                                        </EditableSection>

                                        <EditableSection>
                                            <div className="Fdo Anv vcx ">
                                                <label htmlFor="day">Cheveux</label>
                                                <select className="custom-select" value={this.state.sexe} onChange={this.HandleChange} name="sexe">
                                                    <option>Cheveux</option>
                                                    <option value="Y">Lisse</option>
                                                    <option value="Y">Curly</option>
                                                </select>
                                            </div>
                                        </EditableSection>
                                        <EditableSection>
                                            <div className="Fdo Anv  Pag">
                                                <label htmlFor="day">Coupe de votre cheveux</label>
                                                <select className="custom-select" value={this.state.sexe} onChange={this.HandleChange} name="sexe">
                                                    <option>Coupe de votre cheveux ?</option>
                                                    <option value="Y">Garcon</option>
                                                    <option value="N">Long</option>
                                                    <option value="N">Court</option>
                                                </select>
                                            </div>
                                        </EditableSection>
                                    </div>
                                    <BoxItemTitle title="Loisirs" />
                                    <div className="Fdo">
                                        <div className="Fdo Aic Cdf">
                                            <Button variant="_8A5w5" onClick={() => this.setState({ edit: false })}>Anuller</Button>
                                        </div>
                                        <div className="Fdo Aic Cdf">
                                            <Button variant="_Dvgb" onClick={() => this.setState({ edit: false })}>Enregistrer</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <>
                                <div className="Fdo Bsj">
                                    {about_me &&
                                        <div className="Fdo  Bsj">

                                            {about_me.map((e, index) => (
                                                <div key={index}>
                                                    {e.title && e.content &&
                                                        <AboutItem title={e.title} content={e.content} />
                                                    }
                                                </div>
                                            ))}
                                        </div>
                                    }

                                </div>
                                {this.state.about.interest?.length > 0 &&
                                    <div className="Fdo Anv">
                                        <BoxItemTitle title="Interets et loisirs" />
                                        <div className="Fdo Vpe">
                                            {this.props.profile.about.interest.map((e, index) => (
                                                <div className="Fdo Anv Lbdf" key={index}>
                                                    <div className={"Fdo ELG Aic sqdOP Xdg L3NKy ZIAjV _8A5w5 Lns Bgrio"}>
                                                        <span className="Fdo PLP" >{e.interest_img}</span>
                                                        <span>{e.interest_name}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                }
                            </>
                        }
                    </>
                }
            </div>
        </MyVerticallyCenteredModal>
    }
}
export default withRouter(About)

function EditableSection({ children, className = '' }) {
    return <div className={`line ${className}`}>
        {children}
    </div>
}

