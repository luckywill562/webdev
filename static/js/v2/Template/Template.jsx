import React from "react";
import { Checked, Close, VideoPlayAlt } from "../icon/icons";
import { Link, useMatch } from "react-router-dom";
import { PrivateIcon, PublicIcon, PeopleIcon } from "../icon/icons";
import { toEmoji } from "../util/util";
import Fetch from "../util/Fetch";
function TemplateCheck({ onClick, children, checkbox, name, active, legende }) {
    return (<div className={active ? "page  L3NKy qF0y9  Igw0E  IwRSH   eGOV_    _4EzTm pIc QOqBd" : "page  qF0y9  Igw0E  IwRSH   eGOV_    _4EzTm pIc"} onClick={onClick}>
        <div className="page L3NKy ElL Ngt">
            <div className="Fdo qF0y9   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv">
                <div className="page _4EzTm ovd yC0tu Vgd">
                    <div className="bBB LCR Fdo Lns Aic Vkuy Mtlc">
                        {children}
                    </div>
                </div>
                <div className="messagerie Fdo  Igw0E     IwRSH  Vpe Ert  YBx95 vwCYk">
                    <div className="_7UhW9   xLCgt KV-D4  Vgd  fDxYl" style={{ fontWeight: "600", fontSize: "16px" }}>{name}</div>
                    {legende &&
                        <div className="_7UhW9  PIoXz       MMzan    _0PwGv      " style={{ marginTop: 2 }}>{legende}</div>
                    }
                </div>
                <div className="Fdo ">
                    {checkbox}
                </div>
            </div>
        </div>
    </div>)
}

function MenuItemWithIcon({ children, legende }) {
    return (<div className={"page  qF0y9  Igw0E  IwRSH   eGOV_    _4EzTm pIc"}>
        <div className="page L3NKy">
            <div className="Fdo qF0y9   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm">
                <div className="page _4EzTm ovd yC0tu Vgd">
                    <div className=" LCR Fdo Lns Aic">
                        {children}
                    </div>
                </div>
                <div className="messagerie Fdo  Igw0E     IwRSH  Vpe Ert  YBx95 vwCYk">
                    {legende &&
                        <div className="_7UhW9    xLCgt ">{legende}</div>
                    }
                </div>
            </div>
        </div>
    </div>)
}
function CountLikes({ media, to, state }) {
    return <section className="Pag vcx">
        {!media.liked_by_viewer && +media.like_counter === 0 ?
            <span className="mWe">0 mention J'aime</span>
            :
            'Aimé par '
        }
        <Link to={to} state={state} className="g47SY">
            {media.liked_by_viewer && +media.like_counter === 1 ?
                <span className="mWe"> vous</span>
                :
                <>
                    {media.liked_by_viewer && <span className="mWe"> vous </span>}
                    {media.like_counter > 0 && media.liked_by_viewer &&
                        'et'
                    }
                    {media.like_counter > 0 &&
                        <span className={"mWe"}>  {media.liked_by_viewer ? media.like_counter - 1 : media.like_counter}
                            {media.liked_by_viewer && ' autres'} personnes</span>
                    }
                </>
            }
        </Link>
    </section >
}
function NameContainer({ top, bottom }) {
    return <div className="page Fdo  Igw0E     IwRSH  Lns vwCYk">
        <div className=' page            qF0y9          Igw0E     IwRSH      eGOV_       acqo5   _4EzTm'>
            <div className="_7UhW9  mWe xLCgt  KV-D4    fDxYl">
                {top}
            </div>
        </div>
        <div className="Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr   nmjy">
            <div className="_7UhW9   xLCgt  MMzan   fDxYl  ">
                <span className="R19PB">
                    <span className="_7UhW9 PIoXz  se6yk" dangerouslySetInnerHTML={{ __html: bottom }}></span>
                </span>
            </div>
        </div>
    </div>
}
function AlertBottom({ message, children }) {
    return <div className="messagebox">
        <div className="Fdo Ert Vpe Bcg Nfb Pap ELG Flk main-app-width">
            <div className="hgf mWe ELG">{message}</div>
            <div className="Fdo ">{children}</div>
        </div>
    </div>
}
function BtnCloseX({ onClick }) {
    return <div onClick={onClick} className="oajrlxb2 qu0x051f esr5mh6w e9989ue4 r7d6kgcz nhd2j8a9 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x i1ao9s8h esuyzwwr f1sip0of abiwlrkh p8dawk7l lzcic4wl Aic s45kfl79 emlxlaya bkmhp75w spb7xbtv rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv j83agx80 Lns jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso RpE rgmg9uty b73ngqbp hn33210v m7msyxje m9osqain">
        <div className="Fdo Aic">
            <Close size={22} />
        </div>
    </div>
}
function ImportationMessage() {
    return { 'message': 'Importation de votre contenu, Vous allez recevoir une notifications lorsque votre album sera prete...' }
}

