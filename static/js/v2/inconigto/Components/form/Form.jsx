import React, { Component, } from 'react';
import Editor from '@draft-js-plugins/editor';
import Draft from 'draft-js'
import createEmojiPlugin from '@draft-js-plugins/emoji';
const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin];
import { Images, Triangle_right } from '../../../icon/icons';
import { BtnCloseX } from '../../../Template/Template';
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
              
            </div>

            <div className='buofh1pr Fdo flx89l3n dpja2al7 dfr' style={this.props.textLengt == 0 && this.props.image == 0 ?
              { transform: "translateX(35px)" }
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
                  <div className="Fdo buofh1pr nhadk0th ozuftl9m nmjy  bi6gxh9e hpfvmrgz  RpE" onClick={this.focus}>
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
      </>
    );
  }
}

