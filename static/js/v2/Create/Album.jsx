import React from "react";
import { withRouter } from "../util/WithRouter";
import Fetch from "../util/Fetch";
import { useDispatch } from "react-redux"
import { closeAlertBox, showAlertBox } from "../redux/UtilRedux";
import { ModalConfidentiality, onInputFile } from "./components/preview";
import { MediaPreview } from "./components/preview";
import MyChunkUploader from "../util/uploader";
import { Link } from "react-router-dom";
import { InfoIcon } from "../icon/icons";
const Create = () => {
    const [Uploader, setUploader] = React.useState(new MyChunkUploader())
    
    const [Medias, setMedias] = React.useState([]);
    const [uploaded, setUploaded] = React.useState(0);
    const [errorMesage, setErrorMessage] = React.useState({})
    const [mediaParams, setMediaParams] = React.useState([]);
    const [AlbumTitle, setAlbumTitle] = React.useState('');
    const [Confidentiality, setConfidentiality] = React.useState(1)
    const [ModalConfident, setModalConfident] = React.useState(false)
    const hiddenFileInput = React.createRef(null);
    const send = React.createRef(null)
    const [process, setProcess] = React.useState(false);
    const dispatch = useDispatch();
    const maxTitleLength = 60
    /**
     * on creation
     * @param {id} create 
     */
    const [AlbumId, setAlbumId] = React.useState(undefined);
    const handlehiddenFileInput = event => {
        hiddenFileInput.current.click();
    };
    const handleChangeAlbumTitle = (e) => {
        let title = e.target.value;
        setAlbumTitle(title);
    }
    const handleChangeConfidentiality = (btn) => {
        setConfidentiality(btn);
        setModalConfident(false)
    }
    const onInput = (e) => {
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

    Uploader.on_error = (object, err_type) => {
        dispatch(showAlertBox({ 'message': 'une erreur s\'est produite lors de l\'upload de votre contenu' }))
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
            onUpload(AlbumId);
        }, 1);
    }, [uploaded])

    const onUpload = (albumId) => {
        if (Medias.length > 0 && Medias[uploaded]) {
            Uploader.upload_chunked('/api', Medias[uploaded], null, {
                'media_appartenance': 'album',
                'params': JSON.stringify(mediaParams[uploaded]),
                'albumId': albumId
            });
        } else if (Medias.length > 0 && !Medias[uploaded]) {
            dispatch(showAlertBox({ 'message': 'votre contenu est prète' }))
            setProcess(false)
            setMedias([]);
            setMediaParams([])
            setTimeout(() => {
                dispatch(closeAlertBox());
            }, 2000);
        }
    }

    const createAlbum = async () => {
        setProcess(true);
        if (Medias.length > 0 && AlbumTitle.length <= maxTitleLength && Confidentiality > 0 && !process) {
            var formData = new FormData()
            formData.append('url', './RESTAPI/Album/new');
            formData.append('params', JSON.stringify(mediaParams))
            formData.append('album_title', AlbumTitle);
            formData.append('security', Confidentiality);
            Fetch('/create-album', formData, (res) => {
                if (res.success === 1) {
                    setAlbumId(res.albumId);
                    dispatch(showAlertBox({ 'message': 'votre album a été créer, upload des medias en cours...' }))
                    onUpload(res.albumId)
                } else {

                }
            })
        } else {
            alert('ajouter une image ou une video');
        }
    }


    return <div className="Fdo Bcg Nfb ELG Flk main-app-width Pap">
        <div className="Fdo messagerie-container sLayout">
            <div className="container-box messages-wrapper">
                <div className="Fdo messages-listing">
                    <div className="messages-list-wrapper">
                        <div className="messages-list-header">
                            <div className="messages-list-title">Créer un album</div>
                        </div>
                        <div className="conversation-list-content">
                            <div className="side-bar-message-wrapper message-scrollabled-list messagerie">
                                <div className='Fdo aovydwv3 pybr56ya Kmm'>
                                    <button onClick={handlehiddenFileInput} className="sqdOP Xdg L3NKy ZIAjV Bsj Bgu ">Ajouter des photos ou une video</button>

                                </div>
                                <input className='mkhogb32'
                                    accept="image/jpeg,image/jpg,image/png,video/mp4"
                                    type="file"
                                    multiple
                                    onChange={onInput}
                                    style={{ display: 'none' }}
                                    ref={hiddenFileInput}
                                />
                                <div className="">
                                    <input name="AlbumTitle" maxLength={maxTitleLength} value={AlbumTitle} onChange={handleChangeAlbumTitle} className="Text-form" placeholder="Nom de l'album" />
                                </div>
                                <div className="Fdo" style={{ justifyContent: 'flex-end' }}>
                                    <span>{AlbumTitle.length}</span><span>/</span>
                                    <span>{maxTitleLength}</span>
                                </div>
                                {AlbumTitle.length > maxTitleLength && (
                                    <p style={{ color: "red" }}>Le titre ne doit pas contenir plus de {maxTitleLength} caractères</p>
                                )}
                                <ModalConfidentiality ModalConfident={ModalConfident} Confidentiality={Confidentiality} handleChangeConfidentiality={handleChangeConfidentiality} setModalConfident={setModalConfident} />
                            </div>
                        </div>
                        <div className="conversation-footer">
                            <div className="Fdo aovydwv3 pybr56ya Kmm Pap">
                                {process ?
                                    <div className="sqdOP Xdg L3NKy ZIAjV Bsj disabled _Dvgb">Publier</div>
                                    :
                                    <button ref={send} className="sqdOP Xdg L3NKy ZIAjV Bsj _Dvgb" onClick={createAlbum}>Publier</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="messages-text-container" >
                    <div className="conversation-container">
                        <div className=" Fdo Pac Cdf ELG vgh">
                            <div className="Fdo jifvfom9 lhclo0ds pybr56ya vcx Kmm tw6a2znq d76ob5m9 k4urcfbm rq0escxv">
                                <div className="Fdo Anv ">
                                    {errorMesage.message &&
                                        <div className='G6S' >{errorMesage.message}</div>
                                    }
                                    {Medias.length > 0 ?
                                        <div className="Fdo lhclo0ds">
                                            <MediaPreview Medias={Medias} mediaParams={mediaParams} DeleteImage={DeleteImage} setMediaParams={setMediaParams} setMedias={setMedias} size={150} />
                                        </div>
                                        :
                                        <div className="Fdo Anv Pac">
                                            <div className="alert-info info">
                                                <div className="Fdo">
                                                    <div className="icon-info">
                                                        <InfoIcon size={18} />
                                                    </div>
                                                    <div className="content">
                                                        <h2>information importantes</h2>
                                                        <p className="title">Certains contenu ne sont pas autorisé sur tafaray.</p>
                                                        <p>Par exemple les photos nue ou certains photos en maillot de bain...</p>
                                                        <p>Avant de publier quelque chose,nous vous invitons a lire le règlement si vous les avez pas encore lus car toute personnes qui enfrain cette règle risque l'explusion sur tafaray ainsi que les autres plateformes qui appartient a zarao-lab. </p>
                                                        <Link to={'/reglement'} className="btn">Lire le règlement de la comunauté</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default withRouter(Create)








