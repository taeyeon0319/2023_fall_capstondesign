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
padding:0px 0px 0px 10px;
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
const JoinHText2 = styled.div`
color: var(--Point-6, #54493F);

font-family: Noto Sans KR;
font-size: 1.25vw;
font-style: normal;
font-weight: 600;
line-height: normal;
`
const JoinHText3 = styled.div`
color: var(--Gray-70, #707070);
margin: 10px 0px 10px 5px;
/* B16_Regular */
font-family: Noto Sans KR;
font-size: 0.6vw;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const JoinHBtn2 = styled.div`
margin: 0px 0px 0px 20px;
width: 9vw;
height: 4.3vh;
flex-shrink: 0;
margin-top:5px;

border-radius: 5px;
border: 1px solid var(--Gray-40, #C2C1C1);
background: var(--Point-4, #93796A);

display:flex;
align-items:center;
justify-content:center;
color: #FFF;

font-family: Noto Sans KR;
font-size: 0.7375vw;
font-style: normal;
font-weight: 700;
line-height: normal;
`
export const JoinPageHelper = () =>{

    const navigate = useNavigate();
    const [checkPW, setCheckPW] = useState(-1);

    const [JoinData, setJoinData] = useState({
        id: '',
        password: '',
        password_confirm: '',
        name: '',
        email: '',
        mobile: '',
        type: 'helper',
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setJoinData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        if (document.getElementById("newPW").value!==""&&document.getElementById("newPW").value===document.getElementById("confNewPW").value){
            setCheckPW(1);
        }else{
            setCheckPW(0);
        }
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

    const OnclickCheckId = () =>{
        console.log("id check api");
    };

    return (
        <Root>
            <Header2></Header2>
            <JoinBtnBox>
                <JoinHInputBox>
                    <JoinHText2>도우미 회원가입</JoinHText2>
                    <JoinHText>이름</JoinHText>
                    <JoinHInput type="text" name="name" value={JoinData.name} onChange={handleChange}></JoinHInput>
                    <JoinHText>아이디</JoinHText>
                    <div style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
                        <JoinHInput type="text" name="id" value={JoinData.id} onChange={handleChange} style={{width:"10vw"}}></JoinHInput>
                        <JoinHBtn2 onClick={OnclickCheckId}>아이디 중복 확인하기</JoinHBtn2>
                    </div>
                    <JoinHText >비밀번호</JoinHText>
                    <JoinHInput id="newPW" type="password" name="password" value={JoinData.password} onChange={handleChange}></JoinHInput>
                    <JoinHText >비밀번호 확인</JoinHText>
                    <JoinHInput id="confNewPW" type="password" name="password_confirm" value={JoinData.password_confirm} onChange={handleChange}></JoinHInput>
                    <JoinHText3>{checkPW===-1?"":checkPW===0?"비밀번호가 다릅니다":"비밀번호가 일치합니다"}</JoinHText3>
                    <JoinHText>이메일</JoinHText>
                    <JoinHInput type="text" name="email" value={JoinData.email} onChange={handleChange}></JoinHInput>
                    <JoinHText>전화번호</JoinHText>
                    <JoinHInput type="text" name="mobile" value={JoinData.mobile} onChange={handleChange}></JoinHInput>
                </JoinHInputBox>
            </JoinBtnBox>
            <div style={{display:"flex"}}>
                <JoinHBtn onClick={ OnclickHandler }>뒤로가기</JoinHBtn>
                <JoinHBtn style={{background: "var(--Point-4, #93796A)",color:"#FFF"}} onClick={ Join }>회원가입</JoinHBtn>
            </div>
        </Root>
    );
};
export default JoinPageHelper;