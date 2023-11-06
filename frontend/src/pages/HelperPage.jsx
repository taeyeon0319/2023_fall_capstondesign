import Header2 from "../components/Header2";
import styled from "styled-components";
import React from 'react';
import { useNavigate } from "react-router-dom";
import userImg from '../img/profile.png';
import userImg2 from '../img/profile3.png';
import { useState } from "react";

import HelperList from "./helper/helperList/HelperList";
//추가 기능: select 표현 될 수 있도록, 처음에 클릭해주세요X 제일 상단 값 표시되도록. 만약 데이터가 없으면 요청이 없다고 표시되도록.

const dummyData = {
    data:[
        {
            profileImg: userImg,
            name: "김동국",
            area: "서울중구",
            part: "베이비시터",
            day:"2023-11-05",
            time: ["16:00","18:00"],
            sex: "남",
            request: "잠깐 장보는 동안 아이 봐주실 도우미 분 구합니다. 시간당 20000으로 생각하고 있고 협의가능합니다. 연락주세요!"
        },
        {
            profileImg: userImg2,
            name: "전현정",
            area: "서울중구",
            part: "베이비시터",
            day:"2023-11-05",
            time: ["08:00","09:00"],
            sex: "여",
            request: "매주 평일 등원 도우미 구합니다."
        }
    ]
};

const def={
    profileImg: userImg,
    name: "",
    area: "",
    part: "",
    time: 0,
    sex: "",
    request: ""
};

const Root = styled.div`
width: 100vw;
height:100vh;
background: #FFF8F3;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
`
const UserPTopText = styled.div`
margin: 30px 10px;
color: #000;
font-family: Inter;
font-size: 30px;
font-style: normal;
font-weight: 600;
line-height: normal;
`
const UserRectBox = styled.div`
width:80%;
height: 800px;

display:flex;
justify-content: space-between;
`
const UserRect = styled.div`
width: 48%;
padding: 30px 0px;
height: 780px;
flex-shrink: 0;

border-radius: 20px;
background: #E7E6E6;

display:flex;
flex-direction: column;
align-items: center;
`
const UserHelperList = styled.div`
width:96%;
height: 120px;
flex-shrink: 0;
border-radius: 20px;
border: 1px solid #D9D9D9;
background: #FFF;

color: #000;
font-family: Inter;
font-size: 30px;
font-style: normal;
font-weight: 600;
line-height: normal;

display:flex;
align-items:center;
`
const UserHelperListImg = styled.img`
margin: auto 1.48148vh;
height:55%
`
const UserHelperListText = styled.text`
color: #000;
font-family: Inter;
font-size: 30px;
font-style: normal;
font-weight: 600;
line-height: normal;
`
const UserBtnBox = styled.div`
margin: 3% 0% 6% 0%;
width:100%;
display:flex;
justify-content:space-evenly;
`
const UserBtn = styled.div`
width: 14vw;
height: 5.63vh;
flex-shrink: 0;

border-radius: 5px;
border: 1px solid var(--Gray-40, #C2C1C1);
background: var(--white, #FFF);

color: var(--Gray-70, #707070);
text-align: center;

font-family: Noto Sans KR;
font-size: 2vh;
font-style: normal;
font-weight: 700;
line-height: normal;

display : flex;
justify-content : center;
align-items : center;
`
const UserBtn2 = styled.div`
width: 14vw;
height: 5.63vh;
flex-shrink: 0;

border-radius: 5px;
background: var(--Point-5, #725F51);

color: var(--white, #FFF);
text-align: center;

font-family: Noto Sans KR;
font-size: 2vh;
font-style: normal;
font-weight: 700;
line-height: normal;

display : flex;
justify-content : center;
align-items : center;
`
const UserPBox = styled.div`
width:90%;
display:flex;
align-items:center;
justify-content:flex-start;
`
const UserPImg = styled.img`
margin:3.84% 7.17% 6.84% 11.17%;
width:12%;
`
const UserPText = styled.div`
color: #000;
font-family: Inter;
font-size: 48px;
font-style: normal;
font-weight: 600;
line-height: normal;
`
const UserPText2 = styled.div`
color: #000;
font-family: Inter;
font-size: 32px;
font-style: normal;
font-weight: 500;
line-height: normal;
`
const UserInfoText =  styled.div`
margin: 1.48148vh 0 0.740740vh 0;
color: var(--Gray-80, #555);

font-family: Noto Sans KR;
font-size: 2vh;
font-style: normal;
font-weight: 600;
line-height: normal;
`
const UserInfoIpt = styled.div`
padding:auto;
width:28.854vw;
height:4.07407vh;
border-radius: 5px;
border: 1px solid var(--Gray-30, #EBEAEA);
background: var(--white, #FFF);

color: var(--Point-5, #725F51);

font-family: Noto Sans KR;
font-size: 1.8vh;
font-style: normal;
font-weight: 500;
line-height: normal;

display:flex;
align-items:center;
padding:1.5vh;
`
const UserInfoBox = styled.div`
width:100%;
display:flex;
justify-content:center;
align-items:center;
`
const HelperRectTitle = styled.div`
width:30.6vw;
Height:6.3vh;
border-radius: 5px 5px 0px 0px;
background: var(--Point-5, #725F51);

color: var(--white, #FFF);

font-family: Noto Sans KR;
font-size: 1.66666vh;
font-style: normal;
font-weight: 700;
line-height: normal;

display:flex;
align-items:center;
padding-left:1.48148vh;
`
const HelperRect = styled.div`
padding:0.740740vh;
width:30.6vw;
Height:75.555vh;
border-radius: 5px;
background: var(--white, #FFF);
box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.10);

overflow:auto;
display:flex;
flex-direction:column;
align-items:center;
`
const HelperRectBox = styled.div`
width:65%;
height:91.12vh;
display:flex;
`
const HelperReqList = styled.div`
margin:0.740740vh;
width: 27.71vw;
height: 13.33333vh;
flex-shrink: 0;

border-radius: 5px;
border: 1px solid var(--Point-5, #725F51);
background: var(--white, #FFF);

display:flex;
flex
`
const HelperReqText = styled.div`
margin: 0.7vh 0 0 1.5vh;
color: var(--Black, #141515);

font-family: Noto Sans KR;
font-size: 2vh;
font-style: normal;
font-weight: 700;
line-height: normal;
`
const HelperReqText2 = styled.div`
color: var(--Black, #141515);

font-family: Noto Sans KR;
font-size: 1.5vh;
font-style: normal;
font-weight: 500;
line-height: normal;
`

