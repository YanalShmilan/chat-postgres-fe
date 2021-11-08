import React from 'react';
import './Friend.scss';
import { userStatus } from '../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import avatar from '../../assets/images/avatar.svg';
export default function Friend({ chat, click }) {
  const currentChat = useSelector((state) => state.chatReducer.currentChat);

  const isChatOpen = () => {
    return currentChat.id === chat.id ? 'opened' : '';
  };
  const lastMsg = () => {
    if (chat.Messages.length === 0) return '';
    const message = chat.Messages[chat.Messages.length - 1];
    return message.type === 'image' ? 'image uploaded' : message.message;
  };

  return (
    <div onClick={click} className={`friend-list ${isChatOpen()}`}>
      <div>
        <img
          width="40"
          height="40"
          src={
            chat.Users[0].avatar.endsWith('null')
              ? avatar
              : chat.Users[0].avatar
          }
          alt="avatar"
        />
        <div className="friend-info">
          <h4 className="m-0">
            {chat.Users[0].firstName} {chat.Users[0].lastName}
          </h4>
          <h5 className="m-0">{lastMsg()}</h5>
        </div>
      </div>
      <div className="friend-status">
        <span className={`online-status ${userStatus(chat.Users[0])}`}></span>
      </div>
    </div>
  );
}
