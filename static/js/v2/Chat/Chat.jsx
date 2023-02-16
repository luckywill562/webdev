import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Outlet, Link } from "react-router-dom";
import Fetch from '../util/Fetch';
import { withRouter } from '../util/WithRouter';
const MessagesList = lazy(() => import('./components/MessageList'));
const Conversation = lazy(() => import('./components/v1.2/Conversation'));
const Welcome = lazy(() => import('./components/Welcome'));
const MediaView = lazy(() => import('./components/ViewBox/MediaView'));
import { useDispatch, useSelector } from 'react-redux';
import { createInboxSlice } from '../redux/InboxRedux';
import { updateInboxState } from '../redux/UtilRedux';
import InfiniteScroll from '../Components/InfiniteScroll';
import { BoxLoading, DropdownContentTemplate } from '../Template/Template';
import { IconCurrency, LoadingXlContent } from '../icon/icons';
import { InboxListLoading } from '../Template/Loading';
import {Dropdown} from "react-bootstrap";
import DropdownCore from '../Components/dropdown/core/DropdownCore'
import CustomToggle from "../Components/dropdown/core/customButtonToggle.jsx";
const Chat = (props) => {
    const dispatch = useDispatch();
    const [pageActive, setpageActive] = React.useState('messages')
    const [state, stateSet] = React.useState({
        page: 0,
    })

    const limit = 10;
    const [inboxLoading, setInboxLoading] = React.useState(false)
    const [inboxNextLoading, setInboxNextLoading] = React.useState(false)
    const store = useSelector((store) => store);
    const List = useSelector((Inbox) => Inbox.InboxList);
    const getInbox = (page, limit) => {

        var formData = new FormData();
        formData.append('url', '/RESTAPI/Chat/inbox');
        formData.append('page', page);
        formData.append('limit', limit);
        formData.append('data_type', 'messages_list')
        Fetch('/inbox', formData, data => {
            if (data.success === 1) {
                if (List.message_list) {
                    const Listslice = List.message_list.slice();
                    Listslice.push(...data.messages.list)
                    dispatch(createInboxSlice({ 'message_list': Listslice, 'has_next_page': data.messages.has_next_page }));
                } else {
                    dispatch(createInboxSlice({ 'message_list': data.messages.list, 'has_next_page': data.messages.has_next_page }));
                }
                setInboxNextLoading(false)
                setInboxLoading(false)
            }
        })
    }
    React.useEffect(() => {
        if (List.length === 0) {
            setInboxLoading(true);
            getInbox(state.page, limit)
        }
        dispatch(updateInboxState(0))
    }, [])


    const inboxPlus = () => {
        const entries = List.message_list;
        const lastmessage = entries[entries.length - 1];
        if (List.message_list.length > 0) {
            var curPage = lastmessage.id;
        } else {
            var curPage = 0;
        }
        setInboxNextLoading(true)
        getInbox(curPage, limit)
        stateSet({ page: curPage })
    }
    const background = props.location.state && props.location.state.mediachat;
    return <React.Fragment>
        <div className='Fdo Bcg Nfb ELG Flk main-app-width Pap'>
            <div className="Fdo messagerie-container sLayout">
                <div className="container-box messages-wrapper">
                    <div className="Fdo messages-listing">
                        <div className="messages-list-wrapper">
                            <div className="messages-list-header">
                                <div className="messages-list-title">messages</div>
                                <div className="Fdo">
                                    <Dropdown >
                                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu as={DropdownCore}>
                                            <DropdownContentTemplate name={'personaliser les messages'}>
                                                <IconCurrency size={18}/>
                                            </DropdownContentTemplate>
                                            <DropdownContentTemplate name={'Autoriser des personnes a m\'envoyer des messages gratuitement'}>
                                                <IconCurrency/>
                                            </DropdownContentTemplate>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className="conversation-list-content">
                                <div className='Fdo Bsj Bsh Ert Vpe Lsy LDv'>
                                    <div className='Fdo Ftg Rav ' >
                                        <div className={`Fdo Aic Cdf Thn mWe Rav pIc ${pageActive === 'messages' ? 'ActiveTab' : ''}`} onClick={() => setpageActive('messages')}>
                                            <div className='Fdo Aic Xdg '> Tous </div>
                                        </div>
                                        <div className={`Fdo Aic Cdf Thn mWe pIc ${pageActive === 'spam' ? 'ActiveTab' : ''}`} onClick={() => setpageActive('spam')}>
                                            <div className='Fdo Aic Xdg '>spam</div>
                                        </div>
                                    </div>
                                </div>
                                <Suspense fallback={
                                    <div className="side-bar-message-wrapper message-scrollabled-list messagerie">
                                        <InboxListLoading />
                                    </div>}>
                                    <div className="side-bar-message-wrapper message-scrollabled-list messagerie">
                                        {inboxLoading ?
                                            /*server chargement*/
                                            <InboxListLoading />
                                            :
                                            <>
                                                {pageActive === 'messages' ?
                                                    <>
                                                        {List.message_list &&
                                                            <InfiniteScroll
                                                                next={inboxPlus}
                                                                next_page={List.has_next_page}
                                                                loading={inboxNextLoading}
                                                                margin="10px"
                                                            >
                                                                {List?.message_list.map((message, index) => (
                                                                    <MessagesList key={message?.id} to={`${message?.client_id}`} index={index} list={List?.message_list} message={message} />
                                                                ))}
                                                            </InfiniteScroll>
                                                        }
                                                        {!inboxLoading && List?.message_list && List?.message_list?.length === 0 &&
                                                            <div className='v2ao Vndf'>
                                                                <p className='mWe'>Nouveau sur tafaray messenger?</p>
                                                                <div className="">
                                                                    Matchez ou inviter une personnes pour pouvoir discuter. Si vous n'avez pas encore de match, vous pouvez
                                                                    utiliser <Link to={`/incognito`} className="mWe">incognito</Link> si vous avez envie de parler avec quelq'un
                                                                </div>
                                                            </div>
                                                        }
                                                    </>
                                                    :
                                                    <div className='v2ao'>
                                                        <p>votre n'avez aucun message dans votre spam</p>
                                                    </div>
                                                }
                                            </>
                                        }

                                    </div>
                                </Suspense>

                            </div>
                        </div>
                    </div>
                    <div className="messages-text-container Dfk">
                        <div className="conversation-container">
                            {store.Util &&
                                <>
                                    <Routes >
                                        <Route path="/" element={<Outlet />}>
                                            <Route index element={<Welcome />} />
                                            <Route path="/:id/*" element={
                                                <Suspense fallback={<LoadingXlContent />}>
                                                    <Conversation client={store?.Util?.ws} c_user={store?.Util?.c_user} />
                                                </Suspense>
                                            } />
                                            <Route path="/settings" element={
                                                <div>paramètres</div>
                                            } />
                                            <Route path='/:id.media' element={
                                                <Suspense fallback={<BoxLoading />}>
                                                    <MediaView />
                                                </Suspense>
                                            } />
                                            <Route path="*" element={<Navigate to="/404" replace />} />
                                        </Route>
                                    </Routes>
                                    {background && (
                                        <Routes>
                                            <Route path='/:id.media' element={
                                                <Suspense fallback={<BoxLoading />}>
                                                    <MediaView />
                                                </Suspense>
                                            } />
                                        </Routes>
                                    )}
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
}
export default withRouter(Chat);




