import React, { useState } from "react";
import { Link } from "react-router-dom";
import Fetch from "../../util/Fetch.js";
import { Modal } from 'react-bootstrap'
import { Caddy, LoadingXlContent, LogoutIcon, PersonAdd, WhatIcon } from "../../icon/icons.jsx";
import { useSelector } from "react-redux";
const AccountDropdown = (props) => {
  const fieldRef = React.useRef(null)
  const [showBox, setShowBox] = React.useState(false)
  React.useEffect(() => {
    function handleOutsideClick(event) {
      if (fieldRef.current && !fieldRef.current.contains(event.target)) {
        setShowBox(false)
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [fieldRef]);
  const handleShow = () => {
    setShowBox(!showBox)
  }
  const store = useSelector((state) => state);

  const [modal, setModal] = useState(false);
  const logout = (e) => {
    e.preventDefault();
    setModal(true);
    var formData = new FormData();
    formData.append('url', '/RESTAPI/Auth/Logout')
    Fetch('/logout', formData, (res) => {
      if (res.success === 1) {
        window.location.href = "/";
      }
    }
    )
  }
  return <div className='Fdo Aic RpE' ref={fieldRef}>
    <div className='Fdo Aic Eho'>
      <div className='Fdo Aic icon-size Hte _2dbep ' onClick={handleShow}>
        <img src={props.picture} className="hty ELG hrt lazyload" />
      </div>
    </div>
    {showBox &&
      <div className="nt-flyout popop-right">
        <div className="Fdo RpE Anv">
          <div className="Element-scrollable">
            <div className="Element-scrolabled-list">
              <div style={{ width: "320px", maxWidth: "100%", marginTop: "8px", marginBottom: "8px" }}>
                <div className="page  qF0y9  Igw0E  IwRSH   eGOV_    _4EzTm Lsy LDv" >
                  <Link className="page ElL Ngt" to={`/${props.user_id}`} onClick={handleShow}>
                    <div className="Fdo qF0y9   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv">
                      <div className="page _4EzTm ovd yC0tu Vgd">
                        <div className="_2dbep Xs-User-Avatar">
                          <img data-src={props.large_img} className="hty ELG hrt lazyload" />
                        </div>
                      </div>
                      <div className="messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
                        <div className="_7UhW9   xLCgt KV-D4  Vgd  fDxYl" style={{ fontWeight: "600", fontSize: "16px" }} dangerouslySetInnerHTML={{ __html: props.session_user.first_name }}></div>
                        <div className=" qF0y9    Igw0E  IwRSH      eGOV_  _4EzTm DhRcB" style={{ marginTop: "8px" }}>
                          <div className="_7UhW9   xLCgt   fDxYl  ">
                            <span className="R19PB">
                              <span className="_7UhW9   xLCgt  se6yk" style={{ fontSize: ".875rem", color: "#65676B" }}>@{props.session_user.username}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <hr className="Fdo EvR"></hr>
                {store.Util.stats.follower_request_count > 0 ?
                  <TDropdownMenu Name="Demande d'abonnements" to="/followers-request" onClick={handleShow}>
                    <PersonAdd size={22} />

                    <div className="KdEwV">
                      <div className="Fdo Aic J_0ip  Vpz-1  TKi86">
                        <div className="bqXJH">{store.Util.stats.follower_request_count}</div>
                      </div>
                    </div>
                  </TDropdownMenu>
                  : null
                }
                <TDropdownMenu Name="Paramètres du compte" to="/settings" onClick={handleShow}>
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="#000000"><g><path d="M 27.526,12.682c-0.252-0.876-0.594-1.71-1.028-2.492l 1.988-4.182c-0.738-0.92-1.574-1.756-2.494-2.494 l-4.182,1.988c-0.78-0.432-1.616-0.776-2.492-1.028L 17.762,0.102C 17.184,0.038, 16.596,0, 16,0S 14.816,0.038, 14.238,0.102L 12.682,4.474 C 11.808,4.726, 10.972,5.070, 10.192,5.502L 6.008,3.514c-0.92,0.738-1.756,1.574-2.494,2.494l 1.988,4.182 c-0.432,0.78-0.776,1.616-1.028,2.492L 0.102,14.238C 0.038,14.816,0,15.404,0,16s 0.038,1.184, 0.102,1.762l 4.374,1.556 c 0.252,0.876, 0.594,1.71, 1.028,2.492l-1.988,4.182c 0.738,0.92, 1.574,1.758, 2.494,2.494l 4.182-1.988 c 0.78,0.432, 1.616,0.776, 2.492,1.028l 1.556,4.374C 14.816,31.962, 15.404,32, 16,32s 1.184-0.038, 1.762-0.102l 1.556-4.374 c 0.876-0.252, 1.71-0.594, 2.492-1.028l 4.182,1.988c 0.92-0.738, 1.758-1.574, 2.494-2.494l-1.988-4.182 c 0.432-0.78, 0.776-1.616, 1.028-2.492l 4.374-1.556C 31.962,17.184, 32,16.596, 32,16s-0.038-1.184-0.102-1.762L 27.526,12.682z M 16,24 c-4.418,0-8-3.582-8-8c0-4.418, 3.582-8, 8-8s 8,3.582, 8,8C 24,20.418, 20.418,24, 16,24zM 12,16A4,4 1080 1 0 20,16A4,4 1080 1 0 12,16z"></path></g></svg>
                </TDropdownMenu>
                <TDropdownMenu Name="Transaction et Récharge" to="/account" onClick={handleShow}>
                  <svg version="1.1" id="Layer_1" x="0px" y="0px" width="20" height="20" viewBox="0 0 32 32" enableBackground="new 0 0 16 16" xmlSpace="preserve" fill="#000000"> <g><path d="M 17,2C 8.716,2, 2,8.716, 2,17S 8.716,32, 17,32S 32,25.284, 32,17S 25.284,2, 17,2z M 18.714,16 C 21.628,16, 24,18.242, 24,21S 21.628,26, 18.714,26L 18,26 l0,1 C 18,27.552, 17.552,28, 17,28S 16,27.552, 16,27L 16,26 L 15.286,26 C 12.372,26, 10,23.758, 10,21 C 10,20.448, 10.448,20, 11,20S 12,20.448, 12,21C 12,22.654, 13.474,24, 15.286,24L 16,24 L 16,18 L 15.286,18 C 12.372,18, 10,15.758, 10,13S 12.372,8, 15.286,8L 16,8 L 16,7 C 16,6.448, 16.448,6, 17,6S 18,6.448, 18,7L 18,8 l 0.714,0 C 21.628,8, 24,10.242, 24,13C 24,13.552, 23.552,14, 23,14S 22,13.552, 22,13 C 22,11.346, 20.526,10, 18.714,10L 18,10 l0,6 L 18.714,16 zM 12,13C 12,14.654, 13.474,16, 15.286,16L 16,16 L 16,10 L 15.286,10 C 13.474,10, 12,11.346, 12,13zM 18.714,24C 20.526,24, 22,22.654, 22,21S 20.526,18, 18.714,18L 18,18 l0,6 L 18.714,24 z"></path></g></svg>
                </TDropdownMenu>
                <TDropdownMenu Name="Contenu debloqué" to="settings" onClick={handleShow}>
                  <Caddy size={22} />
                </TDropdownMenu>

                <TDropdownMenu Name="Besoin d'aide" to="/help"  oClick={handleShow}>
                  <WhatIcon size={20} />
                </TDropdownMenu>
                <TDropdownMenu Name="Se déconnecter" to="#" onClick={logout}>
                  <LogoutIcon size={22} />
                </TDropdownMenu>
                <MyVerticallyCenteredModal
                  show={modal}
                  titre="Déconnexion"
                  size="logout">
                  <div className="Fdo Anv Bsj f10w8fjw">
                    <div className="Fdo Bsj Anv">
                      <LoadingXlContent />
                    </div>
                  </div>
                </MyVerticallyCenteredModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  </div>
}

function TDropdownMenu({ children, Name, to, onClick }) {
  return (<div className="page  qF0y9  Igw0E  IwRSH   eGOV_    _4EzTm Lsy LDv" >
    <Link className="page ElL Ngt" to={to} onClick={onClick}>
      <div className="Fdo qF0y9   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv">
        <div className="page _4EzTm ovd yC0tu Vgd">
          <div className="bBB LCR Fdo Lns Aic" style={{ width: "36px", height: "36px" }}>{children} </div>
        </div>
        <div className="messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
          <div className="_7UhW9   KV-D4  Vgd  fDxYl" style={{ fontWeight: "600", fontSize: "16px",display: 'inline-block' }}>{Name}</div>
        </div>
      </div>
    </Link>
  </div>
  )
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size={props.size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ minWidth: 20 }}
    >
      <div className="Fdo CDp g4R aBv  kzZ m2F">
        <div className="ELG zI7 iyn Hsu Pac">
          <h5 className="lH1 dyH iFc SMy kON pBj IZT ">{props.titre}</h5>
        </div>
      </div>
      <div className="Fdo g4R aBv">
        {props.children}
      </div>
    </Modal>
  );
}

export default AccountDropdown