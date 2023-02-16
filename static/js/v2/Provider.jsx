// This is a React Router v6 app
import React, { useEffect } from "react";
import {
    Routes,
    Route,
    Link,
    Outlet,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import Container from "./Components/Container";
import Home from "./Home/Home"
import Posts from "./Posts/Posts";
import { withRouter } from "./util/WithRouter";
import Chat from './Chat/Chat'
import Create from "./Create/Album";
import Websocket from "./util/Websocket";
import Fetch from './util/Fetch'
import Settings from './users/Settings/Settings'
import Account from './users/account/Balance'
import Filtre from "./Home/Filtre";
import Error from "./404/404";
import PurchasseJeton from "./users/account/components/UpgradeJeton";
import MatchBox from "./users/Match/MatchBox";
import Loading from "./auth/Loading";
import { Close } from './icon/icons';
import Rencard from "./rencard/Rencard";
import Single from "./Posts/components/Single";
import Explore from "./explore/Explore";
import Request from "./Request/Request";
import Circle from "./circle/Circles";
import { store } from "./redux/redux";
import CreateCircle from "./Create/CreateCircle";
import Discussions from "./circle/discussions/Discussions";
import { closeNotificationBox, createNextPayload, createPageElement, showNotificationBox } from "./redux/UtilRedux";
import User from "./users/User";
import { changeClientMessagePosition, changeMessageSendedStatus, changeMessageSendElement, displayMedia, messageSendError, pushNewMessageOnConversations } from "./redux/InboxRedux";
import { AlertBottom } from "./Template/Template";
import Incognito from "./inconigto/Incognito";
import { createIncognitoMessagesSlice, deleteIncognitoChat } from "./redux/IncognitoRedux";
import MediaTest from "./media/MediaTest";
import FollowerRequest from "./users/Followers/FollowerRequest";
import Photos from "./Photos/Photos";
import ActivatePage from "./Components/ActivatePage";
import { change_has_request_viewer } from "./redux/UserProfiles";
import Cookie from 'js-cookie'

class AppProvider extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            logo: '',
            list: [],
            modalFiltre: false,
            Filtre: [],
            //session
            c_user: [],
            c_user_id: null,
            Page_Loading: true,
            ws: null,
            /*liste apres navigation*/
            postBody: [],
            /*statistiques*/
            stats: [],
            /*navcontacts*/
            Contacts: [],
            purchasseBox: false,
            next_page: [],
            VisitedAlbum: [],
            /*if last <elemtn></elemtn> */
            LastMatch: false,
            AllAlert: undefined,
            reload: true,
            is_actived: false
        }
    }
    UtilLoad = () => {
        let formData = new FormData();
        formData.append('url', './RESTAPI/util/util');
        Fetch('/', formData, data => {
            if (data.success === 1) {
                const stats = this.state.stats.slice();
                stats.push(data.stats);
                this.setState({
                    Filtre: data.message, Page_Loading: false,
                    c_user: data.c_user.profile,
                    c_user_id: data.c_user.profile.username,
                    stats: stats,
                    logo: data.assets.logo,
                    next_page: data.has_next,
                    is_actived: data.is_actived
                });
            }
        })
    }
    componentDidMount() {
        Websocket((ws) => this.setState({ ws: ws }), this.state)
        this.UtilLoad()
    }
    newWebsocket = () => {
        const dispatch = useDispatch();
        dispatch(createPageElement({ 'ws': this.state.ws, c_user: this.state.c_user, stats: this.state.stats[0], Filtre: this.state.Filtre }));
        dispatch(createNextPayload(this.state.next_page))
        useEffect(() => {
            this.state.ws.addEventListener("message", (event) => {
                const data = JSON.parse(event.data)
                if (data.status === 200 && data.message_type === 'text') {
                    if (data.autorisation === true) {
                        if (data.messages.from_pool) {
                            dispatch(changeMessageSendElement({ 'message': data }));
                            dispatch(changeMessageSendedStatus(data))
                        } else {
                            dispatch(changeClientMessagePosition({ 'message': data }))
                            dispatch(pushNewMessageOnConversations(data));
                        }
                    } else if (data.autorisation === false) {
                        dispatch(messageSendError(data.messages))
                        if (data.sub_type && data.sub_type === 'Gift') {
                            dispatch(showNotificationBox('votre solde est insufisant'))
                        } else {
                            this.setState({ purchasseBox: true })
                        }
                    }
                } else if (data.status === 200 && data.message_type == 'media') {
                    dispatch(displayMedia(data))
                } else if (data.status === 200 && data.message_type === 'incognito') {
                    if (data.sub_type === 'send_message') {
                        dispatch(createIncognitoMessagesSlice(data.payload));
                    } else if (data.sub_type === 'stop_message') {
                        dispatch(deleteIncognitoChat(data));
                    }
                } else if (data.status === 200 && data.data && data.data.data_type === 'notifications') {
                    if (data.data.sub_type === 'NEW_FOLLOWING_REQUEST') {
                        dispatch(change_has_request_viewer({ 'user_id': data.data.user_data.user_id }))
                    }
                }
            })
            this.state.ws.onError = (event) => {
                console.log('une erreur s\'est produite');
            }
        }, [this.state.ws]);
        return null
    }

    setWs = (ws) => {
        this.setState({ ws: ws });
        /*update message when new arived websocket*/
        ws.addEventListener("message", (event) => {
            const data = JSON.parse(event.data)
            if (this.state.Inbox.list.length > 0) {
                if (data.status === 200 && data.message_type === 'text') {
                    console.log(data);
                    if (data.autorisation === true) {
                        this.updateList(data.messages)
                    } else if (data.autorisation === false) {
                        this.setState({ purchasseBox: true })
                    }
                } else if (data.status === 200 && data.message_type === 'update_message_to_view') {
                    const list = this.state.Inbox;
                    const message_list = list.list;
                    const objIndex = message_list.findIndex((message_list => +message_list.sender_id === +data.data.client_id));
                    message_list[objIndex].status = 1;
                    this.setState({ Inbox: list })
                    /*navbar statistiques*/
                    const stats = this.state.stats.slice();
                    stats[0].inbox = data.data.count
                    this.setState({ stats: stats });
                }
            }

            if (data.status === 200 && data.message_type === 'new_connexion') {
                /*change status of user to online*/
                if (this.state.list.length > 0) {
                    const user_list = this.state.list.slice();
                    const findIndex = user_list.findIndex((user_list => +user_list.user_id === data.user_id));
                    if (findIndex > 0) {
                        user_list[findIndex].online_status = true;
                        this.setState({ list: user_list });
                    }
                }
            } else if (data.status === 200 && data.message_type === 'notifications') {
                if (data.data.notification_type === 'PROCESS_COMPLETE') {
                    this.setState({ AllAlert: data.data });
                }
            }
        })
    }

    updateContacts = (data) => {
        this.setState({ Contacts: data.users })
    }

    /* update le message du chat list bar en vue dans chat.jsx*/
    setToView = (id) => {
        const message_list2 = this.state.Inbox.slice();
        const objIndex = message_list2[0].findIndex((message_list2 => message_list2.client_id === +id));
        if (message_list2[0][objIndex].status != 1) {
            message_list2[0][objIndex].status = 1
            this.setState({ Inbox: message_list2 });
        }
    }

    setFilter = async (e) => {
        this.setState({ modalFiltre: false });
    }
    ClosePurchasseBox = () => {
        this.setState({ purchasseBox: false })
    }
    onHide = () => {
        this.setState({ AllAlert: undefined })
    }

    render() {
        const background = this.props.location.state && this.props.location.state.background;
        return (
            <Provider store={store}>
                {this.state.Page_Loading ?
                    <Loading />
                    :
                    <>
                        {this.state.is_actived ?
                            <>
                                <this.newWebsocket />
                                <Navbar logo={this.state.logo}
                                />
                                <Alert />
                                <BottomAlert />
                                {this.state.AllAlert &&
                                    <div className="popup-container invite-wrapper">

                                        <div className="content nonblocking blured top-chat-invites-enabled opened">
                                            <div className="alert-wrapper">
                                                <div className="invite Fdo Aic ">
                                                    <div className="Fdo Aic Lns Bsj">
                                                        {this.state.AllAlert.message}
                                                    </div>
                                                    <div className="Fdo close">
                                                        <div className='Fdo Aic' onClick={this.onHide}><Close size={32} /></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {this.state.purchasseBox &&
                                    <PurchasseJeton open={this.state.purchasseBox} close={this.ClosePurchasseBox} />
                                }


                                <Routes location={background || location}>

                                    <Route path="/" element={<Outlet />}>
                                        <Route index element={
                                            <Container>

                                                <Sidebar Contacts={this.state.Contacts} updateContacts={this.updateContacts} />
                                                <Home websocket={this.state.ws}
                                                    BtnFilter={
                                                        <div className="Fdo Anv">
                                                            <div className="page Fdo  Igw0E  IwRSH   eGOV_    _4EzTm Cxfa">
                                                                <Link className="page ElL Ngt" to="" onClick={() => this.setState({ modalFiltre: true })}>
                                                                    <div className="Fdo   Igw0E   rBNOH  eGOV_   ybXk5    _4EzTm Lsy LDv ApE" style={{ right: 30 }}>
                                                                        <div className="page _4EzTm ovd Vgd a1C" style={{ bottom: 20 }}>
                                                                            <div className=" LCR Fdo Lns Aic Fbd BjN" style={{ width: "36px", height: "36px" }}>
                                                                                <svg width="24" height="24" className="sFc tlK" viewBox="0 0 32 32" fill="#000000"><g><path d="M 27,6L 24,6 c0-1.104-0.896-2-2-2l-2,0 C 18.896,4, 18,4.896, 18,6L 5,6 C 4.448,6, 4,6.448, 4,7C 4,7.552, 4.448,8, 5,8L 18,8 c0,1.104, 0.896,2, 2,2l 2,0 c 1.104,0, 2-0.896, 2-2l 3,0 C 27.552,8, 28,7.552, 28,7C 28,6.448, 27.552,6, 27,6z M 22,8l-2,0 L 20,6 l 2,0 L 22,8 zM 27,14L 14,14 c0-1.104-0.896-2-2-2L 10,12 C 8.896,12, 8,12.896, 8,14L 5,14 C 4.448,14, 4,14.448, 4,15C 4,15.552, 4.448,16, 5,16L 8,16 c0,1.104, 0.896,2, 2,2l 2,0 c 1.104,0, 2-0.896, 2-2l 13,0 C 27.552,16, 28,15.552, 28,15C 28,14.448, 27.552,14, 27,14z M 12,16L 10,16 L 10,14 l 2,0 L 12,16 zM 27,22L 20,22 c0-1.104-0.896-2-2-2L 16,20 c-1.104,0-2,0.896-2,2L 5,22 C 4.448,22, 4,22.448, 4,23 C 4,23.552, 4.448,24, 5,24L 14,24 c0,1.104, 0.896,2, 2,2l 2,0 c 1.104,0, 2-0.896, 2-2l 7,0 c 0.552,0, 1-0.448, 1-1 C 28,22.448, 27.552,22, 27,22z M 18,24L 16,24 l0-2 l 2,0 L 18,24 z"></path></g></svg>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    } />
                                                <Filtre modalFiltre={this.state.modalFiltre}
                                                    setModalFiltre={() => this.setState({ modalFiltre: false })}
                                                    setFilter={this.setFilter}
                                                />
                                            </Container>
                                        } />
                                        <Route path="/posts/*" element={
                                            <Container>
                                                <Sidebar Contacts={this.state.Contacts} updateContacts={this.updateContacts} />
                                                <Posts
                                                    c_user={this.state.c_user}
                                                    websocket={this.state.ws}
                                                />
                                            </Container>
                                        } />
                                        <Route path="/inbox/*" element={
                                            <Container>
                                                <Chat setToView={this.setToView}
                                                />
                                            </Container>
                                        } />

                                        <Route path="/create-album" element={
                                            <Container>
                                                <Create session_user={this.state.c_user} websocket={this.state.ws} />
                                            </Container>
                                        } />

                                        <Route path="/settings/*" element={<Settings />} />
                                        <Route path="/account/*" element={<Account session_user={this.state.c_user} />} />
                                        <Route path="/match/:with_id" element={<MatchBox />} />
                                        <Route path="/rencontre" element={
                                            <Container>
                                                <Sidebar Contacts={this.state.Contacts} updateContacts={this.updateContacts} />
                                                <Rencard />
                                            </Container>
                                        }
                                        />
                                        <Route path="/incognito" element={
                                            <Container>
                                                <Sidebar Contacts={this.state.Contacts} updateContacts={this.updateContacts} />
                                                <Incognito />
                                            </Container>
                                        }
                                        />
                                        <Route path="/circle/*" element={
                                            <Container>
                                                <Sidebar Contacts={this.state.Contacts} updateContacts={this.updateContacts} />
                                                <Circle />
                                            </Container>
                                        }
                                        />

                                        <Route path="/:id/*" element={
                                            <Container>
                                                <Sidebar Contacts={this.state.Contacts} updateContacts={this.updateContacts} />
                                                <User />
                                            </Container>
                                        }
                                        />

                                        <Route path="/post/:element_id/*" element={<Single session_user={this.state.c_user}
                                        />}
                                        />
                                        <Route path="explore" element={
                                            <Container>
                                                <Explore />
                                            </Container>
                                        } />

                                        <Route path="/request/*" element={
                                            <Container>
                                                <Sidebar Contacts={this.state.Contacts} updateContacts={this.updateContacts} />
                                                <Request />
                                            </Container>
                                        } />
                                        <Route path="/followers-request" element={
                                            <Container>
                                                <FollowerRequest />
                                            </Container>
                                        } />
                                        <Route path="/create-circle" element={<CreateCircle />} />
                                        <Route path="/discussions/:circle_id/*" element={
                                            <Container>
                                                <Discussions />
                                            </Container>
                                        } />
                                        <Route path="/media/*" element={<MediaTest />} />
                                        <Route path="/photos" element={
                                            <Container>
                                                <Sidebar Contacts={this.state.Contacts} updateContacts={this.updateContacts} />
                                                <Photos />
                                            </Container>
                                        } />
                                        <Route path="404" element={<Error />} />
                                    </Route>
                                </Routes>
                                {background && (
                                    <Routes>
                                        <Route path="post/:element_id/*" element={<Single session_user={this.state.c_user} />}
                                        >
                                        </Route>


                                        <Route path="media/*" element={<MediaTest />} />
                                        <Route path="create-circle" element={<CreateCircle />} />
                                    </Routes>
                                )}
                            </>
                            :
                            <Routes>
                                <Route path="/" element={<ActivatePage />} />
                                <Route path="/options" element={<h1>plus d'opt</h1>} />
                            </Routes>
                        }

                    </>
                }
            </Provider>
        );
    }
}


export default withRouter(AppProvider);
const Alert = () => {
    const dispatch = useDispatch();
    const store = useSelector((store) => store.NotificationBox);
    const closeBox = () => {
        dispatch(closeNotificationBox());
    }
    return <>
        {store.length > 0 &&
            <div className="popup-container invite-wrapper">
                <div className="content nonblocking blured top-chat-invites-enabled opened">
                    <div className="alert-wrapper">
                        <div className="invite Fdo Aic ">
                            <div className="Fdo Aic Lns Bsj">
                                {store}
                            </div>
                            <div className="Fdo close" onClick={closeBox}>
                                <div className='Fdo Aic' ><Close size={32} /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>
}

const BottomAlert = () => {
    const dispatch = useDispatch();
    const store = useSelector((store) => store.AlertBox);
    if (store.message) {
        return <AlertBottom message={store.message} />
    } else {
        return null;
    }
}
