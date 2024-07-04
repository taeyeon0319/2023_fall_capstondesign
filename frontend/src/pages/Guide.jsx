import styled from "styled-components";
import React, { useState } from "react";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";

const Middle = styled.div`
  margin-top: 35px;
  width: 100%;
  height: fit-content;
  margin-bottom: 150px;
`;

function Guide() {
    const [render, setRender] = useState(0);

    const handleRenderChange = () => {
        setRender(prevState => (prevState === 0 ? 1 : 0));
    };
    return (
        <>
            <Header2 data={render} onDataChange={handleRenderChange}></Header2>
            <Middle><h1>이용 가이드(이용자/회원 나눠서)</h1></Middle>
            <Footer/>
        </>
    );
}

export default Guide;