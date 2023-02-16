import React from "react";
import MyVerticallyCenteredModal from "../../Components/modal/modalCore";
import Fetch from "../util/Fetch";
import DropdownOption from './components/DropdownOption'
import { CircleEmpty, CircleSelected } from '../icon/icons';
import {
    BtnCloseX, ChangeConfident, ImportationMessage, TemplateCheck,
    DropdownContentTemplate, Checkbox, AlertBottom, VideoPlayIcon, Item
} from "../Template/Template";
import Cookie from "js-cookie";
import { UploadOptions } from "../util/util";
import { Lock } from "../Template/Template";
import useVideoPlayer from "../media/components/videoPlayer";
export default class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: [],
            image_texte: [],
            MyVerticallyCenteredModal: false,
            item: null,
            AlbumTitle: '',
            maxTitleLength: 160,
            alert: undefined,
            videocount: 0,
            confidentiality: 1,
            ModalConfident: false,
            errorMesage: undefined,
            rangeValue: 0,
            Modalvideos: false,
            videoSeekValue: 0
        }
        this.hiddenFileInput = React.createRef(null);
        this.videoPreview = [];
        this.videoCanvas = [];
    }
    handlehiddenFileInput = event => {
        this.hiddenFileInput.current.click();
    };
    imageChange = (e) => {
        let image_texte = this.state.image_texte.slice();
        for (let index = 0; index < e.target.files.length; index++) {
            let accept = UploadOptions.fileaccepted.includes(e.target.files[index].type);
            if (e.target.files[index].size < UploadOptions.min_size || e.target.files[index].size > UploadOptions.max_size) {
                this.setState({ errorMesage: { 'message': 'Le fichier ne doit pas depasser: ' + UploadOptions.max_size / 1000 } });
            } else if (!accept) {
                this.setState({ errorMesage: { 'message': 'selectionner un fichier de type: ' + UploadOptions.fileaccepted } })
            } else {
                let type = e.target.files[index].type.split("/");
                if (type[0] === 'video') {
                    this.videoOption(index);
                    this.setState({ videocount: this.state.videocount + 1 });
                    this.setState({ Modalvideos: true })
                }
                image_texte.push({ 'texte': '', 'confidentiality': 0, 'monetisation': false, 'montant': '', thumbnail: '' });
                this.setState({
                    image: [...this.state.image, ...e.target.files],
                    image_texte,
                    errorMesage: undefined
                })
            }
        }
    }

    deleteImage = (id) => {
        const media = this.state.image.slice();
        const image_param = this.state.image_texte.slice();
        media.splice(id, 1);
        image_param.splice(id, 1);
        this.setState({ image: media, image_texte: image_param });
    }

    videoOption = (i) => {
        setTimeout(() => {
            let _CANVAS = this.videoCanvas[i],
                _CTX = _CANVAS.getContext("2d"),
                _VIDEO = this.videoPreview[i];
            _VIDEO.load();
            // Load metadata of the video to get video duration and dimensions
            _VIDEO.addEventListener('loadedmetadata', function () {
                // Set canvas dimensions same as video dimensions
                _CANVAS.width = _VIDEO.videoWidth;
                _CANVAS.height = _VIDEO.videoHeight;
            });
            // On clicking the Download button set the video in the canvas and download the base-64 encoded image data
            let params = this.state.image_texte.slice();
            setTimeout(() => {
                _CTX.drawImage(_VIDEO, 0, 0, _VIDEO.videoWidth, _VIDEO.videoHeight);
                
                params[i].thumbnail = _CANVAS.toDataURL()
                this.setState({ image_texte: params });
            }, 1000)
        }, 1000)
    }

    handleChangeImageText = (e) => {
        let params = this.state.image_texte.slice();
        params[this.state.item].texte = e.target.value
        this.setState({ image_texte: params });
    }

    changeTitle = (e) => {
        let title = e.target.value;
        if (this.state.AlbumTitle.length <= this.state.maxTitleLength) {
            this.setState({ AlbumTitle: title });
        }
    }

    handleChangeConfidentiality = (btn) => {
        this.setState({ confidentiality: btn });
    }

    HandleChangePriceforMedia = (e) => {
        let params = this.state.image_texte.slice();
        if (e.target.value > -1) {
            if (e.target.value === '') {
                params[this.state.item].montant = e.target.value
                this.setState({ image_texte: params });
            } else {
                params[this.state.item].montant = parseInt(e.target.value)
                this.setState({ image_texte: params });
            }
        }
    }

    checkboxForMedia = (e) => {
        let image_param = this.state.image_texte.slice();
        let item = this.state.item
        const name = [e.target.name]
        image_param[item][name] = e.target.checked
        this.setState({ image_param });
    }
    onSubmit = async () => {
        var formData = new FormData()
        let image = this.state.image;
        setTimeout(() => {
            this.setState({ alert: undefined })
        }, 10000);
        if (image.length > 0 && this.state.AlbumTitle.length <= this.state.maxTitleLength) {
            for (let i = 0; i < image.length; i++) {
                formData.append("file[]", image[i]);
            }
            formData.append('params', JSON.stringify(this.state.image_texte))
            formData.append('url', './RESTAPI/Album/create');
            formData.append('album_title', this.state.AlbumTitle);
            formData.append('hasvideo', this.state.videocount);
            formData.append('security', this.state.confidentiality);
            this.setState({ image: [], AlbumTitle: '', image_texte: [], alert: ImportationMessage(), videocount: 0 });
            Fetch('/create-album', formData, (res) => {
                this.setState({ alert: res });
                if (res.success === 1) {
                    let datas = {
                        data_type: 'notifications',
                        client_id: Cookie.get('s_id'),
                        notification_type: 'PROCESS_COMPLETE',
                        c_user: Cookie.get('s_id'),
                        security_token: Cookie.get('isLogedin'),
                        notification_message: res.message
                    };
                    this.props.websocket.send(JSON.stringify(datas));
                }
            })
        }
    }

    uploadFileHandler = async () => {
        let image = this.state.image;
        var formData = new FormData()
        if (image.length > 0 && this.state.AlbumTitle.length <= this.state.maxTitleLength) {
            for (let i = 0; i < image.length; i++) {
                formData.append("file[]", image[i]);
            }
            formData.append('params', JSON.stringify(this.state.image_texte))
            formData.append('url', './RESTAPI/Album/create');
            formData.append('album_title', this.state.AlbumTitle);
            formData.append('hasvideo', this.state.videocount);
            formData.append('security', this.state.confidentiality);
            this.setState({ image: [], AlbumTitle: '', image_texte: [], videocount: 0 });
            var ajax = await new XMLHttpRequest();
            ajax.upload.addEventListener("progress", this.progressHandler, false);
            ajax.addEventListener("load", this.completeHandler, false);
            ajax.addEventListener("error", this.errorHandler, false);
            ajax.addEventListener("abort", this.abortHandler, false);
            ajax.open("POST", "/", true);
            ajax.send(formData);
        }
    }
    progressHandler = (event) => {
        var percent = (event.loaded / event.total) * 100;
        this.props.setUploadPercent({ 'texte': 'upload de votre contenu, veuillez attendre', 'percent': Math.round(percent) })
        if (percent === 100) {
            this.props.setUploadPercent({ 'texte': 'assemblage de votre contenu en cours...', 'percent': Math.round(percent) })
        }
    }
    completeHandler = (event) => {
        this.props.setUploadPercent({ 'texte': '', 'percent': '' })
        this.props.completeUpload({ texte: JSON.parse(event.currentTarget.responseText) })
    }
    errorHandler = (event) => {
        console.log('une erreur sets produite')
    }
    abortHandler = (event) => {
        console.log('le truc a ete anulle');
    }
    handleVideoProgress = () => {

    }

    testImg = () => {
        let row = [];
        for (let i = 0; i < this.state.image.length; i++) {
            const handleVideoProgress = (e) => {
                let video = document.getElementById("videoseek");
                let vid1 = document.getElementById("videoseek1")
                const manualChange = Number(e.target.value);
                video.currentTime = (video.duration / 100) * manualChange
                vid1.currentTime = (video.duration / 100) * manualChange
                this.setState({ videoSeekValue: manualChange })
                let _CANVAS = this.videoCanvas[i],
                    _CTX = _CANVAS.getContext("2d"),
                    _VIDEO = video;
                // Load metadata of the video to get video duration and dimensions
                _VIDEO.addEventListener('loadedmetadata', function () {
                    // Set canvas dimensions same as video dimensions
                    _CANVAS.width = _VIDEO.videoWidth;
                    _CANVAS.height = _VIDEO.videoHeight;
                });
                let params = this.state.image_texte.slice();
                _CTX.drawImage(_VIDEO, 0, 0, _VIDEO.videoWidth, _VIDEO.videoHeight);
                params[i].thumbnail = _CANVAS.toDataURL()
                console.log(_CANVAS.toDataURL())
                this.setState({ image_texte: params });
            }
            
            row.push(
                <div className='kb5gq1qc pfnyh3mw rs0gx3tq tvfksri0 w0hvl6rk hcukyx3x RpE' key={i} style={{ height: 150, width: 150 }}>
                    <div className='RpE ni8dbmo4 bBB stjgntxs fni8adji hgaippwi fykbt5ly ns4ygwem' style={{ height: 150, width: 150 }}>
                        {this.state.image_texte[i] && this.state.image_texte[i].montant > 0 &&
                            <Lock />
                        }
                        <div className="Fdo Aic vrb vsa nwf6jgls Lns">
                            {this.state.image[i].type === 'video/mp4' ?
                                <>
                                    <div className="photo-container ApE v1d" >
                                        <div className="Fdo hty ELG Aic Lns">
                                            <VideoPlayIcon />
                                        </div>
                                    </div>
                                    <div className="Fdo idiwt2bm nwf6jgls d2edcug0 dbpd2lw6s">
                                        <video className="ELG" id="videoseek1"  ref={videoPreview => (this.videoPreview[i] = videoPreview)}>
                                            <source src={URL.createObjectURL(this.state.image[i])} />
                                        </video>
                                        <canvas ref={videoCanvas => (this.videoCanvas[i] = videoCanvas)}></canvas>
                                        <MyVerticallyCenteredModal
                                            show={this.state.Modalvideos}
                                            onHide={() => this.setState({ Modalvideos: false })}
                                            titre="Selectioner un affichage ?"
                                            size="lg">
                                            <div className="DivContainer-StyledDivContainerV2">
                                                <div style={{ paddingTop: '132.653%' }}>
                                                    <div className="DivWrapper">
                                                        <div className="DivPlayerContainer">
                                                            <div className="DivPlayerContainer">
                                                                <div className="DivContainer">
                                                                    <video className="ELG" id="videoseek">
                                                                        <source src={URL.createObjectURL(this.state.image[i])} />
                                                                    </video>
                                                                </div>
                                                                <div className="tiktok-174tqkn-DivVideoControlContainer e1rpry1m5">
                                                                    <input
                                                                        type="range"
                                                                        min="0"
                                                                        max="100"
                                                                        value={this.state.videoSeekValue}
                                                                        onChange={(e) => handleVideoProgress(e)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </MyVerticallyCenteredModal>
                                    </div>
                                </>
                                :
                                <img className='idiwt2bm nwf6jgls d2edcug0 dbpd2lw6' src={URL.createObjectURL(this.state.image[i])} alt="Thumb" />
                            }
                        </div>
                    </div>
                    <div className='Fdo pmk7jnqg nezaghv5 e712q9ov'>
                        <div className="Fdo  Lsy LDv">
                            <DropdownOption>
                                <DropdownContentTemplate name="Editer" onClick={() => this.setState({ MyVerticallyCenteredModal: true, item: i })}>
                                    <svg width="22" height="22" viewBox="0 0 32 32" fill="#000000"><g><path d="M 27.526,12.682c-0.252-0.876-0.594-1.71-1.028-2.492l 1.988-4.182c-0.738-0.92-1.574-1.756-2.494-2.494 l-4.182,1.988c-0.78-0.432-1.616-0.776-2.492-1.028L 17.762,0.102C 17.184,0.038, 16.596,0, 16,0S 14.816,0.038, 14.238,0.102L 12.682,4.474 C 11.808,4.726, 10.972,5.070, 10.192,5.502L 6.008,3.514c-0.92,0.738-1.756,1.574-2.494,2.494l 1.988,4.182 c-0.432,0.78-0.776,1.616-1.028,2.492L 0.102,14.238C 0.038,14.816,0,15.404,0,16s 0.038,1.184, 0.102,1.762l 4.374,1.556 c 0.252,0.876, 0.594,1.71, 1.028,2.492l-1.988,4.182c 0.738,0.92, 1.574,1.758, 2.494,2.494l 4.182-1.988 c 0.78,0.432, 1.616,0.776, 2.492,1.028l 1.556,4.374C 14.816,31.962, 15.404,32, 16,32s 1.184-0.038, 1.762-0.102l 1.556-4.374 c 0.876-0.252, 1.71-0.594, 2.492-1.028l 4.182,1.988c 0.92-0.738, 1.758-1.574, 2.494-2.494l-1.988-4.182 c 0.432-0.78, 0.776-1.616, 1.028-2.492l 4.374-1.556C 31.962,17.184, 32,16.596, 32,16s-0.038-1.184-0.102-1.762L 27.526,12.682z M 16,24 c-4.418,0-8-3.582-8-8c0-4.418, 3.582-8, 8-8s 8,3.582, 8,8C 24,20.418, 20.418,24, 16,24zM 12,16A4,4 1080 1 0 20,16A4,4 1080 1 0 12,16z"></path></g></svg>
                                </DropdownContentTemplate>
                            </DropdownOption>
                        </div>
                        <BtnCloseX onClick={(e) => this.deleteImage(i)} />
                    </div>
                </div>
            )
        }
        return row;
    }

    render() {
        var i = this.state.item;
        return (
            <div className='Fdo Bcg Nfb ELG Flk main-app-width Pap' >
                {this.state.alert != undefined &&
                    <AlertBottom message={this.state.alert.message} >
                        <BtnCloseX />
                    </AlertBottom>
                }
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
                                            <button onClick={this.handlehiddenFileInput} className="sqdOP Xdg L3NKy ZIAjV Bsj _Dvgb">Ajouter des photos ou videos</button>

                                        </div>
                                        <input className='mkhogb32'
                                            accept="image/jpeg,image/jpg,image/png,video/mp4"
                                            type="file"
                                            multiple
                                            onChange={this.imageChange}
                                            style={{ display: 'none' }}
                                            ref={this.hiddenFileInput}
                                        />
                                        <div className="">
                                            <input name="AlbumTitle" maxLength={this.state.maxTitleLength} value={this.state.AlbumTitle} onChange={this.changeTitle} className="Text-form" placeholder="Nom de l'album" />
                                        </div>
                                        <div className="Fdo" style={{ justifyContent: 'flex-end' }}>
                                            <span>{this.state.AlbumTitle.length}</span><span>/</span>
                                            <span>{this.state.maxTitleLength}</span>
                                        </div>
                                        {this.state.AlbumTitle.length > this.state.maxTitleLength && (
                                            <p style={{ color: "red" }}>Le titre ne doit pas contenir plus de {this.state.maxTitleLength} caracteres</p>
                                        )}
                                        <ChangeConfident confidentiality={this.state.confidentiality} onclick={() => this.setState({ ModalConfident: true })} />
                                    </div>
                                </div>
                                <div className="conversation-footer">
                                    <div className="Fdo aovydwv3 pybr56ya Kmm Pap">
                                        {this.state.image.length > 0 && this.state.AlbumTitle.length <= this.state.maxTitleLength ?
                                            <button className="sqdOP Xdg L3NKy ZIAjV Bsj _Dvgb" onClick={this.uploadFileHandler}>Publier</button>
                                            :
                                            <div className="sqdOP Xdg L3NKy ZIAjV Bsj disabled _Dvgb">Publier</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="messages-text-container" >
                            <div className="conversation-container">
                                <div className=" Fdo Pac Cdf ELG vgh">
                                    <div className="Fdo jifvfom9 lhclo0ds pybr56ya vcx Kmm tw6a2znq d76ob5m9 k4urcfbm rq0escxv">
                                        <div className="Fdo">
                                            {this.state.errorMesage &&
                                                <div className='G6S' >{this.state.errorMesage.message}</div>
                                            }
                                            {this.state.image.length > 0 ? <this.testImg />
                                                :
                                                <div className="Fdo Anv">
                                                    <div className="SH1 tlK SMy Vft">
                                                        Standard de la communauté
                                                    </div>
                                                    <h4 className="title">il est strictement interdit de publier sur le site:</h4>
                                                    <div className="Fdo Anv">
                                                        <Item>Des photos denudés</Item>
                                                        <Item>Une photo d'une personne portant un maillot de bain </Item>
                                                        <Item>Une photo montrant de l'argent</Item>
                                                        <Item>Une photo qui ne vous appartient pas</Item>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <MyVerticallyCenteredModal
                                    show={this.state.ModalConfident}
                                    onHide={() => this.setState({ ModalConfident: false })}
                                    titre="Qui peut voir le contenu ?"
                                    size="lg">
                                    <div className="Fdo Anv Bsj Kmm">
                                        <div className="Fdo Bsj Anv">
                                            <TemplateCheck onClick={() => this.handleChangeConfidentiality(1)}
                                                active={this.state.confidentiality === 1 ? true
                                                    :
                                                    false}
                                                checkbox={this.state.confidentiality === 1 ? <CircleSelected />
                                                    :
                                                    <CircleEmpty />} name="Public">
                                                <svg height="24px" width="24px" viewBox="0 0 512 512"><path d="M256 48C141.124 48 48 141.125 48 256s93.124 208 208 208c114.875 0 208-93.125 208-208S370.875 48 256 48zm-21.549 384.999c-39.464-4.726-75.978-22.392-104.519-50.932C96.258 348.393 77.714 303.622 77.714 256c0-42.87 15.036-83.424 42.601-115.659.71 8.517 2.463 17.648 2.014 24.175-1.64 23.795-3.988 38.687 9.94 58.762 5.426 7.819 6.759 19.028 9.4 28.078 2.583 8.854 12.902 13.498 20.019 18.953 14.359 11.009 28.096 23.805 43.322 33.494 10.049 6.395 16.326 9.576 13.383 21.839-2.367 9.862-3.028 15.937-8.13 24.723-1.557 2.681 5.877 19.918 8.351 22.392 7.498 7.497 14.938 14.375 23.111 21.125 12.671 10.469-1.231 24.072-7.274 39.117zm147.616-50.932c-25.633 25.633-57.699 42.486-92.556 49.081 4.94-12.216 13.736-23.07 21.895-29.362 7.097-5.476 15.986-16.009 19.693-24.352 3.704-8.332 8.611-15.555 13.577-23.217 7.065-10.899-17.419-27.336-25.353-30.781-17.854-7.751-31.294-18.21-47.161-29.375-11.305-7.954-34.257 4.154-47.02-1.417-17.481-7.633-31.883-20.896-47.078-32.339-15.68-11.809-14.922-25.576-14.922-42.997 12.282.453 29.754-3.399 37.908 6.478 2.573 3.117 11.42 17.042 17.342 12.094 4.838-4.043-3.585-20.249-5.212-24.059-5.005-11.715 11.404-16.284 19.803-24.228 10.96-10.364 34.47-26.618 32.612-34.047s-23.524-28.477-36.249-25.193c-1.907.492-18.697 18.097-21.941 20.859.086-5.746.172-11.491.26-17.237.055-3.628-6.768-7.352-6.451-9.692.8-5.914 17.262-16.647 21.357-21.357-2.869-1.793-12.659-10.202-15.622-8.968-7.174 2.99-15.276 5.05-22.45 8.039 0-2.488-.302-4.825-.662-7.133a176.585 176.585 0 0 1 45.31-13.152l14.084 5.66 9.944 11.801 9.924 10.233 8.675 2.795 13.779-12.995L282 87.929V79.59c27.25 3.958 52.984 14.124 75.522 29.8-4.032.361-8.463.954-13.462 1.59-2.065-1.22-4.714-1.774-6.965-2.623 6.531 14.042 13.343 27.89 20.264 41.746 7.393 14.801 23.793 30.677 26.673 46.301 3.394 18.416 1.039 35.144 2.896 56.811 1.788 20.865 23.524 44.572 23.524 44.572s10.037 3.419 18.384 2.228c-7.781 30.783-23.733 59.014-46.769 82.052z" /></svg>
                                            </TemplateCheck>
                                            <TemplateCheck onClick={() => this.handleChangeConfidentiality(2)}
                                                active={this.state.confidentiality === 2 ? true
                                                    :
                                                    false}
                                                checkbox={this.state.confidentiality === 2 ? <CircleSelected />
                                                    :
                                                    <CircleEmpty />} name="Followers">
                                                <svg height="24px" width="24px" viewBox="0 0 512 512"><path d="M337.454 232c33.599 0 61.092-27.002 61.092-60 0-32.997-27.493-60-61.092-60s-61.09 27.003-61.09 60c0 32.998 27.491 60 61.09 60zm-162.908 0c33.599 0 61.09-27.002 61.09-60 0-32.997-27.491-60-61.09-60s-61.092 27.003-61.092 60c0 32.998 27.493 60 61.092 60zm0 44C126.688 276 32 298.998 32 346v54h288v-54c0-47.002-97.599-70-145.454-70zm162.908 11.003c-6.105 0-10.325 0-17.454.997 23.426 17.002 32 28 32 58v54h128v-54c0-47.002-94.688-58.997-142.546-58.997z" /></svg>
                                            </TemplateCheck>
                                            <TemplateCheck onClick={() => this.handleChangeConfidentiality(3)}
                                                active={this.state.confidentiality === 3 ? true
                                                    :
                                                    false}
                                                checkbox={this.state.confidentiality === 3 ? <CircleSelected />
                                                    :
                                                    <CircleEmpty />} name="Moi uniquement">
                                                <svg height="24px" width="24px" viewBox="0 0 512 512"><path d="M376 192h-24v-46.7c0-52.7-42-96.5-94.7-97.3-53.4-.7-97.3 42.8-97.3 96v48h-24c-22 0-40 18-40 40v192c0 22 18 40 40 40h240c22 0 40-18 40-40V232c0-22-18-40-40-40zM270 316.8v68.8c0 7.5-5.8 14-13.3 14.4-8 .4-14.7-6-14.7-14v-69.2c-11.5-5.6-19.1-17.8-17.9-31.7 1.4-15.5 14.1-27.9 29.6-29 18.7-1.3 34.3 13.5 34.3 31.9 0 12.7-7.3 23.6-18 28.8zM324 192H188v-48c0-18.1 7.1-35.1 20-48s29.9-20 48-20 35.1 7.1 48 20 20 29.9 20 48v48z" /></svg>
                                            </TemplateCheck>
                                        </div>
                                    </div>
                                </MyVerticallyCenteredModal>
                                <MyVerticallyCenteredModal
                                    show={this.state.MyVerticallyCenteredModal}
                                    onHide={() => this.setState({ MyVerticallyCenteredModal: false, item: null })}
                                    titre="Activer le mode payant ?"
                                    size="lg">
                                    {i != null &&
                                        <div className="Fdo Anv Bsj">
                                            <div className="Fdo Anv">
                                                <div className='Fdo Anv Vpe'>
                                                    <div className='Fdo Vpe'>
                                                        <div className='Fdo'>
                                                            <div className='RpE ni8dbmo4 bBB stjgntxs' style={{ height: 44, width: 44 }}>
                                                                <img className='k4urcfbm bixrwtb6 datstx6m q9uorilb'
                                                                    src={URL.createObjectURL(this.state.image[this.state.item])}
                                                                    alt="Thumb"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='page wBKMS'>
                                                            <input className='Text-form' value={this.state.image_texte[this.state.item].texte} onChange={this.handleChangeImageText} name="texte" placeholder='texte alternatif' style={{ height: 44 }} />
                                                        </div>
                                                    </div>
                                                    <Checkbox checked={this.state.image_texte[this.state.item].payant} name="payant" onchange={this.checkboxForMedia}>
                                                        Activer le mode payant sur ce contenu
                                                    </Checkbox>
                                                    {this.state.image_texte[this.state.item].payant &&
                                                        <div className='Fdo Ert  text-group'>
                                                            <input autoComplete={false} className='Text-form' type="text" value={this.state.image_texte[this.state.item].montant} onChange={this.HandleChangePriceforMedia} name="montant" placeholder='Ajouter un prix' />
                                                            <div className='Fdo input-group-text'>{this.props.session_user.devise}</div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </MyVerticallyCenteredModal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}