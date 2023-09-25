import styled from "styled-components";
import React from 'react';
import logoImg from '../img/임시로고.png'

const HeaderRoot = styled.div`
width: 100%;
background: #FFF8F3;

display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
`
const HeaderLogoImg = styled.img`
width:8%;
margin: 10px;
`

const HeaderLine = styled.div`
width: 100%;
height: 2px;
flex-shrink: 0;

background: linear-gradient(90deg, rgba(231, 230, 231, 0.00) 0%, #E7E6E7 43.23%, rgba(231, 230, 231, 0.00) 100%);
`

export const Header = () => {
    return(
        <HeaderRoot>
            <HeaderLogoImg src={logoImg}></HeaderLogoImg>
            <HeaderLine></HeaderLine>
        </HeaderRoot>
    );
};
export default Header;