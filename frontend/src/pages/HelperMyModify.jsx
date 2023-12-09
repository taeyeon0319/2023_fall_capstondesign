import Header2 from "../components/Header2";
import styled from "styled-components";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userImg from "../img/profile.png";
import userImg2 from "../img/profile3.png";
import grayImg from "../img/gray.png";
import { useState } from "react";
import axios from "axios";
import api from "../api";
import LeftMenu from "../components/LeftMenu";

const dummyData = {
  data: [
    {
      sub: "동국초등학교 등원 도우미 구해요.",
      time: ["08:00", "09:00"],
      date: "2023-09-24",
      income: 13500,
      reqname: "박도움",
    },
    {
      sub: "아이 3시간 봐주실 분 구합니다.",
      time: ["15:00", "18:00"],
      date: "2023-09-24",
      income: 40500,
      reqname: "신케어",
    },
    {
      sub: "[급구] 아이 하원 도우미 구합니다.",
      time: ["15:00", "16:00"],
      date: "2023-09-23",
      income: 27000,
      reqname: "이하원",
    },
  ],
};

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff8f3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const UserRect = styled.div`
  width: 80%;
  margin: 40px;
  padding: 30px;
  height: 810px;
  flex-shrink: 0;

  border-radius: 20px;
  background: #e7e6e6;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UserRect2 = styled.div`
  width: 100%;
  margin-bottom: 30px;
  padding: 30px;
  height: 200px;

  border-radius: 15px;
  background: #fff8f3;

  display: flex;
  overflow: auto;
`;
const UserImg = styled.img`
  margin: 0px 20px 0px 0px;
  background-color: #eee;
  border-radius: 50%;
