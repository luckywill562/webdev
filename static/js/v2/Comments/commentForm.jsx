import React, { Component } from 'react';
import Draft, { EditorState,convertToRaw } from 'draft-js'
import Editor from '@draft-js-plugins/editor';
import createEmojiPlugin from '@draft-js-plugins/emoji';
import { EditorContent, trim } from '../util/util';
const emojiPlugin = createEmojiPlugin({
  useNativeArt: true,
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const plugins = [emojiPlugin];
export default class CommentForm extends Component {
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
      this.onSend()
      return 'handled';
    }
    return 'not-handled';
  }
  onSend = () => {
    var arr = convertToRaw(this.state.editorState.getCurrentContent()).blocks;
    var text = '';
    for (let i = 0; i < arr.length; i++) {
      text += arr[i].text + '\n';
    }
    this.setState({ editorState: EditorState.createEmpty()});
    this.props.onComment(trim(text));
  }
  render() {
    const text = EditorContent(this.state.editorState);
    return (
      <div className='Fdo buofh1pr RpE'>
        <div className='RpE buofh1pr ni8dbmo4 stjgntxs czkt41v7 fmqxjp7s'>
          <div className='buofh1pr Fdo flx89l3n dpja2al7 dfr'>
            <div className='b3i9ofy5 RpE orhb3f3m czkt41v7 fmqxjp7s emzo65vh rq0escxv buofh1pr hpfvmrgz'>
              <div className='Fdo lhclo0ds bkfpd7mw'>
                <div className="Fdo buofh1pr nhadk0th ozuftl9m aov4n071 bi6gxh9e hpfvmrgz RpE">
                  <Editor
                    editorState={this.state.editorState}
                    onChange={(e) => this.onChange(e)}
                    plugins={plugins}
                    ref={(element) => {
                      this.editor = element;
                    }}
                    onFocus={this.focus}
                    placeholder="Ajouter un commentaire..."
                    keyBindingFn={this.handleKeyBind}
                    handleKeyCommand={(e) => this.handleKeyCommand(e)}
                    className="post container editor"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pmk7jnqg i09qtzwb Fdo taijpn5t bp9cbjyn cgat1ltu tvmbv18p n7fi1qx3">
          <EmojiSelect onOpen={this.focus}  />
        </div>
      </div>
    );
  }
}