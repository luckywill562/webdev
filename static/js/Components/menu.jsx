import React from "react";
import { Link } from "react-router-dom";
export default function Menu({children,Name,to}){
    return(<div className="page  qF0y9  Igw0E  IwRSH   eGOV_    _4EzTm Lsy LDv" >
     <Link className="page ElL Ngt" to={to}>
       <div className="Fdo qF0y9   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv">
         <div className="page _4EzTm ovd yC0tu Vgd">
           <div className="bBB LCR Fdo Lns Aic" style={{ width: "36px", height: "36px"}}>{children} </div>
         </div>
           <div className="messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
             <div className="_7UhW9   xLCgt KV-D4  Vgd  fDxYl" style={{fontWeight:"600",fontSize:"16px"}}>{Name}</div>
           </div>
       </div>
     </Link>
   </div>
    )
  }