import React from 'react';
import './Messenger.scss';
import { useSelector, useDispatch } from 'react-redux';
import ChatHeader from './ChatHeader';
import MessageBox from './MessageBox';
import MessageInput from './MessageInput';

export default function Messenger() {
  const chat = useSelector((state) => state.chatReducer.currentChat);
  const activeChat = () => {
    return Object.keys(chat).length > 0;
  };
  return (
    <div id="messenger" className="shadow-light">
      {activeChat() ? (
        <div id="messenger-wrap">
          <ChatHeader chat={chat} />
          <hr />
          <MessageBox chat={chat} />
          <MessageInput chat={chat} />
        </div>
      ) : (
        <p>No active chat</p>
      )}
    </div>
  );
}
