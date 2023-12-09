import Header2 from "../components/Header2";
import styled from "styled-components";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userImg from '../img/Ellipse1.png';
import sendImg from '../img/send.png';
import arrowSendImg from '../img/arrowSend.png';
import arrowReplyImg from '../img/arrowReply.png';
import { useState } from "react";
import socketIOClient from "socket.io-client";
import ChatLog from "../components/ChatLog/ChatLog";
import Loading from "./Loading";
import api from "../api";
import { useParams } from 'react-router-dom';

const dummyDataReqList = [
    {
        sub:"아이 3시간 봐주실 분 구합니다.",
    },
    {
        sub:"등하원 도우미 구합니다.",
    },
    {
        sub:"친절한 간병인 구합니다.",
    }
]

const dummyDataChatList = {
    data:[
        {
            sub:"아이 3시간 봐주실 분 구합니다.",
            name:"전현정",
            lastChat:"알겠습니다~",
            img:userImg,
        },
        {
            sub:"아이 3시간 봐주실 분 구합니다.",
            name:"김철수",
            lastChat:"넵",
            img:userImg,
        },
        {
            sub:"아이 3시간 봐주실 분 구합니다.",
            name:"김영희",
            lastChat:"혹시 다른 시간대는 어떠신가요?",
            img:userImg,
        },
        {
            sub:"등하원 도우미 구합니다.",
            name:"슈퍼맨",
            lastChat:"슈퍼 들리셔야 합니다.",
            img:userImg,
        },
        {
            sub:"등하원 도우미 구합니다.",
            name:"슈퍼우먼",
            lastChat:"슈퍼 들리셔야 합니다.",
            img:userImg,
        },
        {
            sub:"친절한 간병인 구합니다.",
            name:"김태연",
            lastChat:"해당 시간 가능하신가요?",
            img:userImg,
        },
        {
            sub:"친절한 간병인 구합니다.",
            name:"윤영서",
            lastChat:"안녕하세요~",
            img:userImg,
        },
        {
            sub:"친절한 간병인 구합니다.",
            name:"이윤서",
            lastChat:"안녕하세요!",
            img:userImg,
        }
    ]
};

