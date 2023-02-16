import React from 'react'
import PannelCom from '../Pannel-communication'
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

function MenuComponent({ to, onClick, label, children, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: false,
    strict: false,
  });
  return (
    <div className="Fdo Anv">
      {match ?
        <div className="Fdo Anv">
          <div className="page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm Cxfa">
            <Link className="page ElL Ngt QOqBd" to={to} onClick={onClick}>
              <div className="Fdo   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv">
                <div className="page _4EzTm ovd yC0tu Vgd">
                  <div className="bBA LCR Fdo Lns Aic" style={{ width: "32px", height: "32px" }}>{children} </div>
                </div>
                <div className="messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
                  <div className="_7UhW9   xLCgt KV-D4  Vgd  fDxYl" style={{ fontWeight: "600", fontSize: "16px" }}>{label}</div>
                </div>
              </div>
            </Link>
          </div>
        </div> :
        <div className="page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm">
          <Link className="page ElL Ngt" to={to} onClick={onClick}>
            <Menu Name={label} to={to}>{children}</Menu>
          </Link>
        </div>
      }
    </div>
  )
}

const MyComponent = () => {
  const location = useLocation()
  return (
    <div className="Fdo Anv">
      <div className="page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm Cxfa">
        <Link className={location.pathname === '/' ? "page ElL Ngt QOqBd" :"page Ngt ElL"}  to="/">
          <div className="Fdo   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv">
            <div className="page _4EzTm ovd yC0tu Vgd">
              <div className={location.pathname === '/' ? "bBA LCR Fdo Lns Aic" : "bBB LCR Fdo Lns Aic"} style={{ width: "32px", height: "32px" }}>
              <svg width="20" height="20" className="sFc tlK" viewBox="0 0 32 32" fill="#000000"><g><path d="M 6,14l 6,0 c 1.104,0, 2-0.896, 2-2L 14,6 c0-1.104-0.896-2-2-2L 6,4 C 4.896,4, 4,4.896, 4,6l0,6 C 4,13.104, 4.896,14, 6,14zM 20,14l 6,0 c 1.104,0, 2-0.896, 2-2L 28,6 c0-1.104-0.896-2-2-2l-6,0 C 18.896,4, 18,4.896, 18,6l0,6 C 18,13.104, 18.896,14, 20,14zM 4,26c0,1.104, 0.896,2, 2,2l 6,0 c 1.104,0, 2-0.896, 2-2l0-6 c0-1.104-0.896-2-2-2L 6,18 c-1.104,0-2,0.896-2,2L 4,26 zM 18,26c0,1.104, 0.896,2, 2,2l 6,0 c 1.104,0, 2-0.896, 2-2l0-6 c0-1.104-0.896-2-2-2l-6,0 c-1.104,0-2,0.896-2,2L 18,26 z"></path></g></svg>
              </div>
            </div>
            <div className="messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
              <div className="_7UhW9   xLCgt KV-D4  Vgd  fDxYl" style={{ fontWeight: "600", fontSize: "16px" }}>Rencontre</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}


export default class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      props: props,
      page: props.page,
      loading: false,
    }
  }

  render() {
    return (
      <div className='navContainer'>
      <div className="Left-pannel">
        <div className="Pannel-container Scroll-pannel">
          <div className="hty">
              <div className="aB">
                <MyComponent />
                <MenuComponent to="/discussions" label="Discussions">
                  <svg width="20" height="20" className="sFc tlK" viewBox="0 0 32 33.22800064086914" fill="#000000"><g><path d="M 14,5C 14,2.324, 11.676,0, 9,0S 4,2.324, 4,5C 4,7.676, 6.324,10, 9,10S 14,7.676, 14,5zM 17.5,24c0-8-4.152-12-8.75-12S0,16,0,24C0,29.48, 17.5,29.48, 17.5,24zM 23.5,13.89c 2.676,0, 5-2.324, 5-5s-2.324-5-5-5s-5,2.324-5,5S 20.824,13.89, 23.5,13.89zM 23.25,15.89c-1.382,0-2.706,0.406-3.906,1.13c 0.726,1.952, 1.156,4.266, 1.156,6.98 c0,2.694-1.796,4.792-4.878,5.992C 19.444,33.228, 32,32.538, 32,27.89C 32,19.89, 27.848,15.89, 23.25,15.89z"></path></g></svg>
                </MenuComponent>
                <NavItem to="#" onClick={this.props.clickFiltre} label="Modifier le Filtre">
                  <svg width="20" height="20" className="sFc tlK" viewBox="0 0 32 32" fill="#000000"><g><path d="M 27,6L 24,6 c0-1.104-0.896-2-2-2l-2,0 C 18.896,4, 18,4.896, 18,6L 5,6 C 4.448,6, 4,6.448, 4,7C 4,7.552, 4.448,8, 5,8L 18,8 c0,1.104, 0.896,2, 2,2l 2,0 c 1.104,0, 2-0.896, 2-2l 3,0 C 27.552,8, 28,7.552, 28,7C 28,6.448, 27.552,6, 27,6z M 22,8l-2,0 L 20,6 l 2,0 L 22,8 zM 27,14L 14,14 c0-1.104-0.896-2-2-2L 10,12 C 8.896,12, 8,12.896, 8,14L 5,14 C 4.448,14, 4,14.448, 4,15C 4,15.552, 4.448,16, 5,16L 8,16 c0,1.104, 0.896,2, 2,2l 2,0 c 1.104,0, 2-0.896, 2-2l 13,0 C 27.552,16, 28,15.552, 28,15C 28,14.448, 27.552,14, 27,14z M 12,16L 10,16 L 10,14 l 2,0 L 12,16 zM 27,22L 20,22 c0-1.104-0.896-2-2-2L 16,20 c-1.104,0-2,0.896-2,2L 5,22 C 4.448,22, 4,22.448, 4,23 C 4,23.552, 4.448,24, 5,24L 14,24 c0,1.104, 0.896,2, 2,2l 2,0 c 1.104,0, 2-0.896, 2-2l 7,0 c 0.552,0, 1-0.448, 1-1 C 28,22.448, 27.552,22, 27,22z M 18,24L 16,24 l0-2 l 2,0 L 18,24 z"></path></g></svg>
                </NavItem>
                <hr className="Fdo Ftg Rav CDp"></hr>
              </div>
              <PannelCom />
          </div>
        </div>
      </div>

      </div>
    )
  }
}

