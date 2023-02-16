import React from "react"
import Fetch from "../../util/Fetch";
import { Link } from "react-router-dom";
import Container from '../Container'
import Input from '../Fields'
import Button from '../button/button'
import Loading from "../Loading";
import { AlertBottom } from "../../Template/Template";
import { Spinner } from "react-bootstrap";
import Footer from "./Footer";
import { withRouter } from "../../util/WithRouter";
 class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      url: '/login',
      message: '',
      pageloading: false,
      step: '',
      btnloading: false,
      email: '',
      password: '',
      alert: undefined,
    }
  }



  HandleChange = (e) => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }


  handleSubmit = async (event) => {
    this.setState({ btnloading: true })
    this.setState({ message: '' })
    event.preventDefault();
    var formData = new FormData();
    var email = this.state.email
    var password = this.state.password
    formData.append('email', email)
    formData.append('password', password)
    formData.append('url', this.state.url)
    Fetch(this.state.url, formData, (res) => {
      this.setState({ btnloading: false })
      if (res.success == 1) {
        this.setState({ btnloading: false })
        window.location.href = "/";
      } else {
        this.setState({ message: res.message, alert: res })
        setTimeout(() => {
          this.setState({ alert: undefined })
        }, 1400);
      }
    })
  }
  goToRegister = () => {
    this.props.navigate(`/register`);
  }
  render() {
    return (
      <>
        {this.state.pageloading ?
          <Loading /> :
          <Container logo={this.props.logo}>
            {this.state.alert &&
              <AlertBottom message={this.state.alert.message} />
            }
            <div className="v2ao tlK SMy Vft">
              <h3>Se connecter</h3>
            </div>
            {this.state.message != '' ?
              <div className="message_status">{this.state.message}</div>
              :
              null}

            <form method="POST" className="Kmm" onSubmit={this.handleSubmit}>
              <Input type="email" value={this.state.email} name="email" onChange={this.HandleChange} placeholder="Adresse email">Adresse email</Input>
              <Input type={"password"} name="password" value={this.state.password} onChange={this.HandleChange} placeholder="Mot de passe">Mot de passe</Input>
              <div className="Fdo Anv">
                <li className="list-inline-item Cbn ">
                  <Link to='/forgotten'>Mot de passe oublié?</Link>
                </li>
                <div className="Fdo RpE">
                  {this.state.btnloading &&
                    <div className="ApE kVc hty ELG p1c">
                      <div className="Fdo hty  Aic Lns">
                        <Spinner size="sm" animation="border" />
                      </div>
                    </div>
                  }
                  {this.state.email === '' || this.state.password === '' ?
                    <Button variant="Bsj _Dvgb ELG" disabled="disabled">Connexion</Button> :
                    <Button variant="Bsj _Dvgb ELG">Connexion</Button>
                  }
                </div>
              </div>
            </form>
            <ul className="list-inline">
              <div className="Fdo Bsj Lns mWe yTZ" >
                <Link to="/register" className="">créer un compte</Link>
              </div>
            </ul>
          </Container>
        }
        <Footer />
      </>

    );
  }
}
export default withRouter(Login)