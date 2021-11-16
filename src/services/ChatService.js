import API from './api';

const ChatService = {
  fetchChats: () => {
    return API.get('/chats')
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
  uploadImage: (data) => {
    return API.post('/chats/upload-image', data)
      .then((res) => {
        return res.data.url;
      })
      .catch((err) => {
        throw err;
      });
  },
  paginateMessage: (id, page) => {
    return API.get('/chats/messages', {
      params: {
        id,
        page,
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  },
  searchUsers: (term) => {
    return API.get('/users/search-users', {
      params: {
        term,
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw err;
      });
  },
  createChat: (partnerId) => {
    return API.post('/chats/create', { partnerId })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  },
};

export default ChatService;
