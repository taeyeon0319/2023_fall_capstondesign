import Header2 from "../components/Header2";
import styled from "styled-components";
import React from 'react';
import { useNavigate } from "react-router-dom";
import userImg from '../img/profile.png';
import userImg2 from '../img/profile3.png';
import { useState } from "react";

const Root = styled.div`
width: 100vw;
height:100vh;
background: #FFF8F3;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
`

const UserRect = styled.div`
width: 62%;
margin: 40px;
height: 780px;
flex-shrink: 0;

border-radius: 20px;
background: #E7E6E6;

display:flex;
flex-direction: column;
align-items: center;
`
const UserPBox = styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:flex-start;
`
const UserPImg = styled.img`
margin:3.84% 3.5% 3% 0%;
width:8%;
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
const UserBtn = styled.div`
display: flex;
width: 29.74%;
height: 52px;
flex-shrink: 0;
margin: 1.5% 3.3%;

border-radius: 15px;
background: #BB6C25;

color: #FFF;
font-family: Roboto Flex;
font-size: 30px;
font-style: normal;
font-weight: 600;
line-height: normal;
display : flex;
justify-content : center;
align-items : center;
`
const UserInfoText =  styled.div`
color: #000;
font-family: Inter;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;
`
const UserInfoIpt = styled.div`
width: 55.23%;
padding:0px 10px;
height: 48px;
margin: 12px 22px;
flex-shrink: 0;
border-radius: 15px;
background: #BB6C25;
border: 1px solid #BB6C25;
background: #FFF;

color: #000;
font-family: Inter;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;

display:flex;
align-items:center;
`
const UserInfoBox = styled.div`
width:100%;
display:flex;
justify-content:center;
align-items:center;
`
const UserInfoList = styled.div`
width:50%
display:flex;
justify-content:center;
align-content:center;
`
export const HelperRequestPage = () => {

    return(
        <Root>
            <Header2></Header2>
        </Root>
    );
};
export default HelperRequestPage;
/*
<UserRect>
<UserPBox style={{display:"flex",justifyContent:"center"}}>
    <UserPImg src={userImg}></UserPImg>
    <UserPText>김동국</UserPText>
    <UserPText2>씨</UserPText2>
</UserPBox>
<UserPBox>
    <div style={{width:"50%"}}>
        <UserInfoBox>
            <UserInfoText>지역</UserInfoText>
            <UserInfoIpt>서울 중구</UserInfoIpt>
        </UserInfoBox>
        <UserInfoBox>
            <UserInfoText>분야</UserInfoText>
            <UserInfoIpt>베이비 시터</UserInfoIpt>
        </UserInfoBox>
        <UserInfoBox>
            <UserInfoText>시간</UserInfoText>
            <UserInfoIpt style={{width:"24%",marginRight:"0px"}}>18:00</UserInfoIpt>
            <UserInfoText style={{width:"7.23%",display:"flex",justifyContent:"center",alignItems:"center"}}>-</UserInfoText>
            <UserInfoIpt style={{width:"24%",marginLeft:"0px"}}>19:00</UserInfoIpt>
        </UserInfoBox>
        <UserInfoBox>
            <UserInfoText>성별</UserInfoText>
            <UserInfoIpt>남</UserInfoIpt>
        </UserInfoBox>
        <UserInfoBox>
            <UserInfoText>요청<br></br>사항</UserInfoText>
            <UserInfoIpt style={{height:"180px"}}>등원 도우미 구합니다.</UserInfoIpt>
        </UserInfoBox>
    </div>
    <div style={{width:"50%",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <UserPText>010-1234-5678<br></br>이용자님과 연락 후<br></br>매칭에 성공하세요</UserPText>
    </div>
</UserPBox>
<UserBtn>이전</UserBtn>
</UserRect>
*/