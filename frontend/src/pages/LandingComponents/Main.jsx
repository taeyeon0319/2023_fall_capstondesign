import styled from "styled-components";
import TeamSection from "./Teamsection";
import Header2 from "../../components/Header2";
import { useState } from "react";

const Middle = styled.div`
  margin-top: 35px;
  width: 100%;
  height: fit-content;
`;

const Team = styled.p`
    height:130px;
    width:100%;
    // background-color:red;
    margin:0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:50px;
    font-weight:bolder;
    color: var(--Point-6, #54493F);
`
const Img = styled.img`
    height:50px;
    width:50px;
`
function Main() {
  const [render, setRender] = useState(0);

  const handleRenderChange = () => {
    setRender(prevState => (prevState === 0 ? 1 : 0));
  };

  return (
    <>
      <Header2 data={render} onDataChange={handleRenderChange}></Header2>
      <Middle>
        <Team>HaPPPPy팀을 소개합니다&nbsp;<Img src="https://cdn-icons-png.flaticon.com/512/138/138533.png"/></Team>
        <TeamSection />
      </Middle>
    </>
  );
}

export default Main;
