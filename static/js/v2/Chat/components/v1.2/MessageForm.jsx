import React from "react";
import Form from "./Form";
import { withRouter } from "../../../util/WithRouter";
import { EditorState } from 'draft-js'
import { EditorContent, insertText, trim } from "../../../util/util";
import { useDispatch, useSelector } from "react-redux";
import { changeMessagePosition, pushNewMessage } from "../../../redux/InboxRedux";
import { UploadOptions } from "../../../util/util";
import Cookies from "js-cookie";
import SpecialContent from "./SpecialContent";
import { createMessageMediaUploadSlice } from "../../../redux/UploadMedias";
const MessageForm = (props) => {
    const [body, setBody] = React.useState(EditorState.createEmpty())
    const [price, setPrice] = React.useState(0);
    const [Medias, setMedias] = React.useState([])
    const [MediasCopy, setMediasCopy] = React.useState([]);
    const store = useSelector((store) => store);
    const [mediaParams, setMediaParams] = React.useState([]);
    const [SpecialContentOpen, setSpecialContent] = React.useState(false)
    const dispatch = useDispatch();
    const HandleChange = (e) => {
        setBody(e);
        props.setTypingStatus();
    }
    const HandleChangeMedia = (e) => {
        const Params = mediaParams.slice();
        const content_type = UploadOptions.fileaccepted.split(",");
        for (let index = 0; index < e.target.files.length; index++) {
            let accept = content_type.indexOf(e.target.files[index].type.split("/")[1]);
            if (e.target.files[index].size < UploadOptions.min_size || e.target.files[index].size > UploadOptions.max_size) {
                alert('Le fichier ne doit pas depasser: ' +
                    maxSize.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    }) + 'Mo');
            } else if (accept === -1) {
                alert(`selectionner un fichier de type: ${UploadOptions.fileaccepted}`)
            } else {
                Params.push({ 'texte': '', 'confidentiality': 0, 'monetisation': false, 'montant': 0, thumbnail: '', uploadPercent: 0 });
                setMediaParams(Params);
                setMedias([...Medias, ...e.target.files])
            }
        }
    };
    const deleteImage = (id) => {
        const slice = Medias.slice();
        slice.splice(id, 1);
        setMedias(slice)
    }
    const text = trim(EditorContent(body))

    const sendMessage = () => {
        if (text.length > 0 || Medias.length > 0) {
            const fake_ID = Date.now();
            const input = insertText(text)
            const mediaArray = [];
            for (let i = 0; i < Medias.length; i++) {
                mediaArray.push({
                    "media_width": 210,
                    "media_height": 'auto',
                    "media_src": URL.createObjectURL(Medias[i]),
                    "media_type": Medias[i].type.split('/')[0],
                    'progress': 1,
                })
            }
            const copy = { "subject": input, "fakeID": fake_ID, "id": fake_ID, "sender_id": Cookies.get('s_id'), "user_id": props.useParams.id, "media": Medias.length, "sended": true, "mesmedia": mediaArray, "status": 0, "type": "0", process: true }
            const uedeux = { "subject": input, "client_id": props.useParams.id, "id": fake_ID, "client": { "success": 1, "status": 200, "user": props.client }, "status": 0, "sender_id": Cookies.get('s_id'), "sended": true, "online_status": false, "ismedia": false, "conversations": [] }
            dispatch(pushNewMessage(copy));
            dispatch(changeMessagePosition(uedeux));
            MediasCopy.push(...Medias);
            let data = {
                data_type: 'CHAT',
                chat_sub_type: 'message_text',
                client_id: props.useParams.id,
                c_user: Cookies.get('s_id'),
                security_token: Cookies.get('isLogedin'),
                msg: text,
                media: Medias.length,
                type: 0,
                fake_ID: fake_ID,
                price: price,
                gift_id: 0,
            };
            store.Util.ws.send(JSON.stringify(data));
            setBody(EditorState.createEmpty())
            setMedias([])
        }
    }

    React.useEffect(() => {
        store.Util.ws.addEventListener("message", (e) => {
            const data = JSON.parse(e.data);
            console.log(data)
            if (data?.status === 200 && data?.data && data?.data?.data_type === 'CHAT' && data?.data?.chat_sub_type === 'message_text'
                && data?.messages.from_pool && parseInt(data?.messages?.media) > 0 && MediasCopy.length > 0) {
                dispatch(createMessageMediaUploadSlice({ 'media': MediasCopy, uploadIndex: 0, element: data.messages }));
            }
        });
    }, [store.Conversations])

    const SendHeart = () => {
        const fake_ID = Date.now();
        const copy = { "subject": ':special_heart:', "id": fake_ID, "sender_id": Cookies.get('s_id'), "user_id": props.useParams.id, "media": Medias.length, "sended": true, "mesmedia": [], "status": 0, "type": "0", process: true }
        const uedeux = { "subject": ':special_heart:', "client_id": props.useParams.id, "id": fake_ID, "client": {"user": props.client }, "status": 0, "sender_id": Cookies.get('s_id'), "sended": true, "online_status": false, "ismedia": false, "conversations": [] }
        dispatch(pushNewMessage(copy));
        dispatch(changeMessagePosition(uedeux));
        let data = {
            data_type: 'CHAT',
            chat_sub_type: 'message_text',
            client_id: props.useParams.id,
            c_user: Cookies.get('s_id'),
            security_token: Cookies.get('isLogedin'),
            msg: ':special_heart:',
            media: 0,
            fake_ID: fake_ID,
            type: 'HEART',
            price: 0
        };
        store.Util.ws.send(JSON.stringify(data));
    }
    return <>
        {SpecialContentOpen &&
            <SpecialContent setSpecialContent={setSpecialContent} Medias={Medias} deleteImage={deleteImage} imageChange={HandleChangeMedia} price={price} setPrice={setPrice} />
        }
        <Form onChange={HandleChange} client={props.client} editorState={body} textLengt={text.length} image={Medias} imageChange={HandleChangeMedia} sendMessage={sendMessage} deleteImage={deleteImage} ws={store.Util.ws} setSpecialContent={setSpecialContent} />
        <div className='Fdo  Igw0E   IwRSH    eGOV_   _4EzTm  JI_ht'>
            {text.length || Medias.length > 0 ?
                <button className='wpO6b' style={{ height: "35px", color: "#0095f6", fontWeight: 600 }} onClick={sendMessage}>
                    <div className="QBdPU"> envoyer </div>
                </button>
                :
                <button type='button' className='wpO6b' style={{ height: "35px" }} onClick={SendHeart}>
                    <div className='QBdPU '>
                        <svg width="24" height="24" viewBox="0 0 32 32" fill="#ff4477"><g><path d="M 31.984,13.834C 31.9,8.926, 27.918,4.552, 23,4.552c-2.844,0-5.35,1.488-7,3.672 C 14.35,6.040, 11.844,4.552, 9,4.552c-4.918,0-8.9,4.374-8.984,9.282L0,13.834 c0,0.030, 0.006,0.058, 0.006,0.088 C 0.006,13.944,0,13.966,0,13.99c0,0.138, 0.034,0.242, 0.040,0.374C 0.48,26.872, 15.874,32, 15.874,32s 15.62-5.122, 16.082-17.616 C 31.964,14.244, 32,14.134, 32,13.99c0-0.024-0.006-0.046-0.006-0.068C 31.994,13.89, 32,13.864, 32,13.834L 31.984,13.834 z"></path></g></svg>
                    </div>
                </button>
            }
        </div>
    </>
}
export default withRouter(MessageForm)
