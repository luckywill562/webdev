import React, { Suspense, lazy } from "react";
import { withRouter } from "../../../util/WithRouter";
import { EditorState } from 'draft-js'
import { EditorContent, trim } from "../../../util/util";
import { useDispatch, useSelector } from "react-redux";
import { UploadOptions } from "../../../util/util";
import Cookies from "js-cookie";
const Form = lazy(() => import("./Form"));
const MessageForm = (props) => {
    const [body, setBody] = React.useState(EditorState.createEmpty())
    const [Medias, setMedias] = React.useState([])
    const [MediasCopy, setMediasCopy] = React.useState([]);
    const store = useSelector((store) => store);
    const dispatch = useDispatch();
    const HandleChange = (e) => {
        setBody(e);
    }
    const HandleChangeMedia = (e) => {
        const content_type = UploadOptions.fileaccepted.split(",");
        for (let index = 0; index < e.target.files.length; index++) {
            let accept = content_type.indexOf(e.target.files[index].type.split("/")[1]);
            if (e.target.files[index].size < UploadOptions.min_size || e.target.files[index].size > UploadOptions.max_size) {
                alert('Le fichier ne doit pas depasser: ' +
                    maxSize.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    }) + 'Mo');
            } else if (!accept) {
                alert('selectionner un fichier de type: jpeg,jpg,png')
            } else {
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
            const mediaArray = [];
            for (let i = 0; i < Medias.length; i++) {
                var reader = new FileReader();
                reader.onload = (e)=>{
                    return mediaArray.push({
                        "media_width": 210,
                        "media_height": 'auto',
                        "media_src": e.target.result,
                        "media_type": Medias[i].type.split('/')[0],
                        'progress': 1,
                    })
                }
                reader.readAsDataURL(Medias[i])
                console.log(mediaArray)
            }
            const fake_ID = Date.now();
            let data = {
                data_type: 'message_incognito',
                sub_type: 'send_message',
                c_user: Cookies.get('s_id'),
                security_token: Cookies.get('isLogedin'),
                client_id: parseInt(props.user_id),
                msg: text,
                fake_ID: fake_ID,
                medias: mediaArray
            };
            store.Util.ws.send(JSON.stringify(data));
            setBody(EditorState.createEmpty())
            setMedias([])
        }
    }
    

    return <div className="Fdo aovydwv3 Vnk Kmm Pap">
        <Suspense fallback={'chargement...'}>
            <Form onChange={HandleChange} editorState={body} textLengt={text.length} image={Medias} imageChange={HandleChangeMedia} sendMessage={sendMessage} deleteImage={deleteImage} ws={store.Util.ws} />
        </Suspense>
        <div className='Fdo  Igw0E   IwRSH    eGOV_   _4EzTm  JI_ht'>
            {text.length || Medias.length > 0 ?
                <button className='wpO6b' style={{ height: "35px", color: "#0095f6", fontWeight: 600 }} onClick={sendMessage}>
                    <div className="QBdPU"> envoyer </div>
                </button>
                :
                <div  className='wpO6b' style={{ color: "#0095f6", opacity: 0.6, fontWeight: 600 }}>
                    <div className="QBdPU"> envoyer </div>
                </div>
            }
        </div>
    </div>
}
export default withRouter(MessageForm)