function DropdownContentTemplate({ children, name, onClick }) {
    return (
        <div className="page  Fdo  Igw0E  IwRSH   eGOV_    _4EzTm pIc" onClick={onClick}>
            <div className="page ElL Ngt">
                <div className="Fdo Fdo   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm  Lsy LDv">
                    <div className="page _4EzTm">
                        <div className="LCR Fdo Lns Aic" style={{ width: "32px", height: "32px" }}>
                            {children}
                        </div>
                    </div>
                    <div className=" Fdo  Igw0E   IwRSH    YBx95 vwCYk">
                        <div className="_7UhW9   Vgd  fDxYl" style={{ fontSize: "15px", fontWeight: 400 }}>{name}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
function Checkbox({ children, checked, onchange, name }) {
    return <div className=' page            qF0y9          Igw0E   rBNOH           CcYR1  ybXk5     _4EzTm                                                                                                              '>
        <div className='page wBKMS'>
            <div className='_7UhW9    vy6Bb   mWe   KV-D4   uL8Hv    '>
                {children}
            </div>
        </div>
        <label className='QC_AM ksdr' htmlFor='cm'>
            <input type="checkbox" name={name} checked={checked} onChange={onchange} id="cm" className='pnqXA'></input>
            <span className='gZk2f ksdr' style={{ margin: '0 !important' }}> </span>
        </label>
    </div>
}
function PostCardLoading() {
    return <div className="post-card">
        <div className="card-top">
            <ExploreLoading length={1} />
            <div>
                <div className="DrvG" style={{ height: 10, marginTop: 10, minWidth: 20 }}></div>
                <div className="DrvG" style={{ height: 10, marginTop: 10, minWidth: 170 }}></div>
                <div className="DrvG" style={{ height: 10, marginTop: 10, minWidth: '50%' }}></div>
                <div className="DrvG" style={{ height: 10, marginTop: 10, minWidth: 220 }}></div>
            </div>
        </div>
        <div></div>
    </div>
}
function BoxLoading() {
    return <>
        <div className="Fdo messagerie-container sLayout voyue PaN">
            <div className="Fdo  messages-wrapper Nma" style={{ borderRadius: 0 }}>
                <div className="Fdo ApE p1c">
                    <div className="wGH Vnk">

                    </div>
                </div>
                <div className="Fdo Aic Bsj">
                    <div className="messages-text-container RpG Fdo Aic Lns">

                    </div>
                    <div className="Fdo box-overlay hty ljhf n8ej3o3l">
                        <div className="messages-list-wrapper">
                            <div className="Fdo Kmm Vnk Pag vcx">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}
function CardText({ e }) {
    return <>
        {e.post_content.length > 0 && (
            <div className="Fdo Ert">
                <div className="post-text" style={{
                    fontSize: e.post_content.length <= 200 && +e.media_count === 0 ? 22 : '',
                    fontWeight: e.post_content.length <= 200 && +e.media_count === 0 ? 600 : '',
                    lineHeight: 1.2
                }}
                    dangerouslySetInnerHTML={{ __html: toEmoji(e.post_content) }}></div>
            </div>
        )}
    </>
}
function EmptyPostContent() {
    return <div className="">
        <div className="Fdo Ngt G7mk Ftg Rav nmjy" >
            <div className="E6d Fdo Ert Vpe Lsy LDv">
                <div className="">Le contenu de cette publication ne peut pas être afficher. Ce problème est souvent dû au fait que son proprietaire a modifier sa confidentialité ou l'élement a été supprimer</div>
            </div>
        </div>
    </div>
}

function BoxItemTitle({ title, children }) {
    return <div className="Fdo Vpe Bsj Aic">
        <span className="yTZ B9u mWe Bsj">{title}</span>
        {children}
    </div>
}
function CardAuthorName({ children, author, avatarsize = 36 }) {
    if (author) {
        return <div className="page              qF0y9          Igw0E   rBNOH        eGOV_     ybXk5     _4EzTm            XfCBB          HVWg4                 ">
            <div className="  qF0y9          Igw0E     IwRSH      eGOV_       acqo5   _4EzTm        yC0tu   ">
                <Link className="Fdo Post-Author-Identity--Avatar UiOplink " style={{ height: avatarsize, width: avatarsize }} to={`/${author.username}`}>
                    <img src={author.avatar} className="hty ELG hrt" />
                </Link>
            </div>
            <div className="page Fdo  Igw0E     IwRSH  Lns vwCYk">
                <div className="Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr ">
                    <div className="_7UhW9   xLCgt  MMzan   fDxYl  ">
                        <div className="R19PB">
                            <Link to={`/${author.username}`} className="mWe hft" >
                                <div className="_7UhW9 Fdo Aic  xLCgt   fDxYl" dangerouslySetInnerHTML={{ __html: author.name }}></div>
                            </Link>
                        </div>
                    </div>
                </div>
                <NameBottom>
                    {author.created_date ?
                        <span>{author.created_date}</span>
                        :
                        <span>@{author.username}</span>
                    }
                </NameBottom>
            </div>
            <div className="Fdo">{children}</div>
        </div>
    } else {
        return null;
    }
}
function CardAuthorTemplate({ children, author, avatarsize = 36, showOnline = false, bolder = false }) {
    return <div className="page              qF0y9          Igw0E   rBNOH        eGOV_     ybXk5     _4EzTm            XfCBB          HVWg4                 ">
        <div className="  qF0y9          Igw0E     IwRSH      eGOV_       acqo5   _4EzTm        yC0tu   ">
            <div className="Fdo   Fdo Igw0E   rBNOH  eGOV_  ybXk5    _4EzTm">
                <Link className="page _4EzTm ovd " to={`/${author.username}`}>
                    <span className="_2dbep " style={{ height: avatarsize, width: avatarsize }}>
                        <img src={author.avatar.x56} className="hty ELG hrt" />
                    </span>
                    {author.online && showOnline ?
                        <div className='rSxHQ UtYtc'></div>
                        :
                        null}
                </Link>
            </div>


        </div>
        <div className="page Fdo  Igw0E     IwRSH  Lns vwCYk">
            <div className="Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr ">
                <div className="_7UhW9   xLCgt  MMzan   fDxYl  ">
                    <div className="R19PB">
                        <Link to={`/${author.username}`} className="mWe hft" >
                            <div className={`_7UhW9 Fdo Aic  xLCgt   fDxYl ${bolder ? '' : 'nslk'}`} style={{ fontWeight: bolder ? 'bolder' : '' }} dangerouslySetInnerHTML={{ __html: author.first_name }}></div>
                        </Link>
                    </div>
                    {author.verified &&
                        <div className='lZJ Fdo LmP'>
                            <Checked size={14} />
                        </div>
                    }
                </div>
            </div>

            <NameBottom>
                {author.created_date ?
                    <span>{author.created_date}</span>
                    :
                    <span className={`${bolder ? `` : `ScreenName`}`}>@{author.username}</span>
                }
            </NameBottom>
        </div>
        <div className="Fdo">{children}</div>
    </div>

}
function ChangeConfident({ confidentiality, onclick }) {
    return <div className="Fdo aovydwv3 Vnk Kmm">
        <div className='page ElL QOqBd pIc L3NKy' onClick={onclick}>
            <div className='Fdo   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm tw6a2znq vcx '>
                <div className='page _4EzTm ovd Vgd'>
                    <div className=' LCR Fdo Lns Aic' style={{ height: 22, width: 22, paddingRight: 8 }}>
                        {confidentiality === 1 && <PublicIcon size={22} />}
                        {confidentiality === 2 && <PeopleIcon size={22} />}
                        {confidentiality === 3 && <PrivateIcon size={22} />}
                    </div>
                </div>
                <div className="_7UhW9   xLCgt KV-D4  Vgd  fDxYl E6d" >
                    {confidentiality === 1 && 'Tous le monde'}
                    {confidentiality === 2 && 'Abonnés'}
                    {confidentiality === 3 && 'Moi uniquement'}
                </div>
            </div>
        </div>
    </div>
}
function VideoPlayIcon() {
    return <div className=" p1c">
        <div className="LCR hgf shadowvg" >
            <VideoPlayAlt size={60} width={50} />
        </div>
    </div>
}


function MenuTemplate({ to, path, children, onClick, activeOnlyWhenExact }) {
    const match = useMatch(to, {
        path: path,
        exact: activeOnlyWhenExact,
        strict: false,
    });
    return (
        <>
            {match ?
                <div className="page h9nv tvmbv18p oocd Ngt Fdo Igw0E  IwRSH   eGOV_    _4EzTm">
                    <div className="rOtsg">
                        <div className="Fdo   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm">
                            <div className="_7UhW9 fDxYl">
                                <div className="mWe messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
                                    <div className="_7UhW9  fDxYl  lZJ" >{children}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <Link onClick={onClick} to={to} className="page h9nv ElL tvmbv18p qF0y9 Ngt Igw0E  IwRSH   eGOV_    _4EzTm">
                    <div className="rOtsg">
                        <div className="Fdo   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm">
                            <div className="_7UhW9 fDxYl">
                                <div className="mWe messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
                                    <div className="_7UhW9 fDxYl">{children}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            }
        </>
    )
}

function Lock() {
    return <div className="Fdo Aic Lns ApE hty ELG p1c h4u">
        <div className="LCR gtb Hdt lZJ Pag Vnk Kmm vcx">
            <PrivateIcon size={36} />
        </div>
    </div>
}
function DayOfBirth({ value, onchange }) {
    let row = [];
    for (let i = 1; i <= 31; i++) {
        row.push(
            <option value={i} key={i}>{i}</option>
        )
    }
    return <div className="customized-select">
        <select value={value} onChange={onchange} name="DayOfBirth" ><option value='jour'>Jour</option>{row}</select>
    </div>
}

function YearOfBirth({ value, onchange }) {
    let row = [];
    for (let i = 1921; i < 2006; i++) {
        row.push(
            <option value={i} key={i}>{i}</option>
        )
    }
    return <div className="customized-select">
        <select value={value} onChange={onchange} name="YearOfBirth"><option value={0}>Année</option>{row}</select>
    </div>
}

function AgeSearchedMinimum({ value, onChange, name }) {
    let row = [];
    for (let i = 18; i < 98; i++) {
        row.push(
            <option value={i} key={i}>{i}</option>
        )
    }
    return <div className="customized-select">
        <select value={value} onChange={onChange} name={name}>{row}</select>
    </div>
}
function GetCurrency({ value, onchange }) {
    const [currencys, setCurrencys] = React.useState([]);
    let row = [];
    React.useEffect(() => {
        var formData = new FormData();
        formData.append('url', '/RESTAPI/util/getCurrency')
        Fetch('/api', formData, (res) => {
            if (res?.success === 1) {
                setCurrencys(res?.responses);
            }
        })
    }, [])
    for (let i = 0; i < currencys.length; i++) {
        row.push(
            <option value={currencys[i].id} key={i}>{currencys[i].name}</option>
        )
    }
    return <div className="customized-select">
        <select value={value} onChange={onchange} name="currency"><option value={0}>dévise</option>{row}</select>
    </div>
}
function UserLoading() {
    return <div className="page              qF0y9          Igw0E   rBNOH        eGOV_     ybXk5     _4EzTm            XfCBB          HVWg4                 ">
        <div className="  qF0y9          Igw0E     IwRSH      eGOV_       acqo5   _4EzTm        yC0tu   ">
            <div className="Fdo Post-Author-Identity--Avatar UiOplink Vkuy Mtlc" >
                <div className="HaS-3"></div>
            </div>
        </div>
        <div className="page Fdo  Igw0E     IwRSH  Lns vwCYk">
            <div className="profil-name">
                <div className="DrvG" style={{ height: 13, marginTop: 10, minWidth: 120 }}></div>
            </div>
            <div className="profil-username">
                <div className="DrvG" style={{ height: 10, marginTop: 5 }}></div>
            </div>
        </div>
        <div className="Fdo">
            <div className="DrvG" style={{ height: 8, marginTop: 5, margin: 0 }}></div>

        </div>
    </div>
}
function ExploreLoading({ length }) {
    let row = [];
    for (let i = 0; i < length; i++) {
        row.push(
            <div key={i}>
                <UserLoading />
            </div>
        )
    }
    return row;
}
function ExploreContainer({ children }) {
    return <div className='Fdo p1c' style={{ zIndex: 2 }}>
        <div className='Fdo a1C ELG Vkl Pag p1c'>
            <div className='Fdo Anv ELG'>
                <div className="Fdo Kmm">
                    <div className="page Fdo  Igw0E  mWe   IwRSH  Lns vwCYk">Suggestions</div>
                    <div className="Fdo">
                        <Link to={`/explore`}>voir tout</Link>
                    </div>
                </div>
                <div className='app-widget-follow'>
                    {children}
                </div>
            </div>
        </div>
    </div>
}
function NameBottom({ children }) {
    return (
        <div className="Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr   nmjy">
            <div className="_7UhW9   xLCgt  MMzan   fDxYl  ">
                <div className="R19PB">
                    <div className="_7UhW9  PIoXz       MMzan    _0PwGv              fDxYl     ">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

const MediaPreview = (props) => {
    let row = [];
    for (let i = 0; i < props.mediaState.media.length; i++) {
        row.push(
            <div className='kb5gq1qc pfnyh3mw rs0gx3tq tvfksri0 w0hvl6rk hcukyx3x RpE' key={i} style={{ height: 100, width: 100 }}>
                <div className='RpE ni8dbmo4 bBB stjgntxs fni8adji hgaippwi fykbt5ly ns4ygwem' style={{ height: 100, width: 100 }}>
                    <img className='k4urcfbm bixrwtb6 datstx6m q9uorilb'
                        src={URL.createObjectURL(props.mediaState.media[i])}
                        alt="Thumb"
                    />
                </div>
                <div className="pmk7jnqg nezaghv5 e712q9ov">
                    <BtnCloseX onClick={() => props.clickEvent(i)} />
                </div>
            </div>
        )
    }
    return row;
}
function ElementTitle({ children }) {
    return <div className="Fdo Ert Vpe">
        <span className="yTZ B9u mWe">
            {children}
        </span>
    </div>
}

function TabMenuLink({ label, onClick, to, path, activeOnlyWhenExact, icon, iconActive }) {
    const match = useMatch(to, {
        path: path,
        exact: activeOnlyWhenExact,
        strict: false,
    });
    return (
        <div className="LDv ">
            {match ?
                <div className="Fdo sqdOP _kjyt ZIAjV QOqBd">
                    <div className="Fdo Aic cgat1ltu">
                        {icon}
                    </div>
                    <div className="mWe gtriop">{label}</div>
                </div>
                :
                <Link to={to} className="Fdo sqdOP _kjyt  hrdfpoiu  Bgu ZIAjV">
                    <div className="Fdo Aic cgat1ltu">
                        {icon}
                    </div>
                    <div className="mWe gtriop">{label}</div>
                </Link>
            }
        </div>
    )
}
function ConfidentialityIcon({ level }) {
    return <div className="Fdo Aic _0PwGv               PLP">
        {level === 3 ?
            <PrivateIcon size={18} />
            : level === 2 ?
                <PeopleIcon size={18} />
                :
                <PublicIcon size={18} />
        }

    </div>
}
function FallbackLoading() {
    return <div className="fallback-loading"></div>
}


function BottomAffichage({ titre, texte }) {
    return <div className="Fdo Anv Aic">
        {titre &&
            <div className="Fdo SH1">{titre}</div>
        }
        {texte &&
            <div className="v2ao">{texte}</div>
        }
    </div>
}
function CircleProgress() {
    return <div class="circle-wrap">
        <div class="circle">
            <div class="mask half">
                <div class="fill"></div>
            </div>
            <div class="mask full">
                <div class="fill">
                </div>
            </div>
            <div class="inside-circle"> 75% </div>
        </div>
    </div>
}
const ImageGridLoading = () => {
    let row = [];
    for (let index = 0; index < 8; index++) {
        row.push(
            <div className="photo-item" key={index}>
                <div className="photo-wrapper Eho">
                    <div className="Fdo Anv Dfv PSb">
                        <div className="photo-container">
                            <div className="HaS-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return <div className="Evdg">
        <div className="Ba2">
            <div className="Fdo Cdf kzZ" style={{ margin: '-4px' }}>
                {row}
                <FakePhotoGrid />
            </div>
        </div>
    </div>
}
function RoundListAvatar() {
    return <div className="DivroundListAvatar">
        <div className="roundListAvatarcontent">
            <div className="ListavatarContent"
                style={{
                    height: 20,
                    width: 20,
                    order: 2,
                    cursor: 'pointer'
                }}>
                <span className="_aa8h" style={{
                    height: 20,
                    width: 20,
                }}>
                    <img className="_aa8j" src="http://localhost:8000/src/x56/iup/627761811fbc6.jpg" />
                </span>
            </div>
            <div className="ListavatarContent"
                style={{
                    height: 20,
                    width: 20,
                    order: 1,
                    cursor: 'pointer',
                    marginRight: '-9px'
                }}>
                <span className="_aa8h" style={{
                    height: 20,
                    width: 20,
                }}>
                    <img className="_aa8j" src="http://localhost:8000/src/x56/iup/4.jpg" />
                </span>
            </div>
        </div>
    </div>
}
const FakePhotoGrid = () => {
    let row = [];
    for (let i = 0; i < 5; i++) {
        row.push(
            <div className="photo-item" key={i}> </div>
        )
    }
    return row;
}
export {
    TemplateCheck, CountLikes, NameContainer, AlertBottom,
    ImportationMessage, BtnCloseX, DropdownContentTemplate,
    Checkbox, PostCardLoading, CardText, EmptyPostContent, BoxItemTitle,
    CardAuthorName, ChangeConfident, VideoPlayIcon, MenuTemplate, Lock, BoxLoading,
    DayOfBirth, YearOfBirth, UserLoading, ExploreContainer, ExploreLoading,
    NameBottom, MediaPreview, ElementTitle, BottomAffichage,
    CardAuthorTemplate, MenuItemWithIcon, TabMenuLink, ConfidentialityIcon, FallbackLoading,
    CircleProgress, ImageGridLoading, RoundListAvatar, FakePhotoGrid, AgeSearchedMinimum, GetCurrency

}