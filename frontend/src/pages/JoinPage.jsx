import Header from "../components/Header";
import styled from "styled-components";
import React from 'react';
import Join1 from '../img/Join1.png'
import Join2 from '../img/Join2.png'

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
width: 580px;
height: 200px;
margin: 30px auto;

display: flex;
justify-content: space-between;
`

const JoinText = styled.p`
color: #000;
font-family: Inter;
font-size: 36px;
font-style: normal;
font-weight: 400;
line-height: normal;
align: left;

width:100%;
margin:0px;
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
width:30%;
margin: 20px;
`

const JoinLine = styled.div`
width: 600px;
height: 2px;
flex-shrink: 0;

background: linear-gradient(90deg, rgba(231, 230, 231, 0.00) 0%, #E7E6E7 50%, rgba(231, 230, 231, 0.00) 100%);
`

const JoinTextBox = styled.div`
margin: 0px;
padding: 0px;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
width:70%;
`

export const JoinPage = () => {
    return(
        <Root>
            <Header></Header>
            <div style={{margin:'auto'}}>
                <JoinBtnBox>
                    <JoinImg src={Join1}></JoinImg>
                    <JoinTextBox>
                        <JoinText>도우미가 필요해요</JoinText>
                        <JoinText style={{color:'#35993F',fontWeight:'600'}}>이용자 가입 &gt;</JoinText>
                    </JoinTextBox>
                </JoinBtnBox>
                <JoinLine></JoinLine>
                <JoinBtnBox>
                    <JoinImg src={Join2}></JoinImg>
                    <JoinTextBox>
                        <JoinText>든든한 도우미로 활동하고 싶어요</JoinText>
                        <JoinText style={{color:'#E61515',fontWeight:'600'}}>도우미 가입 &gt;</JoinText>
                    </JoinTextBox>
                </JoinBtnBox>
                <JoinLine></JoinLine>
                <JoinText2 style={{color:'#8F8F8F',fontWeight:'400', margin:'30px auto 0px auto'}}>이미 회원이신가요?</JoinText2>
                <JoinText2 style={{color:'#000',fontWeight:'700', margin:'00px auto 30px auto'}}>로그인하기</JoinText2>
            </div>
        </Root>
    );
};
export default JoinPage;