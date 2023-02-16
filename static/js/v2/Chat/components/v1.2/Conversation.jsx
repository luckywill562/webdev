import React, { Suspense, lazy } from "react";
import { withRouter } from "../../../util/WithRouter";
import { Link } from "react-router-dom";
import Fetch from "../../../util/Fetch";
import { useDispatch, useSelector } from "react-redux";
import MessageTemplate from "../MessageTemplate";
import  MessageForm from './MessageForm';
import { LoadingXlContent } from "../../../icon/icons";
import { createConversationsSlice, viewMessage } from "../../../redux/InboxRedux";
import ProfileSettings from "../../../users/Settings/ProfileSetting";
import Cookie from "js-cookie";
import { updateInboxState } from "../../../redux/UtilRedux";
const Conversation = (props) => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state);

    const [state, stateSet] = React.useState({
        client_user: undefined,
    })
    const [typing, setTyping] = React.useState(false);
    const [messageList, setMessageList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [typingState, setTypingState] = React.useState({
        typingTimeout: 0,
    })
    const [mounted, setMounted] = React.useState(false);
    const [lasttypingTimeout, setLastTypingTimeout] = React.useState(0)
    const conversations = store.Conversations
    const objIndex = conversations.find((conversations => conversations.client.user.user_id === props.useParams.id));

    const GetConversation = (id) => {
        if (objIndex) {
            setMessageList(objIndex.messages);
            stateSet({
                client_user: objIndex.client.user,
            })
        } else {
            setLoading(true)
            var formData = new FormData();
            formData.append('url', 'RESTAPI/Chat/getMessages')
            formData.append('client_id', id)
            Fetch('/conversation', formData, data => {
                setLoading(false);
                if (data.success === 1 && data.status === 200) {
                    const list = data.conversation.messages;
                    setMessageList(list);
                    stateSet({
                        client_user: data.conversation.client.user,
                    })
                    dispatch(createConversationsSlice(data.conversation));
                } else if (data.success === 0 && data.status === 404) {
                    props.navigate(`/404`)
                }
            })
        }
    }
    React.useEffect(() => {
        setMessageList([]);
        GetConversation(props.useParams.id)

    }, [props.useParams.id])

    const setTypingStatus = () => {
    }
    React.useEffect(() => {
        if (objIndex) {
            setMessageList(objIndex.messages);
            stateSet({ client_user: objIndex.client.user})
        }
        if (state.client_user && mounted) {
            onViewmessage(props.useParams.id);
        }
    }, [conversations])
    
    React.useEffect(() => {
        onViewmessage(props.useParams.id);
        setMounted(true);
    }, [state.client_user])
    const onViewmessage = (id) => {
        if (objIndex) {
            let array = objIndex?.messages;
            let lastElement = array[array.length - 1];
            if (array.length > 0 && lastElement.status != 1 && !lastElement.sended) {
                setTimeout(() => {
                    dispatch(updateInboxState(store.Util.stats.inbox - 1))
                }, 1000);
                dispatch(viewMessage(id));
                let data = {
                    data_type: 'CHAT',
                    chat_sub_type: 'update_message_to_seen',
                    c_user: Cookie.get('s_id'),
                    client_id: state.client_user && state.client_user.user_id,
                    security_token: Cookie.get('isLogedin'),
                    payload: lastElement
                }
                store.Util.ws.send(JSON.stringify(data));
            }

        }
    }


    const row = [];
    let time = null
    messageList.forEach((value, index) => {
        if (value.time_status !== time) {
            time = value.time_status
            row.push(<div className='Fdo Bsj Asc _0PwGv  ' key={value?.time_status}>{value?.time_status}</div>)
        }
        row.push(
            <div className='Fdo Anv' key={value.id}>
                {state.client_user &&
                    <MessageTemplate value={value}  index={index} list={messageList}  src={state.client_user.avatar.medium} client={props.useParams.id}/>
                }
            </div>
        )
    });

    return <Suspense fallback={<LoadingXlContent />}>
        {loading ? <LoadingXlContent /> :
            <>
                {state.client_user &&
                    <>
                        <div className="conversation-header messagerie">
                            <div className="S-mcP messagerie">
                                <div className="AjEzM messagerie">
                                    <div className="m7ETg messagerie" style={{ overflow: 'inherit' }}>
                                        <div className="Fdo   Fdo Igw0E   rBNOH  eGOV_  ybXk5    _4EzTm">
                                            <div className="messagerie _4EzTm ovd">
                                                <span className="_2dbep " style={{
                                                    width: "28px",
                                                    height: "28px"
                                                }}>
                                                    <img src={state.client_user.avatar.medium} className="hty ELG hrt" />
                                                </span>
                                                {state.client_user.online ?
                                                    <div className='rSxHQ UtYtc'></div> : null
                                                }
                                            </div>
                                            <div className="page Fdo  Igw0E   n4cjz   IwRSH  Lns vwCYk">
                                                <div className="Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr ">
                                                    <div className="_7UhW9   fDxYl  ">
                                                        <Link to={`/${state.client_user.username}`} className="mWe hft">
                                                            <div className="R19PB">
                                                                <div className="_7UhW9 Fdo Aic  xLCgt    fDxYl">{state.client_user.first_name}</div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="Fdo">
                                                <ProfileSettings user={state.client_user} />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Fdo conversation-main">
                            <div className="Fdo Anv Pap">
                                {row}

                                {typing && (
                                    <div className='Fdo Aic' style={{
                                        justifyContent: "flex-start",
                                        paddingBottom: "1px"
                                    }}>
                                        <div style={{
                                            height: 30,
                                            width: 30,
                                            marginRight: "0.5em",
                                            border: "1px solid transparent",
                                            borderRadius: 50,
                                            overflow: "hidden",
                                            alignItems: "center"
                                        }}>
                                            <img className="hty ELG hrt" src={state.client_user.avatar.medium} />
                                        </div>
                                        <div className="ticontainer">
                                            <div className="tiblock">
                                                <div className="tidot"></div>
                                                <div className="tidot"></div>
                                                <div className="tidot"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="conversation-footer">
                            <div className="Fdo aovydwv3 Vnk Kmm Pap">
                                {state.client_user.people_meet_desactived && !state.client_user.blocked_by_viewer &&
                                    !state.client_user.has_blocked_viewer || state.client_user.has_match_with_viewer &&
                                    !state.client_user.blocked_by_viewer && !state.client_user.has_blocked_viewer ||
                                    !state.client_user.has_blocked_viewer && !state.client_user.blocked_by_viewer && store.Util.c_user.people_meet_desactived ?
                                    <MessageForm setTypingStatus={setTypingStatus} client={state.client_user} />
                                    :
                                    <div className="Fdo buofh1pr RpE taijpn5t">
                                        <div className="_7UhW9  PIoXz       MMzan    _0PwGv  ">Vous pouvez pas envoyé un message a cette utilisateur</div>
                                    </div>
                                }
                            </div>
                        </div>
                    </>
                }
            </>
        }
    </Suspense>
}
export default withRouter(Conversation)