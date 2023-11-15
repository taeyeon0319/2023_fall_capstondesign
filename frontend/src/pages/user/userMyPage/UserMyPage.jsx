// 도우미 리스트
import styled from "styled-components";
import React from 'react';
import "./UserMyPage.css";
import SelectBox from "../../../components/SelectBox";
import { Select } from 'antd';
import Header2 from "../../../components/Header2";

const Root = styled.div`
width: 100vw;
height:100vh;
background: #FFF8F3;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
`

const UserMyPage = ()=>{
    return (
        
        <div>
            <Header2></Header2>
            <div className="user-mypage-container">
                <div className="user-mypage-profile-change">
                    
                </div>
                <div className="user-mypage-helper-usage-history">
                    d
                </div>
            </div>
        </div>
    )
}

export default UserMyPage;