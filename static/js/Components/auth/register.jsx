import React from "react"
import { Link } from "react-router-dom";
import fetch from '../../util/async'
import Input from './Fields'
import Container from './Container'
import SingUpStep2 from './SingUpStep2'
import Loading from './Loading'
import Button from '../button/button'
export default class Register extends React.Component {
    constructor({step}){
        super()
        this.state ={
          url: '/register',
          step: step,
          message: '',
          pageloading: false,
          btnloading: false,
          name: '',
          email: '',
          password: '',
          password_confirm: ''
        }
    }

    HandleChange = (e)=>{
      const name = e.target.name;
      this.setState({[name]: e.target.value});
    }

  componentDidMount(){
    this.setState({pageloading: true});
    var formData = new FormData();
    formData.append('email', this.email)
    formData.append('password', this.password)
    formData.append('url','/RESTAPI/check_status')
    fetch(this.state.url,formData,
        (res)=>{
          this.setState({pageloading: false});
          this.setState({step: res.step});
        }
    ) 
  }
    handleSubmit = async(event) => {
      this.setState({btnloading: true})
      this.setState({message: ''})
      event.preventDefault();
      var formData = new FormData();
      var name = this.state.name
      var email = this.state.email
      var password = this.state.password
      var passconfirmation = this.state.password_confirm
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('passwordC', passconfirmation)
      formData.append('url',this.state.url)
      fetch(this.state.url,formData,
          (res)=>{
            this.setState({message: res.message})
            this.setState({btnloading: false})
            if(res.success === 1){
              this.setState({step: 2})
            }
          }
      ) 
    }
  render(){
    if(this.state.pageloading){
      return <Loading/>
    }
    return (
      <div className="admin-container">
        {this.state.step != 2 ? 
        <Container>
                  <div className="message_status">{this.state.message}</div>
                  <div className="box-title">
                    <h3>S'inscrire</h3>
                  </div>
                  <form method="post" onSubmit={this.handleSubmit}>
                    <Input type="text" value={this.state.name} name="name" onChange={this.HandleChange}>
                      {this.state.name.length > 0 && this.state.name.length < 4 ? 
                      <div className="invalid-feedback">votre nom doit contenir au moins 4 caracteres</div>
                      :'name'
                      }
                    </Input>
                    <Input type="email" value={this.state.email} name="email" onChange={this.HandleChange}>Email</Input>
                    <Input type="password" name="password" onChange={this.HandleChange}>
                      {this.state.password.length > 0 && this.state.password.length <8 ?
                         <div className="invalid-feedback">votre mot de passe doit contenir au moins 8 caracteres</div>
                      :"Mot de passe (+8 caracteres)"}
                    </Input>
                    <Input type="password" name="password_confirm" className={this.state.passwordConfirmError === true ? "danger-error": null} onChange={this.HandleChange}>
                      {this.state.password.length === this.state.password_confirm.length && this.state.password != this.state.password_confirm?
                      <div className="invalid-feedback">Les deux mot de passe doivent etre identiques</div>
                      :"Confirmez votre mot de passe"
                    }
                    </Input>
                    {this.state.btnloading ? 
                    <Button variant="disabled">Chargement...</Button>
                    :this.state.name === '' || this.state.email === '' || this.state.password === '' || this.state.password_confirm === ''?
                    <Button variant="disabled">Inscription</Button>
                    :<Button variant="primaire">Inscription</Button>
                    }
                  </form>
                  <ul className="list-inline">
                     <li className="list-inline-item">
                       <Link to='/'>J'ai deja un compte</Link>
                     </li>
                  </ul>
        </Container>
        :
        <Container>
          <div className="box-title">
                    <h3>Inscription</h3>
                    <h5>Etapes 2</h5>
                  </div>
                  <SingUpStep2/>
        </Container>
        }
      </div>
    );
  }
}
