import React, { useEffect, useRef, lazy } from "react";
import { withRouter } from "../../../util/WithRouter";
const Form = lazy(() => import("./Form"));
import Cookies from "js-cookie";
import Fetch from "../../../util/Fetch";
import ConversationTemplate from "./ConversationTemplate";
import { useDispatch, useSelector } from "react-redux";
import { createGroupConversations, seenNewMessageInbox } from "../../../redux/CercleRedux";
import { Suspense } from "react";
import { MultipleAvatar } from "../../Components/Template";
import { isEmpty } from "../../../util/util";
const Responses = (props) => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state);
    const findConversation = store?.GroupConversations.find((element => element?.group.group_id === props.useParams.circle_id))
    useEffect(() => {
        if (!findConversation?.conversations?.length) {
            getData()
        }
    }, [props.useParams.circle_id]);

    let array = findConversation?.conversations;
    React.useEffect(() => {
        if (array) {
            ViewMessage();
        }
    }, [findConversation])
    const ViewMessage = () => {
        if (array) {
            let data = {
                data_type: 'circleDiscussion',
                circle_id: props.useParams.circle_id,
                c_user: Cookies.get('s_id'),
                security_token: Cookies.get('isLogedin'),
                sub_type: 'seenConversation',
                author: store.Util.min_user_content,
                client_id: array[array?.length - 1]?.author.user_id
            }
            store.Util.ws.send(JSON.stringify(data));
            dispatch(seenNewMessageInbox(props.useParams.circle_id))
        }
    }
    const getData = () => {
        var formData = new FormData();
        formData.append('url', '/RESTAPI/Circle/getDiscussions')
        formData.append('group_id', props.useParams.circle_id)
        Fetch('/api', formData, res => {
            if (res?.success === 1 && res?.status === 200) {
                dispatch(createGroupConversations(res?.message));
            } else {
                props.navigate('/404');
            }
        })
    }
    return <div className="Fdo Box-conversation-right hty">
        <div className="Fdo Anv App">
            <div className="conversation-header messagerie">
                <div className="S-mcP messagerie">
                    <div className="AjEzM messagerie">
                        <div className="m7ETg messagerie">
                            <div className="Fdo   Fdo Igw0E   rBNOH  eGOV_  ybXk5    _4EzTm">
                                <div className="page _4EzTm ovd yC0tu">
                                    <MultipleAvatar avatarsize={32} users={findConversation?.group?.members} />
                                </div>
                                <div className="page Fdo  Igw0E     IwRSH  Lns vwCYk">
                                    <div className=' page     qF0y9     Igw0E     IwRSH      eGOV_       acqo5   _4EzTm'>
                                        <div className="_7UhW9 Fdo Aic  mWe xLCgt  KV-D4    fDxYl">
                                            <div className="R19PB">
                                                <span className="_7UhW9   xLCgt   se6yk" dangerouslySetInnerHTML={{ __html: 'blablabla' }}></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Fdo    Igw0E   IwRSH   eGOV_  _4EzTm  ksr   DhRcB ">
                                        <div className="_7UhW9   xLCgt  MMzan   fDxYl  ">
                                            <span className="R19PB">
                                                <span className="_7UhW9   xLCgt  MMzan  se6yk" dangerouslySetInnerHTML={{ __html: 'derniere mise a jour il y a deux heures' }}></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Fdo conversation-main">
                <div className="Fdo Anv Pap">
                    {findConversation?.conversations.map(({ content, author }, index) => (
                        <ConversationTemplate content={content} author={author} key={index} />
                    ))}
                    {array && array[array?.length - 1]?.content.sended ?
                        <div className="Fdo bkfpd7mw">
                            {findConversation?.viewers.map((element) => (
                                <div className="Eho LCR hft RpE " style={{ margin: '4px 2px' }} key={element?.user_id}>
                                    <img src={element?.avatar?.x26} className="hty ELG hrt ApE Udt" />
                                </div>
                            ))}
                        </div>
                        : null}
                </div>
            </div>
            <div className="conversation-footer">
                <div className="Fdo aovydwv3 Vnk Kmm Pap">
                    <Suspense fallback={"chargement"}>
                        <Form />
                    </Suspense>
                </div>
            </div>
        </div>

    </div>
}
export default withRouter(React.memo(Responses));
