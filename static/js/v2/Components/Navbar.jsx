import React from 'react'
import { Dropdown } from "react-bootstrap";
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom';
import CustomToggle from './dropdown/core/customButtonToggle';
import DropdownCore from './dropdown/core/DropdownCore'
import { withRouter } from '../util/WithRouter';
import Fetch from '../util/Fetch';
import { AddCircleOutline, Instadirectoff, InstaDirectOn, InstaLoveIcon, Love } from '../icon/icons';
import { useDispatch, useSelector } from 'react-redux';
import { NameContainer } from '../Template/Template';
import Notifications from './Notifications/Notifications';
import AccountDropdown from './dropdown/AccountDropdown';

function MessengerComponent({ to, onClick, children, path }) {
  let match = useMatch({
    path,
    end: true,
    caseSensitive: true
  })

  return (
    <div className="Fdo  MVp Ftb">
      {match ?
        <Link className="Fdo Rvt LCR Zls RpE" to={to} onClick={onClick}>
          <span className="Fdo Ftb gfr Ytn">
            <InstaDirectOn size={22} />
            {children}
          </span>
          <span className="nBb"></span>
        </Link> :
        <Link className="Fdo Rvt LCR Zls RpE" to={to} onClick={onClick} >
          <span className="Fdo Ftb gfr Ytn">
            <Instadirectoff size={22} />
            {children}
          </span>
        </Link>
      }
    </div>
  )
}

function MatchComponents({ to, onClick, children, path, activeOnlyWhenExact }) {
  const match = useMatch(to, {
    path: path,
    exact: activeOnlyWhenExact,
    strict: false,
  });

  return (
    <div className="Fdo Zls RpE MVp hty Lns Aic Anv">

      {match ?
        <Link className="Fdo Rvt  Zls RpE hty" to={to} onClick={onClick}>
          <span className="Fdo Ftb gfr Ytn">
            <svg aria-label="Fil d’activité" className="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 48 48" width="24"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
          </span>
          <span className="nBb"></span>
        </Link> :
        <Link className="Fdo Rvt  Zls RpE" to={to} onClick={onClick} >
          <span className="Fdo Ftb gfr Ytn">
            <InstaLoveIcon size={23} />
          </span>
        </Link>
      }
      {children}
    </div>
  )
}
function CreateLink({ children }) {
  return (
    <Dropdown className="Fdo Aic styled-menu RpE dropdown">
      <Dropdown.Toggle as={CustomToggle} >
        <AddCircleOutline size={29} />
      </Dropdown.Toggle>
      <Dropdown.Menu as={DropdownCore} customClass="popop-right">

        {children}
      </Dropdown.Menu>
    </Dropdown>
  )
}

function ChoseTemplate({ children, name, to }) {
  return (<div className="page  Fdo  Igw0E  IwRSH   eGOV_    _4EzTm pIc">
    <Link to={to} className="page ElL Ngt">
      <div className="Fdo Fdo   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv">
        <div className="page _4EzTm ovd yC0tu Vgd">
          <div className="bBB LCR Fdo Lns Aic _Dvgb" style={{ width: "36px", height: "36px" }}>
            {children}
          </div>
        </div>
        <div className="messagerie Fdo  Igw0E     IwRSH Lns vwCYk">
          <div className="_7UhW9   xLCgt KV-D4  Vgd  fDxYl" style={{ fontWeight: "600", fontSize: "16px" }}>{name}</div>
        </div>
      </div>
    </Link>
  </div>)
}