function NavItem({ to, children, label, active, onClick }) {
  return (
    <div className="Fdo Anv">
      {active ?
        <div className="page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm Cxfa">
          <Link className="page ElL Ngt QOqBd" to={to} onClick={onClick}>
            <div className="Fdo   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv">
              <div className="page _4EzTm ovd yC0tu Vgd">
                <div className="bBA LCR Fdo Lns Aic" style={{ width: "32px", height: "32px" }}>{children} </div>
              </div>
              <div className="messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
                <div className="_7UhW9   xLCgt KV-D4  Vgd  fDxYl" style={{ fontWeight: "600", fontSize: "16px" }}>{label}</div>
              </div>
            </div>
          </Link>
        </div>
        :
        <div className="page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm">
          <Link className="page ElL Ngt" to={to} onClick={onClick}>
            <Menu Name={label} to={to}>{children}</Menu>
          </Link>
        </div>
      }
    </div>
  )
}

function Menu({ children, Name, to }) {
  return (
    <div className="Fdo   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv">
      <div className="page _4EzTm ovd yC0tu Vgd">
        <div className="bBB LCR Fdo Lns Aic" style={{ width: "36px", height: "36px" }}>{children} </div>
      </div>
      <div className="messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
        <div className="_7UhW9   xLCgt KV-D4  Vgd  fDxYl" style={{ fontWeight: "600", fontSize: "16px" }}>{Name}</div>
      </div>
    </div>
  )
}