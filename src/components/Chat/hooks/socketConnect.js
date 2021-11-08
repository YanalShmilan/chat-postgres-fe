import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import {
  offlineFriend,
  onlineFriend,
  onlineFriends,
  fetchChats,
  setSocket,
  recivedMessage,
} from '../../../store/actions/chat';
function useSocket(user, dispatch) {
  useEffect(() => {
    dispatch(fetchChats()).then((res) => {
      const socket = socketIOClient.connect('http://localhost:5000');
      dispatch(setSocket(socket));
      socket.emit('join', user);
      socket.on('typing', (user) => {
        console.log('event', user);
      });
      socket.on('friends', (friends) => {
        console.log('friends', friends);
        dispatch(onlineFriends(friends));
      });
      socket.on('online', (user) => {
        console.log('online', user);
        dispatch(onlineFriend(user));
      });
      socket.on('offline', (user) => {
        console.log('offline', user);
        dispatch(offlineFriend(user));
      });
      socket.on('recived', (message) => {
        dispatch(recivedMessage(message));
      });
    });
  }, [dispatch]);
}

export default useSocket;
