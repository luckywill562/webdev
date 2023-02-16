import React, { Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PeopleIcon } from "../icon/icons";
import { withRouter } from "../util/WithRouter";
const MessageForm = lazy(() => import("./Components/form/MessageForm"));
import Cookies from "js-cookie";
import { Spinner } from "react-bootstrap";
import { newIncognitoClient } from "../redux/IncognitoRedux";
import { MenuCount } from "./Components/Template";
const Incognito = (props) => {
    const [connected, setConnected] = React.useState(false);
    const [search, setSearch] = React.useState(false);
    const dispatch = useDispatch();
    const [client, setClient] = React.useState({
        id: undefined,
        name: undefined,
    })
    const [waiting, setWaiting] = React.useState(false);
    const [interval, setIntval] = React.useState(0);
    const store = useSelector((state) => state);

    const createConnect = () => {
        setSearch(true);
        setIntval(interval + 1)
        let data = {
            data_type: 'message_incognito',
            sub_type: 'search',
            c_user: Cookies.get('s_id'),
            security_token: Cookies.get('isLogedin'),
        };
        store.Util.ws.send(JSON.stringify(data));
    }
    const Stop = () => {
        setConnected(false);
        setSearch(false)
        let data = {
            data_type: 'message_incognito',
            sub_type: 'stop_message',
            c_user: Cookies.get('s_id'),
            security_token: Cookies.get('isLogedin'),
        };
        store.Util.ws.send(JSON.stringify(data));
    }
    React.useEffect(() => {
        if (store.Util.ws) {
            store.Util.ws.addEventListener("message", (event) => {
                const data = JSON.parse(event.data)
                if (data.message_type === 'incognito') {
                    if (data.payload.find_client && !data.payload.waiting) {
                        setSearch(false);
                        setConnected(true)
                        dispatch(newIncognitoClient({ 'user': data.send_vers, 'messages': [] }));
                    } else if (data.payload.waiting && !data.payload.find_client) {
                        /*
                        setSearch(false);
                        setWaiting(true);
                        const sending = setTimeout(() => {
                            createConnect();
                        }, 5000);
                        */
                    }
                } else if (data.message_type === 'incognito' && data.sub_type === "stop_message") {
                    setSearch(false);
                    setConnected(false)
                }
            })
        }
    }, [store.Util.ws])
    return <div className="Fdo aBv FGM nF1 CenterContainer">
        <div className="default-container App" style={{ maxWidth: 540 }}>
            <div className="Fdo Anv">
                <div className="post-card ">
                    <div className="Fdo Lsy LDv Ert Vpe">
                        <div className="Fdo Aic Bsj">
                            <div className="SH1 tlK SMy Vft Bsj">Parler a un inconu</div>
                            <div className="Fdo">
                                {store.IncognitoMessages.user || search || waiting ?
                                    <button className="sqdOP Xdg L3NKy ZIAjV Lbg" onClick={Stop}>Terminer</button>
                                    :
                                    <button className="sqdOP Xdg L3NKy ZIAjV Lbg" onClick={createConnect}>Commencer</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Fdo incognito-messagerie-container sLayout">
                    <div className="container-box messages-wrapper hn33210v">
                        {store.IncognitoMessages.user && store.IncognitoMessages.messages ?
                            <div className="messages-text-container">
                                <div className="conversation-container ">
                                    <div className="Fdo conversation-main">
                                        <div className="Fdo Anv Pap">
                                            {store.IncognitoMessages.messages.map((element, index) => (
                                                <div className="Fdo Anv" key={index}>
                                                    <div className={`Fdo ${element.sended ? "bkfpd7mw" : "eGOV_"}`}>
                                                        {element.medias.length > 0 &&
                                                            <div className="">
                                                                {element.medias.map((media, index) => (
                                                                    <div key={index} className='kb5gq1qc pfnyh3mw hfv  hcukyx3x RpE'>
                                                                        <h1>has media</h1>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        }
                                                        <div className={`Bwt incognito_messege_content ${element.sended ? 'bBA hgf' : 'QOqBd'}`}
                                                            dangerouslySetInnerHTML={{ __html: element.msg }}>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="conversation-footer">
                                        <Suspense fallback="chargement...">
                                            <MessageForm user_id={store.IncognitoMessages.user} />
                                        </Suspense>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="Fdo Anv Bsj Lns Aic v4a">
                                <div className="Fdo Anv Aic">
                                    {search ?
                                        <span>en attente...</span>
                                        : waiting ?
                                            <div className="Fdo">
                                                <Spinner animation='grow' />
                                                <span> en attente</span>
                                            </div>
                                            :
                                            <div>trouver une personne au hasard et parler avec elle</div>
                                    }
                                    <div className="">
                                        {store.IncognitoMessages.user || search || waiting ?
                                            <button className="sqdOP Xdg L3NKy ZIAjV Lbg" onClick={Stop}>Terminer</button>
                                            :
                                            <button className="sqdOP Xdg L3NKy ZIAjV Lbg" onClick={createConnect}>Commencer</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className="Fdo p1c">
            <div className="Fdo  ELG  Pag p1c">
                <MenuCount>
                    <PeopleIcon size={24} />
                </MenuCount>
            </div>
        </div>
    </div>
}
export default withRouter(Incognito)