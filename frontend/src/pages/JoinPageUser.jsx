import styled from "styled-components";
import React from 'react';
import Header from "../components/Header";

const Root = styled.div`
width: 100vw;
height:100vh;
background: #FFF8F3;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
`

const JoinUInputBox = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width : 600px;
height : 70px;
margin: 6px auto;
`

const JoinUInput = styled.input`
width:70%;
height: 50px;
background: #FFF;
border: 1px solid #BB6C25;
border-radius: 20px;
`

const JoinUText = styled.p`
witdth: 30%;
color: #000;
font-family: Noto Serif KR;
font-size: 32px;
font-style: normal;
font-weight: 600;
line-height: 48px; /* 150% */
`
const JoinUBtn = styled.div`
width : 600px;
height : 80px;
border-radius: 20px;
background: #BB6C25;

display: flex;
align-items: center;
justify-content:center;
margin: 50px auto;

color: #FFF;
text-align: center;
font-family: Roboto Flex;
font-size: 40px;
font-style: normal;
font-weight: 800;
line-height: normal;
`

export const JoinPageUser = () =>{
    return (
        <Root>
            <Header></Header>
            <div style={{height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{margin: '50px auto auto auto'}}>
                    <JoinUInputBox>
                        <JoinUText>이름</JoinUText>
                        <JoinUInput></JoinUInput>
                    </JoinUInputBox>
                    <JoinUInputBox>
                        <JoinUText>아이디</JoinUText>
                        <JoinUInput></JoinUInput>
                    </JoinUInputBox>
                    <JoinUInputBox>
                        <JoinUText>비밀번호</JoinUText>
                        <JoinUInput></JoinUInput>
                    </JoinUInputBox>
                    <JoinUInputBox>
                        <JoinUText>전화번호</JoinUText>
                        <JoinUInput></JoinUInput>
                    </JoinUInputBox>
                </div>
                <JoinUBtn>회원가입</JoinUBtn>
            </div>
        </Root>
        
    );
};
export default JoinPageUser;