import React from 'react'
import { withRouter } from 'react-router-dom'
import Cookie from 'js-cookie'
import Fetch from '../../util/async';
import MsgTmp from '../components/MessageTemplate';
import DraftTest from './Drafttest'
import Draft, { EditorState, convertToRaw } from 'draft-js'

class Component extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            client_id: this.props.match.params,
            getConversation: [],
            user: this.props.c_user,
            c_user_id: this.props.c_user.user_id,
            conversation_id: "",
            message_contenu: "",
            client_user: [],
            status: 0,
            avatar_x26: '',
            body: EditorState.createEmpty(),
            image: undefined,
            media_copy: undefined,
            typing: false,
            typingTimeout: 0,
            lasttypingTimeout: 0,
            bodyCopy: 0,
            is_typing: false,
        }
        this.hiddenFileInput = React.createRef(null);
        this.HandleChange = this.HandleChange.bind(this);
    }
    GetConversation = (id) => {
        this.setState({ client_id: id })
        var formData = new FormData();
        formData.append('url', 'RESTAPI/views/getmsg')
        formData.append('client_id', id)
        Fetch('/conversation', formData,
            data => {
                this.setState({ status: +data.status })
                if (data.success === 1) {
                    this.setState({ getConversation: data.messages })
                    this.setState({ client_user: data.client.user })
                    this.setState({ avatar_x26: data.client.user.user_avatar.medium })
                }
            }
        )
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        this.GetConversation(id);
        this.props.client.addEventListener("message", (e) => {
            const data = JSON.parse(e.data);
            if (data.status === 200 && data.message_type == 'text') {
                if (parseInt(data.messages.sender_id) === parseInt(this.state.c_user_id) || this.state.client_user.user_id === data.messages.sender_id) {
                    const msg_list = this.state.getConversation.slice()
                    msg_list.push(data.messages);
                    this.setState({ getConversation: msg_list })
                    if (this.state.media_copy && parseInt(data.messages.sender_id) === parseInt(this.state.c_user_id) && +data.messages.media === 1) {
                        var formData = new FormData()
                        let image = this.state.media_copy;
                        for (let i = 0; i < image.length; i++) {
                            formData.append("file[]", image[i]);
                        }
                        formData.append('message_id', data.messages.id)
                        formData.append('url', './RESTAPI/sendMessage');
                        Fetch('/api/messengerPhoto', formData,
                            (res) => {
                                if (res.status === 200) {
                                    let datas = {
                                        data_type: 'message_image',
                                        c_user: this.state.c_user_id,
                                        client_id: this.props.match.params.id,
                                        security_token: Cookie.get('isLogedin'),
                                        message_id: +res.message_media[0].message_id,
                                        media: JSON.stringify(res.message_media),
                                        subject: data.messages.subject,
                                    }
                                    this.props.client.send(JSON.stringify(datas));
                                }
                            }
                        )
                    }
                }
                if (this.state.client_user.user_id === data.messages.sender_id) {
                    //send an view message
                    let datas = {
                        data_type: 'update_message_to_view',
                        c_user: Cookie.get('s_id'),
                        client_id: this.state.client_user.user_id,
                        security_token: Cookie.get('isLogedin'),
                    }
                    this.props.client.send(JSON.stringify(datas));
                }

            } else if (data.status === 200 && data.message_type == 'media') {
                const list = this.state.getConversation.slice();
                const objIndex = list.findIndex((list => +list.id === data.messages.message_id));
                list[objIndex] = { "subject": data.messages.subject, "id": data.messages.message_id, "sender_id": data.messages.c_user, "avatar_url": "1.jpg", "user_id": data.messages.client_id, "media": "1", "mesmedia": JSON.parse(data.messages.media), "media_process": false, "sended": true }
                this.setState({ getConversation: list });
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
                console.log("une erreur s'est produite");
            }
        });

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.setState({ is_typing: false });
            this.GetConversation(this.props.match.params.id);
        }
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
                        client_id: this.props.match.params.id,
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
                            client_id: this.props.match.params.id,
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
        let contentTxt = convertToRaw(this.state.body.getCurrentContent()).blocks[0].text;
        var arr = convertToRaw(this.state.body.getCurrentContent()).blocks;

        var text = '';
        for (let i = 0; i < arr.length; i++) {
            text += arr[i].text + '\n';
        }

        if (contentTxt.length || this.state.image) {
            this.setState({ media_copy: this.state.image })
            var media = 0;
            if (this.state.image) {
                var media = 1;
            }
            let data = {
                data_type: 'message_text',
                client_id: +this.props.match.params.id,
                msg: text,
                c_user: +this.state.c_user_id,
                security_token: Cookie.get('isLogedin'),
                media: media,
            };
            this.props.client.send(JSON.stringify(data));
            this.setState({ body: EditorState.createEmpty() })
            this.setState({ image: undefined })
        }
    }

    handleKeyBind = (e) => {
        if (e.keyCode === 13 && !e.shiftKey && !(e.metaKey || e.ctrlKey)) {
            return 'send-message';
        } else if (e.keyCode === 13 && e.shiftKey) {
            return 'split-block';
        }
        return Draft.getDefaultKeyBinding(e);
    }

    handleKeyCommand = (command, editorState) => {
        if (command === 'send-message') {
            this.sendMessage()
            return 'handled';
        }
        return 'not-handled';
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
        let contentTxt = convertToRaw(this.state.body.getCurrentContent()).blocks[0].text;
        return (<React.Fragment>
            {this.state.status === 200 ?
                <>
                    <div className="conversation-header messagerie">
                        <div className="S-mcP messagerie">
                            <div className="AjEzM messagerie">
                                <div className="m7ETg messagerie">
                                    <div className=" qF0y9  Igw0E   rBNOH  eGOV_     ybXk5    _4EzTm">
                                        <div className="messagerie _4EzTm ovd">
                                            <span className="_2dbep " style={{
                                                width: "26px",
                                                height: "26px"
                                            }}>
                                                <img src={this.state.avatar_x26} className="hty ELG hrt" />
                                            </span>

                                        </div>
                                        <div className="messagerie qF0y9 Igw0E IwRSH eGOV_ ui_ht  n4cjz ">
                                            <div className="messagerie qF0y9  Igw0E IwRSH eGOV_ ybXk5 _4EzTm">
                                                <div className="messagerie _7UhW9 vy6Bb qyrsm KV-D4 fDxYl">
                                                    {this.state.client_user.first_name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="conversation-main">
                        <div className="Fdo Anv Pap">
                            {this.state.getConversation.map((value, index, elements) => (
                                <MsgTmp key={index} value={value} index={index} list={this.state.getConversation} c_user={this.props.c_user.user_id} src={this.state.avatar_x26} client={this.props.match.params.id} sender_id={value.sender_id} w_socket />
                            ))}

                            {this.state.is_typing && (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        paddingBottom: "1px"
                                    }}
                                >
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

                                    <div className="typing">
                                        <div className="typing__dot"></div>
                                        <div className="typing__dot"></div>
                                        <div className="typing__dot"></div>
                                    </div>

                                </div>
                            )}

                        </div>
                    </div>
                    <div className="conversation-footer">
                        <div className="j83agx80 aovydwv3 pybr56ya f10w8fjw Pap">

                            {!this.state.image ?
                                <div className='pmk7jnqg i09qtzwb j83agx80 taijpn5t bp9cbjyn cgat1ltu tvmbv18p g3zh7qmp flx89l3n mb8dcdod lbhrjshz'>
                                    <div className='qF0y9  Igw0E   IwRSH    eGOV_   _4EzTm  JI_ht'>
                                        <button onClick={this.handlehiddenFileInput} className="wpO6b" style={{ height: 30 }}>photos</button>
                                    </div>
                                    <input className='mkhogb32'
                                        accept="image/*"
                                        type="file" multiple
                                        onChange={this.imageChange}
                                        style={{ display: 'none' }}
                                        ref={this.hiddenFileInput}
                                    />
                                </div>
                                : ''}
                            <DraftTest onChange={this.HandleChange} editorState={this.state.body} textLengt={contentTxt.length} keyBindingFn={this.handleKeyBind} handleKeyCommand={this.handleKeyCommand} image={this.state.image} setImage={this.setImage} />

                            <div className='qF0y9  Igw0E   IwRSH    eGOV_   _4EzTm  JI_ht'>
                                {contentTxt.length || this.state.image ?
                                    <button className='wpO6b' style={{ height: "35px", color: "#0095f6", fontWeight: 600 }} onClick={this.sendMessage}>
                                        <div className="QBdPU">
                                            envoyer
                                        </div>
                                    </button> :
                                    <button type='button' className='wpO6b' style={{ height: "35px" }}>
                                        <div className='QBdPU '>
                                            <svg width="24" height="24" viewBox="0 0 32 32" fill="#ff4477"><g><path d="M 31.984,13.834C 31.9,8.926, 27.918,4.552, 23,4.552c-2.844,0-5.35,1.488-7,3.672 C 14.35,6.040, 11.844,4.552, 9,4.552c-4.918,0-8.9,4.374-8.984,9.282L0,13.834 c0,0.030, 0.006,0.058, 0.006,0.088 C 0.006,13.944,0,13.966,0,13.99c0,0.138, 0.034,0.242, 0.040,0.374C 0.48,26.872, 15.874,32, 15.874,32s 15.62-5.122, 16.082-17.616 C 31.964,14.244, 32,14.134, 32,13.99c0-0.024-0.006-0.046-0.006-0.068C 31.994,13.89, 32,13.864, 32,13.834L 31.984,13.834 z"></path></g></svg>
                                        </div>
                                    </button>}
                            </div>
                        </div>
                    </div>

                </>
                :
                <div>not found</div>
            }
        </React.Fragment>
        )
    }
}
export default withRouter(Component);

