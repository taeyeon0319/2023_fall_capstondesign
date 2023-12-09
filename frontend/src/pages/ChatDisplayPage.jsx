import Header2 from "../components/Header2";
import styled from "styled-components";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userImg from '../img/Ellipse1.png';
import sendImg from '../img/send.png';
import arrowSendImg from '../img/arrowSend.png';
import arrowReplyImg from '../img/arrowReply.png';
import { useState, useLocation } from "react";
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
border-radius: 70px;
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
    const { roomid, name, request_id } = useParams();
    const [render, setrender] = useState(0);
    const [selectedReq, setSelectedReq] = useState('');
    const [selectedHelper, setSelectedHelper] = useState(null);
    const [chatId, setChatId] = useState('');
    const [selectedChatList, setSelectedChatList] = useState([{chatId:"",chatList:[{type:"Notification",data:"채팅 내역이 없습니다.",time:""}]}]);
    const [roomList,setRoomList]=useState([]);
    
    //채팅 관련 State
    const [currentSocket, setCurrentSocket] = useState();
    const [chatMessage, setChatMessage] = useState("");
    const [roomName, setRoomName] = useState("");
    const [chatLog, setChatLog] = useState([]);
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
        //console.log('msglist: ',msgList);
    }
    const successClick = async () => {
        if (window.confirm("매칭 하시겠습니까?")) {
            try {
              //const response = await api.put(`/helper/response-request`, {
              //  status: "수락",
              //  id: String(Data[0].request_id),
              //});
              alert("매칭 성공!");
            } catch (error) {
              console.error("API 호출 중 오류 발생:", error);
            }
            //setrender(prevState => (prevState === 0 ? 1 : 0));
          }
        {/*
        console.log(roomid);
        try {
            const successRes = await api.put("/chatting/roomdata",{
                "roomId":roomid
            });
            console.log('res: ',successRes);
            if(JSON.parse(localStorage.getItem('userInfo')).type==='user'){
                const successRes2 = await api.put("/chatting/updateOk",{
                    "roomId":roomid,
                    "helperOk":successRes.helperOk,
                    "userOk":"T"
                });
                if (successRes2==='매칭성공'){
                    alert('매칭이 성공되었습니다.')
                }else{
                    alert('상대방이 매칭 성공 버튼을 누를때까지 기다려주세요')
                }
            }else{
                const successRes2 = await api.put("/chatting/updateOk",{
                    "roomId":roomid,
                    "helperOk":"T",
                    "userOk":successRes.userOk
                });
                if (successRes2==='매칭성공'){
                    alert('매칭이 성공되었습니다.')
                }else{
                    alert('상대방이 매칭 성공 버튼을 누를때까지 기다려주세요')
                }
            }
        } catch (error) {
            console.error("API 호출 중 오류 발생:", error);
        }
        */}
    };
    
    return(
        <Root>
            <Header2 data={render} onDataChange={handlerenderChange}></Header2>
            <ChatRectBox>
            <div style={{ height: "81.855vh", margin: "auto", boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.10)" }}>
                <ChatRectTitle2 style={{padding:"0px"}}>
                    <div style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
                        <ChatHeadImg src={JSON.parse(localStorage.getItem('userInfo')).type==='user'?"data:image/jpeg;base64,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":"https://i.namu.wiki/i/fj5hBok4xY3mmkP9S8n9su8wgB9WDbaEP_q6oVCe2mPzgqhr1A8nC4lnBD4-DI8U30pIW3KuImwOwu48_w5Yig.webp"}></ChatHeadImg>
                        <ChatHeadText>{name}님</ChatHeadText>
                        <div style={{width: "6.666667vw"}}></div>
                        <ChatHeadBtn2 onClick={onClickHandler}>대화방 나가기</ChatHeadBtn2>
                    </div>
                </ChatRectTitle2>
                <ChatRect style={{height:"67.155vh", boxShadow:"0px 0px 0px 0px"}}>
                    {<><div style={{width:"100%", overflow:"auto",display:"flex",flexDirection:"column",alignItems:"center",padding:"0px 10px"}}>
                        {JSON.parse(localStorage.getItem('chatlog')).filter((data) => data.roomid===roomid).map((chat,index)=>(
                            (chat.type==="Date")&&(<ChatDate>{chat.data}</ChatDate>)||(chat.type==="user")&&(
                                <div style={{width:"100%",display:"flex",alignItems:"flex-end",justifyContent:"flex-end",margin:"6px 0px 0px 0px"}}>
                                    <ChatTime>{chat.time}</ChatTime>
                                    <ChatSend>{chat.text}</ChatSend>
                                    <ChatSendTri src={arrowSendImg}></ChatSendTri>
                                </div>)||(chat.type==="helper")&&(
                                <div style={{width:"100%",display:"flex",alignItems:"flex-end",justifyContent:"flex-start",margin:"6px 0px 0px 0px"}}>
                                    <ChatReplyTri src={arrowReplyImg}></ChatReplyTri>
                                    <ChatReply>{chat.text}</ChatReply>
                                    <ChatTime>{chat.time}</ChatTime>
                                </div>)||(chat.type==="Notification")&&(<ChatNotification>{chat.data}</ChatNotification>)
                        ))}
                    </div>
                    <div style={{width:"96%"}}>
                    {currentSocket ? (
                        <><ChatLog style={{width:"100%"}} socket={currentSocket}></ChatLog></>
                    ) : (
                        <Loading></Loading>
                    )}
                    </div>
                    </>
                    }
                </ChatRect>
                <ChatSendBtn><input id="IptBtn" style={{width:"100%",height:"100%",outline:"none"}} onChange={handleChatChange}></input><button onClick={handleBtnClick}><img src={sendImg}></img></button></ChatSendBtn>
            </div>
            </ChatRectBox>
        </Root>
    );
};
export default ChatDisplayPage;