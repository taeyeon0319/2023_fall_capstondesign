// 도우미 상세 페이지
import "./HelperDetail.css";
import styled from "styled-components";
import React from 'react';
import Header from "../../../components/Header";
const Root = styled.div`
width: 100vw;
height:100vh;
background: #FFF8F3;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
`
export const HelperDetail = () => {
    return(
        <Root>
            <Header>
            <div className="desktop">
            <div className="div">
                <img className="image" alt="Image" src="image-1.png" />
                <div className="overlap-group">
                <p className="p">
                    <span className="text-wrapper">김동국 </span>
                    <span className="span">님</span>
                </p>
                <img className="ellipse" alt="Ellipse" src="ellipse-5.svg" />
                <div className="overlap">
                    <div className="rectangle" />
                    <div className="text-wrapper-2">마이페이지</div>
                </div>
                <div className="overlap-2">
                    <div className="rectangle" />
                    <div className="text-wrapper-3">로그아웃</div>
                </div>
                </div>
                <div className="overlap-3">
                <div className="overlap-4">
                    <div className="rectangle-2" />
                    <div className="text-wrapper-4">다음</div>
                </div>
                <div className="image-wrapper">
                    <img className="img" alt="Image" src="image-8.png" />
                </div>
                <p className="a">
                    <span className="text-wrapper-5">A </span>
                    <span className="text-wrapper-6">
                    씨<br />
                    </span>
                    <span className="text-wrapper-7">
                    서울시 중구
                    <br />
                    남자 도우미
                    </span>
                </p>
                <div className="div-wrapper">
                    <div className="text-wrapper-8">
                    안녕하세요.
                    <br />
                    ......
                    </div>
                </div>
                <div className="text-wrapper-9">소개글</div>
                <div className="text-wrapper-10">후기</div>
                <p className="OOO">
                    정말 좋은 도우미! 우리 아이가 정말
                    좋아합니다&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OOO
                    님
                </p>
                <div className="text-wrapper-11">X</div>
                </div>
            </div>
    </div>
            </Header>

        </Root>
    );
};
export default HelperDetail;