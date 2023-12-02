import styled from "styled-components";
import React, { useState } from "react";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";

const Middle = styled.div`
  margin-top: 35px;
  width: 100%;
  height: fit-content;
  margin-bottom: 150px;
 /
`;

function Introduce() {
    const [render, setRender] = useState(0);

    const handleRenderChange = () => {
        setRender(prevState => (prevState === 0 ? 1 : 0));
    };
    return (
        <>
            <Header2 data={render} onDataChange={handleRenderChange}></Header2>
            <Middle><h1>서비스 소개페이지(어떤 서비스를 제공하는지)</h1></Middle>
            <Footer/>
        </>
    );
}

export default Introduce;