import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import DrpCore from "./core/DropdownCore.jsx"
import Fetch from "../../util/Fetch.js";
import { LoadingXlContent, NotificationIcon } from "../../icon/icons.jsx";
import { useDispatch, useSelector } from "react-redux";
import { updateNotificationCountState } from "../../redux/UtilRedux.jsx";
import { createNotificationsList, pushnewNotifications } from "../../redux/NotificationsRedux.jsx";
import { deleteSinglePost } from "../../redux/PostsRedux.jsx";

const Notification = (props) => {
  const [state, stateSet] = React.useState({
    dropOpened: false,
  });
  const dispatch = useDispatch()
  const Data = useSelector((state) => state.NotificationsList);
  React.useEffect(() => {
     setInterval(() => {
       let ids = Data.map(e => {
         return e.id
       })
       let formData = new FormData();
       formData.append('url', './RESTAPI/util/reload');
       formData.append('is_data', Data.length)
       formData.append('ids', ids)
       Fetch('/check', formData, data => {
         dispatch(updateNotificationCountState(data.data.notifications.count));
         
         if (data.success === 1 && data.status === 200) {
           if (data.data.notifications) {
             let array = data.data.notifications.newdata
             if (array.length > 0) {
               for (let index = 0; index < array.length; index++) {
                 const element = array[index];
                 dispatch(deleteSinglePost({ post_id: element.element_id }))
               }
               dispatch(pushnewNotifications(...array))
             }
           }
         } else if (data.success === 0 && data.status === 500) {
           window.location.href = '/login'
         }
       })
     }, 15000);
  }, [Data])


  return (
    
    <Dropdown className="Fdo Aic styled-menu RpE" id="myDropdown">
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <span className="Fdo Rvt Ftb gfr Lns">
          <NotificationIcon size={29} />
        </span>
        {props.stats > 0 &&
          <div className="KdEwV">
            <div className="Fdo Aic J_0ip  Vpz-1  TKi86">
              <span className="bqXJH">{props.stats}</span>
            </div>
          </div>
        }
      </Dropdown.Toggle>
      <Dropdown.Menu as={DrpCore} customClass="popop-right">
        <div className="flyout-header">
          <div className="SH1 tlK SMy Vft">Notifications</div>
        </div>
        <div className="Fdo RpE Anv _6not">
          <div className="Element-scrollable">
            <div className="Element-scrolabled-list">
              <Test />
            </div>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}
const Stats = ()=>{
  React.useEffect(()=>{
    console.log('render')
  })
  return <div>

  </div>
}
const Test = (props) => {
  const [loadingNotifications, setLoadingNotifications] = React.useState(false)
  React.useEffect(() => {
    LoadNotification()
  }, [])
  React.useEffect(() => {
    console.log(open)
  }, [])
  const dispatch = useDispatch()
  const Data = useSelector((state) => state.NotificationsList);
  const LoadNotification = () => {
    if (Data.length === 0) {
      setLoadingNotifications(true);
      let formData = new FormData();
      formData.append('url', 'RESTAPI/notifications/notifications')
      Fetch('./acountered', formData, (data) => {
        setLoadingNotifications(false)
        dispatch(createNotificationsList(data.notifications));
      })
    }
  }
  const row = [];
  let time = null
  Data.forEach((element) => {
    if (element.time_status !== time) {
      time = element.time_status
      row.push(<Time key={time} time={element.time_status} />)
    }
    row.push(<Element key={element.id} e={element} />)
  });
  return <>
    {Data.length ?
      <div className="Ert">
        {row}
      </div> : loadingNotifications ?
      <div className="">
        <LoadingXlContent/>
      </div>
      :
      <div className="Fdo Anv Aic">
        <div className="Fdo Anv Aic Vnk Pag vcx Kmm">
          <div className="_0PwGv v2ao">
            <NotificationIcon size={40} />
          </div>
          <div className="_0PwGv v2ao">
            vous verez ici lorsqu'une personne est interressé par votre profile, aime ou a commenter votre photos ou votre publications
          </div>
        </div>
      </div>
    }
  </>
}
const Time = ({ time }) => {
  return <div style={{ padding: '0 10px' }}>
    <div className="yTZ mWe">{time}</div>
  </div>
}
function Element({ e }) {
  const location = useLocation()
  const TouchAction = (action) => {
  }
  return <div key={e.id} className="page  qF0y9  Igw0E  IwRSH   eGOV_  _4EzTm">
    <Link className="Fdo qF0y9   Igw0E   rBNOH  eGOV_   ybXk5  _4EzTm KV-D4 ElL "
      to={e.path} state={e.element_background === false ? { reload: true } : { background: location, reload: true }}
      onClick={(event) => TouchAction(e.notification_type)}>
      <div className="Fdo  rOtsg">
        <div className="page _4EzTm  yC0tu" style={{ width: "52px", height: "52px" }}>
          <span className="_2dbep" style={{ width: "52px", height: "52px" }}>
            <img src={e.profile.user.user_avatar} className="hty ELG hrt" alt="" />
          </span>
          <span className="notif-icon">
            {e.INFO_ICON === 'LIKE' &&
              <img src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' className='sFc tlK' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23FF6680'/%3e%3cstop offset='100%25' stop-color='%23E61739'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.710144928 0 0 0 0 0 0 0 0 0 0.117780134 0 0 0 0.349786932 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 100 16A8 8 0 008 0z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M10.473 4C8.275 4 8 5.824 8 5.824S7.726 4 5.528 4c-2.114 0-2.73 2.222-2.472 3.41C3.736 10.55 8 12.75 8 12.75s4.265-2.2 4.945-5.34c.257-1.188-.36-3.41-2.472-3.41'/%3e%3c/g%3e%3c/svg%3e" alt="" />
            }
          </span>
        </div>
        <div className="Fdo Asc Anv">
          <div className={`Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr ${e.status === 2 ? 'kYrtn' : ''}`} >
            <span className="">
              <span className="mWe">{e.profile.user.username} </span>
              <span dangerouslySetInnerHTML={{ __html: e.data_texte }} />
              
              {+e.notification_type === 2 &&
                <>
                  a demmander a vous suivre
                  <div className='Fdo'>
                    <Link to="#" className="sqdOP Lbdf  L3NKy ZIAjV" onClick={() => this.ConfirmFollowerRequest(e.profile.user.user_id, 'A')}>Accepter</Link>
                    <Link to="#" className="sqdOP Lbdf  L3NKy ZIAjV hbc" onClick={() => this.ConfirmFollowerRequest(e.profile.user.user_id, 'D')}>Refuser</Link>
                  </div>
                </>
              }
            </span>
          </div>
          <div className="Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr   DhRcB ">
            <div className="_7UhW9   xLCgt  MMzan   fDxYl  ">
              <div className="R19PB">
                <div className="_7UhW9  PIoXz   MMzan    _0PwGv  fDxYl">
                  <span>{e.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
}


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
  const [opened, setOpened] = React.useState(false);
  const dispatch = useDispatch()
  React.useEffect(() => {
    if (opened) {
      console.log(opened)
      dispatch(updateNotificationCountState(0));
      var formData = new FormData();
      formData.append('url', 'RESTAPI/notifications/update_to_seen')
      Fetch('./api', formData);
    }
  })
  
  return (<button className="Fdo Aic Eho"
    ref={ref}
    onClick={(e) => {
      onClick(e);
      setOpened(true)
      console.log('try')
    }}
  >
    <div className="Fdo Aic pIc Hte Eho LCR Lns">{children}</div>
  </button>
  )
});

export default Notification
