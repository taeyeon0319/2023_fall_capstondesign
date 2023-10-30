import Header from "../components/Header";
import styled from "styled-components";
import React from 'react';
import { useNavigate } from "react-router-dom";
import userImg from '../img/profile.png';
import userImg2 from '../img/profile3.png';
import grayImg from '../img/gray.png';
import { useState } from "react";

const dummyData={
    data:[
        {
            sub:"동국초등학교 등원 도우미 구해요",
            time:["08:00","09:00"],
            date:"2023-09-24",
            income:13500
        },
        {
            sub:"아이 3시간 봐주실 분 구합니다.",
            time:["15:00","18:00"],
            date:"2023-09-24",
            income:40500
        },
        {
            sub:"[급구] 아이 하원 도우미 구합니다.",
            time:["15:00","16:00"],
            date:"2023-09-23",
            income:27000
        }
    ]
}

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
width: 80%;
margin: 40px;
padding: 30px;
height: 810px;
flex-shrink: 0;

border-radius: 20px;
background: #E7E6E6;

display:flex;
flex-direction: column;
align-items: center;
`
const UserRect2 = styled.div`
width:100%;
margin-bottom:30px;
padding:30px;
height:200px;

border-radius: 15px;
background: #FFF8F3;

display:flex;
overflow:auto;
`
const UserImg = styled.img`
margin: 0px 20px 0px 0px;
background-color:#EEE;
border-radius:50%;
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
const UserPText3 = styled.div`
margin: 10px;
color: #000;
font-family: Inter;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const UserPText4 = styled.div`
margin:10px;
color: #585858;
font-family: Inter;
font-size: 32px;
font-style: normal;
font-weight: 800;
line-height: normal;
`
const UserHelperList = styled.div`
margin:10px;
padding:30px;
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
const UserPText5 = styled.div`
color: #585858;
font-family: Inter;
font-size: 20px;
font-style: normal;
font-weight: 800;
line-height: normal;
`
const UserPText6 = styled.div`
margin: 0px 20px 0px 0px;
color: #8F8F8F;
font-family: Inter;
font-size: 32px;
font-style: normal;
font-weight: 800;
line-height: normal;
`
const UserPText7 = styled.div`
color: #8F8F8F;
font-family: Inter;
font-size: 24px;
font-style: normal;
font-weight: 800;
line-height: normal;
`
const UserPText8 = styled.div`
color: #000;
font-family: Inter;
font-size: 32px;
font-style: normal;
font-weight: 800;
line-height: normal;
`

export const HelperMyPage = () => {

    return(
        <Root>
            <Header></Header>
            <UserRect>
                <UserRect2 style={{alignItems:"center",justifyContent:"space-between",padding:"30px 10%"}}>
                    <div style={{display:"flex",height:"100%"}}>
                        <UserImg src={userImg}></UserImg>
                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                            <div style={{display:"flex",alignItems:"flex-end",margin:"10px"}}>
                                <UserPText>김동국</UserPText>
                                <UserPText2>씨</UserPText2>
                            </div>
                            <UserPText3>서울특별시 중구 충무로 1길 36</UserPText3>
                        </div>
                    </div>
                    <div style={{display:"flex"}}>
                        <UserPText4>이번달 총 수익</UserPText4>
                        <UserPText>81,000</UserPText>
                    </div>
                </UserRect2>
                <UserRect2 style={{height:"600px",marginBottom:"0px",flexDirection:"column"}}>
                    <UserPText style={{fontSize:"32px",margin:"0% 0% 0% 3%"}}>최근 도움 내역</UserPText>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    {dummyData.data.map((item,index)=>(
                        <UserHelperList style={{justifyContent:"space-between",width:"100%"}}>
                            <div style={{display:"flex",width:"80%"}}>
                                <UserImg src={grayImg} style={{margin:"0% 5%"}}></UserImg>
                                <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                                    <UserPText5>{dummyData.data[index].sub}</UserPText5>
                                    <div style={{display:"flex",alignItems:"flex-end"}}>
                                        <UserPText6>{dummyData.data[index].time[0]}~{dummyData.data[index].time[1]}</UserPText6>
                                        <UserPText7>{dummyData.data[index].date}</UserPText7>
                                    </div>
                                </div>
                            </div>
                            <UserPText8 style={{width:"20%"}}>{dummyData.data[index].income}</UserPText8>
                        </UserHelperList>
                    ))}
                    </div>
                </UserRect2>
            </UserRect>
        </Root>
    );
};
export default HelperMyPage;