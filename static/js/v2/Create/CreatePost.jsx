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
import { EditorContent, trim, UploadOptions } from '../util/util';
import DropdownOption from './components/DropdownOption'
import MyVerticallyCenteredModal from '../../Components/modal/modalCore';
import { PhotosIcon, CircleEmpty, CircleSelected, Trash, Settings } from '../icon/icons';
import { ImportationMessage, TemplateCheck, DropdownContentTemplate, AlertBottom, Checkbox, ChangeConfident, Lock } from '../Template/Template';
export default class SimpleEmojiEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            index: this.props.index,
            image: undefined,
            media: [],
            MyVerticallyCenteredModal: false,
            confidentiality: 1,
            btnProcess: false,
            alert: undefined,
            checkforCom: false,
            //modal 
            MediaParam: false,
            item: undefined,
            //parameter of images
            image_param: [],
            errorMesage: undefined,
        };
        this.hiddenFileInput = React.createRef(null);
    }

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    focus = () => {
        this.editor.focus();
    };

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
            return 'handled';
        }
        return 'not-handled';
    }

    /*manipulation photos*/
    handlehiddenFileInput = event => {
        this.hiddenFileInput.current.click();
    };

    imageChange = (e) => {
        const image_param = this.state.image_param.slice();
        for (let index = 0; index < e.target.files.length; index++) {
            let accept = UploadOptions.fileaccepted.includes(e.target.files[index].type);
            if (e.target.files[index].size < UploadOptions.min_size || e.target.files[index].size > UploadOptions.max_size) {
                this.setState({ errorMesage: { 'message': 'Le fichier ne doit pas depasser: 3Mo' } });
            } else if (!accept) {
                this.setState({ errorMesage: { 'message': 'selectionner un fichier de type: jpeg,jpg,png' } })
            }
            else {
                image_param.push({ 'texte': '', 'payant': false, 'montant': 0 });
                this.setState({
                    media: [...this.state.media, ...e.target.files],
                    image_param
                })
            }
        }
    };
    deleteImage = (id) => {
        const media = this.state.media.slice();
        const image_param = this.state.image_param.slice();
        media.splice(id, 1);
        image_param.splice(id, 1);
        this.setState({ media, image_param });
    }
    handleAlernatifText = (e) => {
        let image_param = this.state.image_param.slice();
        let item = this.state.item
        const name = [e.target.name]
        image_param[item][name] = e.target.value
        this.setState({ image_param });
    }
    checkboxForMedia = (e) => {
        let image_param = this.state.image_param.slice();
        let item = this.state.item
        const name = [e.target.name]
        image_param[item][name] = e.target.checked
        this.setState({ image_param });
    }
    HandleChangePriceforMedia = (e) => {
        let params = this.state.image_param.slice();
        if (e.target.value > -1) {
            if (e.target.value === '') {
                params[this.state.item].montant = e.target.value
                this.setState({ image_texte: params });
            } else {
                params[this.state.item].montant = parseInt(e.target.value)
                this.setState({ image_param: params });
            }
        }
    }


    handleChangeConfidentiality = (btn) => {
        this.setState({ confidentiality: btn });
    }

    onSubmit = async () => {

        var formData = new FormData()
        let image = this.state.media;
        if (image != undefined) {
            for (let i = 0; i < image.length; i++) {
                formData.append("file[]", image[i]);
            }
        }
        this.setState({ media: [], editorState: EditorState.createEmpty(), btnProcess: false, alert: ImportationMessage() });
        setTimeout(() => {
            this.setState({ alert: undefined })
        }, 1400);
        formData.append('url', './RESTAPI/Status/createPost');
        formData.append('contenu', EditorContent(this.state.editorState));
        formData.append('security', this.state.confidentiality);
        formData.append('params', JSON.stringify(this.state.image_param));
        Fetch('/post', formData, (res) => {
            this.setState({ alert: res });
            setTimeout(() => {
                this.setState({ alert: undefined })
            }, 1400);
            if (res.success === 1) {
                
            }
        })
    }

    MediaPreview = () => {
        let row = [];
        for (let i = 0; i < this.state.media.length; i++) {
            row.push(
                <div className='kb5gq1qc pfnyh3mw rs0gx3tq tvfksri0 w0hvl6rk hcukyx3x RpE' key={i} style={{ height: 100, width: 100 }}>
                    <div className='RpE ni8dbmo4 bBB stjgntxs fni8adji hgaippwi fykbt5ly ns4ygwem' style={{ height: 100, width: 100 }}>
                        {this.state.image_param[i] && this.state.image_param[i].montant > 0 &&
                            <Lock />
                        }
                        <img className='k4urcfbm bixrwtb6 datstx6m q9uorilb'
                            src={URL.createObjectURL(this.state.media[i])}
                            alt="Thumb"
                        />
                    </div>
                    <div className="pmk7jnqg nezaghv5 e712q9ov">
                        <DropdownOption>
                            <DropdownContentTemplate name="Supprimmer" onClick={(e) => this.deleteImage(i)}>
                                <Trash size={24} />
                            </DropdownContentTemplate>
                            <DropdownContentTemplate name="Modifier" onClick={(e) => { this.setState({ MediaParam: true, item: i }) }}>
                                <Settings size={24} />
                            </DropdownContentTemplate>
                        </DropdownOption>
                    </div>

                </div>
            )
        }
        return row;
    }
    checkbox = (e) => {
        this.setState({ [e.target.name]: e.target.checked });
    }
    showConditions = () => {
        console.log('show conditions');
    }
    render() {
        var text = EditorContent(this.state.editorState);

        return (
            <div className='Fdo Anv pybr56ya tw6a2znq vcx Kmm'>
                {this.state.alert != undefined &&
                    <AlertBottom message={this.state.alert.message} />
                }
                <div className='Fdo'>

                    <div className='page _4EzTm yC0tu Vgd'>
                        <div className='_2dbep ' style={{ height: 56, width: 56 }}>
                            <img className='hty ELG hrt lazyload' data-src={this.props.c_user.avatar.x56} />
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
                                                    editorState={this.state.editorState}
                                                    onChange={this.onChange}
                                                    plugins={plugins}
                                                    ref={(element) => {
                                                        this.editor = element;
                                                    }}
                                                    onFocus={this.focus}
                                                    placeholder={<div style={{ fontSize: 27 }}>Comment allez vous aujourd'hui?</div>}
                                                    keyBindingFn={this.keyBindingFn}
                                                    handleKeyCommand={this.handleKeyCommand}
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
                    {this.state.media.length ?
                        <div className='Fdo Aic kzZ jifvfom9 pybr56ya d76ob5m9 k4urcfbm rq0escxv'>
                            <this.MediaPreview />
                        </div>
                        : null
                    }
                    {this.state.errorMesage &&
                        <div className='G6S' >{this.state.errorMesage.message}</div>
                    }
                </div>
                {this.state.MediaParam &&
                    <MyVerticallyCenteredModal
                        show={this.state.MediaParam}
                        onHide={() => this.setState({ MediaParam: false, item: undefined })}
                        titre="Paramètres du media"
                        size="lg">
                        <div className='Fdo Anv Vpe'>
                            <div className='Fdo Vpe'>
                                <div className='Fdo'>
                                    <div className='RpE ni8dbmo4 bBB stjgntxs' style={{ height: 44, width: 44 }}>
                                        <img className='k4urcfbm bixrwtb6 datstx6m q9uorilb'
                                            src={URL.createObjectURL(this.state.media[this.state.item])}
                                            alt="Thumb"
                                        />
                                    </div>
                                    { }
                                </div>
                                <div className='page wBKMS'>
                                    <input className='Text-form' value={this.state.image_param[this.state.item].texte} onChange={this.handleAlernatifText} name="texte" placeholder='texte alternatif' style={{ height: 44 }} />
                                </div>
                            </div>
                            <Checkbox checked={this.state.image_param[this.state.item].payant} name="payant" onchange={this.checkboxForMedia}>
                                Activer le mode payant sur ce contenu
                            </Checkbox>
                            {this.state.image_param[this.state.item].payant &&
                                <div className='Fdo Ert  text-group'>
                                    <input className='Text-form' type="text" value={this.state.image_param[this.state.item].montant} onChange={this.HandleChangePriceforMedia} name="montant" placeholder='Ajouter un prix' />
                                    <div className='Fdo input-group-text'>{this.props.c_user.devise}</div>
                                </div>
                            }
                        </div>
                    </MyVerticallyCenteredModal>
                }
                <MyVerticallyCenteredModal
                    show={this.state.MyVerticallyCenteredModal}
                    onHide={() => this.setState({ MyVerticallyCenteredModal: false })}
                    titre="Paramètres du contenu"
                    size="lg">
                    <div className="Fdo Anv Bsj Kmm">
                        <div className="Fdo Bsj Anv">
                            <div className='Fdo Vpe'>
                                <span className='yTZ B9u mWe'>
                                    Qui peut voir le contenu?
                                </span>
                            </div>
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

                            <div className='Fdo Anv ELG'>
                                <div className='Fdo Ert Vpe'>
                                    <span className='yTZ B9u mWe'>
                                        options pour les commentaires
                                    </span>
                                </div>
                                <Checkbox checked={this.state.checkforCom} name="checkforCom" onchange={this.checkbox}>
                                    Monetiser les commentaires
                                </Checkbox>
                                {this.state.checkforCom &&
                                    <div className='Fdo Ert Vpe text-group'>
                                        <input className='Text-form' type="text" name="price" placeholder='Ajouter un prix' />
                                        <div className='Fdo input-group-text'>{this.props.c_user.devise}</div>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </MyVerticallyCenteredModal>

                <div className='Fdo'>
                    <div className='Fdo Aic Bsj'>
                        <div className='page _4EzTm ovd yC0tu Vgd'>
                            <div onClick={this.handlehiddenFileInput} className="bBB LCR Fdo Lns Aic" style={{ height: 36, width: 36 }}>
                                <PhotosIcon size={24} />
                            </div>
                        </div>
                    </div>
                    <input className='mkhogb32'
                        accept={UploadOptions.fileaccepted}
                        type="file"
                        multiple
                        onChange={this.imageChange}
                        style={{ display: 'none' }}
                        ref={this.hiddenFileInput}
                    />
                    <ChangeConfident confidentiality={this.state.confidentiality} onclick={() => this.setState({ MyVerticallyCenteredModal: true })} />
                </div>
               
                <div className="Fdo aovydwv3 pybr56ya">
                    {!this.state.btnProcess ?
                        <>
                            {this.state.media.length > 0 || trim(text).length > 0 ?
                                <button className="sqdOP Xdg L3NKy ZIAjV Bsj _Dvgb" onClick={this.onSubmit}>Publier</button>
                                :
                                <div className="sqdOP Xdg L3NKy ZIAjV Bsj hdBtn">Publier</div>
                            }
                        </>
                        : this.state.btnProcess && (
                            <div className='Fdo Lns Bsj'>
                                <span className='sqdOP Xdg L3NKy ZIAjV Bsj _Dvgb'>Publication du contenu...</span>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}



