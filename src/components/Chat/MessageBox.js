import React, { useEffect, useRef, useState } from 'react';
import './MessageBox.scss';
import { useSelector, useDispatch } from 'react-redux';
import Message from './Message';
import { paginateMessages } from '../../store/actions/chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MessageBox({ chat }) {
  const user = useSelector((state) => state.authReducer.user);
  const scrollBottom = useSelector((state) => state.chatReducer.scrollBottom);
  const senderTyping = useSelector((state) => state.chatReducer.senderTyping);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleInfinitScroll = (e) => {
    if (e.target.scrollTop === 0) {
      setLoading(true);
      const pagination = chat.Pagination;
      const page = typeof pagination === 'undefined' ? 1 : pagination.page;
      //dispatch
      dispatch(paginateMessages(chat.id, +page + 1)).then((res) => {
        setLoading(false);
      });
    }
  };
  const msgBox = useRef();
  useEffect(() => {
    setTimeout(() => {
      scrollManual(msgBox.current.scrollHeight);
    }, 100);
  }, [scrollBottom]);
  const scrollManual = (value) => {
    msgBox.current.scrollTop = value;
  };
  return (
    <div onScroll={handleInfinitScroll} id="msg-box" ref={msgBox}>
      {loading ? (
        <p className="loader m-0">
          <FontAwesomeIcon icon="spinner" className="fa-spin'" />{' '}
        </p>
      ) : null}
      {chat.Messages.map((message, index) => {
        return (
          <Message
            user={user}
            index={index}
            chat={chat}
            message={message}
            key={message.id}
          />
        );
      })}
      {senderTyping.typing && senderTyping.chatId === chat.id ? (
        <div className="message">
          <div className="other-person">
            <p className="m-0">{senderTyping.fromUser.firstName} typing...</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
