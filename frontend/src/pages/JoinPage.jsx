import Header2 from "../components/Header2";
import styled from "styled-components";
import React from 'react';
import Join5 from '../img/Join5.png'
import Join6 from '../img/Join6.png'
import ArrowRight from '../img/arrow-right.png'
import { useNavigate } from "react-router-dom";

const Root = styled.div`
width: 100vw;
height:100vh;
background: #FFF8F3;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
`

const JoinBtnBox = styled.div`
margin:10px;
width: 51.875vw;
height: 32.745vh;
flex-shrink: 0;

border-radius: 5px;
border: 1px solid var(--Gray-30, #EBEAEA);
background: var(--white, #FFF);

display: flex;
justify-content: space-between;
`

const JoinText = styled.p`
color: var(--Point-5, #725F51);
font-family: Noto Sans KR;
font-size: 1.77vw;
font-style: normal;
font-weight: 700;
line-height: normal;

width:100%;
margin:20px;

display:flex;
align-items:center;
justify-content:center;
`

const JoinText2 = styled.p`
width: 243px;
margin:0px;

text-align: center;
font-family: Inter;
font-size: 18px;
font-style: normal;
line-height: normal;
`

const JoinImg = styled.img`
width:15.73vw;
margin: 20px;
`

const JoinTextBox = styled.div`
margin: 0px;
padding: 0px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width:70%;
`

const JoinBtn = styled.div`
padding-left: 15px;
width: 16vw;
height: 5.74vh;
flex-shrink: 0;

border-radius: 5px;
background: var(--Point-5, #725F51);

color: var(--white, #FFF);

font-family: Noto Sans KR;
font-size: 1.1vw;
font-style: normal;
font-weight: 600;
line-height: normal;

display:flex;
align-items:center;
justify-content:center;
`

export const JoinPage = () => {
    const navigate = useNavigate();

    const onclickHandler1= () =>{
        navigate("/JoinUser");
    };

    const onclickHandler2= () =>{
        navigate("/JoinHelper");
    };

    return(
        <Root>
            <Header2></Header2>
            <div style={{margin:'auto'}}>
                <div style={{margin:"30px"}}>
                <JoinBtnBox>
                    <JoinImg src={Join5}></JoinImg>
                    <JoinTextBox>
                        <JoinText>"도우미가 필요해요"</JoinText>
                        {/*<JoinText style={{color:'#35993F',fontWeight:'600'}} onClick={onclickHandler1}>이용자 가입 &gt;</JoinText>*/}
                        <JoinBtn onClick={onclickHandler1}>이용자 가입 하러가기<img src={ArrowRight}></img></JoinBtn>
                    </JoinTextBox>
                </JoinBtnBox>
                <JoinBtnBox>
                    <JoinImg src={Join6}></JoinImg>
                    <JoinTextBox>
                        <JoinText>"든든한 도우미로 활동하고 싶어요"</JoinText>
                        {/*<JoinText style={{color:'#E61515',fontWeight:'600'}} onClick={onclickHandler2}>도우미 가입 &gt;</JoinText>*/}
                        <JoinBtn onClick={onclickHandler2}>도우미 가입 하러가기<img src={ArrowRight}></img></JoinBtn>
                    </JoinTextBox>
                </JoinBtnBox>
                </div>
                <JoinText2 style={{color:'#8F8F8F',fontWeight:'400', margin:'30px auto 0px auto'}}>이미 회원이신가요?</JoinText2>
                <JoinText2 style={{color:'#000',fontWeight:'700', margin:'00px auto 30px auto'}} >로그인하기</JoinText2>
            </div>
        </Root>
    );
};
export default JoinPage;