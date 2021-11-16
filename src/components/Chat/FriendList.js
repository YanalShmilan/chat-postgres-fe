import React, { useState, Fragment } from 'react';
import './FriendList.scss';
import { useSelector, useDispatch } from 'react-redux';
import Friend from './Friend';
import Modal from '../Modal/Modal';
import { setCurrentChat } from '../../store/actions/chat';
import ChatService from '../../services/ChatService';
export default function FriendList() {
  const dispatch = useDispatch();
  const [showFriendsModal, setShowFriendsModla] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const chats = useSelector((state) => state.chatReducer.chats);
  const openChat = (chat) => {
    dispatch(setCurrentChat(chat));
  };
  const searchFriend = (e) => {
    ChatService.searchUsers(e.target.value).then((res) => setSuggestions(res));
  };
  const addNewFriend = (id) => {
    // dispatch
  };
  return (
    <div id="friends" className="shadow-light">
      <div id="title">
        <h3 className="m-0">Friends</h3>
        <button onClick={() => setShowFriendsModla(true)}>ADD</button>
      </div>
      <hr />
      <div id="friends-box">
        {chats.length > 0 ? (
          chats.map((chat) => {
            return (
              <Friend click={() => openChat(chat)} chat={chat} key={chat.id} />
            );
          })
        ) : (
          <p id="no-chat">No friends added</p>
        )}
      </div>
      {showFriendsModal && (
        <Modal click={() => setShowFriendsModla(false)}>
          <Fragment key="header">
            <h3 className="m-0">Create new chat</h3>
          </Fragment>
          <Fragment key="body">
            <p>Find friends by name</p>
            <input
              type="text"
              placeholder="search..."
              onInput={(e) => searchFriend(e)}
            />
            <div id="suggestions">
              {suggestions.map((user) => {
                return (
                  <div key={user.id} className="suggestion">
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                    <button
                      className="m-0"
                      onClick={() => addNewFriend(user.id)}
                    >
                      Add
                    </button>
                  </div>
                );
              })}
            </div>
          </Fragment>
        </Modal>
      )}
    </div>
  );
}
