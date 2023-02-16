import React from "react";
import { withRouter } from "../../util/WithRouter";
import Draft, { EditorState, convertToRaw } from 'draft-js'
import Editor from '@draft-js-plugins/editor';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import { trim, UploadOptions } from "../../util/util";
import { PhotosIcon } from "../../icon/icons";
import { ElementTitle, MediaPreview } from "../../Template/Template";
import { Button } from "../../Components/fields/Fields";
import Input from "../../auth/Fields";
import { EditorContent } from "../../util/util";
import Fetch from "../../util/Fetch";
const emojiPlugin = createEmojiPlugin({
    useNativeArt: true,
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin];
const hiddenFileInput = React.createRef(null);
const CreateSubjectmemo = (props) => {
    const [editorState, seteditorState] = React.useState({
        editor: EditorState.createEmpty(),

    })
    const [mediaState, setMediaState] = React.useState({
        media: [],
    })
    const [process, setProcess] = React.useState(false)

    const onChange = (editorState) => {
        seteditorState({ editor: editorState })
    };
    const [title, setTitle] = React.useState('');
    const changeTitle = (e) => {
        setTitle(e.target.value)
    }
    const focus = () => {
        this.editor.focus();
    };

   
    const imageChange = (e) => {
        for (let index = 0; index < e.target.files.length; index++) {
            let accept = UploadOptions.fileaccepted.includes(e.target.files[index].type);
            if (e.target.files[index].size < UploadOptions.min_size || e.target.files[index].size > UploadOptions.max_size) {
                console.log('Le fichier ne doit pas depasser: 3Mo');
            } else if (!accept) {
                console.log('selectionner un fichier de type: jpeg,jpg,png')
            }
            else {
                setMediaState({ media: [...mediaState.media, ...e.target.files] })
            }
        }
    }
    const deleteImagePreviewer = (id) => {
        const media = mediaState.media.slice();
        media.splice(id, 1);
        setMediaState({ media });
    }
    const handlehiddenFileInput = event => {
        hiddenFileInput.current.click();
    };
    const HandleSubmit = () => {
        setProcess(true)
        var formData = new FormData();
        formData.append('url','./RESTAPI/Circle/CreateSubject');
        formData.append('title', trim(title));
        formData.append('content', trim(EditorContent(editorState.editor)));
        formData.append('circle_id', props.useParams.circle_id)
        Fetch('/api', formData, (res) => {
            console.log(res);
            setProcess(false)
        })
    }

    return (
        <div className="Fdo Anv">
            <div className="Fdo Anv Bsj RpE">
                <ElementTitle>Titre du sujet </ElementTitle>
                <Input placeholder={`ajouter un titre`} type={`text`} value={title} name={`subject_title`} onChange={changeTitle}/>
            </div>
            <div className='Fdo Anv Bsj'>
                <ElementTitle>Description du sujet (facultatif)</ElementTitle>
                <div className='Fdo Bsj RpE'>
                    <div className='RpE Bsj ni8dbmo4 stjgntxs'>
                        <div className='Bsj Fdo flx89l3n dpja2al7 dfr'>
                            <div className='RpE    rq0escxv Bsj hpfvmrgz Text-form' style={{ minHeight: 90,height:'auto' }}>
                                <div className='Fdo lhclo0ds bkfpd7mw'>
                                    <div className={`Fdo Bsj nhadk0th   hpfvmrgz  RpE  `} >
                                        <Editor
                                            editorState={editorState.editor}
                                            onChange={onChange}
                                            plugins={plugins}
                                            ref={(element) => {
                                            }}
                                            placeholder={'ajouter une description(facultatif)'}
                                            className="post container editor"
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
            <div className='Fdo Aic kzZ jifvfom9 pybr56ya d76ob5m9 k4urcfbm rq0escxv'>
                <MediaPreview mediaState={mediaState} clickEvent={(id) => deleteImagePreviewer(id)} />
            </div>
            <div className='Fdo'>
                <div className='Fdo Aic Bsj'>
                    <div className='page _4EzTm ovd yC0tu Vgd'>
                        <div onClick={handlehiddenFileInput} className="bBB LCR Fdo Lns Aic" style={{ height: 36, width: 36 }}>
                            <PhotosIcon size={24} />
                        </div>
                    </div>
                </div>
                <input className='mkhogb32'
                    accept={UploadOptions.fileaccepted}
                    type="file"
                    multiple
                    onChange={imageChange}
                    style={{ display: 'none' }}
                    ref={hiddenFileInput}
                />
            </div>
            <div className="Fdo page Vnk">
                <Button isLoading={process} onClick={HandleSubmit} variant={`_Dvgb ELG`}>Créer</Button>
            </div>
        </div>
    )
}

const CreateSubject = React.memo(CreateSubjectmemo);
export default withRouter(CreateSubject)