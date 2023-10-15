// 도우미 상세 페이지
import "./HelperDetail.css";
import styled from "styled-components";
import React from 'react';
import Header from "../../../components/Header";
import { Button, Modal } from 'antd';
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
            <Header></Header>
            <div className="desktop">
            <div className="modal-container">
            <div className="modal-header">
                <img className="profile" src={require('./profile-1.png')} alt="" />
                <div className="desc">
                    <div className="desc-item name"><h3>김무너 님</h3></div>
                    <div className="desc-item local">서울 / 서현동</div>
                    <div className="desc-item service">요양보호사</div>
                    <div className="desc-item gender">여자 도우미</div>
                </div>
            </div>
            <div style={{marginBottom: '20px'}}></div>
            <h3>소개</h3>
            <textarea className='intro-text' readOnly value={"안녕하세요"}></textarea>
            <div style={{marginBottom: '20px'}}></div>
            <h3>후기</h3>
            <div style={{marginBottom: '10px'}}></div>
            <ul className='review-list'>
                <li className='review-item'>
                    <div className='review-content'>정말 좋은 도우미! 우리 아이가 정말 좋아합니다.</div>
                    <div className='review-user'>윤바덕 님</div>
                </li>
                <li className='review-item'>
                    <div className='review-content'>1시간 잠깐이지만 우리 아이랑 놀아주셔서 감사합니다. 너무 친절했습니다.</div>
                    <div className='review-user'>윤바덕 님</div>
                </li>
                <li className='review-item'>
                    <div className='review-content'>또 요청하겠습니다!</div>
                    <div className='review-user'>윤바덕 님</div>
                </li>
            </ul>
            <button className='next-container-item'>다음</button>
        </div>

    </div>
            

        </Root>
    );
};
export default HelperDetail;