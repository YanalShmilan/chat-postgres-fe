import React, { useEffect } from 'react';
import './Chat.scss';
import Navbar from './Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChats } from '../../store/actions/chat';
import FriendList from './FriendList';
import Messenger from './Messenger';
import useSocket from './hooks/socketConnect';
export default function Chat() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  useSocket(user, dispatch);
  // useEffect(() => {
  //   dispatch(fetchChats());
  // }, [dispatch]);
  return (
    <div id="chat-container">
      <Navbar />
      <div id="chat-wrap">
        <FriendList />
        <Messenger />
      </div>
    </div>
  );
}
