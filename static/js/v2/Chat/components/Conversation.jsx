import React, { Suspense, lazy } from 'react'
import { withRouter } from '../../util/WithRouter';
import Cookie from 'js-cookie'
import Fetch from '../../util/Fetch'
const MsgTmp = lazy(() => import('./MessageTemplate'));
const MessageForm = lazy(() => import('./MessageForm'))
import Draft, { EditorState, convertToRaw } from 'draft-js'
import Chose from './Chose'
import ConversationTime from './ConversationTime'
import { trim, EditorContent } from '../../util/util';
import { LoadingXlContent } from '../../icon/icons'
import { Link } from 'react-router-dom';
import { DropdownContentTemplate } from '../../Template/Template'
import { Navigate } from "react-router-dom";
class Component extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            client_id: this.props.useParams.id,
            getConversation: [],
            user: this.props.c_user,
            c_user_id: Cookie.get('s_id'),
            conversation_id: "",
            message_contenu: "",
            client_user: [],
            status: 200,
            avatar_x26: '',
            body: EditorState.createEmpty(),
            image: undefined,
            media_copy: undefined,
            typing: false,
            typingTimeout: 0,
            lasttypingTimeout: 0,
            bodyCopy: 0,
            is_typing: false,
            loadingConversation: false,
        }

        this.hiddenFileInput = React.createRef(null);
        this.HandleChange = this.HandleChange.bind(this);
    }
    GetConversation = (id) => {
        this.setState({ client_id: id })
        const visited = this.props.conversationList.slice();
        const findIndex = visited.findIndex((visited => visited.client.user.user_id === id));
        if (findIndex < 0) {
            this.setState({ loadingConversation: true });
            var formData = new FormData();
            formData.append('url', 'RESTAPI/Chat/getMessages')
            formData.append('client_id', id)
            Fetch('/conversation', formData, data => {
                this.setState({ status: +data.status, loadingConversation: false })
                if (data.success === 1) {
                    const list = data.conversation.messages;
                    this.setState({
                        getConversation: list,
                        client_user: data.conversation.client.user,
                        avatar_x26: data.conversation.client.user.user_avatar.medium,
                        loadingConversation: false
                    })
                    this.props.getConversation(data, id);
                }
            })
        } else {
            const messages = visited[findIndex];
            this.setState({
                getConversation: messages.messages,
                client_user: messages.client.user,
                avatar_x26: messages.client.user.user_avatar.medium,
            })
        }
    }
    componentDidMount() {
        const id = this.props.useParams.id;
        this.GetConversation(id);
        //this.UpdateView(id)
        //  this.props.setToView(id);
        this.props.client.addEventListener("message", (e) => {
            const data = JSON.parse(e.data);
            if (data.status === 200 && data.message_type == 'text') {
                if (data.autorisation === true) {
                    this.props.updateMessages(data.messages, this.state.client_user)
                } else if (data.autorisation === false) {
                    console.log('ajouter plus de tune')
                }
                if (parseInt(data.messages.sender_id) === parseInt(this.state.c_user_id) || this.state.client_user.user_id === data.messages.sender_id) {
                    const msg_list = this.state.getConversation.slice()
                    msg_list.push(data.messages);
                    this.setState({ getConversation: msg_list })
                   // this.props.updateMessages(data.messages, this.state.client_user)
                    if (this.state.media_copy && parseInt(data.messages.sender_id) === parseInt(this.state.c_user_id) && +data.messages.media === 1) {
                        var formData = new FormData()
                        let image = this.state.media_copy;
                        for (let i = 0; i < image.length; i++) {
                            formData.append("file[]", image[i]);
                        }
                        formData.append('message_id', data.messages.id)
                        formData.append('url', './RESTAPI/Chat/uploadFiles');
                        Fetch('/api', formData,
                            (res) => {
                                if (res.status === 200) {
                                    let datas = {
                                        data_type: 'message_image',
                                        c_user: this.state.c_user_id,
                                        client_id: this.props.useParams.id,
                                        security_token: Cookie.get('isLogedin'),
                                        message_id: +res.message_media[0].message_id,
                                        media: JSON.stringify(res.message_media),
                                        subject: data.messages.subject,
                                        created_time: data.messages.created_time,
                                        type: 1
                                    }
                                    this.props.client.send(JSON.stringify(datas));
                                }
                            }
                        )
                    }
                }
                if (this.state.client_user.user_id === data.messages.sender_id) {
                    //si l'utilisateur est en conversation avec le client set le message to view
                    this.UpdateView(this.state.client_user.user_id)
                }

            } else if (data.status === 200 && data.message_type == 'media') {
                const list = this.state.getConversation.slice();
                const objIndex = list.findIndex((list => list.id === data.messages.id));
                if (objIndex > -1) {
                    list[objIndex] = data.messages;
                    this.setState({ getConversation: list });
                }
            } else if (data.status === 200 && data.message_type === 'message_typing' && data.client_id === this.state.client_user.user_id) {
                this.setState({ is_typing: true });
            } else if (data.status === 200 && data.message_type === 'message_stop_typing' && data.client_id === this.state.client_user.user_id) {
                this.setState({ is_typing: false });
            } else if (data.status === 200 && data.message_type === 'update_message_to_view' && data.client_id === this.state.client_user.user_id) {
                const arry = this.state.getConversation.slice();
                for (let index = 0; index < arry.length; index++) {
                    const element = arry[index];
                    //change le message en vue
                    if (element.status === 0) {
                        element.status = 1;
                    }
                }
                this.setState({ getConversation: arry });
            } else if (data.status === 500) {
                console.log(data);
            }
        });
    }

    UpdateView = (client_id) => {
        let datas = {
            data_type: 'update_message_to_view',
            c_user: Cookie.get('s_id'),
            client_id: client_id,
            security_token: Cookie.get('isLogedin'),
        }
        this.props.client.send(JSON.stringify(datas));
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.useParams.id !== prevProps.useParams.id) {
            this.setState({ is_typing: false });
            this.GetConversation(this.props.useParams.id);
            // this.UpdateView(this.props.useParams.id)
        }
    }
    componentWillUnmount() {
        this.state.client_user.user_id = 0;
    }

    HandleChange = (e) => {
        let contentTxt = convertToRaw(this.state.body.getCurrentContent()).blocks[0].text
        const self = this;
        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }
        if (contentTxt.length > 0 && self.state.typingTimeout > self.state.lasttypingTimeout && this.state.typing === false && contentTxt.length > self.state.bodyCopy) {
            this.setState({ typing: true },
                () => {
                    let datas = {
                        data_type: 'message_typing',
                        c_user: this.state.c_user_id,
                        client_id: this.props.useParams.id,
                        security_token: Cookie.get('isLogedin'),
                        typing: true,
                    }
                    this.props.client.send(JSON.stringify(datas));
                })
        }
        self.setState({
            body: e,
            typingTimeout: setTimeout(() => {
                this.setState({
                    lasttypingTimeout: self.state.typingTimeout,
                }, () => {
                    if (self.state.typing) {
                        let datas = {
                            data_type: 'message_typing',
                            c_user: this.state.c_user_id,
                            client_id: this.props.useParams.id,
                            security_token: Cookie.get('isLogedin'),
                            typing: false,
                        }
                        this.props.client.send(JSON.stringify(datas));
                    }
                    this.setState({ typing: false, bodyCopy: contentTxt.length });
                });

            }, 1000)
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.sendMessage();
    }
    sendMessage = async () => {
        let text = trim(EditorContent(this.state.body));
        if (text.length || this.state.image) {
            this.setState({ media_copy: this.state.image })
            var media = 0;
            if (this.state.image) {
                var media = 1;
            }
            let data = {
                data_type: 'message_text',
                sub_type: 'message',
                client_id: +this.props.useParams.id,
                msg: text,
                c_user: +this.state.c_user_id,
                security_token: Cookie.get('isLogedin'),
                media: media,
                type: 0
            };
            this.props.client.send(JSON.stringify(data));
            this.setState({ body: EditorState.createEmpty() })
            this.setState({ image: undefined })
        }
    }
    SendHeart = () => {
        let data = {
            data_type: 'message_text',
            client_id: +this.props.useParams.id,
            msg: ':special_heart:',
            c_user: +this.state.c_user_id,
            security_token: Cookie.get('isLogedin'),
            media: 0,
        };
        this.props.client.send(JSON.stringify(data));
    }

   
    imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            this.setState({ image: e.target.files });
        }
    };

    setImage = (image) => {
        this.setState({ image: image })
    }

    handlehiddenFileInput = event => {
        this.hiddenFileInput.current.click();
    };

    render() {
        var arr = convertToRaw(this.state.body.getCurrentContent()).blocks;
        var text = '';
        for (let i = 0; i < arr.length; i++) {
            text += arr[i].text + '\n';
        }
        return (
            <Suspense fallback={<LoadingXlContent />}>
                <React.Fragment>
                    {this.state.loadingConversation ?
                        <LoadingXlContent />
                        :
                        <>
                            {this.state.status === 200 ?
                                <>
                                    <div className="conversation-header messagerie">
                                        <div className="S-mcP messagerie">
                                            <div className="AjEzM messagerie">
                                                <div className="m7ETg messagerie">
                                                    <div className=" Fdo  Igw0E   rBNOH  eGOV_     ybXk5    _4EzTm">
                                                        <div className="messagerie _4EzTm ovd">
                                                            <span className="_2dbep " style={{
                                                                width: "26px",
                                                                height: "26px"
                                                            }}>
                                                                <img src={this.state.avatar_x26} className="hty ELG hrt" />
                                                            </span>
                                                        </div>
                                                        <div className="messagerie Fdo Igw0E IwRSH eGOV_ ui_ht  n4cjz ">
                                                            <div className="messagerie Fdo  Igw0E IwRSH eGOV_ ybXk5 _4EzTm">
                                                                <div className="messagerie _7UhW9 vy6Bb qyrsm KV-D4 fDxYl">
                                                                    <Link className='_7UhW9   xLCgt  KV-D4    fDxYl' to={`/${this.state.client_user.username}`}>
                                                                        <span className='sqdOP  ZIAjV '>
                                                                            {this.state.client_user.first_name}
                                                                        </span>
                                                                    </Link>
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

                                            {this.state.getConversation.map((value, index, elements) => (
                                                <div className='Fdo Anv' key={index}>
                                                    {//<ConversationTime index={index} list={this.state.getConversation} />
                                                    }
                                                    <MsgTmp value={value} index={index} list={this.state.getConversation} c_user={this.props.c_user.user_id} src={this.state.avatar_x26} client={this.props.useParams.id} sender_id={value.sender_id} w_socket />
                                                </div>
                                            ))}
                                            {this.state.is_typing && (
                                                <div className='Fdo' style={{
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
                                                        <img className="hty ELG hrt" src={this.state.avatar_x26} />
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

                                        <Suspense fallback={<p>chargement</p>}>
                                            <div className="Fdo aovydwv3 Vnk Kmm Pap">
                                                {!this.state.image ?
                                                    <div className='RpE i09qtzwb Fdo Lns Aic yC0tu tvmbv18p g3zh7qmp flx89l3n mb8dcdod lbhrjshz'>
                                                        <Chose>
                                                            <DropdownContentTemplate name="photos ou videos" onClick={this.handlehiddenFileInput}>
                                                                <svg width="24" height="24" className="sFc" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"></circle><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                                            </DropdownContentTemplate>
                                                        </Chose>
                                                    </div>
                                                    : ''}
                                                <MessageForm onChange={this.HandleChange} editorState={this.state.body} textLengt={trim(text).length} image={this.state.image} setImage={this.setImage} imageChange={this.imageChange} client_id={this.state.client_id} client={this.props.client} sendMessage={this.sendMessage}/>

                                                <div className='Fdo  Igw0E   IwRSH    eGOV_   _4EzTm  JI_ht'>
                                                    {trim(text).length || this.state.image ?
                                                        <button className='wpO6b' style={{ height: "35px", color: "#0095f6", fontWeight: 600 }} onClick={this.sendMessage}>
                                                            <div className="QBdPU"> envoyer </div>
                                                        </button>
                                                        :
                                                        <button type='button' className='wpO6b' onClick={this.SendHeart} style={{ height: "35px" }}>
                                                            <div className='QBdPU '>
                                                                <svg width="24" height="24" viewBox="0 0 32 32" fill="#ff4477"><g><path d="M 31.984,13.834C 31.9,8.926, 27.918,4.552, 23,4.552c-2.844,0-5.35,1.488-7,3.672 C 14.35,6.040, 11.844,4.552, 9,4.552c-4.918,0-8.9,4.374-8.984,9.282L0,13.834 c0,0.030, 0.006,0.058, 0.006,0.088 C 0.006,13.944,0,13.966,0,13.99c0,0.138, 0.034,0.242, 0.040,0.374C 0.48,26.872, 15.874,32, 15.874,32s 15.62-5.122, 16.082-17.616 C 31.964,14.244, 32,14.134, 32,13.99c0-0.024-0.006-0.046-0.006-0.068C 31.994,13.89, 32,13.864, 32,13.834L 31.984,13.834 z"></path></g></svg>
                                                            </div>
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        </Suspense>
                                    </div>
                                </>
                                :
                                <Navigate to="/404" replace />
                            }
                        </>
                    }
                </React.Fragment>

            </Suspense>
        )
    }
}
export default withRouter(Component);

