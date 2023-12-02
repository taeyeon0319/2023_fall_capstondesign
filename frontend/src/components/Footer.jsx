import styled from "styled-components";

const FooterStyle = styled.div`
  width: 60%;
  height: 100px;
  margin: 0 auto;
  border-top: 1px solid #bbb;
  display:flex;
  justify-content:center;
  align-items:center;
  background: #FFF8F3;
`;

const FooterContent = styled.p`
  color:#54493F;
`;

function Footer() {
  return (
        <FooterStyle>
        <FooterContent>
            <p style={{display:"flex", justifyContent:"center"}}>2023 융합캡스톤디자인 프로젝트</p>
            <p style={{display:"flex", justifyContent:"center"}}>2020112107 김태연 2020112140 윤영서 2020110483 이윤서 2020112096 전현정</p>
            <p style={{display:"flex", justifyContent:"center"}}>Copyright 2023. HaPPPPy all rights reserved.</p>
        </FooterContent>
        </FooterStyle>
  );
}

export default Footer;
