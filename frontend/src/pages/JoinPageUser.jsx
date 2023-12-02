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
padding:5px 10px;
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
const JoinUText4 = styled.p`
width: 9vw;
height: 4.3vh;
color: var(--Gray-70, #707070);

font-family: Noto Sans KR;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: normal;

display:flex;
align-items:center;
justify-content:center;
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
const JoinUText2 = styled.div`
color: var(--Point-6, #54493F);

font-family: Noto Sans KR;
font-size: 1.25vw;
font-style: normal;
font-weight: 600;
line-height: normal;
`
const JoinUText3 = styled.div`
color: var(--Gray-70, #707070);
margin: 10px 0px 10px 5px;
/* B16_Regular */
font-family: Noto Sans KR;
font-size: 0.6vw;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const JoinUBtn2 = styled.div`
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

export const JoinPageUser = () =>{

    const navigate = useNavigate();
    const [checkPW, setCheckPW] = useState(-1);
    const [idOk, setIdOk] = useState(-1);

    const [JoinData, setJoinData] = useState({
        id: '',
        password: '',
        password_confirm: '',
        name: '',
        email: '',
        mobile: '',
        type: 'user',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJoinData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleChange2 = (e) =>{
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

    const OnclickCheckId = async () =>{
        try{
            console.log('http://localhost:5000/checkId?id='+JoinData.id)
            const response = await axios.get('http://localhost:5000/checkId?id='+JoinData.id);
            console.log(response.data)
            if (response.data===false){
                setIdOk(1);
            }else{
                setIdOk(0);
            }
        } catch(error){
            console.log(error);
        }
    };

    return (
        <Root>
            <Header2></Header2>
            <JoinBtnBox>
                <JoinUInputBox>
                    <JoinUText2>이용자 회원가입</JoinUText2>
                    <JoinUText>이름</JoinUText>
                    <JoinUInput type="text" name="name" value={JoinData.name} onChange={handleChange}></JoinUInput>
                    <JoinUText>아이디</JoinUText>
                    <div style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
                        <JoinUInput type="text" name="id" value={JoinData.id} onChange={handleChange} style={{width:"10vw"}}></JoinUInput>
                        <JoinUBtn2 onClick={OnclickCheckId}>아이디 중복 확인하기</JoinUBtn2>
                        <JoinUText4>{idOk===-1?"아이디 중복 확인을 진행해주세요":idOk===0?"사용가능한 아이디입니다":"사용할 수 없는 아이디입니다"}</JoinUText4>
                    </div>
                    <JoinUText >비밀번호</JoinUText>
                    <JoinUInput id="newPW" type="password" name="password" value={JoinData.password} onChange={handleChange2}></JoinUInput>
                    <JoinUText >비밀번호 확인</JoinUText>
                    <JoinUInput id="confNewPW" type="password" name="password_confirm" value={JoinData.password_confirm} onChange={handleChange2}></JoinUInput>
                    <JoinUText3>{checkPW===-1?"":checkPW===0?"비밀번호가 다릅니다":"비밀번호가 일치합니다"}</JoinUText3>
                    <JoinUText>이메일</JoinUText>
                    <JoinUInput type="text" name="email" value={JoinData.email} onChange={handleChange}></JoinUInput>
                    <JoinUText>전화번호</JoinUText>
                    <JoinUInput type="text" name="mobile" value={JoinData.mobile} onChange={handleChange}></JoinUInput>
                </JoinUInputBox>
            </JoinBtnBox>
            <div style={{display:"flex"}}>
                <JoinUBtn onClick={ OnclickHandler }>뒤로가기</JoinUBtn>
                <JoinUBtn style={{background: "var(--Point-4, #93796A)",color:"#FFF"}} onClick={ Join }>회원가입</JoinUBtn>
            </div>
        </Root>
        
    );
};
export default JoinPageUser;