import React, { useEffect } from "react";
import { withRouter } from "../../../util/WithRouter";
import Draft, { EditorState, convertToRaw } from 'draft-js'
import Editor from '@draft-js-plugins/editor';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import { EditorContent, trim } from "../../../util/util";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
const emojiPlugin = createEmojiPlugin({
    useNativeArt: true,
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin];
const Form = (props) => {
    const [process, setProcess] = React.useState(false)
    const store = useSelector((state) => state);
    const ws = store.Util.ws;

    const [editorState, seteditorState] = React.useState({
        editor: EditorState.createEmpty(),
    })
    const onChange = (editorState) => {
        seteditorState({ editor: editorState })
    };

    const handleKeyBind = (e) => {
        if (e.keyCode === 13 && !e.shiftKey && !(e.metaKey || e.ctrlKey)) {
            return 'send-message';
        } else if (e.keyCode === 13 && e.shiftKey) {
            return 'split-block';
        }
        return Draft.getDefaultKeyBinding(e);
    }

    const handleKeyCommand = (command, editorState) => {
        if (command === 'send-message') {
            onSend()
            return 'handled';
        }
        return 'not-handled';
    }
    const onSend = () => {

        setProcess(true)
        let data = {
            data_type: 'circleDiscussion',
            circle_id: props.useParams.circle_id,
            content: trim(EditorContent(editorState.editor)),
            c_user: Cookies.get('s_id'),
            security_token: Cookies.get('isLogedin'),
            sub_type: 'newConversation',
            author: store.Util.min_user_content
        }
        if (store.Util.min_user_content) {
            seteditorState({ editor: EditorState.createEmpty() })
            ws.send(JSON.stringify(data));
        }
    }
    return (
        <div className="Fdo buofh1pr RpE">
            <div className='Fdo Anv Bsj'>
                <div className='Fdo Bsj RpE'>
                    <div className='RpE buofh1pr ni8dbmo4 stjgntxs hgsP'>
                        <div className="pmk7jnqg i09qtzwb j83agx80 Lns Aic cgat1ltu tvmbv18p g3zh7qmp flx89l3n mb8dcdod chkx7lpg">
                            <div className="Fdo nhd2j8a9 i09qtzwb Lns Aic yC0tu   g3zh7qmp flx89l3n mb8dcdod chkx7lpg">
                                <div className="Fdo nhd2j8a9 lZJ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="sFc" viewBox="0 0 512 512"><path d="M262.3 199.2c-1.6-2.8-5.6-3.2-7.7-.7l-91.9 122.2c-2.5 2.9-.6 7.4 3.2 7.7l161.1 14c3.8.3 6.4-3.8 4.5-7.1l-69.2-136.1zM367.2 264.1c-1.6-2.8-5.6-3.2-7.7-.7l-24.8 25.1a4.68 4.68 0 0 0-.5 5.4l25.4 49.5c.8 1.3 2.1 2.2 3.7 2.3l44.9 3.9c3.8.3 6.4-3.8 4.5-7.1l-45.5-78.4zM378.1 224.4c11.2-.1 20.9-8.3 23-19.2 2.8-14.8-8.6-28.3-23.7-28.1-11.2.1-20.9 8.3-23 19.2-2.8 14.8 8.6 28.3 23.7 28.1z"></path><path d="M455.2 129.3l-65.8-5.7-6.1-67c-1.3-14.9-14.5-25.9-29.5-24.5L56.7 58.9c-14.9 1.3-25.9 14.5-24.6 29.4l26.8 296.5c1.3 14.9 14.5 25.9 29.5 24.5l15.7-1.4-1.5 16.7c-1.3 14.9 9.7 28 24.7 29.3l297.3 25.9c14.9 1.3 28.1-9.7 29.4-24.6l26-296.6c1.2-14.8-9.8-28-24.8-29.3zM87.6 300.7c-3.7.3-7-2.4-7.4-6.1l-18-200c-.3-3.7 2.4-7 6.1-7.3l279.2-25.1c3.7-.3 7 2.4 7.4 6.1l4.8 52.8L158 103.4c-14.9-1.3-28.1 9.7-29.4 24.6l-14.9 170.3-26.1 2.4zm362.2-135.6l-17.5 200c-.3 3.7-3.6 6.5-7.3 6.2l-18.6-1.6L145.7 347c-3.7-.3-6.5-3.6-6.2-7.3l3.8-43.9L157 139.7c.3-3.7 3.6-6.5 7.3-6.2l198 17.3 29.7 2.6 51.6 4.5c3.8.2 6.6 3.5 6.2 7.2z"></path></svg>
                                </div>
                            </div>
                        </div>
                        <div className='Bsj Fdo flx89l3n dpja2al7 dfr' style={{ transform: `translateX(40px)` }}>
                            <div className='RpE    rq0escxv Bsj hpfvmrgz Text-form form-lg-height' style={{ height: 'auto' }}>
                                <div className='Fdo lhclo0ds bkfpd7mw'>
                                    <div className={`Fdo Bsj nhadk0th   hpfvmrgz  RpE  `} >
                                        <Editor
                                            editorState={editorState.editor}
                                            onChange={onChange}
                                            plugins={plugins}
                                            ref={(element) => {
                                            }}

                                            placeholder={'ajouter une reponse'}
                                            className="post container editor"
                                            keyBindingFn={handleKeyBind}
                                            handleKeyCommand={(e) => handleKeyCommand(e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pmk7jnqg i09qtzwb Fdo Lns Aic cgat1ltu tvmbv18p n7fi1qx3">
                        <EmojiSelect />
                    </div>
                    <EmojiSuggestions />
                </div>
            </div>
        </div >
    )
}

export default withRouter(React.memo(Form))