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
export const ChatPage = () => {
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
        fetchData();
    }, []);

    if (currentSocket) {
        currentSocket.on("connect", () => {
            currentSocket.emit("join", {
                roomName : roomName,
                userName : JSON.parse(localStorage.getItem("userInfo")).name
            });
        });
    };

    const fetchData = async () => {
        try {
            const response = await api.get(
                "/chatting/get-all-roomList"
            );
            //setData(response.data.filter((item) => item.user_id === state));
            console.log(response.data);
            setRoomList(response.data);
        } catch (error) {
            console.error("API 호출 중 오류 발생:", error);
        }
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
    const handleBtnClick2 = () => {
        currentSocket.emit("onSend", {
            userName: JSON.parse(localStorage.getItem("userInfo")).name,
            msg: '테스트응답',
            timeStamp: new Date().toLocaleTimeString(),
            type: JSON.parse(localStorage.getItem("userInfo")).type==='user'?'helper':'user'
        });
    };
    const handlerenderChange = () => {
        setrender((prevState) => (prevState === 0 ? 1 : 0));
    };
    
    return(
        <Root>
            <Header2 data={render} onDataChange={handlerenderChange}></Header2>
            <ChatRectBox>
            <div style={{ height: "81.855vh", margin: "auto" }}>
                <ChatRectTitle>채팅방 목록</ChatRectTitle>
                <ChatRect>
                {/*
                <ChatSelect onChange={handleSelectChange}>
                    <option value={""}>{"이용 건을 선택하세요"}</option>
                    {dummyDataReqList.map((data, index) => (
                        <option key={index} value={data.sub}>{data.sub}</option>
                    ))}
                </ChatSelect>
                */}
                {roomList.filter((data) => JSON.parse(localStorage.getItem('userInfo')).type==='helper'
                ?data.helperid===JSON.parse(localStorage.getItem('userInfo')).id
                :data.userid===JSON.parse(localStorage.getItem('userInfo')).id).map((item, index) => (
                    //item.sub === selectedReq && (
                    <HelperReqList key={JSON.parse(localStorage.getItem("userInfo")).type==='helper'?item.roomname.split('_')[0]:item.roomname.split('_')[1]} className={index === selectedHelper ? 'selected' : ''} onClick={() => handleHelperClick(index,item.roomid)}>
                        <UserHelperListImg src={"https://ifh.cc/g/GrZGw4.png"} />
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
                        <div style={{ display: "flex", alignItems: "flex-end" }}>
                            <HelperReqText>{JSON.parse(localStorage.getItem("userInfo")).type==='helper'?item.roomname.split('_')[0]:item.roomname.split('_')[1]}</HelperReqText>
                            <HelperReqText2>{JSON.parse(localStorage.getItem("userInfo")).type==='helper'?'이용자':'도우미'}</HelperReqText2>
                        </div>
                        <HelperReqText3>{item.lastchat}</HelperReqText3>
                        </div>
                    </HelperReqList>
                    //)
                ))}
                </ChatRect>
            </div>
            <div style={{ height: "81.855vh", margin: "auto", boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.10)" }}>
                <ChatRectTitle2 style={{padding:"0px"}}>
                    <div style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
                        <ChatHeadImg src={userImg}></ChatHeadImg>
                        <ChatHeadText>김헬퍼님</ChatHeadText>
                        <ChatHeadBtn1>매칭 성공</ChatHeadBtn1>
                        <ChatHeadBtn2>대화방 나가기</ChatHeadBtn2>
                    </div>
                </ChatRectTitle2>
                <ChatRect style={{height:"71.855vh", boxShadow:"0px 0px 0px 0px"}}>
                    {/*{<div style={{width:"100%", height:"67.155vh", overflow:"auto",display:"flex",flexDirection:"column",alignItems:"center",padding:"0px 10px"}}>
                        {selectedChatList[0].chatList.map((chat,index)=>(
                            (chat.type==="Date")&&(<ChatDate>{chat.data}</ChatDate>)||(chat.type==="Send")&&(
                                <div style={{width:"100%",display:"flex",alignItems:"flex-end",justifyContent:"flex-end",margin:"6px 0px 0px 0px"}}>
                                    <ChatTime>{chat.time}</ChatTime>
                                    <ChatSend>{chat.data}</ChatSend>
                                    <ChatSendTri src={arrowSendImg}></ChatSendTri>
                                </div>)||(chat.type==="Reply")&&(
                                <div style={{width:"100%",display:"flex",alignItems:"flex-end",justifyContent:"flex-start",margin:"6px 0px 0px 0px"}}>
                                    <ChatReplyTri src={arrowReplyImg}></ChatReplyTri>
                                    <ChatReply>{chat.data}</ChatReply>
                                    <ChatTime>{chat.time}</ChatTime>
                                </div>)||(chat.type==="Notification")&&(<ChatNotification>{chat.data}</ChatNotification>)
                            ))}
                    </div>}*/}
                    <div>
                    {currentSocket ? (
                        <><ChatLog socket={currentSocket}></ChatLog></>
                    ) : (
                        <Loading></Loading>
                    )}
                    </div>
                    <ChatSendBtn><input id="IptBtn" onChange={handleChatChange}></input><button onClick={handleBtnClick}><img src={sendImg}></img></button></ChatSendBtn>
                    <button onClick={handleBtnClick2}><img src={sendImg}></img></button>
                </ChatRect>
            </div>
            </ChatRectBox>
        </Root>
    );
};
export default ChatPage;