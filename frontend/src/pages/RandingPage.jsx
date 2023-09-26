import styled from "styled-components";
import React from 'react';
import logoImg from '../img/임시로고.png'
import userImg from '../img/profile.png'
import helperImg from '../img/woman.png'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Root = styled.div`
width: 100%;
background-color: #FFF;
display: flex;
justify-content: flex-end;
`
const RandButtonBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 25%;
flex-shrink: 0;
`
const RandBox = styled.div`
width: 75%;
display:flex;
flex-direction: column;
align-items: center;
height: 1024px;
background: linear-gradient(90deg, #FFF8F3 88.55%, #E7E6E6 100%);
`
const RandBtnBox = styled.div`
margin : 32px auto 16px auto;
width: 86%;
height: 70px;
display: flex;
justify-content: space-between;
align-items: center;
`
const RandBtn = styled.div`
margin: 16px auto;
width: 86%;
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
width: 47.7%;
height: 70px;
flex-shrink: 0;
border-radius: 15px;
border: 1px solid #E7E6E6;
background: ${props=>(props.toggle ? '#E7E6E6': '#FFF8F3')};
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
margin: 16px auto;
width: 86%;
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
const RandLogin=styled.div`
margin: 16px auto;
width: 86%;
flex-shrink: 0;

border-radius: 15px;
background: #E7E6E6;
box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);
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
const RandLoginText = styled.p`
color: #000;
font-family: Noto Serif KR;
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: 48px; /* 200% */
`
const RandLoginTextF = styled.p`
color: #8F8F8F;
text-align: center;
font-family: Inter;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const RandLoginInput = styled.input`
width: 63.33%;
height: 54px;
flex-shrink: 0;

fill: #FFF;
stroke-width: 1px;
stroke: #BB6C25;
`
const RandAfterLoginBox = styled.div`
margin: 16px auto;
width: 86%;
height: 100px;

display: flex;
align-items: center;
justify-content: space-around;
`
const RandAfterLoginImg = styled.img`
width:24%;
border-radius:70%;
`
//height 작성 필요함.
const RandAfterLoginText = styled.div`
color: #000;
font-family: Inter;
font-size: 25px;
font-style: normal;
font-weight: 800;
line-height: normal;

`
const RandAfterLoginBtn = styled.div`
padding:5px 10px;
margin:3px;

border-radius: 15px;
border: 1px solid #E7E6E6;
background: #FFF8F3;
box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);

color: #000;
text-align: center;
font-family: Inter;
font-size: 15px;
font-style: normal;
font-weight: 800;
line-height: normal;
`

export const RandingPage = () => {

    const navigate = useNavigate();

    //임시데이터
    const helper = {name:"김헬퍼", address:"서울특별시 중구 충무로"};
    const user = {name:"김동국", address:"서울특별시 중구 충무로"};

    const [loginBtn, setLoginBtn] = useState(0);
    const [login, setLogin] = useState(0);
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const clickLoginBtn = () =>{
        if (loginBtn===1){
            setLoginBtn(0);
        }else{
            setLoginBtn(1);
        }
    };

    const clickLogoutBtn = () =>{
        if(window.confirm('로그아웃하시겠습니까?')){
            setLogin(0);
        }
    };

    const JoinOnclickHandler =() =>{
        navigate("/Join");
    };

    const clickLoginbtn = () =>{
        if(id==='user' && pw==='user'){
            setLogin(1);
        }else if(id==='helper' && pw==='helper'){
            setLogin(2);
        }else{
            alert("아이디 또는 비밀번호가 일치하지 않습니다.");
            setLogin(0);
            const inputItem = document.getElementsByClassName('input');
            for(let i=0; i<inputItem.length ;i++){
                inputItem[i].value='';
            }
        }
    };

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
                    <RandBtnSmall toggle={loginBtn} onClick={clickLoginBtn}>로그인</RandBtnSmall>
                    <RandBtnSmall onClick={JoinOnclickHandler}>회원가입</RandBtnSmall>
                </RandBtnBox>
                {loginBtn===1&&login===0&&(
                <>
                <RandLogin>
                    <RandBtnBox style={{height:'53px', margin:'16px auto'}}>
                        <RandBtnSmall style={{height:'53px'}}>이용자</RandBtnSmall>
                        <RandBtnSmall style={{height:'53px'}}>도우미</RandBtnSmall>
                    </RandBtnBox>
                    <RandBtnBox style={{margin:'16px auto'}}>
                        <RandLoginText>아이디</RandLoginText>
                        <RandLoginInput className="input" onChange={(e) => setId(e.target.value)}></RandLoginInput>
                    </RandBtnBox>
                    <RandBtnBox style={{margin:'16px auto'}}>
                        <RandLoginText>비밀번호</RandLoginText>
                        <RandLoginInput className="input" type='password' onChange={(e) => setPw(e.target.value)}></RandLoginInput>
                    </RandBtnBox>
                    <RandLoginTextF>로그인 정보를 잊으셨나요?</RandLoginTextF>
                    <RandBtn style={{color:'#FFF',background:'#BB6C25',height:'53px'}} onClick={clickLoginbtn}>로그인</RandBtn>
                </RandLogin>
                <RandBtnBig>로그인이 필요합니다.</RandBtnBig>
                </>
                )}
                {login===1&&(
                <RandLogin>
                    <RandAfterLoginBox>
                        <RandAfterLoginImg src={userImg}></RandAfterLoginImg>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <RandAfterLoginText>{user.name}</RandAfterLoginText>
                            <RandAfterLoginText style={{fontSize:"16px", fontWeight:"400", color:"#8F8F8F"}}>{user.address}</RandAfterLoginText>
                            <div style={{display:"flex"}}>
                                <RandAfterLoginBtn>마이페이지</RandAfterLoginBtn>
                                <RandAfterLoginBtn onClick={clickLogoutBtn}>로그아웃</RandAfterLoginBtn>
                            </div>
                        </div>
                    </RandAfterLoginBox>
                </RandLogin>
                )}
                {login===2&&(
                <RandLogin>
                    <RandAfterLoginBox>
                        <RandAfterLoginImg src={helperImg}></RandAfterLoginImg>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <RandAfterLoginText>{helper.name}</RandAfterLoginText>
                            <RandAfterLoginText style={{fontSize:"16px", fontWeight:"400", color:"#8F8F8F"}}>{helper.address}</RandAfterLoginText>
                            <div style={{display:"flex"}}>
                                <RandAfterLoginBtn>마이페이지</RandAfterLoginBtn>
                                <RandAfterLoginBtn onClick={clickLogoutBtn}>로그아웃</RandAfterLoginBtn>
                            </div>
                        </div>
                    </RandAfterLoginBox>
                </RandLogin>
                )}
                <RandBtn>메인 화면</RandBtn>
                <RandBtn>이용 가이드</RandBtn>
                <RandBtn>서비스</RandBtn>
                <RandBtn>소개</RandBtn>
            </RandButtonBox>
        </Root>
    );
};
export default RandingPage;