import React, { Component, lazy } from 'react';
import Draft, { EditorState, convertToRaw } from 'draft-js'
import Editor from '@draft-js-plugins/editor';
import createEmojiPlugin from '@draft-js-plugins/emoji';
const emojiPlugin = createEmojiPlugin({
    useNativeArt: true,
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin];
import Fetch from '../util/Fetch';
import { closeAlertBox, showAlertBox } from "../redux/UtilRedux";
import { EditorContent, trim, UploadOptions } from '../util/util';
import { PhotoIconAlt, PhotosIcon } from '../icon/icons';
import { onInputFile, MediaPreview, ModalConfidentiality } from './components/preview';
import { useDispatch } from 'react-redux';
import MyChunkUploader from '../util/uploader';

const CreatePost = (props) => {
    const [Uploader, setUploader] = React.useState(new MyChunkUploader())
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
    var text = EditorContent(editorState);
    const [Medias, setMedias] = React.useState([]);
    const [uploaded, setUploaded] = React.useState(0);
    const [errorMesage, setErrorMessage] = React.useState({})
    const [mediaParams, setMediaParams] = React.useState([]);
    const [Confidentiality, setConfidentiality] = React.useState(1)
    const [ModalConfident, setModalConfident] = React.useState(false)
    const hiddenFileInput = React.createRef(null);
    const [PostId, setPostId] = React.useState(undefined);
    const editor = React.createRef(null)
    const [process, setProcess] = React.useState(false);
    const dispatch = useDispatch()
    const handlehiddenFileInput = event => {
        hiddenFileInput.current.click();
    };
    const focus = () => {
        editor.current.focus();
    };
    const onChange = (editorState) => {
        setEditorState(editorState)
    };
    const imageChange = (e) => {
        onInputFile(setErrorMessage, e, mediaParams, Medias, setMediaParams, setMedias)
        hiddenFileInput.current.value = '';
    }
    const DeleteImage = (index) => {
        const Params = mediaParams.slice();
        const media = Medias.slice();
        media.splice(index, 1);
        setMedias(media);
        Params.splice(index, 1);
        setMediaParams(Params)
    }
    const handleChangeConfidentiality = (btn) => {
        setConfidentiality(btn);
        setModalConfident(false)
    }
    Uploader.on_error = (object, err_type) => {
        dispatch(showAlertBox({ 'message': 'une erreur s\'est produite lors de l\'upload' }))
    };

    Uploader.on_abort = function (object) {
        console.log('action avorter')
    };

    Uploader.on_upload_progress = (progress) => {
        const Params = mediaParams.slice();
        Params[uploaded].uploadPercent = progress.percentage;
        setMediaParams(Params)
    };
    Uploader.on_done = (obj) => {
        setUploaded(uploaded + 1);
    };
    React.useEffect(() => {
        setTimeout(() => {
            onUpload(PostId);
        }, 1);
    }, [uploaded])

    const onUpload = (postId) => {
        if (Medias.length > 0 && Medias[uploaded]) {
            Uploader.upload_chunked('/api', Medias[uploaded], null, {
                'media_appartenance': 'post',
                'params': JSON.stringify(mediaParams[uploaded]),
                'albumId': postId
            });
        } else if (Medias.length > 0 && !Medias[uploaded]) {
            dispatch(showAlertBox({ 'message': 'votre contenu est prète' }))
            setProcess(false)
            setMedias([]);
            setMediaParams([])
            new MyChunkUploader();
        }
    }

    const createPost = async () => {
        setProcess(true);
        if (Medias.length > 0 && Confidentiality > 0 && !process || trim(text).length > 0 && Confidentiality > 0 && !process) {
            var formData = new FormData()
            formData.append('url', './RESTAPI/Status/new');
            formData.append('params', JSON.stringify(mediaParams))
            formData.append('post_content', trim(text));
            formData.append('security', Confidentiality);
            Fetch('/api', formData, (res) => {
                if (res.success === 1) {
                    setPostId(res.postId);
                    if(Medias.length > 0){
                        dispatch(showAlertBox({ 'message': 'votre publication a été créer, upload des medias en cours...' }))
                        onUpload(res.postId)
                    }else{
                        dispatch(showAlertBox({ 'message': 'votre publication a été créer' }))
                    }
                    setTimeout(() => {
                        dispatch(closeAlertBox());
                    }, 1000);
                } else {
                    dispatch(showAlertBox({ res }));
                }
                setProcess(false)
            })
        } else {
            alert('ajouter une image ou une video');
        }
    }
    return <div className='Fdo Anv Ert tw6a2znq vcx Kmm'>
        <div className='Fdo'>
            <div className='page  _4EzTm yC0tu'>
                <div className='_2dbep nmjy' style={{ height: 56, width: 56 }}>
                    <img className='hty ELG hrt lazyload' data-src={props.c_user.avatar.x56} />
                </div>
            </div>
            <div className='Fdo Anv Bsj'>
                <div className='Fdo buofh1pr RpE'>
                    <div className='RpE buofh1pr ni8dbmo4 stjgntxs czkt41v7 fmqxjp7s'>
                        <div className='buofh1pr Fdo flx89l3n dpja2al7 dfr'>
                            <div className='RpE orhb3f3m czkt41v7 fmqxjp7s emzo65vh rq0escxv buofh1pr hpfvmrgz' style={{ minHeight: 90 }}>
                                <div className='Fdo lhclo0ds bkfpd7mw'>
                                    <div className={`Fdo buofh1pr nhadk0th  hpfvmrgz RpE ${text.length < 60 ? " up" : ""}`} >
                                        <Editor
                                            editorState={editorState}
                                            onChange={onChange}
                                            plugins={plugins}
                                            ref={editor}
                                            onFocus={focus}
                                            placeholder={<div style={{ fontSize: 27 }}>Comment allez vous aujourd'hui?</div>}

                                            className="post container editor"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pmk7jnqg i09qtzwb Fdo Lns Aic cgat1ltu tvmbv18p" style={{ right: -10 }}>
                        <EmojiSelect />
                    </div>
                    <EmojiSuggestions />
                </div>
            </div>
        </div>
        <div className='Fdo Cdf kzZ'>
            {Medias.length ?
                <div className='Fdo Aic kzZ jifvfom9 pybr56ya d76ob5m9 k4urcfbm rq0escxv'>
                    <MediaPreview Medias={Medias} mediaParams={mediaParams} DeleteImage={DeleteImage} setMediaParams={setMediaParams} setMedias={setMedias} size={100} />
                </div>
                : null
            }
            {errorMesage &&
                <div className='G6S' >{errorMesage.message}</div>
            }
        </div>
        <div className='Fdo'>
            <div className='Fdo Bsj Aic'>
                <div className='Fdo Aic'>
                    <div className='page _4EzTm ovd  Vgd'>
                        <div onClick={handlehiddenFileInput} className=" LCR Fdo Lns Aic" style={{ height: 36, width: 36 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
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
            <ModalConfidentiality ModalConfident={ModalConfident} Confidentiality={Confidentiality} handleChangeConfidentiality={handleChangeConfidentiality} setModalConfident={setModalConfident} />
        </div>
        <div className="Fdo aovydwv3 pybr56ya">
            {!process ?
                <>
                    {Medias.length > 0 || trim(text).length > 0 ?
                        <button className="sqdOP Xdg L3NKy ZIAjV Bsj _Dvgb" onClick={createPost}>Publier</button>
                        :
                        <div className="sqdOP Xdg L3NKy ZIAjV Bsj hdBtn">Publier</div>
                    }
                </>
                : process && (
                    <div className='Fdo Lns Bsj'>
                        <span className='sqdOP Xdg L3NKy ZIAjV Bsj _Dvgb'>Publication du contenu...</span>
                    </div>
                )}
        </div>
    </div>
}
export default CreatePost




