import React from "react";
import { withRouter } from "../../util/WithRouter";
import { Link, useLocation } from "react-router-dom";
import Fetch from "../../util/Fetch.js";
import { LoadingXlContent, NotificationIcon } from "../../icon/icons.jsx";
import { useDispatch, useSelector } from "react-redux";
import { updateNotificationCountState } from "../../redux/UtilRedux.jsx";
import { createNotificationsList, updateSingleNotificationSeen } from "../../redux/NotificationsRedux.jsx";
import { deleteSinglePost } from "../../redux/PostsRedux.jsx";

const Notifications = (props) => {
    const fieldRef = React.useRef(null)
    const [showBox, setShowBox] = React.useState(false)
    const state = useSelector((store) => store)
    const dispatch = useDispatch()
    const Data = state.NotificationsList;

    React.useEffect(() => {
        function handleOutsideClick(event) {
            if (fieldRef.current && !fieldRef.current.contains(event.target)) {
                setShowBox(false)
            }
        }
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [fieldRef]);
    const handleShow = () => {
        setShowBox(!showBox)
    }
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
                if (data.success === 1 && data.status === 200 && data.data.notifications) {
                    dispatch(updateNotificationCountState(data.data.notifications.count));
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
    return <div className="Fdo Aic RpE" ref={fieldRef}>
        <div className="Fdo Aic Eho" onClick={handleShow}>
            <div className="Fdo Aic pIc Hte Eho LCR Lns">
                <div className="Fdo Rvt Ftb gfr Lns">
                    <NotificationIcon size={29} />
                </div>
                {props.stats > 0 &&
                    <div className="KdEwV">
                        <div className="Fdo Aic J_0ip  Vpz-1  TKi86">
                            <span className="bqXJH">{props.stats}</span>
                        </div>
                    </div>
                }
            </div>
        </div>
        {showBox &&
            <div className="nt-flyout popop-right">
                <div className="flyout-header">
                    <div className="SH1 tlK SMy Vft">Notifications</div>
                </div>
                <div className="Fdo RpE Anv _6not">
                    <div className="Element-scrollable">
                        <div className="Element-scrolabled-list">
                            <NotificationsCore handleShow={handleShow} state={props.location} />
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
}
const NotificationsCore = (props) => {
    const [loadingNotifications, setLoadingNotifications] = React.useState(false)
    const state = useSelector((store) => store)
    const dispatch = useDispatch()
    const Data = state.NotificationsList;

    React.useEffect(() => {
        if (state.Util.stats.notifications > 0) {
            dispatch(updateNotificationCountState(0));
            var formData = new FormData();
            formData.append('url', 'RESTAPI/notifications/update_to_seen')
            Fetch('./api', formData);
        }
        LoadNotification()
    }, [])
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
        row.push(<Element key={element.id} e={element} handleShow={props.handleShow} state={props.state} />)
    });
    return <>
        {Data.length ?
            <div className="Ert">
                {row}
            </div>
            : loadingNotifications ?
                <div className="">
                    <LoadingXlContent />
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
function Time({ time }) {
    return <div style={{ padding: '0 10px' }}>
        <div className="yTZ mWe">{time}</div>
    </div>
}

function Element({ e, handleShow ,state}) {
    const dispatch = useDispatch()
    const TouchAction = (action) => {
        if (action.seen < 2) {
            dispatch(updateSingleNotificationSeen(action.id))
            let formData = new FormData();
            formData.append('notification_id', action.id);
            formData.append('url', 'RESTAPI/notifications/updateSingleNotificationToSeen')
            Fetch('./seen', formData, (data) => {
            })
        }
        handleShow();
    }
    return <div key={e.id} className="page  qF0y9  Igw0E  IwRSH   eGOV_  _4EzTm">
        <Link className="Fdo qF0y9   Igw0E   rBNOH  eGOV_   ybXk5  _4EzTm KV-D4 ElL "
            to={e.path} state={e.element_background === false ? { reload: true } : { background: state, reload: true }}
            onClick={(event) => TouchAction(e)}>
            <div className={`Fdo  rOtsg ${e.seen === 2 ? 'kYrtn' : ''}`}>
                <div className="page _4EzTm  yC0tu" style={{ width: "52px", height: "52px" }}>
                    <span className="_2dbep" style={{ width: "52px", height: "52px" }}>
                        <img src={e.user.user_avatar} className="hty ELG hrt" alt="" />
                    </span>
                    <span className="notif-icon">
                        {e.INFO_ICON === 'LIKE' &&
                            <img src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' className='sFc tlK' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23FF6680'/%3e%3cstop offset='100%25' stop-color='%23E61739'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.710144928 0 0 0 0 0 0 0 0 0 0.117780134 0 0 0 0.349786932 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 100 16A8 8 0 008 0z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M10.473 4C8.275 4 8 5.824 8 5.824S7.726 4 5.528 4c-2.114 0-2.73 2.222-2.472 3.41C3.736 10.55 8 12.75 8 12.75s4.265-2.2 4.945-5.34c.257-1.188-.36-3.41-2.472-3.41'/%3e%3c/g%3e%3c/svg%3e" alt="" />
                        }
                    </span>
                </div>
                <div className="Fdo Asc Anv" >
                    <div className={`Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr `} >
                        <span className="">
                            <span className="mWe">{e.user.username} </span>
                            {e.data_near &&
                                <>
                                    , <span className="mWe">razafindratsiza </span>
                                </>
                            }
                            <span dangerouslySetInnerHTML={{ __html: e.data_texte }} />
                            {e.data_content_texte &&
                                <span dangerouslySetInnerHTML={{ __html: ': ' + e.data_content_texte }} />
                            }
                        </span>
                        {e.data_content_image &&
                            <span className="Fdo Aic Lns">
                                <img src={e.data_content_image} className="Ngt" style={{ height: 52, width: 52 }} />
                            </span>
                        }
                    </div>
                    <div className="Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr   DhRcB " style={{ marginTop: 4 }}>
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
export default withRouter(Notifications)