const dummyDataChat = [
    {
        chatId:"전현정",
        chatList:[
            {
                type:"Date",
                data:"2023년 11월 11일",
                time:"10:45"
            },
            {
                type:"Reply",
                data:"안녕하세요~ 글 보고 연락드립니다.",
                time:"10:46"
            },
            {
                type:"Send",
                data:"네 안녕하세요~ 1시부터 3시까지 괜찮으실까요?",
                time:"10:46"
            },
            {
                type:"Reply",
                data:"네네~",
                time:"10:47"
            },
            {
                type:"Send",
                data:"그럼 좀 부탁드릴게요^^",
                time:"10:48"
            },
            {
                type:"Notification",
                data:"김이용님이 매칭 성공 버튼을 누르셨습니다.",
                time:"10:48"
            },
            {
                type:"Notification",
                data:"김헬퍼님이 매칭 성공 버튼을 누르셨습니다.",
                time:"10:48"
            },
            {
                type:"Notification",
                data:"김이용님이 결제를 완료하였습니다.",
                time:"10:48"
            },
            {
                type:"Notification",
                data:"매칭이 성공되었습니다.",
                time:"10:48"
            },
        ]
    },
    {
        chatId:"김철수",
        chatList:[
            {
                type:"Date",
                data:"2023년 11월 11일",
                time:"10:45"
            },
            {
                type:"Reply",
                data:"안녕하세요 도우미 아직 구하시나요?",
                time:"10:45"
            },
            {
                type:"Send",
                data:"아니요 구했습니다~",
                time:"10:45"
            },
            {
                type:"Reply",
                data:"넵",
                time:"10:45"
            }
        ]
    },
    {
        chatId:"김영희",
        chatList:[
            {
                type:"Date",
                data:"2023년 11월 11일",
                time:"10:45"
            },
            {
                type:"Reply",
                data:"안녕하세요! 김영희 도우미라고 합니다.",
                time:"10:46"
            },
            {
                type:"Reply",
                data:"도우미 찾으신다고 하셔서 연락드렸어요~",
                time:"10:46"
            },
            {
                type:"Send",
                data:"아 네 안녕하세요~",
                time:"10:46"
            },
            {
                type:"Send",
                data:"시간이 좀 바뀌었는데,",
                time:"10:46"
            },
            {
                type:"Send",
                data:"혹시 다른 시간대는 어떠신가요?",
                time:"10:46"
            }
        ]
    }
];


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
export const ChatDisplayPage = () => {
    const navigate = useNavigate();
    const { roomid, name } = useParams();
    const [render, setrender] = useState(0);
    const [selectedReq, setSelectedReq] = useState('');
    const [selectedHelper, setSelectedHelper] = useState(null);
    const [chatId, setChatId] = useState('');
    const [selectedChatList, setSelectedChatList] = useState([{chatId:"",chatList:[{type:"Notification",data:"채팅 내역이 없습니다.",time:""}]}]);
    const [roomList,setRoomList]=useState([]);

    //채팅 관련 State
    const [currentSocket, setCurrentSocket] = useState();
    const [chatMessage, setChatMessage] = useState("");
    const [msgList, setMsgList] = useState([]);
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        setSelectedChatList(dummyDataChat.filter((data) => data.chatId === chatId).length > 0
        ? dummyDataChat.filter((data) => data.chatId === chatId)
        : [{chatId:"",chatList:[{type:"Notification",data:"채팅 내역이 없습니다.",time:""}]}]);
        console.log(selectedChatList);
    }, [chatId]);

    useEffect(() => {
        setCurrentSocket(socketIOClient("localhost:5001"));
    }, []);

    if (currentSocket) {
        currentSocket.on("connect", () => {
            currentSocket.emit("join", {
                roomName : roomid,
                userName : JSON.parse(localStorage.getItem("userInfo")).name
            });
        });
    };
    
    const handleHelperClick = (index,name) => {
        setSelectedHelper(index === selectedHelper ? null : index);
        //setChatId(name);
        setRoomName(name);
        console.log(name);
        //console.log(chatId);
        console.log(selectedChatList);
    };
    const handleSelectChange = (event) => {
        setSelectedReq(event.target.value);
    };
    const handleChatChange = (e) => {
        setChatMessage(e.target.value);
        console.log(chatMessage);
    };
    const handleBtnClick = () => {
        if (chatMessage!==null){
            currentSocket.emit("onSend", {
                userName: JSON.parse(localStorage.getItem("userInfo")).name,
                msg: chatMessage,
                timeStamp: new Date().toLocaleTimeString(),
                type:JSON.parse(localStorage.getItem("userInfo")).type
            });
            console.log(document.getElementById('IptBtn'));
            setChatMessage(null);
            document.getElementById('IptBtn').value = null;
        }
    };
    const handlerenderChange = () => {
        setrender((prevState) => (prevState === 0 ? 1 : 0));
    };
    
    const onClickHandler = () => {
        navigate('/chatlist');
    }
    
    return(
        <Root>
            <Header2 data={render} onDataChange={handlerenderChange}></Header2>
            <ChatRectBox>
            <div style={{ height: "81.855vh", margin: "auto", boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.10)" }}>
                <ChatRectTitle2 style={{padding:"0px"}}>
                    <div style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
                        <ChatHeadImg src={userImg}></ChatHeadImg>
                        <ChatHeadText>{name}님</ChatHeadText>
                        <ChatHeadBtn1>매칭 성공</ChatHeadBtn1>
                        <ChatHeadBtn2 onClick={onClickHandler}>대화방 나가기</ChatHeadBtn2>
                    </div>
                </ChatRectTitle2>
                <ChatRect style={{height:"71.855vh", boxShadow:"0px 0px 0px 0px"}}>
                    <div>
                    {currentSocket ? (
                        <><ChatLog socket={currentSocket}></ChatLog></>
                    ) : (
                        <Loading></Loading>
                    )}
                    </div>
                    <ChatSendBtn><input id="IptBtn" style={{width:"100%",height:"100%",outline:"none"}} onChange={handleChatChange}></input><button onClick={handleBtnClick}><img src={sendImg}></img></button></ChatSendBtn>
                </ChatRect>
            </div>
            </ChatRectBox>
        </Root>
    );
};
export default ChatDisplayPage;