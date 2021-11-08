import React from 'react';
import './MessageBox.scss';
import { useSelector, useDispatch } from 'react-redux';
import Message from './Message';

export default function MessageBox({ chat }) {
  const user = useSelector((state) => state.authReducer.user);

  return (
    <div id="msg-box">
      {chat.Messages.map((message, index) => {
        return (
          <Message
            user={user}
            index={index}
            chat={chat}
            message={message}
            key={message.id}
          />
        );
      })}
    </div>
  );
}
