import React from "react";
import { Dropdown } from "react-bootstrap";
import DropdownCore from '../../Components/dropdown/core/DropdownCore'
import CustomToggle from "../../Components/dropdown/core/customButtonToggle.jsx";
import { MoreOptions } from "../../icon/icons";
function DropdownOption({ children }) {
  return (
    <Dropdown >
      <Dropdown.Toggle as={CustomToggle} id="options-dropdown">
        <div className="oajrlxb2 qu0x051f esr5mh6w e9989ue4 r7d6kgcz nhd2j8a9 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x i1ao9s8h esuyzwwr f1sip0of abiwlrkh p8dawk7l lzcic4wl Aic s45kfl79 emlxlaya bkmhp75w spb7xbtv rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv Fdo Lns jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso RpE rgmg9uty b73ngqbp hn33210v m7msyxje m9osqain">
          <MoreOptions size={18}/>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu as={DropdownCore}>
        {children}
      </Dropdown.Menu>
    </Dropdown>
  )
}
export default DropdownOption