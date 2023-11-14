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

const JoinUInputBox = styled.div`
padding:10px;
display: flex;
flex-direction:column;
align-items: flex-start;
justify-content: space-between;
`

const JoinUInput = styled.input`
width: 48.54vw;
height: 5.3vh;
flex-shrink: 0;
margin-top:5px;

border-radius: 5px;
border: 1px solid var(--Gray-30, #EBEAEA);
background: var(--white, #FFF);
`

const JoinUText = styled.p`
padding-top:20px;
color: var(--Gray-70, #707070);

font-family: Noto Sans KR;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: normal;
`
const JoinUBtn = styled.div`
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

export const JoinPageUser = () =>{

    const navigate = useNavigate();

    const [JoinData, setJoinData] = useState({
        id: '',
        password: '',
        password_confirm: '',
        name: '',
        email: '',
        mobile: '',
        type: '이용자',
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
            alert("로그인 실패 : 모든 정보를 정확히 기입해주세요.");
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
                <JoinUInputBox>
                    <JoinUText>이름</JoinUText>
                    <JoinUInput type="text" name="name" value={JoinData.name} onChange={handleChange}></JoinUInput>
                    <JoinUText>아이디</JoinUText>
                    <JoinUInput type="text" name="id" value={JoinData.id} onChange={handleChange}></JoinUInput>
                    <JoinUText >비밀번호</JoinUText>
                    <JoinUInput type="password" name="password" value={JoinData.password} onChange={handleChange}></JoinUInput>
                    <JoinUText >비밀번호 확인</JoinUText>
                    <JoinUInput type="password" name="password_confirm" value={JoinData.password_confirm} onChange={handleChange}></JoinUInput>
                    <JoinUText>이메일</JoinUText>
                    <JoinUInput type="text" name="email" value={JoinData.email} onChange={handleChange}></JoinUInput>
                    <JoinUText>전화번호</JoinUText>
                    <JoinUInput type="text" name="mobile" value={JoinData.mobile} onChange={handleChange}></JoinUInput>
                </JoinUInputBox>
            </JoinBtnBox>
            <div style={{display:"flex"}}>
                <JoinUBtn onClick={ OnclickHandler }>뒤로가기</JoinUBtn>
                <JoinUBtn style={{background: "var(--Gray-30, #EBEAEA)"}} onClick={ Join }>회원가입</JoinUBtn>
            </div>
        </Root>
        
    );
};
export default JoinPageUser;