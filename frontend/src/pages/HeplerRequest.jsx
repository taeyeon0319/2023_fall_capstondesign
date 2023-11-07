import Header2 from "../components/Header2";
import styled from "styled-components";
import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router";
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
const HelperReqText = styled.div`
color: var(--Point-7, #884A39);
margin:0.3vh;
font-family: Noto Sans KR;
font-size: 1.4vh;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const HelperReqText2 = styled.div`
color: var(--Point-6, #54493F);
font-family: Noto Sans KR;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`
const HelperReqText3 = styled.div`
color: var(--Point-5, #725F51);
font-family: Noto Sans KR;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 170%;
`
export const HelperRequestPage = () => {
    const { state } = useLocation();

    const [Data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/helper/requests-helper/1');
            setData(response.data.filter(item => item.id === state));
            console.log(Data);
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
        }
    };

    return(
        <Root>
            <Header2></Header2>
            <HelperRectBox>
                <div style={{height:"81.855vh",margin:"auto"}}>
                    <HelperRectTitle>도우미 신청</HelperRectTitle>
                    <HelperRect>
                        {Data.length!==0&&(
                        <div style={{dispaly:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                            <UserInfoText>지역</UserInfoText>
                            <UserInfoIpt>{Data[0].user.region_county}</UserInfoIpt>
                            <UserInfoText>도우미 분야</UserInfoText>
                            <UserInfoIpt>{Data[0].field}</UserInfoIpt>
                            <UserInfoText>날짜</UserInfoText>
                            <UserInfoIpt>{Data[0].date.substr(0,10)}</UserInfoIpt>
                            <UserInfoText>도우미 시간대</UserInfoText>
                            <UserInfoIpt>{Data[0].start_time}~{Data[0].end_time}</UserInfoIpt>
                            <UserInfoText>도우미 성별</UserInfoText>
                            <UserInfoIpt>{Data[0].care_gender==='M'?'남':'여'}</UserInfoIpt>
                            <UserInfoText>요청 사항</UserInfoText>
                            <UserInfoIpt style={{height:"22.5185vh",overflow:"auto"}}>{Data[0].comment}</UserInfoIpt>
                        </div>)}
                    </HelperRect>
                </div>
                <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",height:"81.855vh",margin:"auto"}}>
                    <div>
                        <HelperRectTitle>도우미 신청자 정보</HelperRectTitle>
                        <HelperRect style={{alignItems:"center",height:"32.7vh"}}>
                            {Data.length!==0&&(
                            <div style={{dispaly:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                                <UserInfoText>이름</UserInfoText>
                                <UserInfoIpt>{Data[0].user.name}</UserInfoIpt>
                                <UserInfoText>주소</UserInfoText>
                                <UserInfoIpt>{Data[0].user.region_county}</UserInfoIpt>
                                <HelperReqText>더욱 자세한 주소는 직접 전달받아야 합니다.</HelperReqText>
                                <UserInfoText>연락처</UserInfoText>
                                <UserInfoIpt>{Data[0].user.phone}</UserInfoIpt>
                            </div>)}
                        </HelperRect>
                    </div>
                    <div>
                        <HelperRectTitle>주의사항</HelperRectTitle>
                        <HelperRect style={{alignItems:"center",height:"32.7vh",padding:"2.3vh"}}>
                            <div style={{paddingBottom:"2vh"}}>
                                <HelperReqText2>당일 고객 노쇼 시 대응 및 취소 수수료 정책</HelperReqText2>
                                <HelperReqText3>
                                - 서비스 당일에 고객님과 연락이 닿지 않아 도우미님이 정상적으로 업무를 진행하지 못하는 경우에는 서비스 시작시간 기준으로 30분을 대기하고 철수하는 것을 원칙으로 합니다.
                                <br/>
                                - 당일 노쇼로 인한 취소로 처리되어 동일하게 30% 취소 수수료가 부과됩니다. (이용자기준)
                                </HelperReqText3>
                            </div>
                            <div>
                                <HelperReqText2>고객요청으로 인한 서비스 중단 시 환불 정책</HelperReqText2>
                                <HelperReqText3>
                                - 업무가 시작된 이후에 고객님의 사정으로 서비스를 중단 요청하는 경우 환불이 되지 않습니다.
                                <br/>
                                - 직거래를 요구한다면 피해 상황이 발생할 수 있으니 주의하세요.
                                <br/>
                                이 경우 즉시 고객센터로 신고해 주세요.
                                </HelperReqText3>
                            </div>
                        </HelperRect>  
                    </div>
                </div>
            </HelperRectBox>
        </Root>
    );
};
export default HelperRequestPage;