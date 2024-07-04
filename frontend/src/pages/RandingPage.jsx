import styled from "styled-components";
import React from "react";
import logoImg from "../img/임시로고.png";
import helperImg from "../img/woman.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header2 from "../components/Header2";
import axios from "axios";
import Footer from "../components/Footer";
import api from "../api";

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff8f3;
  display: flex;
  flex-direction: column;
`;
const RandBody = styled.div`
  height: 91.12vh;
  width: 100vw;
  background: #fff8f3;
  display: flex;
`;
const RandButtonBox = styled.div`
  width: 17.5vw;
  height: 100%;

  background: var(--Point-1, #fff8f3);
  box-shadow: -4px 0px 8px 0px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;
const RandBox = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 1024px;
  background: linear-gradient(90deg, #fff8f3 88.55%, #e7e6e6 100%);
`;
const RandLoginBox = styled.div`
  padding: 0.83335vw;
  margin: 0.83335vw;
  width: 15.8333vw;
  border-radius: 5px;
  border: 1px solid var(--Gray-30, #ebeaea);
  background: var(--white, #fffaf7);

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RandBtnBox = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RandBtn = styled.div`
  margin: 6px auto;
  width: 15.8333vw;
  height: 4.3137vh;
  flex-shrink: 0;
  border-radius: 5px;
  background: var(--Point-4, #93796a);

  color: var(--white, #fff);
  text-align: center;

  font-family: Noto Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const RandBtnSmall = styled.div`
  width: 6.6666vw;
  height: 4.313725vh;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid var(--Point-5, #725f51);
  background: var(--white, #fff);

  color: var(--Point-5, #725f51);
  text-align: center;

  font-family: Noto Sans KR;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const RandBtnBig = styled.div`
  margin: 16px auto;
  width: 86%;
  height: 100px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #e7e6e6;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);

  color: #000;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 48px; /* 200% */
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RandLogin = styled.div`
  padding: 0.83335vw;
  margin: 16px auto;
  width: 14.16666vw;
  flex-shrink: 0;

  border-radius: 5px;
  background: #f9f8f7;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RandLogoImg = styled.img`
  margin-top: 80px;
  margin-left: 124px;
  margin-bottom: 12px;
  width: 204px;
  height: 148px;
`;
const RandLine = styled.div`
  width: 1180px;
  height: 2px;
  background: #e7e6e6;
`;
const RandHeader = styled.div`
  width: 1440px;
`;
const RandTextBox = styled.div`
  width: 82.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left:-100px;
  margin-right:100px;
`;

const RandImg = styled.img`
  width:50%;
`
const RandTextBig = styled.div`
  color: var(--Point-5, #725f51);

  font-family: Noto Sans KR;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const RandTextSmall = styled.div`
  display: flex;
  width: 1100px;
  height: 538px;
  flex-direction: column;
  justify-content: center;

  color: var(--Point-5, #725f51);
  font-family: Noto Sans KR;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 190%;
`;
const RandLoginText = styled.p`
  color: var(--Point-6, #54493f);
  font-family: Noto Sans KR;
  font-size: 1vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const RandLoginTextF = styled.p`
  color: #8f8f8f;
  text-align: center;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const RandLoginInput = styled.input`
  width: 63.33%;
  height: 44px;
  padding: 0.5vw;
  flex-shrink: 0;

  border-radius: 5px;
  border: 1px solid var(--Point-5, #725f51);
  background: var(--white, #fff);
`;
const RandAfterLoginBox = styled.div`
  margin: 16px auto;
  width: 100%;
  height: 9.8vh;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const RandAfterLoginImg = styled.img`
  width: 3.6vw;
  height: 3.6vw;
  border-radius: 70%;
`;
//height 작성 필요함.
const RandAfterLoginText = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 1.2vw;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;
const RandAfterLoginText2 = styled.div`
  color: #8f8f8f;
  font-family: Inter;
  font-size: 0.8vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const RandAfterLoginBtn = styled.div`
  width: 3.8vw;
  height: 3vh;
  margin: 3px;

  border-radius: 5px;
  border: 1px solid #e7e6e6;
  background: #fff8f3;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);

  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 0.6vw;
  font-style: normal;
  font-weight: 800;
  line-height: normal;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const RandLoginBoxText = styled.div`
  width: 14.16666vw;
  height: 25vh;
  color: var(--Point-5, #725f51);
  text-align: center;

  font-family: Noto Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RandingPage = () => {
  const navigate = useNavigate();

  //임시데이터
  const helper = { name: "김헬퍼", address: "서울특별시 중구 충무로" };
  const user = { name: "김동국", address: "서울특별시 중구 충무로" };

  const [loginBtn, setLoginBtn] = useState(0);
  const [login, setLogin] = useState(0);
  const [reRender, setreRender] = useState(0);
  const [render, setrender] = useState(0);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [loginData, setloginData] = useState({
    id: "",
    password: "",
  });

  React.useEffect(() => {
    console.log(localStorage.getItem("loginState"));
  }, []);

  React.useEffect(() => {
    console.log(localStorage.getItem("loginState"));
  }, [reRender, render]);

  const clickLoginBtn = () => {
    if (loginBtn === 1) {
      setLoginBtn(0);
    } else {
      setLoginBtn(1);
    }
  };

  const clickLogoutBtn = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      setLogin(0);
      localStorage.setItem("loginState", false);
      console.log(localStorage.getItem("loginState"));
      setreRender((prevState) => (prevState === 0 ? 1 : 0));
    }
  };

  const JoinOnclickHandler = () => {
    navigate("/Join");
  };

  const clickLoginbtn = async () => {
    try {
      const response = await api.post("/login", loginData);
      console.log("로그인 성공:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", response.data.type);
      localStorage.setItem("userId", response.data.userId);
      try {
        console.log(response.data.token);
        const response2 = await api.get("/mypage", {
          headers: { Authorization: response.data.token },
        });
        if (response2.data.userData.image === null) {
          response2.data.userData.image = "https://ifh.cc/g/GrZGw4.png";
        }
        console.log(response2.data.userData);
        localStorage.setItem(
          "userInfo",
          JSON.stringify(response2.data.userData)
        );
        localStorage.setItem("loginState", true);
        localStorage.setItem("loginId", loginData.id);
        setreRender((prevState) => (prevState === 0 ? 1 : 0));
        navigate("/");
      } catch (error) {
        console.error("정보가져오기 실패:", error);
        alert("정보 가져오기에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 실패:", error.message);
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }

    /*
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
        */
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onClickHandlerMy = () => {
    const userType = localStorage.getItem("userType");

    if (userType === "user") {
      navigate("/usermypage");
    } else {
      navigate("/helperMy");
    }
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

  const clickTeam = () => {
    navigate("/team");
  };

  const clickIntro = () => {
    navigate("/service");
  };

  const clickGuide = () => {
    navigate("/guide");
  };

  const handlerenderChange = () => {
    setrender((prevState) => (prevState === 0 ? 1 : 0));
  };

  return (
    <Root>
      <Header2 data={render} onDataChange={handlerenderChange}></Header2>
      <RandBody>
        <RandTextBox>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {/* <div style={{ width:"100%", backgroundColor:"red"}}><RandImg src="https://sdcarecoop.com/theme/basic/img/baby/img1.jpg" alt=""/></div> */}
            <RandTextBig><br/><br/>안녕하세요. 도우미 긴급 호출 서비스 Help_py입니다</RandTextBig>
            <RandTextSmall>
              Help_py는 예상치 못한 긴급한 상황에서 신속한 도움을 제공받을 수 있는 1회성 서비스입니다.
              <br/><br/>
              응급 상황, 갑작스러운 문제 또는 급하게 필요한 상황에서 Help_py 서비스 내 인증된 도우미들이 <br/>
              즉각적으로 출동하여 필요한 지원을 제공합니다.
              <br/><br/>
              Help_py는 안전과 신뢰를 최우선으로 하며, 신속하고 효과적인 대응을 통해 사용자 도움에 중점을 
              <br/>둡니다.
              <br /><br/>
              언제 어디서나 호출이 가능하며 안심하고 이용할 수 있는 도우미 긴급 매칭 서비스, Help_py를 지금 
              <br/>이용해보세요.
              
            </RandTextSmall>
          </div>
        </RandTextBox>
        <RandButtonBox>
          <RandLoginBox>
            {(localStorage.getItem("loginState") === "false" ||
              localStorage.getItem("loginState") === null) &&
              loginBtn === 0 && (
                <>
                  <div
                    style={{
                      width: "14.16666vw",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <RandBtnSmall
                      id={"cypresslogin"}
                      toggle={loginBtn}
                      onClick={clickLoginBtn}
                    >
                      로그인
                    </RandBtnSmall>
                    <RandBtnSmall onClick={JoinOnclickHandler}>
                      회원가입
                    </RandBtnSmall>
                  </div>
                  <RandLoginBoxText>
                    서비스 이용시 <br /> 로그인이 필요합니다.
                  </RandLoginBoxText>
                </>
              )}
            {(localStorage.getItem("loginState") === "false" ||
              localStorage.getItem("loginState") === null) &&
              loginBtn === 1 && (
                <>
                  <div
                    style={{
                      width: "14.16666vw",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <RandBtnSmall
                      id={"cypresslogin"}
                      toggle={loginBtn}
                      onClick={clickLoginBtn}
                    >
                      로그인
                    </RandBtnSmall>
                    <RandBtnSmall onClick={JoinOnclickHandler}>
                      회원가입
                    </RandBtnSmall>
                  </div>
                  <RandLogin>
                    {/*
                        <div style={{width:"12.4999vw", display:"flex", justifyContent:"space-between"}}>
                            <RandBtnSmall style={{width:"5.833275vw"}}>이용자</RandBtnSmall>
                            <RandBtnSmall style={{width:"5.833275vw"}}>도우미</RandBtnSmall>
                        </div>
                        */}
                    <RandBtnBox>
                      <RandLoginText>아이디</RandLoginText>
                      <RandLoginInput
                        type="text"
                        name="id"
                        value={loginData.id}
                        id="cypressid"
                        className="input"
                        onChange={handleChange}
                      ></RandLoginInput>
                    </RandBtnBox>
                    <RandBtnBox>
                      <RandLoginText>비밀번호</RandLoginText>
                      <RandLoginInput
                        type="password"
                        name="password"
                        value={loginData.password}
                        id="cypresspw"
                        className="input"
                        onChange={handleChange}
                      ></RandLoginInput>
                    </RandBtnBox>
                    <RandBtn
                      style={{ width: "12.4999vw" }}
                      onClick={clickLoginbtn}
                    >
                      로그인
                    </RandBtn>
                    <RandLoginTextF>로그인 정보를 잊으셨나요?</RandLoginTextF>
                  </RandLogin>
                </>
              )}
            {localStorage.getItem("loginState") === "true" && (
              <RandLogin>
                <RandAfterLoginBox>
                  <RandAfterLoginImg
                    src={JSON.parse(localStorage.getItem("userInfo")).image}
                  ></RandAfterLoginImg>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <RandAfterLoginText id="cypressname">
                      {JSON.parse(localStorage.getItem("userInfo")).name}
                    </RandAfterLoginText>
                    {JSON.parse(localStorage.getItem("userInfo"))
                      .region_state === null ? (
                      <RandAfterLoginText2>
                        지역을 등록해주세요
                      </RandAfterLoginText2>
                    ) : (
                      <RandAfterLoginText2>
                        {JSON.parse(localStorage.getItem("userInfo"))
                          .region_state +
                          " " +
                          JSON.parse(localStorage.getItem("userInfo"))
                            .region_country}
                      </RandAfterLoginText2>
                    )}
                    <div style={{ display: "flex" }}>
                      <RandAfterLoginBtn onClick={onClickHandlerMy}>
                        마이페이지
                      </RandAfterLoginBtn>
                      <RandAfterLoginBtn onClick={clickLogoutBtn}>
                        로그아웃
                      </RandAfterLoginBtn>
                    </div>
                  </div>
                </RandAfterLoginBox>
              </RandLogin>
            )}
            {login === 2 && (
              <RandLogin>
                <RandAfterLoginBox>
                  <RandAfterLoginImg src={helperImg}></RandAfterLoginImg>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <RandAfterLoginText id="cypressname">
                      {helper.name}
                    </RandAfterLoginText>
                    <RandAfterLoginText2>{helper.address}</RandAfterLoginText2>
                    <div style={{ display: "flex" }}>
                      <RandAfterLoginBtn>마이페이지</RandAfterLoginBtn>
                      <RandAfterLoginBtn onClick={clickLogoutBtn}>
                        로그아웃
                      </RandAfterLoginBtn>
                    </div>
                  </div>
                </RandAfterLoginBox>
              </RandLogin>
            )}
          </RandLoginBox>
          <RandBtn onClick={clickMain}>메인 화면</RandBtn>
          {/* <RandBtn onClick={clickIntro}>서비스 소개</RandBtn>
          <RandBtn onClick={clickGuide}>이용 가이드</RandBtn> */}
          <RandBtn onClick={clickTeam}>팀 소개</RandBtn>
        </RandButtonBox>
      </RandBody>
      <div style={{marginTop:"200px"}}><Footer /></div>
      {/*
            <RandBox>
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
                    <RandBtnSmall id={'cypresslogin'} toggle={loginBtn} onClick={clickLoginBtn}>로그인</RandBtnSmall>
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
                        <RandLoginInput id="cypressid" className="input" onChange={(e) => setId(e.target.value)}></RandLoginInput>
                    </RandBtnBox>
                    <RandBtnBox style={{margin:'16px auto'}}>
                        <RandLoginText>비밀번호</RandLoginText>
                        <RandLoginInput id="cypresspw" className="input" type='password' onChange={(e) => setPw(e.target.value)}></RandLoginInput>
                    </RandBtnBox>
                    <RandLoginTextF>로그인 정보를 잊으셨나요?</RandLoginTextF>
                    <RandBtn id="cypressok"style={{color:'#FFF',background:'#BB6C25',height:'53px'}} onClick={clickLoginbtn}>로그인</RandBtn>
                </RandLogin>
                <RandBtnBig>로그인이 필요합니다.</RandBtnBig>
                </>
                )}
                {login===1&&(
                <RandLogin>
                    <RandAfterLoginBox>
                        <RandAfterLoginImg src={userImg}></RandAfterLoginImg>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <RandAfterLoginText id="cypressname">{user.name}</RandAfterLoginText>
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
                            <RandAfterLoginText id="cypressname">{helper.name}</RandAfterLoginText>
                            <RandAfterLoginText style={{fontSize:"16px", fontWeight:"400", color:"#8F8F8F"}}>{helper.address}</RandAfterLoginText>
                            <div style={{display:"flex"}}>
                                <RandAfterLoginBtn>마이페이지</RandAfterLoginBtn>
                                <RandAfterLoginBtn onClick={clickLogoutBtn}>로그아웃</RandAfterLoginBtn>
                            </div>
                        </div>
                    </RandAfterLoginBox>
                </RandLogin>
                )}
                <RandBtn onClick={clickMain}>메인 화면</RandBtn>
                <RandBtn>이용 가이드</RandBtn>
                <RandBtn>서비스</RandBtn>
                <RandBtn>소개</RandBtn>
            </RandButtonBox>
            */}
    </Root>
  );
};
export default RandingPage;
