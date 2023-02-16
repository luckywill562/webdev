import React from "react"
import { Link } from "react-router-dom";
import Fetch from "../../util/Fetch";
import SingUpStep2 from './SingUpStep2'
import Container from '../Container'
import Input from '../Fields'
import Loading from "../Loading";
import Button from "../button/button";
import { CircleEmpty, CircleSelected } from "../../icon/icons";
import { AlertBottom, BtnCloseX, DayOfBirth, YearOfBirth } from "../../Template/Template";
import { Step, TemplateCheck } from "../Components/Template";
import Step3 from "./step3";
import Step4 from "./step4";
import { month } from "../../util/util";
import Nav from "../Components/Nav";
import GeneralCondition from "../../Page/GeneralCondition";
import Footer from "../Components/Footer";
import { withRouter } from "../../util/WithRouter";
import Brand from '../../../../images/brand.png'
import RegisterStepFive from "./RegisterStepFive";
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '/register',
      step: 1,
      message: '',
      pageloading: false,
      btnloading: false,
      name: '',
      email: '',
      username: '',
      password: '',
      password_confirm: '',
      sexe: '',
      DayOfBirth: '',
      YearOfBirth: '',
      monthOfBirth: '',
      alert: undefined,
      sex_search: undefined,
      age_required: { min: 18, max: 99 },
      accepted_relation: undefined,
      currency: undefined
    }
  }

  HandleChange = (e) => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  componentDidMount() {
    this.setState({ pageloading: true });
    var formData = new FormData();
    formData.append('email', this.email)
    formData.append('password', this.password)
    formData.append('url', '/RESTAPI/check_status')
    Fetch(this.state.url, formData, (res) => {
      this.setState({ pageloading: false });
    })
  }
  handleSubmit = async (event) => {
    this.setState({ btnloading: true, message: '' })
    event.preventDefault();
    var formData = new FormData();
    formData.append('step', this.state.step)
    formData.append('name', this.state.name)
    formData.append('email', this.state.email)
    formData.append('username', this.state.username)
    formData.append('email', this.state.email)
    formData.append('password', this.state.password)
    formData.append('passwordC', this.state.password_confirm)
    formData.append('Dbirth', this.state.DayOfBirth)
    formData.append('Mbirth', this.state.monthOfBirth)
    formData.append('Ybirth', this.state.YearOfBirth)
    formData.append('sexe', this.state.sexe)
    formData.append('max_age_required', this.state.age_required.max);
    formData.append('min_age_required', this.state.age_required.min);
    formData.append('currency', this.state?.currency);
    if (this.state.sex_search) {
      formData.append('interested_sex', this.state.sex_search)
    }
    formData.append('accepted_relation', this.state.accepted_relation)
    formData.append('url', this.state.url)
    Fetch(this.state.url, formData, (res) => {
      this.setState({ message: res.message, btnloading: false, alert: res });
      setTimeout(() => {
        this.setState({ alert: undefined })
      }, 1400);
      if (res.success === 1 && !res.step) {
        this.setState({ step: 2 });
      } else if (res.success === 1 && res.step && res.step === 'logged') {
        window.location.href = '/';
      } else {
        this.setState({ step: 1 });
      }
    })
  }

  handleChangesexe = (i) => {
    this.setState({ sexe: i })
  }
  HandleChangeAge = (e) => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value })
  }
  setStep = (step) => {
    if (step < this.state.step) {
      this.setState({ step })
    } else {
      if (step === 2) {
        this.setState({ step })
      } else if (step === 3 && typeof (this.state.sex_search) === 'string' || this.state.sex_search === 'M' ||
        this.state.sex_search === 'F' || this.state.sex_search === 'FM') {
        this.setState({ step })
      } else if (step === 4 && this.state.age_required.min >= 18 && this.state.age_required.max <= 99 &&
        this.state.age_required.min < this.state.age_required.max) {
        this.setState({ step })
      } else if (step === 5 && this.state.accepted_relation) {
        this.setState({ step });
      } else {
        this.setState({ alert: { success: 0, message: 'Completer les champs correctement' } })
      }
    }
  }
  handleChangesexeSearch = (sexe) => {
    if (typeof (sexe) === 'string') {
      this.setState({ sex_search: sexe });
    }
  }
  handleChangeAgeSearch = (e) => {
    const name = e.target.name;
    let age_required = this.state.age_required;
    if (e.target.value > -1 && e.target.value < 100 && e.target.value.length < 4) {
      if (e.target.value === '') {
        age_required[name] = e.target.value
        this.setState({ age_required });
      } else {
        age_required[name] = e.target.value
        this.setState({ age_required });
      }
    }
  }
  handleChangeAccepted_relation = (accepted) => {
    if (typeof (accepted) === 'number' && accepted >= 1 && accepted <= 3) {
      this.setState({ accepted_relation: accepted });
    }
  }
  goToLogin = () => {
    this.props.navigate(`/login`);
  }
  handleChangeCurrency = (currency) => {
    this.setState({ currency: currency.target.value });
  }
  closeAlert = () => {
    this.setState({ alert: undefined });
  }
  render() {
    if (this.state.pageloading) {
      return <Loading />
    }

    return (
      <>
        {this.state?.alert &&
          <AlertBottom message={this.state?.alert?.message} >
            <BtnCloseX onClick={this.closeAlert} />
          </AlertBottom>
        }
        <>
          {this.state.step === 1 &&
            <>
              <Nav logo={this.props.logo} />

              <Container logo={this.props.logo}>
                <div className="v2ao tlK SMy Vft">
                  <h3>Créer un compte</h3>
                </div>
                <div className="message_status">{this.state.message}</div>
                <form method="post" onSubmit={this.handleSubmit}>
                  <Input type="text" value={this.state.name} name="name" onChange={this.HandleChange} placeholder='Nom'>
                    {this.state.name.length > 0 && this.state.name.length < 4 ?
                      <div className="invalid-feedback">votre nom doit contenir au moins 4 caractères</div>
                      : 'name'
                    }
                  </Input>
                  <Input type="text" value={this.state.username} name="username" onChange={this.HandleChange} placeholder="Nom d'utilisateur">Nom d'utilisateur</Input>
                  <Input type="email" value={this.state.email} name="email" onChange={this.HandleChange} placeholder="Email">Email</Input>
                  <Input type="password" name="password" value={this.state.password} onChange={this.HandleChange} placeholder="Mot de passe">
                    {this.state.password.length > 0 && this.state.password.length < 8 ?
                      <div className="invalid-feedback">un mot de passe doit contenir au moins 8 caractères</div>
                      : "Mot de passe (+8 caractères)"
                    }
                  </Input>
                  <Input type="password" name="password_confirm" value={this.state.password_confirm} placeholder="Confirmez le mot passe" className={this.state.passwordConfirmError === true ? "danger-error" : null} onChange={this.HandleChange}>
                    {this.state.password.length === this.state.password_confirm.length && this.state.password != this.state.password_confirm ?
                      <div className="invalid-feedback">Les deux mot de passe doivent être identiques</div>
                      : "Confirmez votre mot de passe"
                    }
                  </Input>
                  <div className="w0hvl6rk">date de naissance</div>
                  <div className="Fdo Cbn" style={{ flexDirection: 'row' }}>
                    <div className="LPN SFD ELG">
                      <DayOfBirth value={this.state.DayOfBirth} onchange={this.HandleChangeAge} />
                    </div>
                    <div className="LPN SFD hgdfroi ELG">
                      <div className="customized-select">
                        <select value={this.state.monthOfBirth} onChange={this.HandleChangeAge} name="monthOfBirth">
                          <option selected>Mois</option>
                          {month.map((e, index) => (
                            <option key={index} value={e.id}>{e.name}</option>
                          ))}
                        </select>

                      </div>
                    </div>
                    <div className="LPN SFD hgdfroi ELG">
                      <YearOfBirth value={this.state.YearOfBirth} onchange={this.HandleChangeAge} />
                    </div>
                  </div>
                  <div className="LPN SFD">
                    <div className="w0hvl6rk">
                      Je suis un(e)
                    </div>
                    <div className="Fdo m2F ">
                      <div className="customized-select yC0tu">
                        <TemplateCheck onClick={() => this.handleChangesexe("M")}
                          active={this.state.sexe === "M" ? true
                            :
                            false}
                          checkbox={this.state.sexe === "M" ? <CircleSelected />
                            :
                            <CircleEmpty />}> Homme
                        </TemplateCheck>
                      </div>
                      <div className="customized-select">
                        <TemplateCheck onClick={() => this.handleChangesexe("F")}
                          active={this.state.sexe === "F" ? true
                            :
                            false}
                          checkbox={this.state.sexe === "F" ? <CircleSelected />
                            :
                            <CircleEmpty />}> Femme
                        </TemplateCheck>
                      </div>
                    </div>
                  </div>
                  <div className="Fdo Anv Bsj">
                    <div className="Fdo Bsj Cbn">
                      {this.state.name === '' || this.state.email === '' || this.state.password === '' || this.state.password_confirm === '' ?
                        <Button type={'button'} variant="disabled" disabled={true}>Inscription</Button>
                        :
                        <Button type={'submit'} isLoading={this.state.btnloading} variant={`Fsvg ELG`}>Inscription</Button>
                      }
                    </div>

                    <div className="Fdo Bsj Lns mWe yTZ" >
                      <Link to="/login" className="">J'ai déjà un compte</Link>
                    </div>
                  </div>
                </form>
              </Container>
              <Footer />
            </>
          }
          {this.state.step > 1 && this.state.step < 6 &&
            <div className="Fdo Aic Anv hty Hdt ELG Bcg Nfb">
              <div className="Fdo Bcg Nfb ELG Flk main-app-width">
                <div className="Fdo SFD Aic Lns  Bsj">
                  <div className="Fdo v2ao  Lns Anv">
                    <div className="SH1 Kmm tlK SMy Vft">ces étapes sont obligatoires, veuillez les complétez correctement</div>
                    <Step step={+this.state.step} stepLength={5} />
                    {this.state.step === 2 && (
                      <SingUpStep2 setStep={this.setStep} sexe={this.state.sex_search} handleChangesexeSearch={this.handleChangesexeSearch} />
                    )}
                    {this.state.step === 3 && (
                      <Step3 age_required={this.state.age_required} setStep={this.setStep} handleChangeAgeSearch={this.handleChangeAgeSearch} />
                    )}
                    {this.state.step === 4 && (
                      <Step4 setStep={this.setStep} sexe={this.state.accepted_relation} handleChangesexeSearch={this.handleChangeAccepted_relation}>
                        <div className='Fdo Kmm Lns'>
                          <div className='Lsy LDv'>
                            <Button variant='primary' onClick={() => this.setStep(3)}>Revenir</Button>
                          </div>
                          <div className='Lsy LDv'>
                            <Button variant='_Dvgb' onClick={() => this.setStep(5)} >Suivant</Button>
                          </div>
                        </div>
                      </Step4>
                    )}
                    {this.state.step === 5 &&
                      <RegisterStepFive setStep={this.setStep} currency={this.state?.currency} onChange={this.handleChangeCurrency} value={this.state?.currency} />
                    }
                  </div>
                </div>
              </div>
            </div>
          }
          <div>

            {this.state.step === 6 && (
              <div className='background'>
                <div className='container'>
                  <div className='Lgv w0hvl6rk'>
                    <img className='' src={Brand} />
                  </div>
                  <div className='landing Fdo Anv'>
                    <GeneralCondition />
                  </div>
                  <div className="">
                    <Button onClick={this.handleSubmit} isLoading={this.state.btnloading} variant="Fsvg ">J'accepte et je m'inscris</Button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </>
      </>
    );
  }
}

export default withRouter(Register)


