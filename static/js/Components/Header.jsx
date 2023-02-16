import React, { useEffect } from 'react'

import Logo from '../../images/logo.png'
import { Link, useRouteMatch } from 'react-router-dom';
import UserSettings from './dropdown/AccountDropdown';
import Notification from './dropdown/Notification'

function MessengerComponent({ to, onClick, children, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });
  return (
    <div className="Fdo Ftb">
      {match ?
        <Link className="Fdo Rvt LCR Zls RpE" to={to} onClick={onClick}>
          <span className="Fdo Ftb gfr Ytn">
            <svg aria-label="Direct" className="_8-yf5 " color="#262626" fill="#262626" height="22" role="img" viewBox="0 0 48 48" width="22"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l13.2 13c.5.4 1.1.6 1.7.3l16.6-8c.7-.3 1.6-.1 2 .5.4.7.2 1.6-.5 2l-15.6 9.9c-.5.3-.8 1-.7 1.6l4.6 19c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.5-.5.5-1.1.2-1.6z"></path></svg>
            {children}
          </span>
          <span className="nBb"></span>
        </Link> :
        <Link className="Fdo Rvt LCR Zls RpE" to={to} >
          <span className="Fdo Ftb gfr Ytn">
            <svg aria-label="Direct" className="sFc tlK" fill="#262626" height="22" role="img" viewBox="0 0 48 48" width="22"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
            {children}
          </span>
        </Link>
      }
    </div>
  )
}
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.c_user,
      islogin: false
    }
   
  }

  componentDidMount(){

    const {websocket} = this.props // websocket instance passed as props to the child component.
    
    try {
        websocket.onmessage = (data)=>{
         
        } 
    } catch (error) {
        console.log(error) // catch error
    }
  }

  onFocusSearch() {
    console.log('focus');
  }


  NoficationAlert = () => {
    useEffect(() => {

    }, [])
    return (
      <div className="Fdo Ftb  MVp">
        <Notification className="Fdo Rvt LCR Zls" to="/notifications/">
          <span className="Fdo Rvt Ftb gfr Ytn">
            <svg aria-label="Fil d’activité" className="_8-yf5" fill="#262626" height="22" role="img" viewBox="0 0 48 48" width="22"><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
          </span>
          <div className="nBb"></div>
        </Notification>
      </div>
    )
  }

  render() {
    return (
      <div className="Dcf Fdo">
        <div className="Fdo Aic ELG Bcg Nfb hty main-app-width Hsu LDv Lsy">
          <div className="Fdo hty">
            <div className="Fdo Ftb">
              <Link to='/' className="Fdo PLR Nkj">
                <img src={Logo} className="App-logo" alt="logo" />
              </Link>
            </div>
          </div>
          <div className="">
            <form method="post" className="KNH Fdo Aic Cdf">
              <input className="form-area" onKeyPress={this.onFocusSearch} placeholder="Rechercher" />
              <div className="separator-bar"></div>
              <button type="submit" className="Ann">
                <svg className="sFc Dsc" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /><path d="M0 0h24v24H0z" fill="none" /></svg>
              </button>
            </form>
          </div>
          <div className="Fdo" id="message-alert">
            <MessengerComponent to="/live" onClick={e => e.preventDefault()}>
              <div className="KdEwV">
                <div className="Fdo J_0ip  Vpz-1  TKi86">
                  <div className="bqXJH">1</div>
                </div>
              </div>
            </MessengerComponent>
            <this.NoficationAlert />
            <div className="Fdo Aic pbD MVp">
              <UserSettings picture={this.state.user.user_avatar.small} large_img={this.state.user.user_avatar.medium} user_id={this.state.user.username} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
