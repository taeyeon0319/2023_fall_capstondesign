import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import socketIOClient from "socket.io-client";
import ChatInput from "../components/ChatInput/ChatInput";
import ChatLog from "../components/ChatLog/ChatLog";
import Loading from "./Loading";

//const socket = socketIOClient("localhost:5000");

const ChatTest = () => {
  const { roomName, userName } = useParams();
  const myInfo = {
    roomName: roomName ? roomName : localStorage.getItem("roomName"),
    userName: userName ? userName : localStorage.getItem("userName"),
  };
  const [currentSocket, setCurrentSocket] = useState();

  useEffect(() => {
    setCurrentSocket(socketIOClient("localhost:5001"));
  }, []);

  if (currentSocket) {
    currentSocket.on("connect", () => {
      currentSocket.emit("join", myInfo);
    });
  }

  return (
    <div>
      {currentSocket ? (
        <>
        <div>{roomName}</div>
        <div>{userName}</div>
          <ChatLog socket={currentSocket}></ChatLog>
          <ChatInput userName={userName} socket={currentSocket}></ChatInput>
        </>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
};

export default ChatTest;