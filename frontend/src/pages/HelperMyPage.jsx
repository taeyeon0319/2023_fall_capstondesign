import Header2 from "../components/Header2";
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
            sub:"동국초등학교 등원 도우미 구해요.",
            time:["08:00","09:00"],
            date:"2023-09-24",
            income:13500,
            reqname:"박도움"
        },
        {
            sub:"아이 3시간 봐주실 분 구합니다.",
            time:["15:00","18:00"],
            date:"2023-09-24",
            income:40500,
            reqname:"신케어"
        },
        {
            sub:"[급구] 아이 하원 도우미 구합니다.",
            time:["15:00","16:00"],
            date:"2023-09-23",
            income:27000,
            reqname:"이하원"
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
color: var(--Point-6, #54493F);
font-family: Inter;
font-size: 5vh;
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
margin:0.2vh 0.1vh;
color: var(--Point-6, #54493F);

font-family: Noto Sans KR;
font-size: 2.148148vh;
font-style: normal;
font-weight: 700;
line-height: normal;
`
const UserHelperList = styled.div`
margin:10px;
padding:30px;
width:59.37vw;
height: 15.3vh;
flex-shrink: 0;
border-radius: 5px;
border: 1px solid var(--Gray-30, #EBEAEA);
background: var(--white, #FFF);

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
color: var(--Black, #141515);

font-family: Noto Sans KR;
font-size: 2.3vh;
font-style: normal;
font-weight: 700;
line-height: normal;
`
const UserPText6 = styled.div`
margin: 0.2vh 0;

color: var(--Black, #141515);
font-family: Noto Sans KR;
font-size: 2vh;
font-style: normal;
font-weight: 500;
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
color: var(--Point-6, #54493F);
font-family: Inter;
font-size: 32px;
font-style: normal;
font-weight: 800;
line-height: normal;
`
const HelperRectTitle = styled.div`
width:62.5vw;
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
width:62.5vw;
Height:50.5vh;
border-radius: 5px;
background: var(--white, #FFF);
box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.10);

overflow:auto;
display:flex;
flex-direction:column;
align-items:center;
`
const HelperMyProfileBox = styled.div`
margin: 6.63vh 0 1.48148vh 0;
width:62.5vw;
height:18.235vh;

border-radius: 5px;
background: var(--white, #FFF);
box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.10);

display:flex;
`
const HelperMyImg = styled.svg`
margin:auto 1.875vw;
`

const HelperMyText = styled.div`
margin:0.2vh 0.1vh;
color: var(--Point-6, #54493F);

font-family: Noto Sans KR;
font-size: 3.148148vh;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const HelperMyText2 = styled.div`
margin:0.2vh 0.1vh;
color: var(--Point-6, #54493F);

font-family: Noto Sans KR;
font-size: 2.222vh;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const HelperMyText3 = styled.div`
color: var(--Point-5, #725F51);
margin:0.1vh;

font-family: Noto Sans KR;
font-size: 1.85185vh;
font-style: normal;
font-weight: 500;
line-height: normal;
`
export const HelperMyPage = () => {
    const [render, setrender] = useState(0);
    
    const handlerenderChange = () =>{
        setrender(prevState => (prevState === 0 ? 1 : 0));
    };

    return(
        <Root>
            <Header2 data={render} onDataChange={handlerenderChange}></Header2>
            <HelperMyProfileBox>
                <HelperMyImg xmlns="http://www.w3.org/2000/svg" width="5.52vw" height="9.814vh" viewBox="0 0 106 106" fill="none">
                    <path d="M53 106C82.2711 106 106 82.2711 106 53C106 23.7289 82.2711 0 53 0C23.7289 0 0 23.7289 0 53C0 82.2711 23.7289 106 53 106Z" fill="#EBEAEA"/>
                    <path d="M53.0002 22.9187C41.1396 22.9187 31.5137 32.5575 31.5137 44.4339C31.5137 56.0808 40.6239 65.5474 52.7137 65.8917C52.8856 65.8917 53.1148 65.8917 53.2293 65.8917C53.3439 65.8917 53.5158 65.8917 53.6304 65.8917C53.6877 65.8917 53.745 65.8917 53.745 65.8917C65.3191 65.4901 74.4293 56.0808 74.4866 44.4339C74.4866 32.5575 64.8607 22.9187 53.0002 22.9187Z" fill="white"/>
                    <path d="M88.8111 88.8893C79.4094 97.7056 66.8387 103.135 53.0003 103.135C39.1619 103.135 26.5911 97.7056 17.1895 88.8893C18.4571 83.9973 21.8903 79.5354 26.908 76.0948C41.3274 66.3108 64.7788 66.3108 79.0925 76.0948C84.1631 79.5354 87.5434 83.9973 88.8111 88.8893Z" fill="white"/>
                </HelperMyImg>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"center"}}>
                    <div style={{display:"flex",alignItems:"flex-end"}}>
                        <HelperMyText>김헬퍼</HelperMyText>
                        <HelperMyText2>도우미님</HelperMyText2>
                    </div>
                    <HelperMyText3>서울특별시 중구 충무로 1길 36</HelperMyText3>
                    <HelperMyText3>010-5641-7997</HelperMyText3>
                </div>
                <div style={{width:"25vw"}}></div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                    <UserPText4>이번달 총 수익</UserPText4>
                    <UserPText>81,000</UserPText>
                </div>
            </HelperMyProfileBox>
            <div style={{height:"81.855vh",margin:"auto"}}>
                <HelperRectTitle>최근 도움 내역</HelperRectTitle>
                <HelperRect>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                        {dummyData.data.map((item,index)=>(
                            <UserHelperList style={{justifyContent:"space-between"}}>
                                <div style={{display:"flex",width:"80%"}}>
                                <HelperMyImg xmlns="http://www.w3.org/2000/svg" width="5.52vw" height="9.814vh" viewBox="0 0 106 106" fill="none">
                                    <path d="M53 106C82.2711 106 106 82.2711 106 53C106 23.7289 82.2711 0 53 0C23.7289 0 0 23.7289 0 53C0 82.2711 23.7289 106 53 106Z" fill="#EBEAEA"/>
                                    <path d="M53.0002 22.9187C41.1396 22.9187 31.5137 32.5575 31.5137 44.4339C31.5137 56.0808 40.6239 65.5474 52.7137 65.8917C52.8856 65.8917 53.1148 65.8917 53.2293 65.8917C53.3439 65.8917 53.5158 65.8917 53.6304 65.8917C53.6877 65.8917 53.745 65.8917 53.745 65.8917C65.3191 65.4901 74.4293 56.0808 74.4866 44.4339C74.4866 32.5575 64.8607 22.9187 53.0002 22.9187Z" fill="white"/>
                                    <path d="M88.8111 88.8893C79.4094 97.7056 66.8387 103.135 53.0003 103.135C39.1619 103.135 26.5911 97.7056 17.1895 88.8893C18.4571 83.9973 21.8903 79.5354 26.908 76.0948C41.3274 66.3108 64.7788 66.3108 79.0925 76.0948C84.1631 79.5354 87.5434 83.9973 88.8111 88.8893Z" fill="white"/>
                                </HelperMyImg>
                                    <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                                        <UserPText5>{dummyData.data[index].sub} {dummyData.data[index].date}</UserPText5>
                                        <UserPText6>{dummyData.data[index].time[0]}~{dummyData.data[index].time[1]}</UserPText6>
                                        <UserPText6 style={{display:"flex"}}>요청자 <p style={{marginLeft:"0.8vh",fontWeight:"700"}}>{dummyData.data[index].reqname}</p></UserPText6>
                                    </div>
                                </div>
                                <UserPText8 style={{width:"20%"}}>{dummyData.data[index].income}</UserPText8>
                            </UserHelperList>
                        ))}
                    </div>
                </HelperRect>
            </div>
            {/*
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
             */}
        </Root>
    );
};
export default HelperMyPage;