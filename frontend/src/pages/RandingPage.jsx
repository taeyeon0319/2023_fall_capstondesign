import styled from "styled-components";
import React from 'react';

const Root = styled.div`
margin: auto;
width: 1440px;
height: 1024px;
background: #FFF;
display: flex;
border: 1px solid #EEE;
`

const RandButtonBox = styled.div`
width: 412px;
height: 1024px;
flex-shrink: 0;
background: #FFF;
`

const RandBox = styled.div`
width: 1028px;
height: 1024px;
background: linear-gradient(90deg, #FFF8F3 88.55%, #E7E6E6 100%);
`

const RandBtnBox = styled.div`
margin : 56px 26px 32px 26px;
width: 360px;
height: 70px;
display: flex;
justify-content: space-between;
`

const RandBtn = styled.div`
margin: 32px 26px;
width: 360px;
height: 70px;
flex-shrink: 0;
border-radius: 15px;
border: 1px solid #E7E6E6;
background: #FFF8F3;
box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);

color: #000;
font-family: 'Noto Sans KR', sans-serif;
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: 48px; /* 200% */
display : flex;
justify-content : center;
align-items : center;
`

const RandBtnSmall = styled.div`
width: 170px;
height: 70px;
flex-shrink: 0;
border-radius: 15px;
border: 1px solid #E7E6E6;
background: #FFF8F3;
box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);

color: #000;
font-family: 'Noto Sans KR', sans-serif;
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: 48px; /* 200% */
display : flex;
justify-content : center;
align-items : center;
`

const RandBtnBig = styled.div`
margin: 32px 26px;
width: 360px;
height: 100px;
flex-shrink: 0;
border-radius: 15px;
background: #E7E6E6;
box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);

color: #000;
font-family: 'Noto Sans KR', sans-serif;
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: 48px; /* 200% */
display : flex;
justify-content : center;
align-items : center;
`

export const RandingPage = () => {
    return(
        <Root>
            <RandBox></RandBox>
            <RandButtonBox>
                <RandBtnBox>
                    <RandBtnSmall>로그인</RandBtnSmall>
                    <RandBtnSmall>회원가입</RandBtnSmall>
                </RandBtnBox>
                <RandBtnBig>로그인이 필요합니다.</RandBtnBig>
                <RandBtn>메인 화면</RandBtn>
                <RandBtn>이용 가이드</RandBtn>
                <RandBtn>서비스</RandBtn>
                <RandBtn>소개</RandBtn>
            </RandButtonBox>
        </Root>
    );
};
export default RandingPage;