import styled from "styled-components";
import React from 'react';
import logoImg from '../img/임시로고.png'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HeaderRoot = styled.div`
width:100vw;
height:8.88vh;
background-color:#D0B89E;

display:flex;
align-items:center;
`
const HeadButtonSet = styled.div`
width:12%;
display:flex;
align-items:center;
justify-content:space-between;
`
const HeadButtonSet2 = styled.div`
width:23%;
display:flex;
align-items:center;
justify-content:flex-end;
`
const HeadButtonText = styled.div`
color: var(--Point-6, #54493F);
font-family: Noto Sans KR;
font-size: 1vw;
font-style: normal;
font-weight: 700;
line-height: normal;
`
const HeadButtonLine = styled.div`
margin: 0% 4.33%;

width: 1px;
height: 21px;
background: #54493F;
`
const HeadImg = styled.img`
height:80%;
`

export const Header = ({ data, onDataChange }) => {
    const navigate = useNavigate();
    const [reRender, setreRender] = useState(0);

    React.useEffect(() => {
        console.log(localStorage.getItem("loginState"));
    }, [reRender]);

    const OnClickHandler = () =>{
        const userType = localStorage.getItem('userType')

        if(userType === 'user'){
            navigate("/usermypage");
        } else {
            navigate("/helperMy")
        }

    };


    const OnClickHandler2 = () => {
        navigate("/");
    };

    const OnClickHandler3 = () => {
        if(window.confirm('로그아웃하시겠습니까?')){
            navigate("/");
            localStorage.setItem("loginState",false);
            setreRender(prevState => (prevState === 0 ? 1 : 0));
            onDataChange();
        };
    };

    const clickMain = () => {
        if (localStorage.getItem("loginState") === "false") {
            alert("서비스 이용시 로그인이 필요합니다.");
        }
        if (localStorage.getItem("loginState") === "true") {
            if (JSON.parse(localStorage.getItem("userInfo")).type === "helper") {
                alert(
                "안녕하세요 " +
                    JSON.parse(localStorage.getItem("userInfo")).name +
                    " 도우미님!"
                );
                navigate("/helper");
            }
            if (JSON.parse(localStorage.getItem("userInfo")).type === "user") {
                alert(
                "안녕하세요 " +
                    JSON.parse(localStorage.getItem("userInfo")).name +
                    "님!"
                );
                navigate("/user");
            }
        }
    };

    const OnClickHandler4 = () => {
        navigate("/chat");
    };

    return(
        <>
            <HeaderRoot>
                <div style={{width:"2%"}}></div>
                <HeadImg src={logoImg} onClick={OnClickHandler2}></HeadImg>
                <div style={{width:"2%"}}></div>
                {/*<div style={{width:"12%"}}></div>*/}
                <HeadButtonSet style={{width:"8%"}}>
                    <HeadButtonText onClick={clickMain}>메인화면</HeadButtonText>
                    <HeadButtonLine></HeadButtonLine>
                    <HeadButtonText onClick={OnClickHandler4}>채팅</HeadButtonText>
                </HeadButtonSet>
                <div style={{width:"59%"}}></div>
                <HeadButtonSet2>
                    {(localStorage.getItem("loginState")==="false"||localStorage.getItem("loginState")===null)&&(<HeadButtonText style={{width:"100%",marginRight:"4.33%",display:"flex",alignItems:"center",justifyContent:"flex-end"}}>로그인이 필요합니다</HeadButtonText>)}
                    {localStorage.getItem("loginState")==="true"&&(
                    <><HeadButtonText>{JSON.parse(localStorage.getItem("userInfo")).name+" "+(JSON.parse(localStorage.getItem("userInfo")).type==="helper"?"도우미":"")}님</HeadButtonText>
                    <HeadButtonLine></HeadButtonLine>
                    <HeadButtonText onClick={OnClickHandler}>마이페이지</HeadButtonText>
                    <HeadButtonLine></HeadButtonLine>
                    <HeadButtonText onClick={OnClickHandler3}>로그아웃</HeadButtonText></>
                    )}
                </HeadButtonSet2>
            </HeaderRoot>
        </>
    );
};
export default Header;