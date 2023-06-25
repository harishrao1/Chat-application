import React from "react";
import Avatar, { ConfigProvider } from "react-avatar";
import { AiFillLike } from "react-icons/ai";

const ChatMessage = ({ message, onLike, likes }) => {
  return (
    <>
      <div className="messageBox">
        <div className="avatar">
          <ConfigProvider colors={["red", "green", "blue", "orange"]}>
            <Avatar name={message.username} size="35" round={true} />
          </ConfigProvider>
          <span>
            <strong>{message.username}</strong>
          </span>
          <span className="timestamp"> {message.timestamp}</span>
        </div>

        <div className="message-content">
          <span>{message.text}</span>
          <button className="likeBtn" onClick={() => onLike(message.id)}>
            <AiFillLike />
            {""}
            {likes}
            {/* <span>{likes}</span> */}
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
