import React from 'react'
import '../../../css/messagerie.css';
import fetch from '../../util/async';
import {useHistory} from "react-router-dom";
export default class loading extends React.Component{
    constructor({user}){
        super()
        this.state = {
            Loading: false,
            messageList: [],
            url: '/message',
            client_active: user,
            ChatContent: [],
            chat_value: '',
            conversation_id: 0,
            isConversation: false,
        }
    }

    componentDidMount(){
        const id = this.state.client_active
        this.setState({Loading:true})
        var formData = new FormData();
        formData.append('url',this.state.url)
        formData.append('client_id', this.state.client_active)
        fetch(this.state.url,formData,
            data => {
                if(data.success === 1){
                   this.setState({messageList: data.messages})
                   this.setState({isConversation: data.is_conversation})
                   const messageList = this.state.messageList.slice()
                    if(this.state.isConversation === true){
                       const objIndex = messageList.findIndex((messageList => messageList.client_id === id));
                       this.setState({conversation_id: messageList[objIndex].conversation_id})  
                    }
                    if(this.state.client_active != null){
                        this.setState({client_active: id})
                        this.getMessageCore(id)
                    }
                }else{
                    window.location.href = "/";
                }
            }
        )
        
    }

    getMessageCore = async(id) =>{
        const messageList = this.state.messageList.slice()
        if(this.state.isConversation === true){
            const objIndex = messageList.findIndex((messageList => messageList.client_id === id));
            this.setState({conversation_id: messageList[objIndex].conversation_id})  
        }
        var formData = new FormData();
        formData.append('url','RESTAPI/views/getMessages')
        formData.append('client_id', id)
        fetch('/getMessages',formData,
            data => {
                if(data.success === 1){
                    this.setState({ChatContent: data.discussions})  
                }
            }
        )
    }
    
    HandleChangeDiscussion = async(id) =>{
        this.setState({isConversation: true})
        this.setState({client_active: id})
        this.getMessageCore(id)
    }
    messageTemplate = ()=>{
        const history = useHistory();
        return(
            <div className="side-bar-message-wrapper message-scrollabled-list">
            {this.state.messageList.map(message=>(
               <div key={message.chat_id} className={this.state.client_active === message.client_id ? 'active' : ''}> 
                <div onClick={(event) =>{
                    event.preventDefault();
                    if(this.state.client_active != message.client_id){
                        history.push(`/messenger?u_id=${message.client_id}`)
                    }
                    this.HandleChangeDiscussion(message.client_id)
                    }}>{message.message_text}</div>
               </div>
            ))}
            </div>
        )
    }
    HandleChange = (e)=>{
        const name = e.target.name;
        this.setState({[name]: e.target.value})
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        console.log(this.state.conversation_id)
         if(this.state.chat_value != ''){
             /*push conversation*/
             const discussion = this.state.ChatContent.slice()
             const random_token = Math.floor((Math.random()  * 10000000000000000000) + 1);
             const message = [{message_text: this.state.chat_value,message_text_id: random_token,sended: true}]
             discussion.unshift(message[0])
             this.setState({ChatContent: discussion})
             this.setState({chat_value: ''})
             var formData = new FormData();
             formData.append('url','RESTAPI/sendMessage')
             formData.append('client_id',this.state.client_active)
             formData.append('message',this.state.chat_value)
             formData.append('conversation_id', this.state.conversation_id)
             fetch('/api',formData,
                 data => {
                    if(data.success === 1){
                        
                    }
                 }
             )      
        }else{
            alert('vous avez rien composer');
        }
    }

     handleUserKeyPress = e => {
        if (e.key === "Enter" && !e.shiftKey) {
           e.preventDefault();
          this.handleSubmit(e); // this won't be triggered
        }
    };
    
    render(){
        return(
            <div className="Fdo messagerie-container sLayout">
                <div className="container-box messages-wrapper">
                <div className="Fdo messages-listing">
                    <div className="messages-list-wrapper">
                        <div className="messages-list-header">
                            <h3 className="messages-list-title">messages</h3>
                            <div className="icon-message-seting">
                                <svg width="24" height="24" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g><path d="M 27.526,12.682c-0.252-0.876-0.594-1.71-1.028-2.492l 1.988-4.182c-0.738-0.92-1.574-1.756-2.494-2.494 l-4.182,1.988c-0.78-0.432-1.616-0.776-2.492-1.028L 17.762,0.102C 17.184,0.038, 16.596,0, 16,0S 14.816,0.038, 14.238,0.102L 12.682,4.474 C 11.808,4.726, 10.972,5.070, 10.192,5.502L 6.008,3.514c-0.92,0.738-1.756,1.574-2.494,2.494l 1.988,4.182 c-0.432,0.78-0.776,1.616-1.028,2.492L 0.102,14.238C 0.038,14.816,0,15.404,0,16s 0.038,1.184, 0.102,1.762l 4.374,1.556 c 0.252,0.876, 0.594,1.71, 1.028,2.492l-1.988,4.182c 0.738,0.92, 1.574,1.758, 2.494,2.494l 4.182-1.988 c 0.78,0.432, 1.616,0.776, 2.492,1.028l 1.556,4.374C 14.816,31.962, 15.404,32, 16,32s 1.184-0.038, 1.762-0.102l 1.556-4.374 c 0.876-0.252, 1.71-0.594, 2.492-1.028l 4.182,1.988c 0.92-0.738, 1.758-1.574, 2.494-2.494l-1.988-4.182 c 0.432-0.78, 0.776-1.616, 1.028-2.492l 4.374-1.556C 31.962,17.184, 32,16.596, 32,16s-0.038-1.184-0.102-1.762L 27.526,12.682z M 16,24 c-4.418,0-8-3.582-8-8c0-4.418, 3.582-8, 8-8s 8,3.582, 8,8C 24,20.418, 20.418,24, 16,24zM 12,16A4,4 1080 1 0 20,16A4,4 1080 1 0 12,16z"></path></g></svg>
                            </div>
                        </div>
                        <div className="conversation-list-content">
                            <this.messageTemplate/>
                        </div>
                    </div>
                </div>
                <div className=" messages-text-container">
                    <div className="conversation-container">
                        <div className="conversation-header">

                        </div>
                        <div className="conversation-main">
                    {this.state.ChatContent.map(message=>(
                       <div className={message.sended === true ? 'drf': 'rfg'} key={message.message_text_id}>
                           <div className="LPN ELG">
                               <div className="LPN">
                                   <div className="LPN">
                                       <div className="LPN GHT">
                                           <div className="KHv">
                                               <div className={message.sended === true ? 'GTJ': 'GTJ bBB'}>
                                                   <span>{message.message_text}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                       </div>
                    ))}
                        </div>
                        {this.state.isConversation === true && this.state.conversation_id != 0 ?
                    <form method="POST" onSubmit={this.handleSubmit}>
                        <textarea onKeyPress={this.handleUserKeyPress} rows="4" placeholder="votre message" onChange={this.HandleChange} name="chat_value" value={this.state.chat_value}></textarea>
                        <button type="submit">Send</button>
                    </form>
                    : null}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
