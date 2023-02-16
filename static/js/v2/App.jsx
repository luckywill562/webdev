// This is a React Router v6 app
import React, { Suspense, lazy } from "react";
import {
    Routes,
    Route,
    Link,
    Outlet,
    useNavigate,
    Navigate
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import Container from "./Components/Container";
import { withRouter } from "./util/WithRouter";
import { Close } from './icon/icons';
import { closeAlertBox, closeMatchBox, closeNotificationBox, createNextPayload, createPageElement, showAlertBox, showMatchBox, showNotificationBox, updateRequestStats, updateInboxState } from "./redux/UtilRedux";
import { changeConversationClientElement, changeConversationView, changeMessagePosition, changeMessageSendedStatus, changeMessageSendElement, displayMedia, messageSendError, MessageUploadMediaProcess, pushNewMessageOnConversations, setUploadProgress, viewMessage } from "./redux/InboxRedux";
import { AlertBottom, BoxLoading, BtnCloseX, FallbackLoading, ImageGridLoading } from "./Template/Template";
import { createIncognitoMessagesSlice, deleteIncognitoChat } from "./redux/IncognitoRedux";
import { changeUserProfileElement, change_has_request_viewer, websocketChangeLoveButton } from "./redux/UserProfiles";
import { unshiftUserOnList, websocketNewReceivedLove } from "./redux/RequestRedux";
import Websocket from "./util/Websocket";
import Fetch from './util/Fetch'
import Error from "./404/404";
import Loading from "./auth/Loading";
const Rencard = lazy(() => import("./rencard/Rencard"));
const Single = lazy(() => import("./Posts/components/Single"));
const Explore = lazy(() => import("./explore/Explore"));
const Request = lazy(() => import("./Request/Request"));
import Circle from "./circle/Circles";
const CreateCircle = lazy(() => import("./Create/Circle"));
const User = lazy(() => import("./users/User"));
const Incognito = lazy(() => import("./inconigto/Incognito"));
const Home = lazy(() => import('./Home/Home'));
import Posts from './Posts/Posts';
const Chat = lazy(() => import('./Chat/Chat'));
const Create = lazy(() => import("./Create/Album"));
import Settings from "./users/Settings/Settings";
import Account from "./users/account/Balance";
const MediaTest = lazy(() => import("./media/MediaTest"));
const FollowerRequest = lazy(() => import("./users/Followers/FollowerRequest"));
const Photos = lazy(() => import("./Photos/Photos"));
import MyVerticallyCenteredModal from "../Components/modal/modalCore";
import { Button } from "./Components/fields/Fields";
import SingleComment from "./Comments/SingleComment";
const Lists = lazy(() => import("./Contacts/Lists"));
import MyChunkUploader from "./util/uploader";
import { setMediaUploadIndex } from "./redux/UploadMedias";
const SingleAlbum = lazy(() => import("./users/album/SingleAlbum"));
import HasMatchImage from '../../images/has-match.png'
import { AlbumBoxLoading, CardHomeLoading, MessagePageLoading, PostsPageLoading, SingleMediaBox, UserPageLoading } from "./Template/Loading";
import GeneralCondition from "./Page/GeneralCondition";
import { moveCircleIndex, pushnewGroupMessage } from "./redux/CercleRedux";
import Saved from "./Saved/Saved";
import EditAboutUser from "./users/About/EditAboutUser";
import AddCurrency from "./users/Settings/AddCurrency";
import UpgradeAccount from "./users/account/components/UpgradeAccount";
import LikerList from "./Likes/LikerList";
const SingleRencardPost = lazy(() => import("./rencard/Components/SingleRencardPost"));
const Confirm = lazy(() => import("./users/Confirm"));

const App = (props) => {
    const dispatch = useDispatch();
    const mystate = useSelector((store) => store)
    const store = mystate.AlertBox;

    const [state, stateSet] = React.useState({
        c_user: {},
        stats: {},
        Filtre: {},
    })
    const [websocket, setWs] = React.useState(null)
    const [logo, setLogo] = React.useState('');
    const [Page_Loading, setPageLoading] = React.useState(true);
    const [UploadPercent, setUploadPercent] = React.useState({
        texte: '',
        percent: '',
    });
    const [purchasseState, setPurchasseState] = React.useState(false);
    const [Uploader, setUploader] = React.useState(new MyChunkUploader())
    const [autorised, setAuthorised] = React.useState(false)
    const UtilLoad = (ws) => {
        let formData = new FormData();
        formData.append('url', './RESTAPI/util/util');
        Fetch('/', formData, data => {
            if (data.success === 1 && data.status === 200) {
                setLogo(data.assets.logo)
                stateSet({
                    c_user: data.c_user, stats: data.stats, Filtre: data.message
                })
                dispatch(createPageElement({ 'ws': ws, c_user: data.c_user, stats: data.stats, Filtre: data?.message, min_user_content: data?.user_min_profile_content, has_currency: data?.has_currency }));
                setPageLoading(false)
                setAuthorised(true)
            } else if (data.success === 0 && data.status === 422) {
                setPageLoading(false);
                setAuthorised(false)
            }
        })
    }

    React.useEffect(() => {
        dispatch(createNextPayload({ "follower_request": true, "explore_user": false, "posts": false, 'love_request': true, 'user_search': true, 'saved_element': true }))
        dispatch(createPageElement({ 'ws': websocket, c_user: state.c_user, stats: state.stats, Filtre: state.Filtre, has_currency: true }));
    }, [websocket])
    React.useEffect(() => {
        const ws = Websocket((websocket) => setWs(websocket), websocket);
        UtilLoad(ws);
        ws.addEventListener("message", (event) => {
            const data = JSON.parse(event.data)
            if (data.status === 200 && data.data && data.data.data_type === 'CHAT') {
                if (data.data.chat_sub_type === 'update_message_to_seen') {
                    console.log(data?.data)
                    dispatch(viewMessage(data?.data?.payload?.user_id))
                    dispatch(changeConversationView({ message_id: data?.data?.payload?.user_id }))
                } else if (data.data.chat_sub_type === 'chat_media') {
                    dispatch(displayMedia(data?.messages))
                } else if (data?.data?.chat_sub_type === 'message_text') {
                    if (data?.autorisation === true) {
                        if (data?.messages?.from_pool) {
                            dispatch(changeMessageSendElement({ 'message': data }));
                            dispatch(changeMessageSendedStatus(data))
                        } else {
                            dispatch(changeMessagePosition(data?.messages))
                            dispatch(pushNewMessageOnConversations(data));
                        }
                    } else if (data?.autorisation === false) {
                        dispatch(messageSendError(data?.messages))
                        setPurchasseState(true)
                        if (data?.data?.sub_type && data?.data?.sub_type === 'Gift') {
                            dispatch(showNotificationBox('votre solde est insufisant'))
                        } else {
                        }
                    }
                }
            } else if (data.status === 200 && data.message_type === 'incognito') {
                if (data.sub_type === 'send_message') {
                    dispatch(createIncognitoMessagesSlice(data.payload));
                } else if (data.sub_type === 'stop_message') {
                    dispatch(deleteIncognitoChat(data));
                }
            } else if (data.status === 200 && data.data && data.data.data_type === 'notifications') {
                if (data.data.sub_type === 'NEW_FOLLOWING_REQUEST') {
                    dispatch(change_has_request_viewer({ data: data?.data }))
                } else if (data.data.sub_type === 'NEW_MATCH_REQUEST') {
                    dispatch(websocketChangeLoveButton(data.data.payload));
                    dispatch(updateRequestStats(data.data.payload.count))
                    if (data.data.payload && data.data.payload.type === "ACCEPT") {
                        dispatch(changeUserProfileElement({ user_id: data.data.c_user, name: 'has_match_with_viewer' }))
                        dispatch(showMatchBox(data.data.payload.user))
                    }
                }
                else if (data.data.sub_type === 'BLOCAGE') {
                    dispatch(changeUserProfileElement({ user_id: data.data.c_user, name: 'has_blocked_viewer' }))
                    dispatch(changeConversationClientElement({ user_id: data.data.c_user, name: 'has_blocked_viewer' }))
                }
            } else if (data.status === 200 && data.message_type === 'group_conversation') {
                if (data.sub_type === 'message_text') {
                    dispatch(pushnewGroupMessage(data?.data));
                    dispatch(moveCircleIndex(data?.data))
                } else if (data.sub_type === 'seenConversation') {
                    console.log(data)
                }
            }
        })
    }, [])
    React.useEffect(() => {
        if (mystate.Util.ws) {
            mystate.Util.ws.addEventListener("message", (event) => {
                const res = JSON.parse(event.data)
                if (res.status === 200 && res.message_type === 'text' && res.messages.user_id === mystate.Util.c_user.user_id) {
                    if (res.autorisation === true) {
                        dispatch(updateInboxState(res.messages.inbox))
                    }
                }
            })
        }
    }, [mystate.Util]);
    React.useEffect(() => {
        mystate.Util.ws &&
            websocket.addEventListener("message", (event) => {
                const data = JSON.parse(event.data)
                if (data.status === 200 && data.data && data.data.data_type === 'notifications') {
                    if (data.data.sub_type === 'NEW_MATCH_REQUEST') {
                        if (data.data.payload && data.data.payload.type === "LOVE" &&
                            mystate.RequestReceivedList.length == 0 && !mystate.Next_Page.love_request ||
                            data.data.payload.type === "LOVE" && mystate.RequestReceivedList.length > 0) {
                            dispatch(websocketNewReceivedLove(data.data.payload.user));
                        } else if (data.data.payload && data.data.payload.type === 'UNLOVE') {
                            dispatch(unshiftUserOnList(data.data.payload.user.user_id))
                        }
                    }
                }
            })

    }, [mystate.RequestReceivedList, mystate.Next_Page.love_request])

    const uploadProgress = (payload) => {
        setUploadPercent({ texte: payload.texte, percent: payload.percent });
    }
    const completeUpload = (payload) => {
        dispatch(showAlertBox(payload.texte))
    }
    const CloseAlertBottom = () => {
        dispatch(closeAlertBox());
    }

    /*upload mssage media
    React.useEffect(() => {
        mystate.Util.ws &&
            websocket.addEventListener("message", (e) => {
            const data = JSON.parse(e?.data);
            if (data?.status === 200 && data?.data && data?.data?.data_type === 'CHAT' && data?.data?.chat_sub_type === 'message_text'  && data?.messages?.client?.user.user_id === mystate?.Util?.c_user?.user_id) {
                console.log('message')
                if (data?.messages.from_pool && parseInt(data?.messages.media) > 0 && MediasCopy.length > 0) {
                    dispatch(createMessageMediaUploadSlice({ 'media': MediasCopy, uploadIndex: 0, element: data.messages }));
                }
            }
        });
    }, [mystate.Conversations])

    */
    React.useEffect(() => {
        const media = mystate.MessageUploadMediaSlice
        Uploader.on_upload_progress = (progress) => {
            console.log(progress.percentage);
            dispatch(MessageUploadMediaProcess({ messages: media.element, progress: progress.percentage, index: mystate.MessageUploadMediaSlice.uploadIndex }))
        };
        Uploader.on_done = (obj) => {
            console.log(JSON.parse(obj?.responseText))
            dispatch(setUploadProgress({ messages: media.element, index: mystate.MessageUploadMediaSlice.uploadIndex, media: JSON.parse(obj?.responseText).json }))
            dispatch(setMediaUploadIndex())
        };
        if (mystate.MessageUploadMediaSlice.media && mystate.MessageUploadMediaSlice.media[mystate.MessageUploadMediaSlice.uploadIndex]) {
            Uploader.upload_chunked('/api', media.media[media.uploadIndex], null, {
                'media_appartenance': 'message',
                'albumId': media.element.id,
            });
        }
    }, [mystate.MessageUploadMediaSlice.uploadIndex])


    const background = props.location.state && props.location.state.background;
    return <>
        {Page_Loading && autorised === false ?
            <Loading />
            : !Page_Loading && autorised === false ?
                <div className="Fdo Anv">
                    <div className="Fdo Nfb ELG Flk main-app-width Asc Lns">
                        <Routes path="/" element={<Outlet />}>
                            <Route index element={
                                <Suspense fallback={<FallbackLoading />}>
                                    <Confirm />
                                </Suspense>
                            } />
                        </Routes>
                    </div>
                </div>
                : !Page_Loading && !mystate?.Util?.has_currency ?
                    <Container>
                        <AddCurrency />
                    </Container>
                    :
                    <>
                        <Navbar logo={logo} />
                        <Alert />
                        <MatchBox />
                        <UpgradeAccount open={purchasseState} close={() => setPurchasseState(false)} />
                        {UploadPercent.percent && UploadPercent.texte &&
                            <div className="popup-container invite-wrapper">
                                <div className="content nonblocking blured top-chat-invites-enabled opened">
                                    <div className="alert-wrapper">
                                        <div className="invite Fdo Aic ">
                                            <div className="indicator-wrapper ">
                                                <div className="indicator">
                                                    <div className="Fdo Aic start-loading">
                                                        {UploadPercent.percent} %
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="info">
                                                <span className="message">
                                                    <div className="">
                                                        {UploadPercent.texte}
                                                    </div>
                                                </span>
                                            </div>
                                            <div className="Fdo close pmk7jnqg nezaghv5 e712q9ov">
                                                <div className='Fdo Aic' ><Close size={32} /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {store?.message &&
                            <AlertBottom message={store?.message} >
                                <BtnCloseX onClick={CloseAlertBottom} />
                            </AlertBottom>
                        }
                        <Routes location={background || location}>
                            <Route path="/" element={<Outlet />}>
                                <Route index element={
                                    <Container>
                                        <Sidebar />
                                        <div className="aBv FGM nF1 HomeCenterContainer">
                                            <Suspense fallback={<CardHomeLoading />}>
                                                <Home />
                                            </Suspense>
                                        </div>
                                    </Container>
                                } />
                                <Route path="/:id/*" element={
                                    <Container>
                                        <Sidebar />
                                        <Suspense fallback={
                                            <div className="Fdo aBv  nF1 CenterContainer">
                                                <div className="Fdo ELG Anv">
                                                    <div className="Fdo Anv hty Hdt  page">
                                                        <UserPageLoading />
                                                    </div>
                                                </div>
                                            </div>
                                        }>
                                            <User />
                                        </Suspense>
                                    </Container>
                                }
                                />
                                <Route path="/inbox/*" element={
                                    <Container>
                                        <Suspense fallback={<MessagePageLoading />}>
                                            <Chat />
                                        </Suspense>
                                    </Container>
                                } />

                                <Route path="/posts/*" element={
                                    <Container>
                                        <Sidebar />
                                        <Posts />
                                    </Container>
                                } />
                                <Route path="/incognito" element={
                                    <Container>
                                        <Sidebar />
                                        <Suspense fallback={<FallbackLoading />}>
                                            <Incognito />
                                        </Suspense>
                                    </Container>
                                }
                                />
                                <Route path="/media/*" element={
                                    <Suspense fallback={<BoxLoading />}>
                                        <MediaTest />
                                    </Suspense>
                                } />
                                <Route path="/reply" element={
                                    <Suspense fallback={<BoxLoading />}>
                                        <SingleComment />
                                    </Suspense>
                                } />
                                <Route path="/photos" element={
                                    <Container>
                                        <Sidebar />
                                        <div className="Fdo aBv  nF1 CenterContainer FGM">
                                            <Suspense fallback={<ImageGridLoading />}>
                                                <Photos />
                                            </Suspense>
                                        </div>
                                    </Container>
                                } />
                                <Route path="/settings/*" element={
                                    <Settings />
                                } />
                                <Route path="/account/*" element={
                                    <Account />
                                } />
                                <Route path="/rencontre" element={
                                    <Container>
                                        <Sidebar />
                                        <Suspense fallback={<FallbackLoading />}>
                                            <Rencard />
                                        </Suspense>
                                    </Container>
                                } />
                                <Route path="/rencontre/:id" element={
                                    <Container>
                                        <Sidebar />
                                        <Suspense fallback={<FallbackLoading />}>
                                            <SingleRencardPost />
                                        </Suspense>
                                    </Container>
                                } />
                                <Route path="explore" element={
                                    <Container>
                                        <Suspense fallback={<FallbackLoading />}>
                                            <Explore />
                                        </Suspense>
                                    </Container>
                                } />

                                <Route path="/request/*" element={
                                    <Container>
                                        <Sidebar />
                                        <Suspense fallback={<FallbackLoading />}>
                                            <Request />
                                        </Suspense>
                                    </Container>
                                } />
                                <Route path="/create-album" element={
                                    <Suspense fallback={<FallbackLoading />}>
                                        <Container>
                                            <Create setUploadPercent={uploadProgress} completeUpload={completeUpload} />
                                        </Container>
                                    </Suspense>
                                } />
                                <Route path="/followers-request" element={
                                    <Suspense fallback={<FallbackLoading />}>
                                        <Container>
                                            <FollowerRequest />
                                        </Container>
                                    </Suspense>
                                } />
                                <Route path="/circle/*" element={
                                    <Container>
                                        <Sidebar />
                                        <Circle />
                                    </Container>
                                } />

                                <Route path="/contacts" element={
                                    <Container>
                                        <Sidebar />
                                        <Suspense fallback={<FallbackLoading />}>
                                            <Lists />
                                        </Suspense>
                                    </Container>
                                } />
                                <Route path="/album/:id" element={
                                    <Suspense fallback={<BoxLoading />}>
                                        <SingleAlbum />
                                    </Suspense>
                                } />
                                <Route path="/likes/:type/:id" element={
                                    <LikerList />
                                } />
                                <Route path="/reglement" element={
                                    <Container>
                                        <div className="Fdo aBv  nF1  FGM">
                                            <GeneralCondition />
                                        </div>
                                    </Container>
                                } />
                                <Route path="/votes" element={
                                    <Container>
                                        <Sidebar />
                                    </Container>
                                } />
                                <Route path="/saved" element={
                                    <Container>
                                        <Sidebar />
                                        <Saved />
                                    </Container>
                                } />
                                <Route path="/profile/edit" element={
                                    <Container>
                                        <EditAboutUser />
                                    </Container>
                                }></Route>
                                <Route path="404" element={<Error />} />
                                <Route path="*" element={<Navigate to="/404" replace />} />
                            </Route>
                        </Routes>
                        {background && (
                            <Routes>
                                <Route path="post/:element_id" element={
                                    <Suspense fallback={<FallbackLoading />}>
                                        <Single />
                                    </Suspense>
                                }>
                                </Route>
                                <Route path="media/*" element={
                                    <Suspense fallback={<SingleMediaBox />}>
                                        <MediaTest />
                                    </Suspense>
                                } />
                                <Route path="reply" element={
                                    <Suspense fallback={<BoxLoading />}>
                                        <SingleComment />
                                    </Suspense>
                                } />
                                <Route path="likes/:type/:id" element={
                                    <LikerList />
                                } />
                                <Route path="album/:id" element={
                                    <Suspense fallback={<AlbumBoxLoading />}>
                                        <SingleAlbum />
                                    </Suspense>
                                } />
                                <Route path="create-circle" element={
                                    <Suspense fallback={<FallbackLoading />}>
                                        <CreateCircle />
                                    </Suspense>
                                } />
                                <Route path="/rencontre/:id" element={
                                    <Suspense fallback={<FallbackLoading />}>
                                        <SingleRencardPost />
                                    </Suspense>
                                } />
                            </Routes>
                        )}
                    </>
        }
    </>
}

export default withRouter(App);
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
const MatchBox = (props) => {
    const store = useSelector((store) => store);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onMessage = () => {
        navigate(`/inbox/${store.MatchBox.user_id}`);
        dispatch(closeMatchBox());
    }
    return <MyVerticallyCenteredModal
        show={store.MatchBox.user_id ? true : false}
        onHide={() => dispatch(closeMatchBox())}
    >
        {store.MatchBox.user_id &&
            <>
                <div className="Fdo Anv RpE">
                    <div className="Fdo Anv Aic v2ao Vnk">
                        <div className="Fdo" style={{
                            height: 50,
                            width: 320
                        }}>
                            <img style={{ width: '100%' }} src={HasMatchImage} />
                        </div>
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
                                        <img src={store.MatchBox.avatar.x56 ? store.MatchBox.avatar.x56 : store.MatchBox.avatar} className="hty ELG hrt lazyload" />

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
                        <div className="e2ler">vous et {store.MatchBox.first_name}</div>
                        <div className="sqdOP ">Envoyer lui un message maintenant</div>
                    </div>
                    <div className="Fdo Kmm Vnk">
                        <Button onClick={onMessage} variant={`Lbg ELG`}>Message</Button>
                    </div>
                </div>
            </>
        }
    </MyVerticallyCenteredModal>
}

