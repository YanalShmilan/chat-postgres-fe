import React, { useState } from 'react';
import './MessageInput.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';

export default function MessageInput({ chat }) {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const user = useSelector((state) => state.authReducer.user);
  const socket = useSelector((state) => state.chatReducer.socket);

  const handleMessage = (e) => {
    setMessage(e.target.value);
    // todo notify other users typing
  };
  const handleKeyDown = (e, imageUpload) => {
    if (e.key === 'Enter') sendMessage(imageUpload);
  };

  const sendMessage = (imageUpload) => {
    if (message.length < 1 && !imageUpload) return;
    const msg = {
      type: imageUpload ? 'image' : 'text',
      fromUserId: user,
      toUserId: chat.Users.map((user) => user.id),
      chatId: chat.id,
      message: imageUpload ? image : message,
    };
    setMessage('');
    setImage('');

    socket.emit('message', msg);
  };

  return (
    <div id="input-container">
      <div id="message-input">
        <input
          type="text"
          value={message}
          placeholder="Message ..."
          onChange={(e) => handleMessage(e)}
          onKeyDown={(e) => handleKeyDown(e, false)}
        />
        <FontAwesomeIcon className="fa-icon" icon={['far', 'smile']} />
      </div>
    </div>
  );
}
