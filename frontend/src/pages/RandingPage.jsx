import styled from "styled-components";
import React from 'react';
import logoImg from '../img/임시로고.png'

const Root = styled.div`
margin: auto;
width: 1920px;
background: #FFF;
display: flex;
border: 1px solid #EEE;
`

const RandButtonBox = styled.div`
width: 480px;
height: 1024px;
flex-shrink: 0;
background: #FFF;
`

const RandBox = styled.div`
display:flex;
flex-direction: column;
align-items: center;
width: 1440px;
height: 1024px;
background: linear-gradient(90deg, #FFF8F3 88.55%, #E7E6E6 100%);
`

const RandBtnBox = styled.div`
margin : 56px 26px 32px 26px;
width: 428px;
height: 70px;
display: flex;
justify-content: space-between;
`

const RandBtn = styled.div`
margin: 32px 26px;
width: 428px;
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
width: 204px;
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
width: 428px;
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

const RandLogoImg = styled.img`
margin-top: 80px;
margin-left: 124px;
margin-bottom: 12px;
width: 204px;
height: 148px;
`

const RandLine = styled.div`
width: 1180px;
height: 2px;
background: #E7E6E6;
`
const RandHeader = styled.div`
width: 1440px;
`

const RandTextBox = styled.div`
width: 1440px;
padding-top:24px;
padding-left:324px;
`

const RandTextBig = styled.div`
width: 1440px;
height: 42px;

color: #000;
font-family: 'Noto Sans KR', sans-serif;
font-size: 42px;
font-style: normal;
font-weight: 400;
line-height: normal;
`

const RandTextSmall = styled.div`
display: flex;
width: 1100px;
height: 538px;
flex-direction: column;
justify-content: center;

color: #000;
font-family: 'Noto Sans KR', sans-serif;
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: 48px; /* 200% */
`

export const RandingPage = () => {
    return(
        <Root>
            <RandBox>
                <RandHeader>
                    <RandLogoImg src={logoImg}></RandLogoImg>
                </RandHeader>
                <RandLine></RandLine>
                <RandTextBox>
                    <RandTextBig>환영합니다</RandTextBig>
                    <RandTextSmall>
                        물가 상승과 경기 둔화로 현재 경제 상황은 매우 어렵습니다. 
                        그러나 이러한 도전적인 시기에도 혁신과 협력을 통해 새로운 기회를 찾을 수 있습니다. 
                        기업들은 디지털 전환과 지속 가능한 비즈니스 모델을 채택하여 경쟁력을 확보해야 합니다.
                        <br/>교육 역시 중요한 과제 중 하나입니다. 젊은 세대에게 현대적인 스킬과 지식을 전달하고, 
                        교육의 접근성을 높이는 것이 필수적입니다. 또한 사회적 평등을 증진하기 위해 
                        다양성과 포용성을 존중하는 사회를 만들어야 합니다.
                        <br/>정부와 시민 사회, 기업이 협력하여 이러한 문제에 대처하고 해결책을 찾는다면 미래는 더 밝을 것입니다. 
                        이러한 과정에서 우리는 지속 가능한 환경을 보호하고, 모든 사람들에게 공평한 기회를 제공하는 방향으로 나아갈 수 있을 것입니다.</RandTextSmall>
                </RandTextBox>
            </RandBox>
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