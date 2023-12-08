import React from "react";
import styled from "styled-components";
import Member from "./Member";

const Team = styled.section`
  height: 660px;
  margin-top: -90px;
  padding-top: 100px;
  font-size: 80px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

function TeamSection() {
  return (
    <>
      <Team>
        <Member
          name="김태연"
          birth="2001.03.19"
          major="정보통신공학과"
          num="2020112107"
          github="https://github.com/taeyeon0319"
          keyword1="INFJ"
          keyword2="백엔드"
          keyword3="문어"
          img="https://avatars.githubusercontent.com/u/65546884?v=4"
        />

        <Member
          name="윤영서"
          birth="2000.11.20"
          major="정보통신공학과"
          num="2020112140"
          github="https://github.com/sdfjkj"
          keyword1="OOO"
          keyword2="OOO"
          keyword3="OOO"
          img="https://avatars.githubusercontent.com/u/95211829?v=4"
        />

        <Member
          name="이윤서"
          birth="2001.03.29"
          major="통계학과"
          num="2020110483"
          github="https://github.com/lys3269"
          keyword1="ISFP"
          keyword2="백엔드"
          keyword3="크로스핏"
          img="https://avatars.githubusercontent.com/u/112849440?v=4"
        />

        <Member
          name="전현정"
          birth="2001.06.13"
          major="정보통신공학과"
          num="2020112096"
          github="https://github.com/hjyeeoonng"
          keyword1="ENFP"
          keyword2="프론트"
          keyword3="꿈부자"
          img="https://avatars.githubusercontent.com/u/100748980?v=4"
        />
      </Team>
    </>
  );
}


export default TeamSection;
