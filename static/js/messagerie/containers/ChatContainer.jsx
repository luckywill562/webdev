import React, { Suspense, lazy } from 'react';
import Fetch from '../../util/async';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
const MessagesList = lazy(() => import('../components/MessageList'));
const CoreMessage = lazy(() => import('../components/Core'));
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messagesList: [],
      conversation_id: 24,
      c_user: this.props.c_user,
      c_user_id: this.props.c_user.user_id,
    }
  }

  componentDidMount() {
    var formData = new FormData();
    formData.append('url', '/live')
    Fetch('/live', formData,
      data => {
        if (data.success === 1) {
          this.setState({ messagesList: data.messages })
        }
      }
    )
    this.props.w_socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data)
      if (data.status === 200 && data.message_type === 'text') {
        this.updateList(data.messages)
      } else if (data.status === 200 && data.message_type === 'update_message_to_view') {
        const message_list = this.state.messagesList.slice();
        const objIndex = message_list.findIndex((message_list => +message_list.client_id === +data.client_id));
        message_list[objIndex].status = 1;
        this.setState({ messagesList: message_list })
      }
    })
  }

  updateList = (newlist) => {
    const message_list = this.state.messagesList.slice();
    const objIndex = message_list.findIndex((message_list => +message_list.client_id === newlist.client_id));
    //retire le message
    if (objIndex > -1) {
      message_list.splice(objIndex, 1);
    }
    //puis reinsere le message en haut
    message_list.unshift(newlist);
    //modification de l'etat
    this.setState({ messagesList: message_list })
  }

  render() {
    return (

      <React.Fragment>
        <div className='Fdo Bcg Nfb ELG Flk main-app-width' >
          <div className="Fdo messagerie-container sLayout">
            <div className="container-box messages-wrapper">
              <div className="Fdo messages-listing">
                <div className="messages-list-wrapper">
                  <div className="messages-list-header">
                    <div className="messages-list-title">messages</div>
                    <div className="icon-message-seting">
                      <svg width="24" height="24" viewBox="0 0 32 32" fill="#000000"><g><path d="M 27.526,12.682c-0.252-0.876-0.594-1.71-1.028-2.492l 1.988-4.182c-0.738-0.92-1.574-1.756-2.494-2.494 l-4.182,1.988c-0.78-0.432-1.616-0.776-2.492-1.028L 17.762,0.102C 17.184,0.038, 16.596,0, 16,0S 14.816,0.038, 14.238,0.102L 12.682,4.474 C 11.808,4.726, 10.972,5.070, 10.192,5.502L 6.008,3.514c-0.92,0.738-1.756,1.574-2.494,2.494l 1.988,4.182 c-0.432,0.78-0.776,1.616-1.028,2.492L 0.102,14.238C 0.038,14.816,0,15.404,0,16s 0.038,1.184, 0.102,1.762l 4.374,1.556 c 0.252,0.876, 0.594,1.71, 1.028,2.492l-1.988,4.182c 0.738,0.92, 1.574,1.758, 2.494,2.494l 4.182-1.988 c 0.78,0.432, 1.616,0.776, 2.492,1.028l 1.556,4.374C 14.816,31.962, 15.404,32, 16,32s 1.184-0.038, 1.762-0.102l 1.556-4.374 c 0.876-0.252, 1.71-0.594, 2.492-1.028l 4.182,1.988c 0.92-0.738, 1.758-1.574, 2.494-2.494l-1.988-4.182 c 0.432-0.78, 0.776-1.616, 1.028-2.492l 4.374-1.556C 31.962,17.184, 32,16.596, 32,16s-0.038-1.184-0.102-1.762L 27.526,12.682z M 16,24 c-4.418,0-8-3.582-8-8c0-4.418, 3.582-8, 8-8s 8,3.582, 8,8C 24,20.418, 20.418,24, 16,24zM 12,16A4,4 1080 1 0 20,16A4,4 1080 1 0 12,16z"></path></g></svg>
                    </div>
                  </div>
                  <div className="conversation-list-content">
                    <div className="side-bar-message-wrapper message-scrollabled-list messagerie">
                      {this.state.messagesList.map((message, index) => (
                        <div key={message.id}>
                          <MessagesList to={`${this.props.match.url}/` + `${message.client_id}/`} index={index} list={this.state.messagesList} message={message} subject={message.subject} client={message.client} ws={this.props.w_socket} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="messages-text-container">
                <div className="conversation-container">
                  <Suspense fallback={<div>Chargement...</div>}>
                    <Switch>
                      <Route exact path={this.props.match.path}>
                        <h3>Bienvenue sur Zahra messenger</h3>
                      </Route>
                      <Route exact path={`${this.props.match.path}/:id`}>
                        <CoreMessage updateList={this.updateList} client={this.props.w_socket} c_user={this.state.c_user} />
                      </Route>
                      <Route path={`${this.props.match.path}/*`}><h1>eroor</h1></Route>
                    </Switch>
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Chat);