`;
const UserPText = styled.div`
  color: var(--Point-6, #54493f);
  font-family: Inter;
  font-size: 5vh;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const UserPText2 = styled.div`
  color: #000;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const UserPText3 = styled.div`
  margin: 10px;
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const UserPText4 = styled.div`
  margin: 0.2vh 0.1vh;
  color: var(--Point-6, #54493f);

  font-family: Noto Sans KR;
  font-size: 2.148148vh;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const UserHelperList = styled.div`
  margin: 10px;
  padding: 30px;
  width: 59.37vw;
  height: 15.3vh;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid var(--Gray-30, #ebeaea);
  background: var(--white, #fff);

  color: #000;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  display: flex;
  align-items: center;
`;
const UserPText5 = styled.div`
  color: var(--Black, #141515);

  font-family: Noto Sans KR;
  font-size: 2.3vh;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const UserPText6 = styled.div`
  margin: 0.2vh 0;

  color: var(--Black, #141515);
  font-family: Noto Sans KR;
  font-size: 2vh;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const UserPText7 = styled.div`
  color: #8f8f8f;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;
const UserPText8 = styled.div`
  color: var(--Point-6, #54493f);
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;
const HelperRectTitle = styled.div`
  width: 62.5vw;
  height: 6.3vh;
  border-radius: 5px 5px 0px 0px;
  background: var(--Point-5, #725f51);

  color: var(--white, #fff);

  font-family: Noto Sans KR;
  font-size: 1.66666vh;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  display: flex;
  align-items: center;
  padding-left: 1.48148vh;
`;
const HelperRect = styled.div`
  padding: 0.74074vh;
  width: 62.5vw;
  height: 50.5vh;
  border-radius: 5px;
  background: var(--white, #fff);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);

  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HelperMyProfileBox = styled.div`
  margin: 6.63vh 0 1.48148vh 0;
  width: 62.5vw;
  height: 18.235vh;

  border-radius: 5px;
  background: var(--white, #fff);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);

  display: flex;
`;
const HelperMyImg = styled.img`
  width: 5.52vw;
  height: 5.52vw;
  border-radius: 106px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;
  margin: auto 1.875vw;
`;

const HelperMyText = styled.div`
  margin: 0.2vh 0.1vh;
  color: var(--Point-6, #54493f);

  font-family: Noto Sans KR;
  font-size: 3.148148vh;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const HelperMyText2 = styled.div`
  margin: 0.2vh 0.1vh;
  color: var(--Point-6, #54493f);

  font-family: Noto Sans KR;
  font-size: 2.222vh;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const HelperMyText3 = styled.div`
  color: var(--Point-5, #725f51);
  margin: 0.1vh;

  font-family: Noto Sans KR;
  font-size: 1.85185vh;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const HelperMyBtn = styled.div`
  margin: 6px;
  padding: 4px;
  border: 1px solid #93796a;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #93796a;
  background: F9F8F7;
`;
const HMyEditBox = styled.div`
  padding: 40px 0px 0px 0px;
  width: 62.5vw;
  height: 76.96vh;
  flex-shrink: 0;
  border-radius: 5px;
  background: var(--white, #fff);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
const HMyBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 91.12vh;
  width: ;
`;
const HMyTag = styled.div`
  padding: 10px;
  width: 10.5729vw;
  height: 5.294vh;
  flex-shrink: 0;
  border-radius: 5px 0px 0px 5px;
  background: var(--Point-5, #725f51);

  color: var(--white, #fff);
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 0.9vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const HMyInput = styled.input`
  width: 18.073vw;
  height: 5.294vh;
  flex-shrink: 0;
  border-radius: 0px 5px 5px 0px;
  border-top: 1px solid var(--Gray-30, #ebeaea);
  border-right: 1px solid var(--Gray-30, #ebeaea);
  border-left: 1px solid var(--Gray-30, #ebeaea);
  border-bottom: 1px solid var(--Gray-30, #ebeaea);
  background: var(--Gray-10, #f6f6f6);

  color: var(--Gray-70, #707070);

  /* H24_Bold */
  font-family: Noto Sans KR;
  font-size: 1vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  outline: none;
  padding: 0px 0px 0px 15px;
`;
const HMyDiv = styled.div`
  width: 18.073vw;
  height: 5.294vh;
  flex-shrink: 0;
  border-radius: 0px 5px 5px 0px;
  border-top: 1px solid var(--Gray-30, #ebeaea);
  border-right: 1px solid var(--Gray-30, #ebeaea);
  border-bottom: 1px solid var(--Gray-30, #ebeaea);
  background: var(--Gray-10, #f6f6f6);

  color: var(--Gray-70, #707070);

  /* H24_Bold */
  font-family: Noto Sans KR;
  font-size: 1vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  display: flex;
  align-items: center;
  padding: 0px 0px 0px 15px;
`;

const HMyChangeBtn = styled.div`
  margin: 0px 0px 0px 10px;
  width: 10.57vw;
  height: 5.294vh;
  flex-shrink: 0;
  border-radius: 5px;
  background: var(--Point-5, #725f51);

  color: var(--white, #fff);
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 0.9vw;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const HMyLine = styled.div`
  margin: 15px 0px;
  width: 1160px;
  height: 1px;
  background: #ebeaea;
`;

const HMyText = styled.div`
  color: var(--Gray-90, #2f3233);

  /* H24_Bold */
  font-family: Noto Sans KR;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const HMyInputBox = styled.div`
  display: flex;
  margin: 5px;
`;

const HMyText2 = styled.div`
  color: var(--Gray-70, #707070);
  margin: 10px 0px 10px 5px;
  /* B16_Regular */
  font-family: Noto Sans KR;
  font-size: 0.83333vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const HMyText3 = styled.div`
  color: var(--Gray-70, #707070);
  margin: 10px 0px 10px 5px;
  /* B16_Regular */
  font-family: Noto Sans KR;
  font-size: 0.6vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const HMySelect = styled.select`
  margin: 0px 5px 0px 0px;
  width: 9vw;
  height: 5.294vh;
  flex-shrink: 0;
  border-radius: 0px 5px 5px 0px;
  border-left: 1px solid var(--Gray-30, #ebeaea);
  border-top: 1px solid var(--Gray-30, #ebeaea);
  border-right: 1px solid var(--Gray-30, #ebeaea);
  border-bottom: 1px solid var(--Gray-30, #ebeaea);
  background: var(--Gray-10, #f6f6f6);

  color: var(--Gray-70, #707070);

  /* H24_Bold */
  font-family: Noto Sans KR;
  font-size: 1vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  display: flex;
  align-items: center;
  padding: 0px 0px 0px 15px;
  outline: none;
`;
export const HelperMyPage = () => {
  const [render, setrender] = useState(0);
  const [nameChange, setNameChange] = useState("");
  const [canChangePW, setcanChangePW] = useState(0);
  const [checkPW, setCheckPW] = useState(-1);
  const [cities, setCities] = useState([]);
  const [selectedRegionState, setSelectedRegionState] = useState("");
  const [selectedCountryState, setSelectedCountryState] = useState("");
  const [nPW, setNPW] = useState("");
  const [confNPW, setConfNPW] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await api.get("/city");
        setCities(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("도시 데이터를 가져오는 중 에러 발생:", error);
      }
    };
    fetchCities();
  }, []);

  const handlerenderChange = () => {
    setrender((prevState) => (prevState === 0 ? 1 : 0));
  };

  const handlerNameChange = (e) => {
    setNameChange(e.target.value);
  };

  const clickNameChange = async () => {
    if (window.confirm(nameChange + `(으)로 이름을 변경하시겠습니까?`)) {
      try {
        const response = await api.patch(
          `/helper/changeHelper/` +
            JSON.parse(localStorage.getItem("userInfo")).id,
          {
            name: nameChange,
            region_state: JSON.parse(localStorage.getItem("userInfo"))
              .region_state,
            region_country: JSON.parse(localStorage.getItem("userInfo"))
              .region_country,
            password: JSON.parse(localStorage.getItem("userInfo")).password,
            password_confirm: JSON.parse(localStorage.getItem("userInfo"))
              .password_confirm,
          }
        );
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        userInfo.name = nameChange;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setrender((prevState) => (prevState === 0 ? 1 : 0));
        alert("이름이 성공적으로 변경되었습니다!");
        document.getElementById("newName").value = null;
      } catch (error) {
        console.error("이름 변경 실패!");
      }
    }
  };
  const clickNowPW = () => {
    console.log(JSON.parse(localStorage.getItem("userInfo")).password);
    console.log(document.getElementById("nowPW").value);
    if (
      JSON.parse(localStorage.getItem("userInfo")).password ===
      document.getElementById("nowPW").value
    ) {
      setcanChangePW(1);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };
  const checkNewPW = () => {
    if (
      document.getElementById("newPW").value !== "" &&
      document.getElementById("newPW").value ===
        document.getElementById("confNewPW").value
    ) {
      setCheckPW(1);
    } else {
      setCheckPW(0);
    }
  };
  const clickChangePW = async () => {
    if (checkPW === 1) {
      try {
        const response = await api.patch(
          `/helper/changeHelper/` +
            JSON.parse(localStorage.getItem("userInfo")).id,
          {
            name: JSON.parse(localStorage.getItem("userInfo")).name,
            region_state: JSON.parse(localStorage.getItem("userInfo"))
              .region_state,
            region_country: JSON.parse(localStorage.getItem("userInfo"))
              .region_country,
            password: document.getElementById("newPW").value,
            password_confirm: document.getElementById("confNewPW").value,
          }
        );
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        userInfo.password = document.getElementById("newPW").value;
        userInfo.password_confirm = document.getElementById("confNewPW").value;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        alert("비밀번호가 성공적으로 변경되었습니다!");
        document.getElementById("newPW").value = null;
        document.getElementById("confNewPW").value = null;
        document.getElementById("nowPW").value = null;
        setrender((prevState) => (prevState === 0 ? 1 : 0));
        setcanChangePW(0);
      } catch (error) {
        console.error("비밀번호 변경 실패!");
      }
    } else {
      alert("비밀번호를 다시 확인해주세요");
    }
  };
  const clickChangeArea = async () => {
    try {
      const response = await api.patch(
        `/helper/changeHelper/` +
          JSON.parse(localStorage.getItem("userInfo")).id,
        {
          name: JSON.parse(localStorage.getItem("userInfo")).name,
          region_state: selectedRegionState,
          region_country: selectedCountryState,
          password: JSON.parse(localStorage.getItem("userInfo")).password,
          password_confirm: JSON.parse(localStorage.getItem("userInfo"))
            .password_confirm,
        }
      );
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      userInfo.region_state = selectedRegionState;
      userInfo.region_country = selectedCountryState;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setrender((prevState) => (prevState === 0 ? 1 : 0));
      alert("지역이 성공적으로 변경되었습니다!");
    } catch (error) {
      console.error("지역 변경 실패!");
    }
  };

  const handleRegionStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedRegionState(selectedState);
  };
  const handleRegionCountryChange = (e) => {
    const selectedState = e.target.value;
    setSelectedCountryState(selectedState);
  };

  return (
    <Root>
      <Header2 data={render} onDataChange={handlerenderChange}></Header2>
      <HMyBody>
      <LeftMenu></LeftMenu>
        <HMyEditBox>
          <div>
            <HMyText>이름 변경</HMyText>
            <HMyInputBox style={{ display: "flex" }}>
              <HMyTag>이름</HMyTag>
              <HMyDiv>
                {JSON.parse(localStorage.getItem("userInfo")).name}
              </HMyDiv>
            </HMyInputBox>
            <HMyInputBox style={{ display: "flex" }}>
              <HMyTag>새 이름</HMyTag>
              <HMyInput id="newName" onChange={handlerNameChange}></HMyInput>
              <HMyChangeBtn onClick={clickNameChange}>확인</HMyChangeBtn>
            </HMyInputBox>
            <HMyLine></HMyLine>
            <HMyText>비밀번호 변경</HMyText>
            <HMyInputBox style={{ display: "flex" }}>
              <HMyTag>현재 비밀번호</HMyTag>
              <HMyInput id="nowPW" type="password"></HMyInput>
              <HMyChangeBtn onClick={clickNowPW}>확인</HMyChangeBtn>
            </HMyInputBox>
            <HMyText3>
              {canChangePW === 0
                ? "비밀번호를 확인해주세요"
                : "비밀번호가 확인되었습니다"}
            </HMyText3>
            <HMyInputBox style={{ display: "flex" }}>
              <HMyTag>새 비밀번호</HMyTag>
              <HMyInput
                id="newPW"
                disabled={canChangePW === 0 ? true : false}
                type="password"
                onChange={checkNewPW}
              ></HMyInput>
            </HMyInputBox>
            <HMyInputBox style={{ display: "flex" }}>
              <HMyTag>새 비밀번호 확인</HMyTag>
              <HMyInput
                id="confNewPW"
                disabled={canChangePW === 0 ? true : false}
                type="password"
                onChange={checkNewPW}
              ></HMyInput>
              <HMyChangeBtn onClick={clickChangePW}>
                비밀번호 변경하기
              </HMyChangeBtn>
            </HMyInputBox>
            <HMyText3>
              {checkPW === -1
                ? ""
                : checkPW === 0
                ? "비밀번호가 다릅니다"
                : "비밀번호가 일치합니다"}
            </HMyText3>
            <HMyText2>
              비밀번호 변경시 유의사항 영문 대/소문자와 숫자,
              특수문자(~!@#$%^&*()-_?)를 조합하여 8~16자를 사용해 주세요.
            </HMyText2>
            <HMyLine></HMyLine>
            <HMyText>활동 지역</HMyText>
            <HMyInputBox style={{ display: "flex" }}>
              <HMyTag>현재 활동지역</HMyTag>
              <HMyDiv>
                {JSON.parse(localStorage.getItem("userInfo")).region_state ===
                null
                  ? "활동 지역이 설정되지 않았습니다."
                  : JSON.parse(localStorage.getItem("userInfo")).region_state +
                    " " +
                    JSON.parse(localStorage.getItem("userInfo")).region_country}
              </HMyDiv>
            </HMyInputBox>
            <HMyInputBox style={{ display: "flex" }}>
              <HMyTag>새 활동지역</HMyTag>
              <HMySelect onChange={handleRegionStateChange}>
                <option value="">선택해주세요</option>
                {[...new Set(cities.map((city) => city.region_state))].map(
                  (region_state) => (
                    <option key={region_state}>{region_state}</option>
                  )
                )}
              </HMySelect>
              <HMySelect onChange={handleRegionCountryChange}>
                <option value="">선택해주세요</option>
                {cities
                  .filter((city) => city.region_state === selectedRegionState)
                  .map((city) => (
                    <option>{city.region_country}</option>
                  ))}
              </HMySelect>
              <HMyChangeBtn onClick={clickChangeArea}>
                활동지역 변경하기
              </HMyChangeBtn>
            </HMyInputBox>
          </div>
        </HMyEditBox>
      </HMyBody>
    </Root>
  );
};
export default HelperMyPage;
