import styled from "styled-components";

const FooterStyle = styled.div`
  width: 100%;
  height: 100px;
  padding:4% 20%;
  // border-top: 1px solid #bbb;
  display:flex;
  align-items:center;
  background: #D0B89E;
`;

const FooterContent = styled.p`
  color:#54493F;
`;

function Footer() {
  return (
    <FooterStyle>
      <FooterContent>
        <h1>Help_py</h1>
        <p style={{ marginTop : "16px" }}>2023 융합캡스톤디자인 프로젝트</p>
        <p style={{ marginTop : "6px" }}>2020112107 김태연 2020112140 윤영서 2020110483 이윤서 2020112096 전현정</p>
        <p style={{ marginTop : "6px" }}>Copyright 2023. HaPPPPy all rights reserved.</p>
      </FooterContent>
    </FooterStyle>
  );
}

export default Footer;
