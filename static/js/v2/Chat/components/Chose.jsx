import React from "react";
import {Dropdown} from "react-bootstrap";
import DropdownCore from '../../Components/dropdown/core/DropdownCore'
import CustomToggle from "../../Components/dropdown/core/customButtonToggle.jsx";
 function Chose({children}){
    return(
      <Dropdown >
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <svg className="gUZ lZJ U9O kVc" height="24" width="24" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M17.75 13.25h-4.5v4.5a1.25 1.25 0 0 1-2.5 0v-4.5h-4.5a1.25 1.25 0 0 1 0-2.5h4.5v-4.5a1.25 1.25 0 0 1 2.5 0v4.5h4.5a1.25 1.25 0 0 1 0 2.5M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0"></path></svg>
       </Dropdown.Toggle>
        <Dropdown.Menu as={DropdownCore}>
            {children}
        </Dropdown.Menu>
      </Dropdown>
     )
   }
    
export default Chose