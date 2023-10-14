// 도우미 리스트
import styled from "styled-components";
import React from 'react';
import Header from "../../../components/Header";
import "./UserMyPage.css";
import SelectBox from "../../../components/SelectBox";
import { Select } from 'antd';

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
        
        <div className="desktop">
            
            <div className="div">
                <Header></Header>
                <div className="desktop">
                    <div className="div">
                        <div className="overlap-group-2">
                            <div className="overlap-3">
                                <div className="overlap-4">
                                <div className="text-wrapper-4">김동국</div>
                                <div className="text-wrapper-5">님</div>
                                </div>
                                <p className="text-wrapper-6">서울특별시 중구 충무로 1길 36</p>
                            </div>

                            <div className="overlap-5">
                            <div className="text-wrapper-7">최근이용내역</div>

                            <div className="reviewbox">
                                {/* <img src="" alt="" /> */}
                                <div className="reviewtitle">동국초등학교 등원 도우미 구해요</div>
                                <div className="reviewdate">
                                    08 : 00 ~ 09 : 00
                                    2023-09-24
                                </div>
                                <button className="text-wrapper-11">리뷰 남기러 가기</button>
                                <div className="reviewbill">16,000</div>
                            </div>

                            {/* <div className="overlap-6">
                            <div className="image-wrapper"></div>
                                <div className="overlap-7">
                                    <div className="text-wrapper-8">동국초등학교 등원 도우미 구해요</div>
                                        <p className="element">
                                        <div className="text-wrapper-9">08 : 00 ~ 09 : 00 </div>
                                        <div className="text-wrapper-9">2023-09-24</div>
                                        </p>
                                    {/* <div className="rectangle-2" /> */}
                                    {/* <button className="text-wrapper-11">리뷰 남기러 가기</button>
                                </div>
                            <div className="text-wrapper-12">16,000</div>
                            </div> */}



                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserMyPage;