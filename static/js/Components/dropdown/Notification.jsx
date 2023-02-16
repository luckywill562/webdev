import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import DrpCore from "./core/DropdownCore.jsx"
import "../../../css/Notifications.css"
import fetch from '../../util/async'

function dropdownNotification({ children }) {
  const [state, stateSet] = React.useState({
    dropOpened: false,
  });
  const [notData, setNot] = useState([]);
  const [dropDown, setDropdown] = useState(false);
  const LoadNotification = () => {
    if (state.dropOpened === false) {
      setDropdown({ dropDown: true })
      stateSet({ ...state, dropOpened: true })
      setDropdown({ dropDown: true })
      var formData = new FormData();
      formData.append('url', 'RESTAPI/views/notifications')
      fetch('./acountered', formData,
        (data) => {
          setNot({ notData: data.notifications })
        }
      )
    } else {
      stateSet({ ...state, dropOpened: false })
      setDropdown({ dropDown: false })
    }
  }
  const setSeenNotification = () => {
    setDropdown({ dropDown: false })
    console.log(dropDown)
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button className="Fdo Aic Eho" style={{ background: "none", border: "none", outline: "none",padding: 0 }}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
        LoadNotification();
        console.log(ref)
      }}
    >
      <div className="Fdo Aic icon-size Hte Eho LCR">{children}</div>
    </button>
  ));
  return (
    <Dropdown className="Fdo Aic styled-menu RpE" id="myDropdown">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {children}
      </Dropdown.Toggle>
      <Dropdown.Menu as={DrpCore}>
        <div className="flyout-header">
          <div className="SH1 tlK SMy Vft">Notifications</div>
        </div>
        <div className="Fdo RpE Anv _6not">
          <div className="Element-scrollable">
            <div className="Element-scrolabled-list">
              {notData.notData ?
                <div>
                  {notData.notData.map(e => (
                    <div key={e.id} className="page  qF0y9  Igw0E  IwRSH   eGOV_  _4EzTm">
                      <div className="rOtsg">
                        <Link to={`/${e.profile.user.username}`} onClick={() => setSeenNotification()} className="Fdo qF0y9   Igw0E   rBNOH  eGOV_   ybXk5  _4EzTm">
                          <div className="page _4EzTm ovd yC0tu">
                            <span className="_2dbep" style={{ width: "52px", height: "52px" }}>
                              <img src={e.profile.user.src} className="hty ELG hrt" alt="" />
                            </span>
                          </div>
                          <div className="">
                            <span className="mWe">{e.profile.user.username} </span>
                            <span className="" dangerouslySetInnerHTML={{ __html: e.status }}></span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div> : ""}
            </div>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default dropdownNotification