import React from "react";
import { UploadOptions } from "../../util/util";
import { VideoPlayIcon, DropdownContentTemplate, BtnCloseX, ChangeConfident, TemplateCheck, Lock } from "../../Template/Template";
import DropdownOption from "./DropdownOption";
import { useSelector } from "react-redux";
import MyVerticallyCenteredModal from "../../../Components/modal/modalCore";
import { CircleEmpty, CircleSelected } from '../../icon/icons';
const onInputFile = (setErrorMessage, e, mediaParams, Medias, setMediaParams, setMedias) => {
    setErrorMessage({})
    const Params = mediaParams.slice();
    const content_type = UploadOptions.fileaccepted.split(",");
    const MediasSlice = [];
    MediasSlice.push(...e.target.files)
    const findIndex = MediasSlice.findIndex((file => file.type.split('/')[0] === 'video'))
    for (let index = 0; index < e.target.files.length; index++) {
        let accept = content_type.indexOf(e.target.files[index].type.split("/")[1]);
        let maxSize = UploadOptions.max_size / (1020 * 1024);
        if (e.target.files[index].size < UploadOptions.min_size || e.target.files[index].size > UploadOptions.max_size) {
            setErrorMessage({
                'message': 'Le fichier ne doit pas depasser: ' +
                    maxSize.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    }) + 'Mo'
            });
        } else if (accept === -1) {
            setErrorMessage({ 'message': 'selectionner un fichier de type: ' + UploadOptions.fileaccepted })
        } else {
            if (Medias.length > 0 && Medias[0].type.split('/')[0] === 'video' && e.target.files[index].type.split('/')[0] === 'video'
                || Medias.length > 0 && Medias[0].type.split('/')[0] === 'image' && e.target.files[index].type.split('/')[0] === 'video'
                || Medias.length > 0 && Medias[0].type.split('/')[0] === 'video' && e.target.files[index].type.split('/')[0] === 'image'
                || e.target.files.length > 1 && findIndex >= 0
            ) {
                setErrorMessage({ 'message': 'vous ne pouvez pas uploader des images avec des videos ou plusieurs videos dans un seul album,vous pouvez uploader plusieurs images ou une video' });
            } else {
                Params.push({ 'texte': '', 'confidentiality': 0, 'monetisation': false, 'montant': 0, thumbnail: '', uploadPercent: 0 });
                setMediaParams(Params);
                setMedias([...Medias, ...e.target.files])
            }
        }
    }
}
const MediaPreview = ({ Medias, mediaParams, DeleteImage, setMediaParams, setMedias, size }) => {
    let row = [];
    const [boxModif, setBoxModif] = React.useState(false)
    const [videoModif, setVideoModif] = React.useState(true);
    const [modalIndex, setModalIndex] = React.useState(0);
    const mediaType = Medias[modalIndex].type.split('/')[0];
    for (let index = 0; index < Medias.length; index++) {
        row.push(<>
            <div className='kb5gq1qc pfnyh3mw rs0gx3tq tvfksri0 w0hvl6rk hcukyx3x RpE' key={index} style={{ height: size, width: size }}>
                <div className='RpE ni8dbmo4 bBB stjgntxs fni8adji hgaippwi fykbt5ly ns4ygwem' style={{ height: size, width: size }}>
                    {mediaParams[index] && mediaParams[index].montant > 0 &&
                        <Lock />
                    }
                    <div className="Fdo Aic vrb vsa nwf6jgls Lns">
                        {mediaType === 'video' ?
                            <>
                                <div className="photo-container ApE v1d">
                                    <div className="Fdo hty ELG Aic Lns">
                                        <VideoPlayIcon />
                                    </div>
                                </div>
                                <img className='idiwt2bm nwf6jgls d2edcug0 dbpd2lw6' src={mediaParams[index].thumbnail} />
                            </>
                            :
                            <img className='idiwt2bm nwf6jgls d2edcug0 dbpd2lw6' src={URL.createObjectURL(Medias[index])} alt="Thumb" />
                        }

                    </div>
                    {mediaParams[index] &&
                        <div className="uploadProgressbar">
                            <div className="barProgress" style={{ width: `${mediaParams[index].uploadPercent}%` }}> </div>
                        </div>
                    }
                </div>
                <div className='Fdo pmk7jnqg nezaghv5 e712q9ov'>
                    <div className="Fdo  Lsy LDv">
                        <DropdownOption>
                            <DropdownContentTemplate name="modifier" onClick={() => { setBoxModif(true); setVideoModif(true), setModalIndex(index) }}>
                                <svg width="22" height="22" viewBox="0 0 32 32" fill="#000000"><g><path d="M 27.526,12.682c-0.252-0.876-0.594-1.71-1.028-2.492l 1.988-4.182c-0.738-0.92-1.574-1.756-2.494-2.494 l-4.182,1.988c-0.78-0.432-1.616-0.776-2.492-1.028L 17.762,0.102C 17.184,0.038, 16.596,0, 16,0S 14.816,0.038, 14.238,0.102L 12.682,4.474 C 11.808,4.726, 10.972,5.070, 10.192,5.502L 6.008,3.514c-0.92,0.738-1.756,1.574-2.494,2.494l 1.988,4.182 c-0.432,0.78-0.776,1.616-1.028,2.492L 0.102,14.238C 0.038,14.816,0,15.404,0,16s 0.038,1.184, 0.102,1.762l 4.374,1.556 c 0.252,0.876, 0.594,1.71, 1.028,2.492l-1.988,4.182c 0.738,0.92, 1.574,1.758, 2.494,2.494l 4.182-1.988 c 0.78,0.432, 1.616,0.776, 2.492,1.028l 1.556,4.374C 14.816,31.962, 15.404,32, 16,32s 1.184-0.038, 1.762-0.102l 1.556-4.374 c 0.876-0.252, 1.71-0.594, 2.492-1.028l 4.182,1.988c 0.92-0.738, 1.758-1.574, 2.494-2.494l-1.988-4.182 c 0.432-0.78, 0.776-1.616, 1.028-2.492l 4.374-1.556C 31.962,17.184, 32,16.596, 32,16s-0.038-1.184-0.102-1.762L 27.526,12.682z M 16,24 c-4.418,0-8-3.582-8-8c0-4.418, 3.582-8, 8-8s 8,3.582, 8,8C 24,20.418, 20.418,24, 16,24zM 12,16A4,4 1080 1 0 20,16A4,4 1080 1 0 12,16z"></path></g></svg>
                            </DropdownContentTemplate>
                        </DropdownOption>
                    </div>
                    <BtnCloseX onClick={() => DeleteImage(index)} />

                </div>
            </div>

        </>
        )
    };
    row.push(<>
        {boxModif || mediaType === 'video' && videoModif ?
            <ModalConfig i={modalIndex} mediaParams={mediaParams} setMediaParams={setMediaParams} Medias={Medias[modalIndex]} AbortModif={() => setBoxModif(false)}
                setVideoModif={setVideoModif} setMedias={setMedias}></ModalConfig>
            : null
        }
    </>)
    return row;
}