const HelperReqText3 = styled.div`
margin: 0.7vh 0 0 1.5vh;
color: var(--Point-5, #725F51);

font-family: Noto Sans KR;
font-size: 1.4vh;
font-style: normal;
font-weight: 400;
line-height: normal;
`

export const HelperPage = () => {
    const navigate = useNavigate();

    const OkayBtnHandler = () =>{
        navigate("/helperReq");
    };

    const [displayData, setdisplayData] = useState(def);
    const UserListClickHandler = (index) =>{
        if(index===def){
            setdisplayData(def);
        }else{
            setdisplayData(dummyData.data[index]);
        }
    };
    return(
        <Root>
            <Header2></Header2>
            <HelperRectBox>
                <div style={{height:"81.855vh",margin:"auto"}}>
                    <HelperRectTitle>요청이 {dummyData.data.length}건 들어왔습니다.</HelperRectTitle>
                    <HelperRect>
                        {dummyData.data.map((item,index)=>(
                            <HelperReqList onClick={() => UserListClickHandler(index)}>
                                <UserHelperListImg src={item.profileImg}></UserHelperListImg>
                                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"center"}}>
                                    <div style={{display:"flex",alignItems:"flex-end"}}>
                                        <HelperReqText>{item.name}</HelperReqText>
                                        <HelperReqText2>님</HelperReqText2>
                                    </div>
                                    <HelperReqText3>{item.area}</HelperReqText3>
                                    <HelperReqText3>{item.time[0]}~{item.time[1]}</HelperReqText3>

                                </div>
                            </HelperReqList>
                            /*
                            <UserHelperList onClick={() => UserListClickHandler(index)}>
                                <UserHelperListImg src={item.profileImg}></UserHelperListImg>
                                <UserHelperListText>{item.name}</UserHelperListText>
                            </UserHelperList>
                            */
                        ))}
                    </HelperRect>
                </div>
                <div style={{height:"81.855vh",margin:"auto"}}>
                    <HelperRectTitle>요청 수락</HelperRectTitle>
                    <HelperRect style={{alignItems:"center"}}>
                        <div style={{dispaly:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                            <UserInfoText>지역</UserInfoText>
                            <UserInfoIpt>{displayData.area}</UserInfoIpt>
                            <UserInfoText>도우미 분야</UserInfoText>
                            <UserInfoIpt>{displayData.part}</UserInfoIpt>
                            <UserInfoText>날짜</UserInfoText>
                            <UserInfoIpt>{displayData.day}</UserInfoIpt>
                            <UserInfoText>도우미 시간대</UserInfoText>
                            <UserInfoIpt>{displayData.time[0]}~{displayData.time[1]}</UserInfoIpt>
                            <UserInfoText>도우미 성별</UserInfoText>
                            <UserInfoIpt>{displayData.sex}</UserInfoIpt>
                            <UserInfoText>요청 사항</UserInfoText>
                            <UserInfoIpt style={{height:"12.5185vh",overflow:"auto"}}>{displayData.request}</UserInfoIpt>
                        </div>
                        <UserBtnBox>
                            <UserBtn onClick={OkayBtnHandler}>수락</UserBtn>
                            <UserBtn2>거절</UserBtn2>
                        </UserBtnBox>
                    </HelperRect>
                </div>
            </HelperRectBox>
            
            {/*
            <div style={{width:"80%"}}>
                <UserPTopText>요청이 {dummyData.data.length}건 들어왔습니다.</UserPTopText>
            </div>
            <UserRectBox>
                <UserRect>
                    {dummyData.data.map((item,index)=>(
                        <UserHelperList onClick={() => UserListClickHandler(index)}>
                            <UserHelperListImg src={item.profileImg}></UserHelperListImg>
                            <UserHelperListText>{item.name}</UserHelperListText>
                        </UserHelperList>
                    ))}
                </UserRect>
                <UserRect>
                    {displayData===def&&(
                        <UserPText style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>확인하고자 하는 요청을 클릭하세요</UserPText>
                    )}
                    {displayData!==def&&(
                    <>
                        <UserPBox>
                            <UserPImg src={displayData.profileImg}></UserPImg>
                            <UserPText>{displayData.name}</UserPText>
                            <UserPText2>씨</UserPText2>
                        </UserPBox>
                        <UserInfoBox>
                            <UserInfoText>지역</UserInfoText>
                            <UserInfoIpt>{displayData.area}</UserInfoIpt>
                        </UserInfoBox>
                        <UserInfoBox>
                            <UserInfoText>분야</UserInfoText>
                            <UserInfoIpt>{displayData.part}</UserInfoIpt>
                        </UserInfoBox>
                        <UserInfoBox>
                            <UserInfoText>시간</UserInfoText>
                            <UserInfoIpt style={{width:"24%",marginRight:"0px"}}>{displayData.time[0]}</UserInfoIpt>
                            <UserInfoText style={{width:"7.23%",display:"flex",justifyContent:"center",alignItems:"center"}}>-</UserInfoText>
                            <UserInfoIpt style={{width:"24%",marginLeft:"0px"}}>{displayData.time[1]}</UserInfoIpt>
                        </UserInfoBox>
                        <UserInfoBox>
                            <UserInfoText>성별</UserInfoText>
                            <UserInfoIpt>{displayData.sex}</UserInfoIpt>
                        </UserInfoBox>
                        <UserInfoBox>
                            <UserInfoText>요청<br></br>사항</UserInfoText>
                            <UserInfoIpt style={{height:"180px"}}>{displayData.request}</UserInfoIpt>
                        </UserInfoBox>
                        <UserBtnBox>
                            <UserBtn>수락</UserBtn>
                            <UserBtn>거절</UserBtn>
                        </UserBtnBox>
                    </>
                    )}
                </UserRect>
            </UserRectBox>
                    */}
        </Root>
    );
};
export default HelperPage;