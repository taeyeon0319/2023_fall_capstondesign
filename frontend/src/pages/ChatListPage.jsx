import Header2 from "../components/Header2";
import styled from "styled-components";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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

const ChatBtn = styled.div`
width:100%;
height:35%;
border-radius: 5px 5px 5px 5px;
background: var(--Point-5, #725f51);

color: var(--white, #fff);

font-family: Noto Sans KR;
font-size: 1.66666vh;
font-style: normal;
font-weight: 700;
line-height: normal;

display:flex;
align-items:center;
justify-content:center;
`;
export const ChatListPage = () => {
    const navigate = useNavigate();
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

    const onClickHandler = (roomid,name) => {
        navigate('/chatdisplay/'+roomid+'/'+name);
    }
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
                        <div style={{width:"8vw"}}></div>
                        <div style={{width:"8vw",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <ChatBtn onClick={() => onClickHandler(item.roomid,JSON.parse(localStorage.getItem("userInfo")).type==='helper'?item.roomname.split('_')[0]:item.roomname.split('_')[1])}>채팅방으로</ChatBtn>
                        </div>
                    </HelperReqList>
                    //)
                ))}
                </ChatRect>
            </div>
            </ChatRectBox>
        </Root>
    );
};
export default ChatListPage;