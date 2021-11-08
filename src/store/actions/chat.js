import ChatService from '../../services/ChatService';

export const FETCH_CHATS = 'FETCH_CHATS';
export const SET_CURRENT_CHAT = 'SET_CURRENT_CHAT';
export const FRIENDS_ONLINE = 'FRIENDS_ONLINE';
export const FRIEND_ONLINE = 'FRIEND_ONLINE';
export const FRIEND_OFFLINE = 'FRIEND_OFFLINE';
export const SET_SOCKET = 'SET_SOCKET';
export const RECIVED_MESSAGE = 'RECIVED_MESSAGE';

export const fetchChats = () => (dispatch) => {
  return ChatService.fetchChats()
    .then((res) => {
      res.data.forEach((chat) => {
        chat.Users.forEach((user) => {
          user.status = 'offline';
        });
        chat.Messages.reverse();
      });
      dispatch({ type: FETCH_CHATS, payload: res.data });
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const setCurrentChat = (chat) => (dispatch) => {
  dispatch({ type: SET_CURRENT_CHAT, payload: chat });
};
export const onlineFriends = (friends) => (dispatch) => {
  dispatch({ type: FRIENDS_ONLINE, payload: friends });
};
export const onlineFriend = (friend) => (dispatch) => {
  dispatch({ type: FRIEND_ONLINE, payload: friend });
};
export const offlineFriend = (friend) => (dispatch) => {
  dispatch({ type: FRIEND_OFFLINE, payload: friend });
};
export const setSocket = (socket) => (dispatch) => {
  dispatch({ type: SET_SOCKET, payload: socket });
};
export const recivedMessage = (message, userId) => (dispatch) => {
  dispatch({ type: RECIVED_MESSAGE, payload: { message, userId } });
};