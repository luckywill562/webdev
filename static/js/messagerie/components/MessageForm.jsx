import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client'

const MessageForm = ({ sender_id,receiver_id,conversation_id }) => {
  const [message, setMessage] = useState('');
  const [addMessage] = useMutation(ADD_MESSAGE)
  const handleSubmit = (e) => {
    e.preventDefault();
    addMessage({ variables: { subject:message, sender_id,receiver_id,conversation_id } })
    setMessage('');
  };

  return (
    <div className='form-container'>
      <form>
        <input
          type='text'
          name='message'
          id='message'
          value={message}
          placeholder='Enter message'
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit' onClick={handleSubmit}>
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageForm;

const ADD_MESSAGE = gql`
  mutation addMessage($subject:String!,$sender_id:ID!,$receiver_id:ID!,$conversation_id:ID!){
    addMessage(subject:$subject,sender_id:$sender_id,receiver_id:$receiver_id,conversation_id:$conversation_id){
      id
    }
  }
`