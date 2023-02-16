import React from 'react';
import {
  Link,
  withRouter,
  matchPath
} from "react-router-dom";
import Cookie from 'js-cookie'

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  onViewmessage = () => {
    let array = this.props.list[this.props.index];
    //let lastElement = arry[arry.length - 1];
    if (array.status === 0 && +array.sender_id != Cookie.get('s_id')) {
      let data = {
        data_type: 'update_message_to_view',
        c_user: Cookie.get('s_id'),
        client_id: this.props.client.user.user_id,
        security_token: Cookie.get('isLogedin'),
      }
      this.props.ws.send(JSON.stringify(data));
    }
  }

  render() {
    const match = matchPath(this.props.location.pathname, {
      path: this.props.to,
      exact: true,
      strict: false
    })
    return (
      <React.Fragment>
        {match ?
          <div className="messagerie QOqBd   qF0y9  Igw0E  IwRSH   eGOV_    _4EzTm" style={{ borderRadius: 6 }}>
            <div className="rOtsg">
              <Template src={this.props.client.user.user_avatar.x56}
                first_name={this.props.client.user.first_name}
                subject={this.props.subject} message={this.props.message} />
            </div>
          </div>
          :
          <div className="messagerie qF0y9  Igw0E  IwRSH   eGOV_    _4EzTm" style={{ borderRadius: 6 }}>
            <Link to={this.props.to} className="rOtsg ElL" onClick={this.onViewmessage}>
              <Template src={this.props.client.user.user_avatar.x56}
                first_name={this.props.client.user.first_name}
                subject={this.props.subject} message={this.props.message} />
            </Link>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default withRouter(MessageList);
function Template({ src, first_name, subject, message }) {
  return (
    <div className="Fdo   qF0y9 Igw0E   rBNOH  eGOV_  ybXk5    _4EzTm">
      <div className="messagerie _4EzTm ovd yC0tu">
        <span className="_2dbep " style={{
          width: "56px",
          height: "56px"
        }}>
          <img src={src} className="hty ELG hrt" />
        </span>
        <div className='rSxHQ evOYH'></div>
      </div>
      <div className="messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
        <div className="_7UhW9   xLCgt  mWe  KV-D4    fDxYl">
          {first_name}
        </div>
        <div className="qF0y9    Igw0E   IwRSH   eGOV_  _4EzTm  ksr   DhRcB ">
          <div className="_7UhW9   xLCgt  MMzan   fDxYl  ">
            <span className="R19PB">
              {message.sender_id === Cookie.get('s_id') && (
                <span>vous: </span>
              )}
              <span className="_7UhW9   xLCgt  MMzan  se6yk" dangerouslySetInnerHTML={{ __html: subject }}></span>
            </span>
          </div>
          {+message.status === 1 && message.sender_id === Cookie.get('s_id') && (
            <div style={{
              width: '18px',
              height: '18px',
              overflow: 'hidden',
              borderRadius: 50,
            }}>
              <img src={src} className="hty ELG hrt" />
            </div>
          )}

        </div>
      </div>
    </div>
  )
}