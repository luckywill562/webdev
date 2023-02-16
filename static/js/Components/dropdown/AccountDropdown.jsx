import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import DrpCore from "./core/DropdownCore.jsx"

export default function dropdown(props) {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div className="Fdo Aic Eho"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >

      <div className="Fdo Aic icon-size Hte Eho LCR">{children}</div>
    </div>
  ));
  return (
    <Dropdown className="Fdo Aic styled-menu RpE">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <img src={props.picture} className="hty ELG hrt" alt="userspics" />
      </Dropdown.Toggle>
      <Dropdown.Menu as={DrpCore}>
        <div className="Fdo RpE Anv">
          <div className="Element-scrollable">
            <div className="Element-scrolabled-list">
              <div style={{ width: "320px", maxWidth: "100%", marginTop: "8px", marginBottom: "8px" }}>
                <div className="page  qF0y9  Igw0E  IwRSH   eGOV_    _4EzTm Lsy LDv" >
                  <Link className="page ElL Ngt" to={`/${props.user_id}`}>
                    <div className="Fdo qF0y9   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv">
                      <div className="page _4EzTm ovd yC0tu Vgd">
                        <div className="_2dbep " style={{ width: "52px", height: "52px" }}>
                          <img src={props.large_img} className="hty ELG hrt" />
                        </div>
                      </div>
                      <div className="messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
                        <div className="_7UhW9   xLCgt KV-D4  Vgd  fDxYl" style={{ fontWeight: "600", fontSize: "16px" }}>Razafindratsiza</div>
                        <div className=" qF0y9    Igw0E  IwRSH      eGOV_  _4EzTm DhRcB" style={{ marginTop: "8px" }}>
                          <div className="_7UhW9   xLCgt   fDxYl  ">
                            <span className="R19PB">
                              <span className="_7UhW9   xLCgt  se6yk" style={{ fontSize: ".875rem", color: "#65676B" }}>Votre compte</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <hr className="Fdo EvR"></hr>
                <TDropdownMenu Name="Parametres du compte" to="./static">
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="#000000"><g><path d="M 27.526,12.682c-0.252-0.876-0.594-1.71-1.028-2.492l 1.988-4.182c-0.738-0.92-1.574-1.756-2.494-2.494 l-4.182,1.988c-0.78-0.432-1.616-0.776-2.492-1.028L 17.762,0.102C 17.184,0.038, 16.596,0, 16,0S 14.816,0.038, 14.238,0.102L 12.682,4.474 C 11.808,4.726, 10.972,5.070, 10.192,5.502L 6.008,3.514c-0.92,0.738-1.756,1.574-2.494,2.494l 1.988,4.182 c-0.432,0.78-0.776,1.616-1.028,2.492L 0.102,14.238C 0.038,14.816,0,15.404,0,16s 0.038,1.184, 0.102,1.762l 4.374,1.556 c 0.252,0.876, 0.594,1.71, 1.028,2.492l-1.988,4.182c 0.738,0.92, 1.574,1.758, 2.494,2.494l 4.182-1.988 c 0.78,0.432, 1.616,0.776, 2.492,1.028l 1.556,4.374C 14.816,31.962, 15.404,32, 16,32s 1.184-0.038, 1.762-0.102l 1.556-4.374 c 0.876-0.252, 1.71-0.594, 2.492-1.028l 4.182,1.988c 0.92-0.738, 1.758-1.574, 2.494-2.494l-1.988-4.182 c 0.432-0.78, 0.776-1.616, 1.028-2.492l 4.374-1.556C 31.962,17.184, 32,16.596, 32,16s-0.038-1.184-0.102-1.762L 27.526,12.682z M 16,24 c-4.418,0-8-3.582-8-8c0-4.418, 3.582-8, 8-8s 8,3.582, 8,8C 24,20.418, 20.418,24, 16,24zM 12,16A4,4 1080 1 0 20,16A4,4 1080 1 0 12,16z"></path></g></svg>
                </TDropdownMenu>
                <TDropdownMenu Name="Transaction et Recharge" to="./static">
                  <svg version="1.1" id="Layer_1" x="0px" y="0px" width="20" height="20" viewBox="0 0 32 32" enableBackground="new 0 0 16 16" xmlSpace="preserve" fill="#000000"> <g><path d="M 17,2C 8.716,2, 2,8.716, 2,17S 8.716,32, 17,32S 32,25.284, 32,17S 25.284,2, 17,2z M 18.714,16 C 21.628,16, 24,18.242, 24,21S 21.628,26, 18.714,26L 18,26 l0,1 C 18,27.552, 17.552,28, 17,28S 16,27.552, 16,27L 16,26 L 15.286,26 C 12.372,26, 10,23.758, 10,21 C 10,20.448, 10.448,20, 11,20S 12,20.448, 12,21C 12,22.654, 13.474,24, 15.286,24L 16,24 L 16,18 L 15.286,18 C 12.372,18, 10,15.758, 10,13S 12.372,8, 15.286,8L 16,8 L 16,7 C 16,6.448, 16.448,6, 17,6S 18,6.448, 18,7L 18,8 l 0.714,0 C 21.628,8, 24,10.242, 24,13C 24,13.552, 23.552,14, 23,14S 22,13.552, 22,13 C 22,11.346, 20.526,10, 18.714,10L 18,10 l0,6 L 18.714,16 zM 12,13C 12,14.654, 13.474,16, 15.286,16L 16,16 L 16,10 L 15.286,10 C 13.474,10, 12,11.346, 12,13zM 18.714,24C 20.526,24, 22,22.654, 22,21S 20.526,18, 18.714,18L 18,18 l0,6 L 18.714,24 z"></path></g></svg>
                </TDropdownMenu>
                <TDropdownMenu Name="Besoin d'aide" to="./static">
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="#000000"><g><path d="M 16,32c 8.836,0, 16-7.164, 16-16s-7.164-16-16-16S0,7.164,0,16S 7.164,32, 16,32z M 16,4c 3.982,0, 8,2.28, 8,7.376 c0,2.966-1.47,5.282-4.368,6.876C 18.792,18.714, 18,19.628, 18,20c0,1.104-0.896,2-2,2s-2-0.896-2-2c0-2.538, 2.328-4.496, 3.704-5.252 C 19.726,13.632, 20,12.416, 20,11.376C 20,8.438, 17.494,8, 16,8C 14.074,8, 12,9.264, 12,12.042c0,1.104-0.896,2-2,2s-2-0.896-2-2 C 8,6.818, 12.122,4, 16,4z M 16,28.088c-1.138,0-2.060-0.922-2.060-2.060s 0.922-2.060, 2.060-2.060s 2.060,0.922, 2.060,2.060S 17.138,28.088, 16,28.088z "></path></g></svg>
                </TDropdownMenu>
                <TDropdownMenu Name="Se deconnecter" to="./static">
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="#000000"><g><path d="M 17,2C 8.716,2, 2,8.716, 2,17S 8.716,32, 17,32S 32,25.284, 32,17S 25.284,2, 17,2z M 21.7,17.71l-6.486,6.486 c-0.39,0.39-1.024,0.39-1.414,0c-0.39-0.39-0.39-1.024,0-1.414L 19.582,17L 13.8,11.218c-0.39-0.39-0.39-1.024,0-1.414 c 0.39-0.39, 1.024-0.39, 1.414,0l 6.486,6.486c 0.196,0.196, 0.294,0.454, 0.292,0.71C 21.992,17.258, 21.896,17.514, 21.7,17.71z"></path></g></svg>
                </TDropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}

function TDropdownMenu({ children, Name, to }) {
  return (<div className="page  qF0y9  Igw0E  IwRSH   eGOV_    _4EzTm Lsy LDv" >
    <Link className="page ElL Ngt" to={to}>
      <div className="Fdo qF0y9   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv">
        <div className="page _4EzTm ovd yC0tu Vgd">
          <div className="bBB LCR Fdo Lns Aic" style={{ width: "36px", height: "36px" }}>{children} </div>
        </div>
        <div className="messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
          <div className="_7UhW9   xLCgt KV-D4  Vgd  fDxYl" style={{ fontWeight: "600", fontSize: "16px" }}>{Name}</div>
        </div>
      </div>
    </Link>
  </div>
  )
}