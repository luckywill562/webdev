import React from "react";
import {Dropdown} from "react-bootstrap";
import DrpCore from "./core/DropdownCore.jsx"
import CustomToggle from "./core/customButtonToggle"
import {Link} from "react-router-dom";
 function  CreateDropdown(){
    return(
      <Dropdown >
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
           <svg width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
       </Dropdown.Toggle>
        <Dropdown.Menu as={DrpCore}>
          <Link to="/">Page d'accueil</Link>
          <Link to="/two">apple</Link>
          <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
          <Dropdown.Item eventKey="3" active>
            Orange
          </Dropdown.Item>
          <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
     )
   }
    
export default CreateDropdown