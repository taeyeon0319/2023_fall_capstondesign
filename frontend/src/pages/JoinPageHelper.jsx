import styled from "styled-components";
import Header from "../components/Header";
import React, { useState } from 'react';
import axios from 'axios';

const Root = styled.div`
width: 100vw;
height:100vh;
background: #FFF8F3;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
`

const JoinHInputBox = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width : 600px;
height : 70px;
margin: 6px auto;
`

const JoinHInput = styled.input`
width:70%;
height: 50px;
background: #FFF;
border: 1px solid #BB6C25;
border-radius: 20px;
`

const JoinHText = styled.p`
witdth: 30%;
color: #000;
font-family: Noto Serif KR;
font-size: 32px;
font-style: normal;
font-weight: 600;
line-height: 48px; /* 150% */
`
const JoinHBtn = styled.div`
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

export const JoinPageHelper = () =>{
    const [JoinData, setJoinData] = useState({
        id: '',
        password: '',
        password_confirm: '',
        name: '',
        email: '',
        mobile: '',
        type: '도우미',
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setJoinData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const Join = async () =>{
        try {
            const response = await axios.post('http://localhost:5000/signup', JoinData);
            console.log('회원가입 성공:', response.data);
        } catch (error) {
            console.error('회원가입 실패:', error.message);
        }
    };

    return (
        <Root>
            <Header></Header>
            <div style={{height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{margin: '50px auto auto auto'}}>
                    <JoinHInputBox>
                        <JoinHText>이름</JoinHText>
                        <JoinHInput type="text" name="name" value={JoinData.name} onChange={handleChange}></JoinHInput>
                    </JoinHInputBox>
                    <JoinHInputBox>
                        <JoinHText>아이디</JoinHText>
                        <JoinHInput type="text" name="id" value={JoinData.id} onChange={handleChange}></JoinHInput>
                    </JoinHInputBox>
                    <JoinHInputBox>
                        <JoinHText >비밀번호</JoinHText>
                        <JoinHInput type="password" name="password" value={JoinData.password} onChange={handleChange}></JoinHInput>
                    </JoinHInputBox>
                    <JoinHInputBox>
                        <JoinHText >비밀번호 확인</JoinHText>
                        <JoinHInput type="password" name="password_confirm" value={JoinData.password_confirm} onChange={handleChange}></JoinHInput>
                    </JoinHInputBox>
                    <JoinHInputBox>
                        <JoinHText>이메일</JoinHText>
                        <JoinHInput type="text" name="email" value={JoinData.email} onChange={handleChange}></JoinHInput>
                    </JoinHInputBox>
                    <JoinHInputBox>
                        <JoinHText>전화번호</JoinHText>
                        <JoinHInput type="text" name="mobile" value={JoinData.mobile} onChange={handleChange}></JoinHInput>
                    </JoinHInputBox>
                </div>
                <JoinHBtn onClick={ Join }>회원가입</JoinHBtn>
            </div>
        </Root>
    );
};
export default JoinPageHelper;