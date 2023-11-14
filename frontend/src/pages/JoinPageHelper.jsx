import styled from "styled-components";
import Header2 from "../components/Header2";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
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
padding:10px;
display: flex;
flex-direction:column;
align-items: flex-start;
justify-content: space-between;
`

const JoinHInput = styled.input`
width: 48.54vw;
height: 5.3vh;
flex-shrink: 0;
margin-top:5px;

border-radius: 5px;
border: 1px solid var(--Gray-30, #EBEAEA);
background: var(--white, #FFF);
`

const JoinHText = styled.p`
padding-top:20px;
color: var(--Gray-70, #707070);

font-family: Noto Sans KR;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: normal;
`
const JoinHBtn = styled.div`
width : 14.6875vw;
height : 4.9vh;
flex-shrink: 0;
margin:10px;

border-radius: 5px;
border: 1px solid var(--Gray-40, #C2C1C1);
background: var(--white, #FFF);

display: flex;
align-items: center;
justify-content:center;

color: var(--Gray-70, #707070);

font-family: Noto Sans KR;
font-size: 0.9375vw;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const JoinBtnBox = styled.div`
width: 51.875vw;
height:76.86vh;
flex-shrink: 0;
margin-top:20px;

border-radius: 5px;
border: 1px solid var(--Gray-30, #EBEAEA);
background: var(--white, #FFF);

display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
`

export const JoinPageHelper = () =>{

    const navigate = useNavigate();

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
            alert("환영합니다! 가입하신 아이디와 비밀번호로 로그인해주세요.");
            navigate("/");
        } catch (error) {
            alert("회원가입 실패 : 모든 정보를 정확히 기입해주세요.");
            console.error('회원가입 실패:', error.message);
        }
    };

    const OnclickHandler = () =>{
        navigate("/join");
    };

    return (
        <Root>
            <Header2></Header2>
            <JoinBtnBox>
                <JoinHInputBox>
                    <JoinHText>이름</JoinHText>
                    <JoinHInput type="text" name="name" value={JoinData.name} onChange={handleChange}></JoinHInput>
                    <JoinHText>아이디</JoinHText>
                    <JoinHInput type="text" name="id" value={JoinData.id} onChange={handleChange}></JoinHInput>
                    <JoinHText >비밀번호</JoinHText>
                    <JoinHInput type="password" name="password" value={JoinData.password} onChange={handleChange}></JoinHInput>
                    <JoinHText >비밀번호 확인</JoinHText>
                    <JoinHInput type="password" name="password_confirm" value={JoinData.password_confirm} onChange={handleChange}></JoinHInput>
                    <JoinHText>이메일</JoinHText>
                    <JoinHInput type="text" name="email" value={JoinData.email} onChange={handleChange}></JoinHInput>
                    <JoinHText>전화번호</JoinHText>
                    <JoinHInput type="text" name="mobile" value={JoinData.mobile} onChange={handleChange}></JoinHInput>
                </JoinHInputBox>
            </JoinBtnBox>
            <div style={{display:"flex"}}>
                <JoinHBtn onClick={ OnclickHandler }>뒤로가기</JoinHBtn>
                <JoinHBtn style={{background: "var(--Gray-30, #EBEAEA)"}} onClick={ Join }>회원가입</JoinHBtn>
            </div>
        </Root>
    );
};
export default JoinPageHelper;