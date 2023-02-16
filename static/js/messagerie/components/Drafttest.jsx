import React, { Component } from 'react';
import Draft, { EditorState } from 'draft-js'
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createEmojiPlugin from '@draft-js-plugins/emoji';

const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin];


export default class SimpleEmojiEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };

  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
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
  testImg = () => {
    let row = [];
    for (let i = 0; i < this.props.image.length; i++) {
      row.push(
        <div className='kb5gq1qc pfnyh3mw m7zwrmfr tmrshh9y rs0gx3tq tvfksri0 w0hvl6rk hcukyx3x l9j0dhe7' key={i}>
          <div className='l9j0dhe7 ni8dbmo4 stjgntxs m7zwrmfr tmrshh9y fni8adji hgaippwi fykbt5ly ns4ygwem'>
            <img className='k4urcfbm bixrwtb6 datstx6m q9uorilb'
              src={URL.createObjectURL(this.props.image[i])}
              alt="Thumb"
            />
          </div>
          <div className='pmk7jnqg nezaghv5 e712q9ov'>
            <div className='oajrlxb2 qu0x051f esr5mh6w e9989ue4 r7d6kgcz nhd2j8a9 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x i1ao9s8h esuyzwwr f1sip0of abiwlrkh p8dawk7l lzcic4wl bp9cbjyn s45kfl79 emlxlaya bkmhp75w spb7xbtv rt8b4zig n8ej3o3l agehan2d sk4xxmp2 rq0escxv j83agx80 taijpn5t jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso l9j0dhe7 rgmg9uty b73ngqbp hn33210v m7msyxje m9osqain'>
              <span onClick={(e) => this.deleteImage(i)}>x</span>
            </div>
          </div>
        </div>
      )
    }
    return row;
  }

  render() {
    return (
      <div className='Fdo buofh1pr l9j0dhe7'>
        <div className='l9j0dhe7 buofh1pr ni8dbmo4 stjgntxs czkt41v7 fmqxjp7s'>
          <div className='buofh1pr j83agx80 flx89l3n dpja2al7 dfr' style={this.props.textLengt == 0 && !this.props.image ?
            { transform: "translateX(100px)" }
            : { transform: "translateX(0)" }}>
            <div className='b3i9ofy5 l9j0dhe7 orhb3f3m czkt41v7 fmqxjp7s emzo65vh rq0escxv buofh1pr hpfvmrgz'>
              {this.props.image && (<div className="j83agx80 bp9cbjyn jifvfom9 owycx6da pybr56ya d1544ag0 f10w8fjw tw6a2znq d76ob5m9 k4urcfbm rq0escxv">
                <this.testImg />
                <div className='l9j0dhe7 ni8dbmo4 stjgntxs m7zwrmfr tmrshh9y fni8adji hgaippwi fykbt5ly ns4ygwem'>
                  <input className='mkhogb32'
                    accept="image/*"
                    type="file" multiple
                    onChange={this.newImage}
                  />
                </div>
              </div>)}
              <div className='j83agx80 lhclo0ds bkfpd7mw'>
                <div className="j83agx80 buofh1pr nhadk0th ozuftl9m aov4n071 bi6gxh9e hpfvmrgz l9j0dhe7" onClick={this.focus}>
                  <Editor
                    editorState={this.props.editorState}
                    onChange={this.props.onChange}
                    plugins={plugins}
                    ref={(element) => {
                      this.editor = element;
                    }}
                    placeholder="Aa"
                    keyBindingFn={this.props.keyBindingFn}
                    handleKeyCommand={this.props.handleKeyCommand}
                    className="post container editor"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pmk7jnqg i09qtzwb j83agx80 taijpn5t bp9cbjyn cgat1ltu tvmbv18p n7fi1qx3">
          <EmojiSelect />
        </div>
        <EmojiSuggestions />
      </div>
    );
  }
}