import Header2 from "../components/Header2";
import styled from "styled-components";
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import userImg from '../img/profile.png';
import { useState } from "react";
import axios from 'axios';
//추가 기능: select 표현 될 수 있도록, 처음에 클릭해주세요X 제일 상단 값 표시되도록. 만약 데이터가 없으면 요청이 없다고 표시되도록.

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
border: 1px solid var(--Gray-30, #EBEAEA);
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
    
    const [responseData,setresponseData] = useState([]);
    const [displayData, setdisplayData] = useState([]);
    
    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/helper/requests-helper/1');
            setresponseData(response.data);
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
        }
    };

    const OkayBtnHandler = () =>{
        navigate("/helperReq",{reqId:displayData.id});
    };

    const UserListClickHandler = (index) =>{
        setdisplayData(responseData[index]);
    };

    return(
        <Root>
            <Header2></Header2>
            <HelperRectBox>
                <div style={{height:"81.855vh",margin:"auto"}}>
                    <HelperRectTitle>요청이 {responseData.length}건 들어왔습니다.</HelperRectTitle>
                    <HelperRect>
                        {responseData.map((item,index)=>(
                            <HelperReqList onClick={() => UserListClickHandler(index)}>
                                <UserHelperListImg src={userImg}></UserHelperListImg>
                                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"center"}}>
                                    <div style={{display:"flex",alignItems:"flex-end"}}>
                                        <HelperReqText>{item.user.name}</HelperReqText>
                                        <HelperReqText2>님</HelperReqText2>
                                    </div>
                                    <HelperReqText3>{item.user.region_county}</HelperReqText3>
                                    <HelperReqText3>{item.start_time}~{item.end_time}</HelperReqText3>
                                </div>
                            </HelperReqList>
                        ))}
                    </HelperRect>
                </div>
                <div style={{height:"81.855vh",margin:"auto"}}>
                    <HelperRectTitle>요청 수락</HelperRectTitle>
                    <HelperRect style={{alignItems:"center"}}>
                        {displayData.length===0&&(<>
                        </>)}
                        {displayData.length!==0&&(<>
                        <div style={{dispaly:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                            <UserInfoText>지역</UserInfoText>
                            <UserInfoIpt>{displayData.user.region_county}</UserInfoIpt>
                            <UserInfoText>도우미 분야</UserInfoText>
                            <UserInfoIpt>{displayData.field}</UserInfoIpt>
                            <UserInfoText>날짜</UserInfoText>
                            <UserInfoIpt>{displayData.date.substr(0,10)}</UserInfoIpt>
                            <UserInfoText>도우미 시간대</UserInfoText>
                            <UserInfoIpt>{displayData.start_time}~{displayData.end_time}</UserInfoIpt>
                            <UserInfoText>도우미 성별</UserInfoText>
                            <UserInfoIpt>{displayData.care_gender}</UserInfoIpt>
                            <UserInfoText>요청 사항</UserInfoText>
                            <UserInfoIpt style={{height:"12.5185vh",overflow:"auto"}}>{displayData.comment}</UserInfoIpt>
                        </div>
                        <UserBtnBox>
                            <UserBtn onClick={OkayBtnHandler}>수락</UserBtn>
                            <UserBtn2>거절</UserBtn2>
                        </UserBtnBox>
                        </>)}
                    </HelperRect>
                </div>
            </HelperRectBox>
        </Root>
    );
};
export default HelperPage;