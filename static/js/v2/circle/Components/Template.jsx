import React from "react";
import { Link, useMatch } from "react-router-dom";

function CircleProfile({ avatarsize = 42, children, content }) {
    if (content != undefined) {
        return <div className="Fdo Anv">
            <div className="post-card">
                <div className="">
                    <div className="  Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv">
                        <div className="page              qF0y9          Igw0E   rBNOH        eGOV_     ybXk5     _4EzTm            XfCBB          HVWg4                 ">
                            <div className="page _4EzTm ovd yC0tu Vgd  qF0y9          Igw0E     IwRSH      eGOV_       acqo5   _4EzTm        yC0tu   ">
                                <div className="Fdo  UiOplink _2dbep " style={{ height: avatarsize, width: avatarsize, borderRadius: 4 }}>
                                    {content.circle_info.cover_photo &&
                                        <img src={content.circle_info.cover_photo} className="hty ELG hrt" />
                                    }
                                </div>
                            </div>
                            <div className="page Fdo  Igw0E     IwRSH  Lns vwCYk">
                                <div className="Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr ">
                                    <div className="_7UhW9   xLCgt  MMzan   fDxYl  ">
                                        <div className="R19PB">
                                            <div className="mWe hf" >
                                                <div className="_7UhW9 Fdo Aic  xLCgt   fDxYl" dangerouslySetInnerHTML={{ __html: content.circle_info.name }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr   DhRcB ">
                                    <div className="_7UhW9   xLCgt  MMzan   fDxYl  ">
                                        <div className="R19PB">
                                            <div className="_7UhW9  PIoXz       MMzan    _0PwGv              fDxYl     ">
                                                +2 Nouveaux
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="Fdo">{children}</div>
                        </div>
                    </div>
                    <div className="page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm Cxfa">

                    </div>
                </div>
            </div>
        </div>
    } else {
        return null
    }
}

function RightBox({ children }) {
    return <div className={"page  qF0y9  Igw0E  IwRSH   eGOV_    _4EzTm pIc"}>
        <div className="page L3NKy ElL Ngt">
            <div className="Fdo qF0y9   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv">
                <div className="page _4EzTm ovd yC0tu Vgd">
                    <div className="bBB LCR Fdo Lns Aic" style={{ width: "36px", height: "36px" }}>
                        {children}
                    </div>
                </div>
                <div className="messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
                    <div className="_7UhW9  PIoXz       MMzan    _0PwGv              fDxYl     ">23</div>
                    <div className="_7UhW9   xLCgt  MMzan   fDxYl  ">
                        <div className="R19PB">
                            <div className="_7UhW9   xLCgt KV-D4  Vgd  fDxYl" style={{ fontWeight: "600" }}>Membres</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

function SubjectListMenuContent({ element }) {
    return <div className="Fdo   Fdo Igw0E   rBNOH  eGOV_  ybXk5    _4EzTm">
        <div className="page _4EzTm ovd yC0tu">
            <MultipleAvatar avatarsize={32} users={element?.members} />
        </div>
        <div className="page Fdo  Igw0E     IwRSH  Lns vwCYk">
            <div className=' page     qF0y9     Igw0E     IwRSH      eGOV_       acqo5   _4EzTm'>
                <div className="_7UhW9 Fdo Aic  mWe xLCgt  KV-D4    fDxYl">
                    <div className="R19PB">
                        <span className="_7UhW9   xLCgt   se6yk" dangerouslySetInnerHTML={{ __html: element?.circle_name }}></span>
                    </div>
                </div>
            </div>
            <div className="Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr   DhRcB ">
                <div className="_7UhW9   MMzan   fDxYl  ">
                    <span className="R19PB">
                        <div className="_7UhW9   xLCgt  MMzan  se6yk">
                            {element?.sended ? <span className="">vous: </span> : null}
                            <span style={{
                                color: !element?.seen_by_viewer && !element?.sended ? '#3897f0' : '',
                                fontWeight: !element?.seen_by_viewer && !element?.sended ? 500 : ''
                            }} className="_7UhW9   xLCgt  MMzan  se6yk"
                                dangerouslySetInnerHTML={{ __html: element?.subject }}>
                            </span>
                        </div>
                    </span>
                </div>
            </div >
        </div >
    </div >
}

function SubjectListMenu({ path, onClick, element }) {
    let match = useMatch({
        path,
        end: true,
        caseSensitive: true
    })
    return (
        <div className="Fdo Anv">
            {match ?
                <div className="Fdo Anv">
                    <div className="page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm Cxfa">
                        <div className="page QOqBd   Fdo  Igw0E  IwRSH   eGOV_    _4EzTm" style={{ borderRadius: 6 }}>
                            <div className="rOtsg">
                                <SubjectListMenuContent element={element} />
                            </div>
                        </div>
                    </div>
                </div> :
                <div className="page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm">
                    <div className="page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm" style={{ borderRadius: 6 }}>
                        <Link to={path} className="rOtsg ElL" onClick={onClick}>
                            <SubjectListMenuContent element={element} />
                        </Link>
                    </div>
                </div>
            }
        </div>
    )
}
function MultipleAvatar({ users, avatarsize }) {
    return <div className="DivroundListAvatar">
        <div className="roundListAvatarcontent">
            {users?.[0]?.avatar &&
                <div className="ListavatarContent"
                    style={{
                        height: avatarsize,
                        width: avatarsize,
                        order: 2,
                        cursor: 'pointer',
                    }}>
                    <span className="_aa8h" style={{
                        height: avatarsize,
                        width: avatarsize,
                    }}>

                        <img src={users?.[0]?.avatar.x56} className="hty ELG hrt lazyload" />

                    </span>
                </div>
            }
            {users?.[1]?.avatar &&
                <div className="ListavatarContent"
                    style={{
                        height: avatarsize,
                        width: avatarsize,
                        order: 1,
                        cursor: 'pointer',
                        marginRight: '-12px',

                    }}>
                    <span className="_aa8h" style={{
                        height: avatarsize,
                        width: avatarsize,
                    }}>

                        <img src={users?.[1]?.avatar.x56} className="hty ELG hrt lazyload" />
                    </span>
                </div>
            }
        </div>
    </div>
}

function CircleMenu({ author, children }) {
    return <div className="page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm Cxfa">
        <Link to={`/`} className="page ElL Ngt">
            <div className="Fdo   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv">
                <div className="page              qF0y9          Igw0E   rBNOH        eGOV_     ybXk5     _4EzTm            XfCBB          HVWg4                 ">
                    <MultipleAvatar author={author} avatarsize={32} />
                    <div className="page Fdo  Igw0E     IwRSH  Lns vwCYk">
                        <div className="Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr ">
                            <div className="_7UhW9   xLCgt  MMzan   fDxYl  ">
                                <div className="R19PB">
                                    <div className="mWe hf" >
                                        <div className="_7UhW9 Fdo Aic  xLCgt   fDxYl">vous et 1k autres personnes</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="Fdo">{children}</div>
                </div>
            </div>
        </Link>
    </div>
}
const CircleList = ({ element }) => {
    return (
        <div className="circle-list-grid" >
            <div className="Eho BjN Fbd Ngt RpE ELG" style={{ paddingTop: '70%' }}>
                <Link to={`inbox/${element.group_id}`} className="Fdo Anv Dfv PSb Aic Lns">
                    <div className="Fdo Aic Anv Lns d2edcug0 Ert Vpe Lsy LDv Hsu">
                        <MultipleAvatar avatarsize={52} users={element.members} />
                        <div className="page Fdo  Igw0E  Lns vwCYk Ert ELG Aic">
                            <div className="Fdo    Igw0E   IwRSH   eGOV_  _4EzTm ">
                                <div className="_7UhW9   xLCgt  MMzan   fDxYl  ">
                                    <div className="R19PB">
                                        <div className="mWe fDxYl" dangerouslySetInnerHTML={{ __html: element?.circle_name }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="R19PB Ert ">
                            <div className="_7UhW9  PIoXz       MMzan    _0PwGv  " dangerouslySetInnerHTML={{ __html: element?.subject }}></div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export { CircleProfile, RightBox, SubjectListMenu, CircleList, CircleMenu, MultipleAvatar }