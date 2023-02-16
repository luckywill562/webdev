import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/Pannel-com.css'
import fetch from '../util/async'
export default class PannelCom extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            Contacts: []
        }
    }
    componentDidMount(){
    var Datauser = new FormData();
    Datauser.append('url','RESTAPI/views/Contacts')
    fetch('/contacts',Datauser,
        (res)=>{
          this.setState({Contacts: res.users})
        }
    )
    }
    render(){
    return (
    
    <div className="chat-list-wrapper">
              <div className="panel-block completed">
                  <div className="row-wrapper">
                      <div className="header Lsy LDv">
                          <h4 className="title">Mes contacts</h4>
                      </div>
                  </div>
                  <div className="row-wrapper content">
                      <div className="cell spinner-container">
                          <div className="nano has-scrollbar">
                              <div className="nano-content">
                                  <ul className="events contacts">
                                      {this.state.Contacts.map(users=>(
                                      <li className="event-wrapper stale" key={users.user_id}>
                                          <div className="">
                                          <Link to={`/live/${users.user_id}`} className="RpE Ngt Hsu ElL" style={{display:"block"}}>
                                          <div className="Lsy LDv RpE Ngt Hsu Fdo Aic Bcg" style={{minHeight:"44px"}}>
                                              <div className="Fdo Anv RpE" style={{margin: "4px 6px 4px auto"}}>
                                                  <div className="_2dbep" style={{height:"28px",width:"28px"}}>
                                                    <img src={users.avatar_src} className="hty ELG hrt" alt="com-pannel-avatar"/>
                                                  </div>
                                              </div>
                                              <div className="description">
                                                  <div className="Fdo name-content">
                                                      <div className="Fdo name-content">
                                                          <span className="name">{users.name}</span>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                          </Link>
                                          </div>
                                      </li>
                                      ))}
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
    </div>)
    }
  }