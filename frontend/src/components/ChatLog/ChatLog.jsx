import React, { useEffect, useState } from "react";
import styled from "styled-components";
import arrowSendImg from '../../img/arrowSend.png';
import arrowReplyImg from '../../img/arrowReply.png';
const Root = styled.div`
width: 100vw;
height:100vh;
background: #FFF8F3;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
`
const ChatRectBox = styled.div`
  width: 65%;
  height: 91.12vh;
  display: flex;
`;

const ChatRectTitle = styled.div`
  width: 30.6vw;
  height: 6.3vh;
  border-radius: 5px 5px 0px 0px;
  background: var(--Point-5, #725f51);

  color: var(--white, #fff);

  font-family: Noto Sans KR;
  font-size: 1.66666vh;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  display: flex;
  align-items: center;
  padding-left: 1.48148vh;
`;
const ChatRectTitle2 = styled.div`
  width: 30.6vw;
  height: 10vh;
  border-radius: 5px 5px 0px 0px;
  background: var(--Gray-10, #F6F6F6);
  color: #f6f6f6;

  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1.48148vh;
`;
const ChatRect = styled.div`
  padding: 0.74074vh;
  width: 30.6vw;
  height: 75.555vh;
  border-radius: 5px;
  background: var(--white, #fff);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);

  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HelperReqList = styled.div`
    margin:0.740740vh;
    width: 27.71vw;
    height: 13.33333vh;
    flex-shrink: 0;

    border-radius: 5px;
    border: 1px solid var(--Gray-30, #EBEAEA);
    background: var(--white, #FFF);

    display:flex;

    &.selected {
        border-color: var(--Point-5, #725F51);
        background: var(--white, #FFF);
    }
`;
const HelperReqText = styled.div`
  margin: 0.7vh 0 0 1.5vh;
  color: var(--Black, #141515);

  font-family: Noto Sans KR;
  font-size: 2vh;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const HelperReqText2 = styled.div`
  color: var(--Black, #141515);

  font-family: Noto Sans KR;
  font-size: 1.5vh;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const HelperReqText3 = styled.div`
  margin: 0.7vh 0 0 1.5vh;
  color: var(--Point-5, #725f51);

  font-family: Noto Sans KR;
  font-size: 1.4vh;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const UserHelperListImg = styled.img`
  margin: auto 1.48148vh;
  height: 55%;
  width: 13%;
  border-radius: 70%;
`;

const ChatSelect = styled.select`
margin:0.740740vh;
width: 27.71vw;
height: 4.07407vh;
flex-shrink: 0;

border-radius: 5px;
border: 1px solid var(--Gray-30, #EBEAEA);
background: var(--white, #FFF);
`;

const ChatHeadImg = styled.img`
width: 2.34375vw;
height: 2.34375vw;
flex-shrink: 0;
`;
const ChatHeadText = styled.div`
color: var(--Point-6, #54493F);
margin: 0vw 6vw 0vw 0.83333vw;
font-family: Noto Sans KR;
font-size: 1.25vw;
font-style: normal;
font-weight: 700;
line-height: normal;
`;
const ChatHeadBtn1 = styled.div`
width: 6.666667vw;
height: 4.70588vh;
flex-shrink: 0;
border-radius: 5px;
background: var(--Point-5, #725F51);
margin-right:0.83333vw;

display:flex;
align-items:center;
justify-content:center;

color: #FFF;
text-align: center;
font-family: Noto Sans KR;
font-size: 0.9375vw;
font-style: normal;
font-weight: 700;
line-height: normal;
`;
const ChatHeadBtn2 = styled.div`
width: 6.666667vw;
height: 4.70588vh;
flex-shrink: 0;
border-radius: 5px;
background: var(--Gray-30, #EBEAEA);

display:flex;
align-items:center;
justify-content:center;

color: var(--Gray-50, #999797);
text-align: center;
font-family: Noto Sans KR;
font-size: 0.9375vw;
font-style: normal;
font-weight: 700;
line-height: normal;
`;
const ChatDate = styled.div`
width: 289px;
height: 34px;
flex-shrink: 0;

border-radius: 999px;
background: var(--Gray-10, #F6F6F6);

color: var(--Gray-70, #707070);
text-align: center;

font-family: Noto Sans KR;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: normal;

display:flex;
align-items:center;
justify-content:center;
`;
const ChatSendBtn = styled.div`
width: 100%;
height: 4.7vh;
padding: 0px 10px;
flex-shrink: 0;

border-radius: 5px;
border: 1px solid var(--Gray-30, #EBEAEA);
background: var(--white, #FFF);
display:flex;
align-items:center;
justify-content:space-between;

color: var(--Black, #141515);
font-family: Noto Sans KR;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: normal;
`;
const ChatSend = styled.div`
width:360px;
display: flex;
padding: 12px;
flex-direction: column;
align-items: flex-start;
gap: 4px;
border-radius: 8px;
background: var(--Point-5, #725F51);
color: var(--bluegray-pallet-10, #FDFBFF);

font-family: Noto Sans KR;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: normal;
`;
const ChatSendTri = styled.img`
height:50px;
`;

const ChatReply = styled.div`
width:360px;
display: flex;
padding: 12px;
flex-direction: column;
align-items: flex-start;
gap: 4px;
border-radius: 8px;
background: var(--Point-3, #D0B89E);

color: var(--Black, #141515);
font-family: Noto Sans KR;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: normal;
`;

const ChatReplyTri = styled.img`
height:50px;
`;

const ChatTime = styled.div`
color: var(--Gray-70, #707070);
text-align: right;
margin:5px;

font-family: Noto Sans KR;
font-size: 11px;
font-style: normal;
font-weight: 500;
line-height: normal;
`
const ChatNotification = styled.div`
margin:6px;
display: inline-flex;
padding: 8px 24px;
justify-content: center;
align-items: center;
gap: 8px;

border-radius: 5px;
border: 1px solid var(--Gray-30, #EBEAEA);
background: var(--Gray-10, #F6F6F6);

color: var(--Gray-70, #707070);
text-align: center;

font-family: Noto Sans KR;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: normal;
`
const ChatLog = ({ socket }) => {
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    // messsgeItem : {msg: String, name: String, timeStamp: String}
    socket.on("onReceive", (messageItem) => {
      setMsgList((msgList) => [...msgList, messageItem]);
      console.log(messageItem);
    });

    socket.on("onConnect", (systemMessage) => {
      setMsgList((msgList) => [...msgList, { 
        msg: systemMessage.msg,
        type : systemMessage.type,
        timeStamp : systemMessage.timeStamp,
        name : systemMessage.name
       }]);
    });
    
    socket.on("onDisconnect", (systemMessage) => {
      setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div style={{width:"100%", height:"67.155vh", overflow:"auto",display:"flex",flexDirection:"column",alignItems:"center",padding:"0px 10px"}}>
      {msgList.map((chat,index)=>(
          (chat.type==="Date")&&(<ChatDate>{chat.msg}</ChatDate>)||(chat.type==="Notification")&&(<ChatNotification>{chat.msg}</ChatNotification>)||(chat.type===JSON.parse(localStorage.getItem("userInfo")).type)&&(
              <div style={{width:"100%",display:"flex",alignItems:"flex-end",justifyContent:"flex-end",margin:"6px 0px 0px 0px"}}>
                  <ChatTime>{chat.timeStamp}</ChatTime>
                  <ChatSend>{chat.msg}</ChatSend>
                  <ChatSendTri src={arrowSendImg}></ChatSendTri>
              </div>)||(chat.type===JSON.parse(localStorage.getItem("userInfo")).type==='user'?'helper':'user')&&(
              <div style={{width:"100%",display:"flex",alignItems:"flex-end",justifyContent:"flex-start",margin:"6px 0px 0px 0px"}}>
                  <ChatReplyTri src={arrowReplyImg}></ChatReplyTri>
                  <ChatReply>{chat.msg}</ChatReply>
                  <ChatTime>{chat.timeStamp}</ChatTime>
              </div>)
          ))}
      </div>
  );
};

export default ChatLog;