const ModalConfig = ({ i, mediaParams, Medias, AbortModif, setMediaParams, setVideoModif, setMedias }) => {
    const [Price, setPrice] = React.useState(mediaParams[i].montant)
    const [AlternatifText, setAlternatifText] = React.useState(mediaParams[i].texte);
    const [videoSeekValue, setVideoSeekValue] = React.useState(0)
    const mediaType = Medias.type.split('/')[0];
    const store = useSelector((state) => state)
    const devise = store.Util.c_user.devise
    const videoPreview = React.useRef(null)
    const videoCanvas = React.createRef(null)
    const handleChangePrice = (e) => {
        let value = +e.target.value
        if (typeof (value) === 'number' && value >= 0) {
            setPrice(value)
        }
    }
    const handleChangeAlternatifText = (e) => {
        setAlternatifText(e.target.value)
    }
    const Save = () => {
        const Params = mediaParams.slice()
        Params[i].montant = Price
        Params[i].texte = AlternatifText
        setMediaParams(Params)
        if (mediaType === 'video') {
            let _CANVAS = videoCanvas.current,
                _CTX = _CANVAS.getContext("2d"),
                _VIDEO = videoPreview.current;
            _CANVAS.width = _VIDEO.videoWidth;
            _CANVAS.height = _VIDEO.videoHeight;
            _CTX.drawImage(_VIDEO, 0, 0, _VIDEO.videoWidth, _VIDEO.videoHeight);
            Params[i].thumbnail = _CANVAS.toDataURL()
        }
        setVideoModif(false)
        AbortModif()
    }

    const handleVideoProgress = (e) => {
        const manualChange = Number(e.target.value);
        let video = videoPreview.current;
        video.currentTime = (video.duration / 100) * manualChange
        setVideoSeekValue(manualChange)
    }
    const Close = () => {
        /**
         const Params = mediaParams.slice()
         console.log(Medias)
         if (Params[i].thumbnail) {
             setVideoModif(false);
             AbortModif()
         } else {
             const media = Medias.slice();
             media.splice(i, 1);
             setMedias(media);
             Params.splice(i, 1);
             setMediaParams(Params)
            }
            * 
            */
        AbortModif()

    }
    return <div className="MediaFunctionParamsDiv">
        <div className="Fdo messagerie-container sLayout" style={{ padding: 0, height: '100vh' }}>
            <div className="container-box messages-wrapper">
                <div className="Fdo messages-listing">
                    <div className="messages-list-wrapper">
                        <div className="messages-list-header">
                            <div className="messages-list-title">Modifier le contenu</div>
                        </div>
                        <div className="conversation-list-content">
                            <div className="side-bar-message-wrapper message-scrollabled-list messagerie">
                                <div className="">
                                    <div className="_7UhW9    mWe   KV-D4   uL8Hv ">Prix: {Price.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })} {devise}</div>
                                </div>
                                <div className='Fdo aovydwv3 pybr56ya Kmm'>
                                    <input name="AlbumTitle" value={Price} onChange={handleChangePrice} className="Text-form" placeholder="ajouter un prix" />
                                </div>
                                <div className='Fdo aovydwv3 pybr56ya Kmm'>
                                    <input placeholder='ajouter un texte alternatif' onChange={handleChangeAlternatifText} value={AlternatifText} className="Text-form" />
                                </div>
                            </div>
                        </div>
                        <div className="conversation-footer">
                            <div className="Fdo aovydwv3 pybr56ya Kmm Pap">
                                <button className="sqdOP Xdg L3NKy ZIAjV  Bsj _8A5w5 Rav" onClick={Close}>Anuller</button>
                                <button className="sqdOP Xdg L3NKy ZIAjV Bsj _Dvgb Ftg" onClick={Save}>Enregitrer</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="messages-text-container RpE"  >
                    {mediaType === 'video' ?
                        <div className="conversation-container Aic Lns">
                            <div className="messages-list-title">choisir un apercu</div>
                            <div className="Fdo conversation-main" style={{ padding: 10 }}>
                                <div className="Fdo hty Lns">
                                    <video className="hty" ref={videoPreview}>
                                        <source src={URL.createObjectURL(Medias)} />
                                    </video>
                                    <canvas className="ApE" ref={videoCanvas}></canvas>
                                </div>
                            </div>
                            <div className=" e1rpry1m5">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={videoSeekValue}
                                    onChange={(e) => handleVideoProgress(e)}
                                />
                            </div>
                        </div>
                        :
                        <img className='eximg' src={URL.createObjectURL(Medias)} alt="Thumb" />
                    }
                </div>
            </div>

        </div>
    </div>
}
const ModalConfidentiality = ({ setModalConfident, handleChangeConfidentiality, Confidentiality, ModalConfident }) => {

    return <>
        <ChangeConfident confidentiality={Confidentiality} onclick={() => setModalConfident(true)} />
        <MyVerticallyCenteredModal
            show={ModalConfident}
            onHide={() => setModalConfident(false)}
            titre="Qui peut voir le contenu ?"
            size="lg">
            <div className="Fdo Anv Bsj Kmm">
                <div className="Fdo Bsj Anv">
                    <TemplateCheck onClick={() => handleChangeConfidentiality(1)}
                        active={Confidentiality === 1 ? true
                            :
                            false}
                        checkbox={Confidentiality === 1 ? <CircleSelected />
                            :
                            <CircleEmpty />} name="Public">
                        <svg height="24px" width="24px" viewBox="0 0 512 512"><path d="M256 48C141.124 48 48 141.125 48 256s93.124 208 208 208c114.875 0 208-93.125 208-208S370.875 48 256 48zm-21.549 384.999c-39.464-4.726-75.978-22.392-104.519-50.932C96.258 348.393 77.714 303.622 77.714 256c0-42.87 15.036-83.424 42.601-115.659.71 8.517 2.463 17.648 2.014 24.175-1.64 23.795-3.988 38.687 9.94 58.762 5.426 7.819 6.759 19.028 9.4 28.078 2.583 8.854 12.902 13.498 20.019 18.953 14.359 11.009 28.096 23.805 43.322 33.494 10.049 6.395 16.326 9.576 13.383 21.839-2.367 9.862-3.028 15.937-8.13 24.723-1.557 2.681 5.877 19.918 8.351 22.392 7.498 7.497 14.938 14.375 23.111 21.125 12.671 10.469-1.231 24.072-7.274 39.117zm147.616-50.932c-25.633 25.633-57.699 42.486-92.556 49.081 4.94-12.216 13.736-23.07 21.895-29.362 7.097-5.476 15.986-16.009 19.693-24.352 3.704-8.332 8.611-15.555 13.577-23.217 7.065-10.899-17.419-27.336-25.353-30.781-17.854-7.751-31.294-18.21-47.161-29.375-11.305-7.954-34.257 4.154-47.02-1.417-17.481-7.633-31.883-20.896-47.078-32.339-15.68-11.809-14.922-25.576-14.922-42.997 12.282.453 29.754-3.399 37.908 6.478 2.573 3.117 11.42 17.042 17.342 12.094 4.838-4.043-3.585-20.249-5.212-24.059-5.005-11.715 11.404-16.284 19.803-24.228 10.96-10.364 34.47-26.618 32.612-34.047s-23.524-28.477-36.249-25.193c-1.907.492-18.697 18.097-21.941 20.859.086-5.746.172-11.491.26-17.237.055-3.628-6.768-7.352-6.451-9.692.8-5.914 17.262-16.647 21.357-21.357-2.869-1.793-12.659-10.202-15.622-8.968-7.174 2.99-15.276 5.05-22.45 8.039 0-2.488-.302-4.825-.662-7.133a176.585 176.585 0 0 1 45.31-13.152l14.084 5.66 9.944 11.801 9.924 10.233 8.675 2.795 13.779-12.995L282 87.929V79.59c27.25 3.958 52.984 14.124 75.522 29.8-4.032.361-8.463.954-13.462 1.59-2.065-1.22-4.714-1.774-6.965-2.623 6.531 14.042 13.343 27.89 20.264 41.746 7.393 14.801 23.793 30.677 26.673 46.301 3.394 18.416 1.039 35.144 2.896 56.811 1.788 20.865 23.524 44.572 23.524 44.572s10.037 3.419 18.384 2.228c-7.781 30.783-23.733 59.014-46.769 82.052z" /></svg>
                    </TemplateCheck>
                    <TemplateCheck onClick={() => handleChangeConfidentiality(2)}
                        active={Confidentiality === 2 ? true
                            :
                            false}
                        checkbox={Confidentiality === 2 ? <CircleSelected />
                            :
                            <CircleEmpty />} name="Followers">
                        <svg height="24px" width="24px" viewBox="0 0 512 512"><path d="M337.454 232c33.599 0 61.092-27.002 61.092-60 0-32.997-27.493-60-61.092-60s-61.09 27.003-61.09 60c0 32.998 27.491 60 61.09 60zm-162.908 0c33.599 0 61.09-27.002 61.09-60 0-32.997-27.491-60-61.09-60s-61.092 27.003-61.092 60c0 32.998 27.493 60 61.092 60zm0 44C126.688 276 32 298.998 32 346v54h288v-54c0-47.002-97.599-70-145.454-70zm162.908 11.003c-6.105 0-10.325 0-17.454.997 23.426 17.002 32 28 32 58v54h128v-54c0-47.002-94.688-58.997-142.546-58.997z" /></svg>
                    </TemplateCheck>
                    <TemplateCheck onClick={() => handleChangeConfidentiality(3)}
                        active={Confidentiality === 3 ? true
                            :
                            false}
                        checkbox={Confidentiality === 3 ? <CircleSelected />
                            :
                            <CircleEmpty />} name="Moi uniquement">
                        <svg height="24px" width="24px" viewBox="0 0 512 512"><path d="M376 192h-24v-46.7c0-52.7-42-96.5-94.7-97.3-53.4-.7-97.3 42.8-97.3 96v48h-24c-22 0-40 18-40 40v192c0 22 18 40 40 40h240c22 0 40-18 40-40V232c0-22-18-40-40-40zM270 316.8v68.8c0 7.5-5.8 14-13.3 14.4-8 .4-14.7-6-14.7-14v-69.2c-11.5-5.6-19.1-17.8-17.9-31.7 1.4-15.5 14.1-27.9 29.6-29 18.7-1.3 34.3 13.5 34.3 31.9 0 12.7-7.3 23.6-18 28.8zM324 192H188v-48c0-18.1 7.1-35.1 20-48s29.9-20 48-20 35.1 7.1 48 20 20 29.9 20 48v48z" /></svg>
                    </TemplateCheck>
                </div>
            </div>
        </MyVerticallyCenteredModal>
    </>
}
export { onInputFile, MediaPreview, ModalConfidentiality }