import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Love, PeopleIcon } from "../../icon/icons";
import { TabMenuLink } from "../../users/Components/Template";
export const Main = (props) => {
    const location = useLocation();
    return (
        <div className="Fdo Anv Bsj">
            {/**
            <div className=" Fdo Anv g4R ">
                <div className="post-card ">
                    <div className="Fdo Lsy LDv Ert Vpe">
                        <div className="Fdo Aic Bsj">
                            <div className="Fdo TabMenu">
                                     <TabMenuLink activeOnlyWhenExact={true} to={`/request`} path={location.pathname} label={`Interessé`} icon={<PeopleIcon size={18}/>} />
                                     <TabMenuLink to={`/request/sended`} path={location.pathname} label={`coup de coeur`} icon={<Love size={18}/>} />
                                     
                                <TabMenuLink activeOnlyWhenExact={true} to={`/request`} path={location.pathname} label={`Interessé`} />
                                <TabMenuLink  to={`/request/sended`} path={location.pathname} label={`coup de coeur`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             * 
             */}
            <Outlet />
        </div>
    );
};
