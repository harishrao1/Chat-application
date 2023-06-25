import React, { useState } from "react";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { FaPaperPlane, FaRegSmile } from "react-icons/fa";

const ChatInput = ({ onSendMessage, user_list }) => {
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
      setShowPicker(false);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="inputBox">
        <input
          onKeyPress={(event) => handleKeyPress(event)}
          type="text"
          value={message}
          key={message.id}
          id="chatInput"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="emoji-btn"
          onClick={() => setShowPicker((val) => !val)}
        >
          <FaRegSmile />
        </button>
        <button className="send-btn" onClick={handleSendMessage}>
          <FaPaperPlane />
        </button>
      </div>

      <div
        className={`emoji-picker-container ${showPicker ? "show-picker" : ""}`}
      >
        {showPicker && (
          <EmojiPicker
            autoFocusSearch={false}
            height={350}
            width="100%"
            onEmojiClick={onEmojiClick}
            emojiStyle={EmojiStyle.NATIVE}
            style={{}}
          />
        )}
      </div>
    </>
  );
};

export default ChatInput;
