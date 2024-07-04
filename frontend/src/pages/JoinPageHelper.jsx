import styled from "styled-components";
import Header2 from "../components/Header2";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api";

const Root = styled.div`
  width: 100vw;
  height: 100vh;
  background: #fff8f3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const JoinHInputBox = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const JoinHInput = styled.input`
  padding: 5px 10px;
  padding: 0px 0px 0px 10px;
  width: 48.54vw;
  height: 5.3vh;
  flex-shrink: 0;
  margin-top: 5px;

  border-radius: 5px;
  border: 1px solid var(--Gray-30, #ebeaea);
  background: var(--white, #fff);
`;

const JoinHText = styled.p`
  padding-top: 20px;
  color: var(--Gray-70, #707070);

  font-family: Noto Sans KR;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const JoinHBtn = styled.div`
  width: 14.6875vw;
  height: 4.9vh;
  flex-shrink: 0;
  margin: 10px;

  border-radius: 5px;
  border: 1px solid var(--Gray-40, #c2c1c1);
  background: var(--white, #fff);

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--Gray-70, #707070);

  font-family: Noto Sans KR;
  font-size: 0.9375vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const JoinBtnBox = styled.div`
  width: 51.875vw;
  height: 76.86vh;
  flex-shrink: 0;
  margin-top: 20px;

  border-radius: 5px;
  border: 1px solid var(--Gray-30, #ebeaea);
  background: var(--white, #fff);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const JoinHText2 = styled.div`
  color: var(--Point-6, #54493f);

  font-family: Noto Sans KR;
  font-size: 1.25vw;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const JoinHText3 = styled.div`
  color: var(--Gray-70, #707070);
  margin: 10px 0px 10px 5px;
  /* B16_Regular */
  font-family: Noto Sans KR;
  font-size: 0.6vw;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const JoinHBtn2 = styled.div`
  margin: 0px 0px 0px 20px;
  width: 9vw;
  height: 4.3vh;
  flex-shrink: 0;
  margin-top: 5px;

  border-radius: 5px;
  border: 1px solid var(--Gray-40, #c2c1c1);
  background: var(--Point-4, #93796a);

  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  font-family: Noto Sans KR;
  font-size: 0.7375vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const JoinHText4 = styled.p`
  margin: 0px 0px 0px 10px;
  width: 12vw;
  height: 4.3vh;
  color: var(--Gray-70, #707070);

  font-family: Noto Sans KR;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
export const JoinPageHelper = () => {
  const navigate = useNavigate();
  const [checkPW, setCheckPW] = useState(-1);
  const [idOk, setIdOk] = useState(-1);

  const [JoinData, setJoinData] = useState({
    id: "",
    password: "",
    password_confirm: "",
    name: "",
    email: "",
    mobile: "",
    type: "helper",
  });

  const isJoinDataValid = () => {
    for (const key in JoinData) {
      if (JoinData.hasOwnProperty(key) && JoinData[key] === "") {
        return false;
      }
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJoinData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setJoinData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const Join = async () => {
    const isValid = isJoinDataValid();
    if (isValid) {
      try {
        const response = await api.post("/signup", JoinData);
        console.log("회원가입 성공:", response.data);
        alert("환영합니다! 가입하신 아이디와 비밀번호로 로그인해주세요.");
        navigate("/");
      } catch (error) {
        alert("회원가입 실패: " + error.response.data.error);
        console.error("회원가입 실패:", error.response.data.error);
      }
    } else {
      alert("회원가입 실패 : 모든 정보를 정확히 기입해주세요.");
    }
  };

  const OnclickHandler = () => {
    navigate("/join");
  };

  const OnclickCheckId = async () => {
    try {
      console.log("/checkId?id=" + JoinData.id);
      const response = await api.get("/checkId?id=" + JoinData.id);
      console.log(response.data);
      if (response.data === false) {
        setIdOk(1);
      } else {
        setIdOk(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Root>
      <Header2></Header2>
      <JoinBtnBox>
        <JoinHInputBox>
          <JoinHText2>도우미 회원가입</JoinHText2>
          <JoinHText>이름</JoinHText>
          <JoinHInput
            type="text"
            name="name"
            value={JoinData.name}
            onChange={handleChange}
          ></JoinHInput>
          <JoinHText>아이디</JoinHText>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <JoinHInput
              type="text"
              name="id"
              value={JoinData.id}
              onChange={handleChange}
              style={{ width: "10vw" }}
            ></JoinHInput>
            <JoinHBtn2 onClick={OnclickCheckId}>아이디 중복 확인하기</JoinHBtn2>
            <JoinHText4>
              {idOk === -1
                ? "아이디 중복 확인을 진행해주세요"
                : idOk === 0
                ? "사용가능한 아이디입니다"
                : "사용할 수 없는 아이디입니다"}
            </JoinHText4>
          </div>
          <JoinHText>비밀번호</JoinHText>
          <JoinHInput
            id="newPW"
            type="password"
            name="password"
            value={JoinData.password}
            onChange={handleChange2}
          ></JoinHInput>
          <JoinHText>비밀번호 확인</JoinHText>
          <JoinHInput
            id="confNewPW"
            type="password"
            name="password_confirm"
            value={JoinData.password_confirm}
            onChange={handleChange2}
          ></JoinHInput>
          <JoinHText3>
            {checkPW === -1
              ? ""
              : checkPW === 0
              ? "비밀번호가 다릅니다"
              : "비밀번호가 일치합니다"}
          </JoinHText3>
          <JoinHText>이메일</JoinHText>
          <JoinHInput
            type="text"
            name="email"
            value={JoinData.email}
            onChange={handleChange}
          ></JoinHInput>
          <JoinHText>전화번호</JoinHText>
          <JoinHInput
            type="text"
            name="mobile"
            value={JoinData.mobile}
            onChange={handleChange}
          ></JoinHInput>
        </JoinHInputBox>
      </JoinBtnBox>
      <div style={{ display: "flex" }}>
        <JoinHBtn onClick={OnclickHandler}>뒤로가기</JoinHBtn>
        <JoinHBtn
          style={{ background: "var(--Point-4, #93796A)", color: "#FFF" }}
          onClick={Join}
        >
          회원가입
        </JoinHBtn>
      </div>
    </Root>
  );
};
export default JoinPageHelper;
