import React from "react"
import fetch from '../../util/async'
import { Link} from "react-router-dom";
import Container from './Container'
import Input from './Fields'
import Button from '../button/button'
import Loading from './Loading'
export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      url: '/login',
      message: '',
      pageloading: false,
      step: '',
      btnloading: false,
      email: '',
      password: ''
    }
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
          if(res.step == 2){
            window.location.href = '/register?step=2'
          }
        }
    ) 
  }

  HandleChange = (e)=>{
    const name = e.target.name;
    this.setState({[name]: e.target.value});
  }

  
  handleSubmit = async(event) => {
    this.setState({btnloading: true})
    this.setState({message: ''})
    event.preventDefault();
    var formData = new FormData();
      var email = this.state.email
      var password = this.state.password
    formData.append('email', email)
    formData.append('password', password)
    formData.append('url',this.state.url)
    fetch(this.state.url,formData,
        (res)=>{
          this.setState({btnloading: false})
          if(res.success == 1){
            this.setState({btnloading: false})
            window.location.href = "/";
          }else{
            this.setState({message: res.message})
          }
        }
    ) 
  }

  render(){
    if(this.state.pageloading){
      return  <Loading/>
    }
    return (
      <>
      {this.state.step != 2  ?
      <Container>
        {this.state.message != '' ?
          <div className="message_status">{this.state.message}</div>
        : null}
        <div className="box-title">
          <h3>S'identifier</h3>
        </div>

        <form method="POST" onSubmit={this.handleSubmit}>
          <Input type="email" value={this.state.email} name="email" onChange={this.HandleChange}>Adresse email</Input>
          <Input type="password" name="password" value={this.state.password} onChange={this.HandleChange}>Mot de passe</Input>
          {this.state.btnloading ? 
          <Button variant="disabled">Chargement...</Button> :
          this.state.email === '' || this.state.password === ''?
          <Button variant="disabled" disabled="disabled">Connexion</Button> :
          <Button variant="_Dvgb">Connexion</Button>
          }
        </form>
        <ul className="list-inline">
        <li className="list-inline-item">
          <Link to='/facebook'>Creer un compte</Link>
        </li>
        <li className="list-inline-item">
          <Link to='/register'>Mot de passe oublies?</Link>
        </li>
        </ul>
      </Container>
      : null
  }
      </>
        
    );
  }
}
