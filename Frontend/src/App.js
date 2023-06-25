import React, { useEffect, useState } from "react";
import ChatInput from "./components/ChatInput";
import ChatMessage from "./components/ChatMessage";
import "./App.css";
import io from "socket.io-client";
import ReactScrollToButton from "react-scroll-to-bottom";
const socket = io("http://localhost:5000", { transports: ["websocket"] });
const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

function App() {
  const [messages, setMessages] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    socket.on("messages", (messageList) => {
      setMessages(messageList);
    });
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("like", (updatedLikes) => {
      setLikes(updatedLikes);
    });
    return () => {
      socket.off("messages");
      socket.off("message");
      socket.off("like");
    };
  }, []);
  const handleSendMessage = (text) => {
    const randomUserName =
      user_list[Math.floor(Math.random() * user_list.length)];
    const newMessage = {
      id: Math.random().toString(36).substr(2, 9),
      username: randomUserName,
      text: text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    socket.emit("chat message", newMessage);
  };

  const handleLike = (messageId) => {
    socket.emit("like", messageId);
  };

  console.log(messages);
  return (
    <div className="chatPage">
      <div className="chatContainer">
        <ReactScrollToButton className="chatBox">
          {messages.map((message) => {
            return (
              <ChatMessage
                key={message.id}
                likes={likes[message.id] || 0}
                message={message}
                onLike={handleLike}
              />
            );
          })}
        </ReactScrollToButton>

        <ChatInput onSendMessage={handleSendMessage} user_list={user_list} />
      </div>
    </div>
  );
}

export default App;
