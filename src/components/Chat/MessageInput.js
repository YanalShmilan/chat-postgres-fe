import React, { useState, useRef, useEffect } from 'react';
import './MessageInput.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import ChatService from '../../services/ChatService';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { increamentScroll } from '../../store/actions/chat';

export default function MessageInput({ chat }) {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const socket = useSelector((state) => state.chatReducer.socket);
  const newMessage = useSelector((state) => state.chatReducer.newMessage);
  const [showNotfication, setShowNotfication] = useState(false);
  const fileUpload = useRef();
  const msgInput = useRef();
  const handleMessage = (e) => {
    const value = e.target.value;
    setMessage(value);
    // todo notify other users typing
    const reciver = {
      chatId: chat.id,
      fromUser: user,
      toUserId: chat.Users.map((user) => user.id),
    };
    if (value.length === 1) {
      reciver.typing = true;
      socket.emit('typing', reciver);
    }
    if (value.length === 0) {
      reciver.typing = false;
      socket.emit('typing', reciver);
    }
  };
  const handleKeyDown = (e, imageUpload) => {
    if (e.key === 'Enter') sendMessage(imageUpload);
  };

  useEffect(() => {
    if (!newMessage.seen && newMessage.chatId === chat.id) {
      const msgBox = document.getElementById('msg-box');
      if (msgBox.scrollTop > msgBox.scrollHeight * 0.3) {
        dispatch(increamentScroll());
      } else {
        setShowNotfication(true);
      }
    } else {
      setShowNotfication(false);
    }
  }, [newMessage, dispatch]);

  const showMessage = () => {
    dispatch(increamentScroll());
    setShowNotfication(false);
  };
  const handleImageUpload = () => {
    const formData = new FormData();
    formData.append('id', chat.id);
    formData.append('image', image);

    // chat service
    ChatService.uploadImage(formData)
      .then((res) => {
        console.log(res);
        sendMessage(res);
      })
      .catch((err) => console.log(err));
  };
  const selectEmoji = (emoji) => {
    const startingPosition = msgInput.current.selectionStart;
    const endingPosition = msgInput.current.selectionEnd;
    const emojiLength = emoji.native.length;
    const value = msgInput.current.value;
    setMessage(
      value.substring(0, startingPosition) +
        emoji.native +
        value.substring(endingPosition, value.length)
    );
    msgInput.current.focus();
    msgInput.current.selectionEnd = endingPosition + emojiLength;
  };

  const sendMessage = (imageUpload) => {
    console.log(imageUpload);
    if (message.length < 1 && !imageUpload) return;

    const msg = {
      type: imageUpload ? 'image' : 'text',
      fromUserId: user,
      toUserId: chat.Users.map((user) => user.id),
      chatId: chat.id,
      message: imageUpload ? imageUpload : message,
    };
    setMessage('');
    setImage('');
    setShowEmojiPicker(false);
    socket.emit('message', msg);
  };

  return (
    <div id="input-container">
      <div id="image-upload-container">
        <div>
          {showNotfication ? (
            <div id="message-notification" onClick={showMessage}>
              <FontAwesomeIcon icon="bell" className="fa-icon" />
              <p className="m-0">new message</p>
            </div>
          ) : null}
        </div>
        <div id="image-upload">
          {image.name ? (
            <div id="image-details">
              <p className="m-0">{image.name}</p>
              <FontAwesomeIcon
                icon="upload"
                className="fa-icon"
                onClick={handleImageUpload}
              />
              <FontAwesomeIcon
                icon="times"
                className="fa-icon"
                onClick={() => setImage('')}
              />
            </div>
          ) : null}
          <FontAwesomeIcon
            icon={['far', 'image']}
            className="fa-icon"
            onClick={() => fileUpload.current.click()}
          />
        </div>

        <input
          id="chat-image"
          ref={fileUpload}
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <div id="message-input">
        <input
          ref={msgInput}
          type="text"
          value={message}
          placeholder="Message ..."
          onChange={(e) => handleMessage(e)}
          onKeyDown={(e) => handleKeyDown(e, false)}
        />
        <FontAwesomeIcon
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="fa-icon"
          icon={['far', 'smile']}
        />
        {showEmojiPicker ? (
          <Picker
            style={{ position: 'absolute', bottom: '20px', right: '20px' }}
            onSelect={selectEmoji}
          />
        ) : null}
      </div>
    </div>
  );
}