const Navbar = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((reponse) => reponse.Util)
  const stats = data.stats;
  const [searchLoading, setSearchLoading] = React.useState(false)
  const [query, setQ] = React.useState('');
  const [typingTimeout, settypingTimeout] = React.useState(0)
  const [result, setResult] = React.useState([]);
  const [searchBox, setSearchBox] = React.useState(false);
  const [showplaceholder, setShowplaceholder] = React.useState(true)
  const fieldRef = React.useRef(null)
  const inputRef = React.useRef(null)

  const searchquery = () => {
    setSearchLoading(true)
    var formData = new FormData();
    formData.append('q', query)
    formData.append('url', 'RESTAPI/Search/users')
    Fetch('/api', formData, res => {
      setSearchLoading(false)
      setResult(res.users)
    })
  }

  const onSearch = (e) => {
    setQ(e.target.value)
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    settypingTimeout({
      typingTimeout: setTimeout(() => {
        if (query.length > 0) {
          searchquery()
        }
      }, 1000)
    })
  }
  const onFocus = () => {
    setSearchBox(true)
    inputRef.current.focus()
  }
  React.useEffect(() => {
    if (searchBox) {
      setShowplaceholder(false)
    }
  }, [searchBox])

  React.useEffect(() => {
    function handleOutsideClick(event) {
      if (fieldRef.current && !fieldRef.current.contains(event.target)) {
        setSearchBox(false)
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [fieldRef]);

  const location = useLocation();
  let { pathname } = location
  const path = pathname.split('/').includes('inbox') ? pathname : '/inbox';
  const navigate = useNavigate()
  const pushToSearch = (username) => {
    navigate(`/${username}`);
    setSearchBox(false)
  }
  return <>
    {stats &&
      <nav className="Dcf Fdo Aic">
        <div className="Fdo Aic ELG Bcg Nfb hty main-app-width Hsu Pap">
          <div className="Fdo hty">
            <div className="Fdo Ftb">
              <Link to='/' className="Fdo PLR Nkj">
                <img src={props?.logo} className="App-logo" alt="logo" />
              </Link>
            </div>
          </div>
          <div className="Fdo Anv RpE KNH Esw Aic" ref={fieldRef}>
            <input className="area-search" ref={inputRef} onFocus={onFocus} onChange={onSearch} placeholder="Rechercher" />
            {showplaceholder ?
              <div className='_aaw8' onClick={onFocus}>
                <div className='_aaw9'>
                  <div className='_aawa'>
                    <svg aria-label="Rechercher" className="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16"><path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
                  </div>
                  <span className='_aawc _aawd'>Rechercher</span>
                </div>
              </div>
              : null
            }
            {searchBox &&
              <div className='Fdo Smr'>
                <div className='ELG search-box'>
                  <div className='_ad8k _ad8l' style={{ left: 178 }}></div>
                  <div className="Lsy LDv Eom g4R">
                    {query &&
                      <div className="page ElL pIc">
                        <div className="Lsy LDv Ert Vpe">
                          <p>{query}</p>
                        </div>
                      </div>
                    }
                    {result?.map((e, index) => (
                      <div key={index} className="jb3vyjys qt6c0cv9">
                        <div className="page Bsj ElL pIc" onClick={() => pushToSearch(e?.username)}>
                          <div className="Fdo Aic Lsy LDv Ert Vpe">
                            <div className='Fdo ELG yC0tu'>
                              <div className="Fdo yC0tu">
                                <div className='Fdo Post-Author-Identity--Avatar Xs-User-Avatar UiOplink d-flex'>
                                  <img src={e?.avatar.medium} className="lazyload" />
                                </div>
                              </div>
                              <NameContainer top={e?.first_name} bottom={`@${e?.username}`} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {!searchLoading && result.length === 0 &&
                      <div className=''>Aucun resultat</div>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="Fdo Aic">
            <CreateLink>
              <div className="flyout-header">
                <div className="SH1 tlK SMy Vft">Créer</div>
              </div>
              <div className='Fdo RpE Anv _6not'>
                <ChoseTemplate name="un album" to="create-album">
                  <svg width="24" height="24" className="sFc" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"></circle><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                </ChoseTemplate>
              </div>
            </CreateLink>
            <MessengerComponent to={path} activeOnlyWhenExact={true} path={path}>
              {stats.inbox > 0 && (
                <div className="KdEwV">
                  <div className="Fdo Aic J_0ip  Vpz-1  TKi86">
                    <div className="bqXJH">{stats?.inbox}</div>
                  </div>
                </div>
              )}
            </MessengerComponent>
            <MatchComponents to="/request" activeOnlyWhenExact={true} path={location.pathname}>
              {stats.request > 0 && (
                <div className='Fdo SmK'>
                  <div className='_iYtr _ad8l'></div>
                  <div className='Fdo Fev_kl'>
                    <div className='Fdo Bsj Lns Aic'>
                      <div className='Fdo'>
                        <Love size={18} />
                        <div className='bqXJH gEop'>{stats?.request}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
              }
            </MatchComponents>
            <div className="Fdo Ftb  MVp">
              <Notifications ws={data?.ws} stats={stats?.notifications} />
            </div>

            <div className='Fdo Aic pbD MVp'>
              <AccountDropdown session_user={data?.c_user} picture={data?.c_user?.avatar?.small} large_img={data?.c_user.avatar.medium} user_id={data?.c_user.username} />
            </div>
          </div>
        </div>
      </nav>
    }
  </>
}
class NavBar extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return <Navbar logo={this.props?.logo} />
  }
};
export default withRouter(NavBar);
