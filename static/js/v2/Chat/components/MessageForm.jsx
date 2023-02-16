import React, { Component, } from 'react';
import Editor from '@draft-js-plugins/editor';
import Draft, { EditorState, convertToRaw } from 'draft-js'
import createEmojiPlugin from '@draft-js-plugins/emoji';

const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin];
import GiftSend from './Gift/Gift';
import { Atach, Images } from '../../icon/icons';
import { BtnCloseX } from '../../Template/Template';
export default class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.hiddenFileInput = React.createRef(null);
  }


  handlehiddenFileInput = event => {
    this.hiddenFileInput.current.click();
  };

  imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      this.props.imageChange(e);
    }
  };

  newImage = (e) => {
    var dfiles = [];
    var image = this.props.image;
    const img = e.target.files;
    //img.push(e.target.files);
    for (let i = 0; i < image.length; i++) {
      dfiles.push(image[i]);
    }
    for (let i = 0; i < img.length; i++) {
      dfiles.push(img[i]);
    }
    this.props.setImage(dfiles);
  }
  deleteImage = (id) => {
    var dfiles = [];
    var image = this.props.image;
    for (let i = 0; i < image.length; i++) {
      dfiles.push(image[i]);
      dfiles.splice(id, 1);
      if (dfiles.length > 0) {
        this.props.setImage(dfiles);
      } else {
        this.props.setImage(undefined);
      }
    }
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
      row.push(
        <div className='kb5gq1qc pfnyh3mw m7zwrmfr tmrshh9y rs0gx3tq tvfksri0 w0hvl6rk hcukyx3x RpE' key={i}>
          <div className='RpE ni8dbmo4 stjgntxs m7zwrmfr tmrshh9y fni8adji hgaippwi fykbt5ly ns4ygwem'>
            <img className='k4urcfbm bixrwtb6 datstx6m q9uorilb'
              src={URL.createObjectURL(this.props.image[i])}
              alt="Thumb"
            />
          </div>
          <div className="pmk7jnqg nezaghv5 e712q9ov">
            <BtnCloseX onClick={(e) => this.deleteImage(i)} />
          </div>
        </div>
      )
    }
    return row;
  }

  render() {
    return (
      <div className='Fdo buofh1pr RpE'>
        <div className='RpE buofh1pr ni8dbmo4 stjgntxs czkt41v7 fmqxjp7s'>
          <div className='pmk7jnqg i09qtzwb j83agx80 Lns Aic cgat1ltu tvmbv18p g3zh7qmp flx89l3n mb8dcdod chkx7lpg'>
            <div className='Fdo nhd2j8a9 i09qtzwb Lns Aic yC0tu   g3zh7qmp flx89l3n mb8dcdod chkx7lpg' onClick={this.handlehiddenFileInput}>
              <div className='Fdo nhd2j8a9 lZJ'>
                <Images size={24}/>
              </div>
            </div>
            <input className='mkhogb32'
              accept="image/*"
              type="file" multiple
              onChange={this.imageChange}
              style={{ display: 'none' }}
              ref={this.hiddenFileInput}
            />
            <div className='Fdo nhd2j8a9 i09qtzwb Lns Aic yC0tu   g3zh7qmp flx89l3n mb8dcdod chkx7lpg'>
              <GiftSend client_id={this.props.client_id} client={this.props.client} />
            </div>
          </div>

          <div className='buofh1pr Fdo flx89l3n dpja2al7 dfr' style={this.props.textLengt == 0 && !this.props.image ?
            { transform: "translateX(75px)" }
            : { transform: "translateX(0)" }}>
            <div className='b3i9ofy5 RpE orhb3f3m czkt41v7 fmqxjp7s emzo65vh rq0escxv buofh1pr hpfvmrgz'>
              {this.props.image && (<div className="Fdo Aic jifvfom9 owycx6da Vnk d1544ag0 Kmm tw6a2znq d76ob5m9 k4urcfbm rq0escxv">
                <this.testImg />
                <div className='RpE ni8dbmo4 stjgntxs m7zwrmfr tmrshh9y fni8adji hgaippwi fykbt5ly ns4ygwem'>
                  <input className='mkhogb32'
                    accept="image/*"
                    type="file" multiple
                    onChange={this.newImage}
                  />
                </div>
              </div>)}
              <div className='Fdo lhclo0ds bkfpd7mw'>
                <div className="Fdo buofh1pr nhadk0th ozuftl9m aov4n071 bi6gxh9e hpfvmrgz  RpE" onClick={this.focus}>
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
    );
  }
}