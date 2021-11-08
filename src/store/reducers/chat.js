import {
  FETCH_CHATS,
  SET_CURRENT_CHAT,
  FRIENDS_ONLINE,
  FRIEND_ONLINE,
  FRIEND_OFFLINE,
  SET_SOCKET,
  RECIVED_MESSAGE,
} from '../actions/chat';
const initialState = {
  chats: [],
  currentChat: {},
  socket: {},
  newMessage: { chatId: null, seen: null },
  scrollBottom: 0,
};

const chatReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_CHATS: {
      return {
        ...state,
        chats: payload,
      };
    }
    case SET_CURRENT_CHAT: {
      return {
        ...state,
        currentChat: payload,
      };
    }
    case FRIENDS_ONLINE: {
      const chatsCopy = state.chats.map((chat) => {
        return {
          ...chat,
          Users: chat.Users.map((user) => {
            if (payload.includes(user.id)) {
              return {
                ...user,
                status: 'online',
              };
            }
            return user;
          }),
        };
      });
      return {
        ...state,
        chats: chatsCopy,
      };
    }
    case FRIEND_ONLINE: {
      let cuurentChatCopy = { ...state.currentChat };
      const chatsCopy = state.chats.map((chat) => {
        const Users = chat.Users.map((user) => {
          if (user.id === +payload.id) {
            return {
              ...user,
              status: 'online',
            };
          }
          return user;
        });
        if (chat.id === cuurentChatCopy.id) {
          cuurentChatCopy = {
            ...cuurentChatCopy,
            Users,
          };
        }
        return {
          ...chat,
          Users,
        };
      });
      return {
        ...state,
        chats: chatsCopy,
        currentChat: cuurentChatCopy,
      };
    }
    case FRIEND_OFFLINE: {
      let cuurentChatCopy = { ...state.currentChat };
      const chatsCopy = state.chats.map((chat) => {
        const Users = chat.Users.map((user) => {
          if (user.id === +payload.id) {
            return {
              ...user,
              status: 'offline',
            };
          }
          return user;
        });
        if (chat.id === cuurentChatCopy.id) {
          cuurentChatCopy = {
            ...cuurentChatCopy,
            Users,
          };
        }
        return {
          ...chat,
          Users,
        };
      });
      return {
        ...state,
        chats: chatsCopy,
        currentChat: cuurentChatCopy,
      };
    }
    case SET_SOCKET: {
      return {
        ...state,
        socket: payload,
      };
    }
    case RECIVED_MESSAGE: {
      const { userId, message } = payload;
      let currentChatCopy = { ...state.currentChat };
      let newMessage = { ...state.newMessage };
      let scrollBottom = state.scrollBottom;
      const chatsCopy = state.chats.map((chat) => {
        if (+message.chatId === chat.id) {
          if (message.User.id === +userId) {
            scrollBottom++;
          } else {
            newMessage = {
              chatId: chat.id,
              seen: false,
            };
          }
          if (message.chatId === currentChatCopy.id) {
            currentChatCopy = {
              ...currentChatCopy,
              Messages: [...currentChatCopy.Messages, message],
            };
          }
          return {
            ...chat,
            Messages: [...chat.Messages, message],
          };
        }
        return chat;
      });
      if (scrollBottom === state.scrollBottom) {
        return {
          ...state,
          chats: chatsCopy,
          currentChat: currentChatCopy,
          newMessage: newMessage,
        };
      }
      return {
        ...state,
        chats: chatsCopy,
        currentChat: currentChatCopy,
        newMessage: newMessage,
        scrollBottom,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};
export default chatReducer;
