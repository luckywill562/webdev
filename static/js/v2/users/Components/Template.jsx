import React from "react";
import { Link, useMatch } from "react-router-dom";
import { IconLockOpen, IconPrivate, PersonAdd } from "../../icon/icons";
import { Lock, VideoPlayIcon } from "../../Template/Template";
import { useSelector } from "react-redux"
function TabMenuLink({ label, onClick, to, path, activeOnlyWhenExact }) {
  const match = useMatch(to, {
    path: path,
    exact: activeOnlyWhenExact,
    strict: false,
  });
  return (
    <>
      {match ?
        <div className="Fdo Aic Cdf _9VEo1 ActiveTab" onClick={onClick}>
          <span className="Fdo Aic">
            <span className="tvfksri0 ozuftl9m">{label}</span>
          </span>
        </div>
        :
        <Link to={to} className="Fdo Aic Cdf _9VEo1 ">
          <span className="Fdo Aic">
            <span>{label}</span>
          </span>
        </Link>
      }
    </>
  )
}
function ContentBottomContainer({ children, setMargin }) {
  return <div className="Fdo Aic Anv ELG">
    <div className='Fdo Nfb ELG Flk main-app-width'>
      <div className="ftB  Bsj ">
        <div className="Fdo Van">
          <div className="Evdg" style={{
            margin: setMargin ? 0 : ''
          }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
}
function EmptyFollowers({ text }) {
  return (<div className="Fdo Anv Bsj Lns Aic v4a Kmm">
    <div className="Fdo Anv Aic">
      <div className="Fdo Aic Lns">
        <div className="m9osqain ">
          <PersonAdd size={100} />
        </div>
      </div>
      <div className="yTZ mWe">{text}</div>
    </div>
  </div>)
}
function ModalMenu({ onClick, to, state = null, children, variant = '' }) {
  return <Link onClick={onClick} to={to} state={state} className="page h9nv ElL qF0y9 Ngt Igw0E  IwRSH   eGOV_    _4EzTm">
    <div className="rOtsg yTZ">
      <div className="Fdo   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm">
        <div className="_7UhW9 fDxYl">
          <div className="mWe messagerie Fdo  Igw0E     IwRSH    YBx95 vwCYk">
            <div className={'_7UhW9 fDxYl v2ao ' + variant}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  </Link>
}

const PhotoGridTemplate = ({ e, state }) => {
  const store = useSelector((data => data));
  return <div className="photo-wrapper Eho">
    <div className="Fdo Anv Dfv PSb">
      <Link to={`/album/${e.album_id}`} state={{ background: state }} className="photo-container">
        {e.media_type === 'video' &&
          <div className="photo-container ApE v1d" >
            <div className="Fdo hty ELG Nma Aic Lns">
              <VideoPlayIcon />
            </div>
          </div>
        }
        <div className="photo-container ApE v1d">
          {e?.has_open &&
            <div className="Fdo Aic Lns ApE hty ELG p1c h4u">
              <div className="LCR hgf shadowvg Pag Vnk Kmm vcx">
                <IconLockOpen size={38} />
              </div>
            </div>
          }
          {!e?.autorised &&
            <>
              <div className="page CzVzU ft4">
                <div className="vfb hn33210v lZJ RlF E6d ">
                  <span className="PLP">{store?.Util?.c_user?.currency}</span>
                  <span>{e?.price}</span>
                </div>
              </div>
              <Lock />
            </>
          }
          {+e?.mediacount === 0 ?
            <div className="Fdo Aic Lns ApE hty ELG p1c h4u">
              <div className="LCR shadowvg Pag Vnk Kmm vcx">
                <div>aucun contenu</div>
              </div>
            </div>
            :
            <img src={e?.image_url} className="lazyload" alt={e?.id} />
          }
        </div>
      </Link>
      {e?.mediacount > 1 &&
        <div className="page Fdo aovydwv3 CzVzU">
          <div className="shadowvg Lsy LDv Ert Vpe">
            <svg height="22" width="22" className="gUZ" color="#fff" viewBox="0 0 512 512"><path d="M154.7 464h266.7c23.5 0 42.7-19.2 42.7-42.7V154.7c0-23.5-19.2-42.7-42.7-42.7H154.7c-23.5 0-42.7 19.2-42.7 42.7v266.7c0 23.4 19.2 42.6 42.7 42.6z" /><path d="M90.7 48h266.7c23.5 0 42.7 19.2 42.7 42.7V96H138.7C115.2 96 96 115.2 96 138.7V400h-5.3C67.2 400 48 380.8 48 357.3V90.7C48 67.2 67.2 48 90.7 48z" /></svg>
          </div>
        </div>
      }
    </div>
  </div>
}
function AboutItem({ title, content }) {
  return <div className="Fdo AboutDivContainer">
    <div className="Fdo">
      <div className="Fdo mWe SMy PLP">{title}: </div>
      <div className="Fdo  ">{content}</div>
    </div>
  </div>
}
function MenuLink({ label, to, count, path, onClick, activeOnlyWhenExact, state = null }) {
  const match = useMatch(`${to}`, {
    path: path,
    exact: activeOnlyWhenExact,
    strict: false,
  });
  return (
    <li className="Y8-fY hdx">
      {match ?
        <span className="-nal3">
          <span className="g47SY">{count}</span> {label}
        </span>
        :
        <Link state={state} to={to} className="-nal3" onClick={onClick}>
          <span className="g47SY">{count}</span> {label}
        </Link>
      }
    </li>
  )
}
export { TabMenuLink, ContentBottomContainer, EmptyFollowers, ModalMenu, PhotoGridTemplate, AboutItem, MenuLink }