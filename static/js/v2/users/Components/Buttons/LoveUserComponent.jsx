import React from "react";
import Fetch from "../../../util/Fetch";
import Cookie from "js-cookie";
import { LoadingXlContent, Love, LoveAlt } from "../../../icon/icons";
import MyVerticallyCenteredModal from "../../../../Components/modal/modalCore";
import BtnActions from "../../../Request/Components/BtnActions";
import { useDispatch, useSelector } from "react-redux";
import { UpdateLoveButton } from "../../../redux/UserFilterRedux";
import { changeUserProfileElement, onClickLoveButtonProfile } from "../../../redux/UserProfiles";
import Cookies from "js-cookie";
import { closeAlertBox, showAlertBox, showMatchBox } from "../../../redux/UtilRedux";
const LoveUserComponent = (props) => {
    const dispatch = useDispatch();
    const [modal, setModal] = React.useState(false);

    const store = useSelector((state) => state)
    const util = store;
    const [loading, setLoading] = React.useState(false)
    const handleLove = (e) => {
        e.preventDefault();
        var action = props.user.requested_love_by_viewer;
        if (action === true && !props.user.has_requested_love_viewer) {
            var loved_action = "UNLOVE";
        } else if (action === false && !props.user.has_requested_love_viewer) {
            var loved_action = "LOVE";
        } else if (props.user.has_requested_love_viewer) {
            var loved_action = 'CONFIRM_CRUSH';
        }
        dispatch(UpdateLoveButton(props.user.user_id));
        dispatch(onClickLoveButtonProfile(props.user.user_id));
        /*love function(user_id, action,setLovestate())*/
        var formData = new FormData();
        formData.append('action', loved_action)
        formData.append('url', 'RESTAPI/Users/Like')
        formData.append("liked_id", props.user.user_id)
        Fetch('./api', formData, (data) => {
            dispatch(showAlertBox(data))
            setTimeout(() => {
                dispatch(closeAlertBox())
            }, 1000);
            if (data.success === 1 && data.type === 'ACCEPTED') {

                let data1 = {
                    data_type: 'message_text',
                    client_id: props.user.user_id,
                    msg: 'new contacts',
                    c_user: Cookie.get('s_id'),
                    security_token: Cookie.get('isLogedin'),
                    media: 0,
                    type: 'NEW_CONTACT'
                };
                let forMe = {
                    data_type: 'message_text',
                    client_id: Cookie.get('s_id'),
                    msg: 'nouveau contacts',
                    session_id: Cookie.get('s_id'),
                    c_user: props.user.user_id,
                    security_token: Cookie.get('isLogedin'),
                    media: 0,
                    type: 'NEW_CONTACT'
                };
                if (util.ws) {
                    util.ws.send(JSON.stringify(forMe));
                    util.ws.send(JSON.stringify(data1));
                }
            } else if (data.success === 1 && data.payload && data.payload.type === 'LOVE' || data.payload.type === 'UNLOVE' || data.payload.type === 'ACCEPT') {
                let payload = {
                    data_type: 'notifications',
                    sub_type: 'NEW_MATCH_REQUEST',
                    c_user: store.Util.c_user.user_id,
                    security_token: Cookies.get('isLogedin'),
                    client_id: parseInt(props.user.user_id),
                    payload: { count: data.payload.count, type: data.payload.type, user: store.Util.min_user_content },
                };
                store.Util.ws.send(JSON.stringify(payload));
                if (data.success === 1 && data.payload && data.payload.type === 'ACCEPT') {
                    dispatch(changeUserProfileElement({ user_id: props.user.user_id, name: 'has_match_with_viewer' }))
                    dispatch(showMatchBox(props.user))
                }

            }
        })
    }
    const DisableAction = () => {
        setLoading(!loading); setModal(false)
    }
    return <>
        {props.type === 'link' ?
            <>

                {modal &&
                    <MyVerticallyCenteredModal
                        show={modal}
                        titre="Répondre"
                        onHide={() => setModal(false)}
                        size="sm">
                        <div className="Fdo Anv RpE">
                            {loading &&
                                <div className="cover-action hty ELG ApE Fdo">
                                    <LoadingXlContent />
                                </div>
                            }
                            <div className="Fdo Anv Aic v2ao">
                                <div className="DivroundListAvatar">
                                    <div className="roundListAvatarcontent">
                                        <div className="ListavatarContent"
                                            style={{
                                                height: 56,
                                                width: 56,
                                                order: 2,
                                                cursor: 'pointer',
                                            }}>
                                            <span className="_aa8h" style={{
                                                height: 56,
                                                width: 56,
                                            }}>
                                                <img src={props.user.avatar} className="hty ELG hrt lazyload" />

                                            </span>
                                        </div>
                                        <div className="ListavatarContent"
                                            style={{
                                                height: 56,
                                                width: 56,
                                                order: 1,
                                                cursor: 'pointer',
                                                marginRight: '-12px'
                                            }}>
                                            <span className="_aa8h" style={{
                                                height: 56,
                                                width: 56,
                                            }}>
                                                <img className="_aa8j" src={store.Util.c_user.avatar.x56} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="e2ler">{props.user.first_name}</div>
                                <span className="Vpe">est interessé par votre profile</span>
                                <div className="sqdOP ">Accepter si  son profile vous interesse</div>
                            </div>
                            <div className="Fdo Kmm Vnk">
                                <BtnActions disableLink={DisableAction} e={props.user} />
                            </div>
                        </div>
                    </MyVerticallyCenteredModal>
                }

                {props.user.has_requested_love_viewer ?
                    <button className={`sqdOP Xdg L3NKy ZIAjV Bsj _2bDo`} onClick={() => setModal({ modal: true })}>
                        <div className="Fdo">
                            <span className="Fdo Aic">
                                <Love size={18} />
                            </span>
                            <span className="Fdo LmP">Répondre</span>
                        </div>
                    </button>
                    :
                    <button onClick={handleLove} className={`sqdOP Xdg L3NKy ZIAjV Bsj ${props.user.requested_love_by_viewer ? "_2bDo" : "Lbg"}`}>
                        <div className="Fdo">
                            <span className="Fdo Aic">
                                <Love size={18} />
                            </span>
                            <span className="Fdo LmP">
                                {props.user.requested_love_by_viewer ? 'envoyée' : 'Soliciter'}
                            </span>
                        </div>
                    </button>
                }
            </>
            :
            <div className="LmP p1c">
                <button className={`Fdo sqdOP L4fx ZIAjV Fbd BjN AC4 ${props.user.requested_love_by_viewer ? 'hbc' : ''}`} onClick={handleLove}>
                    {props.user.requested_love_by_viewer ? <Love size={24} /> : <LoveAlt size={24} />}
                </button>
            </div>
        }
    </>
}
export default LoveUserComponent