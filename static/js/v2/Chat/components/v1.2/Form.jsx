import React, { Component, } from 'react';
import Editor from '@draft-js-plugins/editor';
import Draft from 'draft-js'
import createEmojiPlugin from '@draft-js-plugins/emoji';
import { DropdownContentTemplate } from "../../../Template/Template";
const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin];
import { IconGiftAlt, IconPrivate, Images, PhotoIconAlt, Triangle_right, Gift } from '../../../icon/icons';
import { BtnCloseX } from '../../../Template/Template';
import Gifts from '../Gift/Gift';

import Chose from "../Chose";
import PurchasseJeton from '../../../users/account/components/UpgradeJeton';
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.hiddenFileInput = React.createRef(null);
    this.hiddenFileInput2 = React.createRef(null);
    this.state = {
      open: false,
      jeton: false,
      price: 10000,
    }
    this.videoPreview = []
  }


  handlehiddenFileInput = event => {
    this.hiddenFileInput.current.click();
  };
  handlehiddenFileInput2 = event => {
    this.hiddenFileInput2.current.click();
  };

  imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      this.props.imageChange(e);
    }
  };
  priceChange = () => {
    this.props.changePrice();
  }

  deleteImage = (id) => {
    this.props.deleteImage(id)
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
      this.props.sendMessage()
      return 'handled';
    }
    return 'not-handled';
  }
  testImg = () => {
    let row = [];
    for (let i = 0; i < this.props.image.length; i++) {
      let type = this.props.image[i].type.split("/");
      row.push(
        <div className='kb5gq1qc pfnyh3mw m7zwrmfr tmrshh9y rs0gx3tq tvfksri0 w0hvl6rk hcukyx3x RpE' key={i}>
          <div className='RpE ni8dbmo4 stjgntxs m7zwrmfr tmrshh9y fni8adji hgaippwi fykbt5ly ns4ygwem'>
            {type[0] === 'image' ?
              <img className='k4urcfbm bixrwtb6 datstx6m q9uorilb'
                src={URL.createObjectURL(this.props.image[i])}
                alt="Thumb"
              />
              : type[0] === 'video' ?
                <>
                  <div className="photo-container ApE v1d" >
                    <div className="Fdo hty ELG Aic Lns LCR hgf shadowvg">
                      <Triangle_right size={24} />
                    </div>
                  </div>
                  <video ref={videoPreview => (this.videoPreview[i] = videoPreview)} className='k4urcfbm bixrwtb6 datstx6m q9uorilb' src={URL.createObjectURL(this.props.image[i])}></video>
                </>
                : null
            }
          </div>
          <div className="pmk7jnqg nezaghv5 e712q9ov">
            <BtnCloseX onClick={(e) => this.deleteImage(i)} />
          </div>
        </div>
      )
    }
    return row;
  }

  closeJeton = () => {
    this.setState({ jeton: false })
  }
  closeGift = () => {
    this.setState({ open: false })
  }
  render() {
    return (
      <>
        <div className='RpE i09qtzwb Fdo Lns Aic yC0tu tvmbv18p g3zh7qmp flx89l3n mb8dcdod lbhrjshz'>
          <Chose>
            <DropdownContentTemplate name="contenu personalisé" onClick={() => this.props.setSpecialContent(true)}>
              <IconPrivate size={20} />
            </DropdownContentTemplate>
            <DropdownContentTemplate name="envoyer des jetons" onClick={this.handlehiddenFileInput}>
              <svg width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 17.762,9.294c-0.2-0.2-0.462-0.296-0.724-0.292C 16.774,8.998, 16.512,9.094, 16.312,9.294L 9.622,15.212 c-0.392,0.392-0.392,1.030,0,1.422c 0.392,0.392, 1.030,0.392, 1.422,0l 5.992-5.302l 5.992,5.302c 0.392,0.392, 1.030,0.392, 1.422,0 c 0.392-0.392, 0.392-1.030,0-1.422L 17.762,9.294zM 17.762,16.466c-0.2-0.2-0.462-0.296-0.724-0.292C 16.774,16.17, 16.512,16.266, 16.312,16.466l-6.69,5.918 c-0.392,0.392-0.392,1.030,0,1.422c 0.392,0.392, 1.030,0.392, 1.422,0l 5.992-5.3l 5.992,5.3c 0.392,0.392, 1.030,0.392, 1.422,0 c 0.392-0.392, 0.392-1.030,0-1.422L 17.762,16.466zM 17.072,2.144c-8.244,0-14.928,6.684-14.928,14.928S 8.828,32, 17.072,32S 32,25.316, 32,17.072 S 25.316,2.144, 17.072,2.144z M 17.072,30c-7.128,0-12.928-5.8-12.928-12.928s 5.8-12.928, 12.928-12.928S 30,9.944, 30,17.072S 24.2,30, 17.072,30z"></path></g></svg>
            </DropdownContentTemplate>
            <DropdownContentTemplate name="acheter des jetons" onClick={() => this.setState({ jeton: true })}>
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20" height="20" viewBox="0 0 32 32" enableBackground="new 0 0 16 16" xmlSpace="preserve" fill="#000000"> <g><path d="M 17,2C 8.716,2, 2,8.716, 2,17S 8.716,32, 17,32S 32,25.284, 32,17S 25.284,2, 17,2z M 17,30 C 9.832,30, 4,24.168, 4,17S 9.832,4, 17,4S 30,9.832, 30,17S 24.168,30, 17,30zM 18.714,10C 20.526,10, 22,11.346, 22,13C 22,13.552, 22.448,14, 23,14S 24,13.552, 24,13C 24,10.242, 21.628,8, 18.714,8L 18,8 L 18,7 C 18,6.448, 17.552,6, 17,6S 16,6.448, 16,7L 16,8 L 15.286,8 C 12.372,8, 10,10.242, 10,13S 12.372,18, 15.286,18L 16,18 l0,6 L 15.286,24 C 13.474,24, 12,22.654, 12,21 C 12,20.448, 11.552,20, 11,20S 10,20.448, 10,21C 10,23.758, 12.372,26, 15.286,26L 16,26 l0,1 C 16,27.552, 16.448,28, 17,28S 18,27.552, 18,27L 18,26 l 0.714,0 C 21.628,26, 24,23.758, 24,21S 21.628,16, 18.714,16L 18,16 L 18,10 L 18.714,10 z M 18.714,18C 20.526,18, 22,19.346, 22,21S 20.526,24, 18.714,24L 18,24 L 18,18 L 18.714,18 z M 16,16 L 15.286,16 C 13.474,16, 12,14.654, 12,13S 13.474,10, 15.286,10L 16,10 L 16,16 z"></path></g></svg>
            </DropdownContentTemplate>
            {this.props.textLengt > 0 || this.props.image.length > 0 ?
              <>
                <DropdownContentTemplate name="envoyer un cadeau" onClick={() => this.setState({ open: true })}>
                  <IconGiftAlt size={20} />
                </DropdownContentTemplate>
                <DropdownContentTemplate name="photos ou videos" onClick={this.handlehiddenFileInput}>
                  <PhotoIconAlt size={20} />
                </DropdownContentTemplate>
              </>
              : null
            }
          </Chose>
          {this.state.jeton &&
            <PurchasseJeton open={this.state.jeton} close={this.closeJeton} />
          }
          

        </div>
        <div className='Fdo buofh1pr RpE'>
          <div className='RpE buofh1pr ni8dbmo4 stjgntxs czkt41v7 fmqxjp7s'>
            <div className='pmk7jnqg i09qtzwb j83agx80 Lns Aic cgat1ltu tvmbv18p g3zh7qmp flx89l3n mb8dcdod chkx7lpg'>
              <div className='Fdo nhd2j8a9 i09qtzwb Lns Aic yC0tu   g3zh7qmp flx89l3n mb8dcdod chkx7lpg' onClick={this.handlehiddenFileInput}>
                <div className='Fdo nhd2j8a9 lZJ'>
                  <Images size={24} />
                </div>
              </div>
              <input className='mkhogb32'
                accept="image/jpeg,image/jpg,image/png,video/mp4"
                type="file" multiple
                onChange={this.imageChange}
                style={{ display: 'none' }}
                ref={this.hiddenFileInput}
              />
              <div className='Fdo nhd2j8a9 i09qtzwb Lns Aic yC0tu   g3zh7qmp flx89l3n mb8dcdod chkx7lpg'>
                <div className="Fdo nhd2j8a9 lZJ" onClick={() => this.setState({ open: true })}>
                  <Gift size={24} />
                </div>
                <Gifts client={this.props.client} open={this.state.open} close={this.closeGift} />
              </div>
            </div>

            <div className='buofh1pr Fdo flx89l3n dpja2al7 dfr' style={this.props.textLengt == 0 && this.props.image == 0 ?
              { transform: "translateX(75px)" }
              : { transform: "translateX(0)" }}>
              <div className='b3i9ofy5 RpE orhb3f3m czkt41v7 fmqxjp7s emzo65vh rq0escxv buofh1pr hpfvmrgz'>
                {this.props.image.length > 0 && (<div className="Fdo Aic jifvfom9 owycx6da Vnk d1544ag0 tw6a2znq d76ob5m9 k4urcfbm rq0escxv">
                  <this.testImg />
                  <div className='RpE ni8dbmo4 stjgntxs m7zwrmfr tmrshh9y fni8adji hgaippwi fykbt5ly ns4ygwem'>
                    <div className='RpE ni8dbmo4 stjgntxs m7zwrmfr tmrshh9y fni8adji hgaippwi fykbt5ly ns4ygwem' onClick={this.handlehiddenFileInput2}>
                      <button className='sqdOP ELG hty Aic Lns' style={{ background: '#ddd', width: '100%' }}>
                        <div className="Fdo Aic Lns _0PwGv">
                          <Images size={32} />
                        </div>
                      </button>
                    </div>
                    <input className='mkhogb32'
                      accept="image/jpeg,image/jpg,image/png,video/mp4"
                      type="file" multiple
                      onChange={this.imageChange}
                      ref={this.hiddenFileInput2}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>)}
                <div className='Fdo lhclo0ds bkfpd7mw'>
                  <div className="Fdo buofh1pr nhadk0th ozuftl9m  bi6gxh9e hpfvmrgz nmjy RpE" onClick={this.focus}>
                    <Editor
                      editorState={this.props.editorState}
                      onChange={this.props.onChange}
                      plugins={plugins}
                      ref={(element) => {
                        this.editor = element;
                      }}
                      placeholder="Aa"
                      keyBindingFn={this.handleKeyBind}
                      handleKeyCommand={this.handleKeyCommand}
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
      </>
    );
  }
}

