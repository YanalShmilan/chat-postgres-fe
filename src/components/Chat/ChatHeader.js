import React, { Fragment, useState } from 'react';
import './ChatHeader.scss';
import { userStatus } from '../../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function ChatHeader({ chat }) {
  const [showChatSettings, setShowChatSettings] = useState(false);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [showLeaveChatModal, setShowLeaveChatModal] = useState(false);
  const [showDeleteChatModal, setShowDeleteChatModal] = useState(false);
  return (
    <Fragment>
      <div id="chatter">
        {chat.Users.map((user) => {
          return (
            <div className="chatter-info">
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <div className="chatter-status">
                <span className={`online-status ${userStatus(user)}`}></span>
              </div>
            </div>
          );
        })}
      </div>
      <FontAwesomeIcon
        onClick={() => setShowChatSettings(!showChatSettings)}
        className="fa-icon"
        icon={['fas', 'ellipsis-v']}
      />
      {showChatSettings ? (
        <div id="settings">
          <div>
            <FontAwesomeIcon className="fa-icon" icon={['fas', 'user-plus']} />
            <p>Add a friend to chat</p>
          </div>
          {chat.type === 'group' ? (
            <div>
              <FontAwesomeIcon
                className="fa-icon"
                icon={['fas', 'sign-out-alt']}
              />
              <p>Leave chat</p>
            </div>
          ) : null}
          <div>
            <FontAwesomeIcon className="fa-icon" icon={['fas', 'trash']} />
            <p>Delete chat</p>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}
