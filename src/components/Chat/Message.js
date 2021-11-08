import React from 'react';
import './Message.scss';
export default function Message({ user, chat, index, message }) {
  const margin = () => {
    if (index + 1 === chat.Messages.length) return;
    return message.fromUserId === chat.Messages[index + 1] ? 'mb-5' : 'mb-10';
  };
  return (
    <div
      className={`message ${margin()} ${
        message.fromUserId === user.id ? 'creator' : ''
      }`}
    >
      <div
        className={message.fromUserId === user.id ? 'owner' : 'other-person'}
      >
        {message.fromUserId !== user.id ? (
          <h6 className="m-0">
            {message.User.firstName} {message.User.lastName}
          </h6>
        ) : null}
        {message.type === 'text' ? (
          <p className="m-0">{message.message}</p>
        ) : (
          <img src={message.message} alt="user-upload" />
        )}
      </div>
    </div>
  );
}
