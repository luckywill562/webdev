import React from "react";
import { Link,useMatch } from "react-router-dom";
export default function Menu({children,Label,to= null,path,activeOnlyWhenExact}) {
    const match = useMatch(to, {
        path: path,
        exact: activeOnlyWhenExact,
        strict: false,
      });
    return (
        <div className="Fdo Anv">
            <div className="page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm Cxfa">
                {match ? 
                <div className="page ElL Ngt QOqBd" to={to}>
                    <div className="Fdo   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv">
                        <div className="page _4EzTm ovd yC0tu Vgd">
                            <div className="bBA LCR Fdo Lns Aic" style={{ width: "32px", height: "32px" }}>
                                {children}
                            </div>
                        </div>
                        <div className="messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
                            <div className="_7UhW9   xLCgt KV-D4  Vgd  fDxYl" style={{ fontWeight: "600", fontSize: "16px" }}>{Label}</div>
                        </div>
                    </div>
                </div>
                :
                <Link className="page ElL Ngt" to={to}>
                    <div className="Fdo   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv">
                        <div className="page _4EzTm ovd yC0tu Vgd">
                            <div className="bBB LCR Fdo Lns Aic" style={{ width: "32px", height: "32px" }}>
                                {children}
                            </div>
                        </div>
                        <div className="messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
                            <div className="_7UhW9   xLCgt KV-D4  Vgd  fDxYl" style={{ fontWeight: "600", fontSize: "16px" }}>{Label}</div>
                        </div>
                    </div>
                </Link>
                }
            </div>
        </div>
    )
}



