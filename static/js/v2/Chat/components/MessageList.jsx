import React from 'react';
import { Link, useMatch } from "react-router-dom";
import { withRouter } from '../../util/WithRouter';
import { Atach } from '../../icon/icons';

const MessageList =(props)=>{
  return (
    <React.Fragment>
      {props?.message?.client ?
        <MenuComponent path={props.location.pathname} to={props?.to}
         src={props?.message?.client.user.avatar.x56}
          first_name={props?.message?.client.user.first_name}
          subject={props?.message?.subject} message={props?.message}
           online_status={props.list[props.index].client.user.online} media={props?.message?.ismedia} />
        :
        <MenuComponent path={props.location.pathname} to={props?.message?.client_id}
          first_name="."
          subject={props?.message?.subject} message={props.message}
        />}
    </React.Fragment>
  )

}

 

export default withRouter(MessageList);
const Image = React.memo(function Image({ src }) {
  return <img src={src} className="hty ELG hrt" />;
});
function Template({ src, message, online_status, media }) {
  return (
    <div className="Fdo   Fdo Igw0E   rBNOH  eGOV_  ybXk5    _4EzTm">
      <div className="page _4EzTm ovd yC0tu">
        <span className="_2dbep " style={{
          width: "56px",
          height: "56px"
        }}>
          {src && (
            <Image src={src} />
          )}
        </span>
        {online_status && (
          <div className='rSxHQ evOYH'></div>
        )}
      </div>
      <div className="page Fdo  Igw0E     IwRSH  Lns vwCYk">
        <div className=' page            qF0y9          Igw0E     IwRSH      eGOV_       acqo5   _4EzTm'>
          {message?.seen || message?.sended ?
            <div className="_7UhW9   KV-D4    fDxYl" dangerouslySetInnerHTML={{ __html: message?.client?.user?.first_name }}
              style={{ lineHeight:"20px"}}>
            </div>
            :
            <div className="_7UhW9  mWe   KV-D4    fDxYl" dangerouslySetInnerHTML={{ __html: message?.client?.user?.first_name }}
              style={{ lineHeight:"20px" }}>
            </div>
          }
        </div>
        <div className="Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr   ">
          <div className="_7UhW9     MMzan   fDxYl  ">
            <span className="R19PB">
              {message?.sended && (
                <span>vous: </span>
              )}
              {message?.seen || message?.sended ?
                <>
                  {media ?
                    <span>
                      <Atach size={18} />
                      <span className="_7UhW9    MMzan  se6yk">Pièce jointe</span>
                    </span>
                    :
                    <span className="_7UhW9     MMzan  se6yk" dangerouslySetInnerHTML={{ __html: message?.subject }}></span>
                  }
                </>
                :
                <>
                  {media ?
                    <span >
                      <Atach size={18} />
                      <span className="_7UhW9     MMzan  se6yk">Piece Jointe</span>
                    </span>
                    :
                    <span className="_7UhW9   se6yk" style={{ color: '#3897f0', fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: message?.subject }}></span>
                  }
                </>
              }
            </span>
          </div>
          {message?.seen && message?.sended && (
            <div style={{
              width: '18px',
              height: '18px',
              overflow: 'hidden',
              borderRadius: 50,
              flex: '0 0 auto'
            }}>
              {src && (
                <Image src={src} />
              )}
            </div>
          )}
          {!message?.seen && !message?.sended &&
            <div className='Fdo Aic J_0ip  Vpz-1  TKi86'>
              <div className='bqXJH'>1</div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}


function MenuComponent({ to, path,  src, first_name, subject, message, activeOnlyWhenExact, online_status, media }) {
  const match = useMatch(`/inbox/${to}`, {
    path: path,
    exact: activeOnlyWhenExact,
    strict: false,
  });
  return (
    <div className="Fdo Anv">
      {match ?
        <div className="Fdo Anv">
          <div className="page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm Cxfa">
            <div className="page QOqBd   Fdo  Igw0E  IwRSH   eGOV_    _4EzTm" style={{ borderRadius: 6 }}>
              <div className="rOtsg">
                <Template src={src}
                  first_name={first_name}
                  subject={subject} message={message} online_status={online_status} media={media} />
              </div>
            </div>
          </div>
        </div> :
        <div className="page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm">
          <div className="page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm" style={{ borderRadius: 6 }}>
            
            <Link to={to} className="rOtsg ElL">
              <Template src={src}
                first_name={first_name}
                subject={subject} message={message} online_status={online_status} media={media} />
            </Link>
          </div>
        </div>
      }
    </div>
  )
}

