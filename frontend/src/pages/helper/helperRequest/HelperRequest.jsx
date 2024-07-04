// 도우미 리스트
import styled from "styled-components";
import React from 'react';
import Header from "../../../components/Header";
import "./HelperRequest.css";
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

const HelperRequest = ()=>{
    return (
        
        <div className="desktop">
            
            <div className="div">
                <Header></Header>
                <div className="desktop">
            <div className="div">
                <img className="image" alt="Image" src="image-1.png" />
                <div className="overlap">
                <p className="p">
                    <span className="text-wrapper">김동국 </span>
                    <span className="span">님</span>
                </p>
                <img className="ellipse" alt="Ellipse" src="ellipse-5.svg" />
                <div className="overlap-group">
                    <div className="rectangle" />
                    <div className="text-wrapper-2">마이페이지</div>
                </div>
                <div className="overlap-2">
                    <div className="rectangle" />
                    <div className="text-wrapper-3">로그아웃</div>
                </div>
                </div>
                <div className="overlap-group-2">
                <div className="overlap-3">
                    <div className="rectangle-2" />
                    <div className="text-wrapper-4">도우미 요청하기</div>
                </div>
                <div className="overlap-4">
                    <div className="text-wrapper-5">지역</div>
                    <img className="img" alt="Rectangle" src="rectangle-21.svg" />
                    <p className="div-2">
                    <span className="text-wrapper-6">
                        시/도&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="text-wrapper-7">▼</span>
                    </p>
                </div>
                <div className="div-wrapper">
                    <p className="div-3">
                    <span className="text-wrapper-6">
                        시/군/구&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                    </span>
                    <span className="text-wrapper-7">▼</span>
                    </p>
                </div>
                <div className="overlap-5">
                    <div className="text-wrapper-8">분야</div>
                    <img className="rectangle-3" alt="Rectangle" src="rectangle-31.svg" />
                    <p className="div-4">
                    <span className="text-wrapper-6">
                        분야선택&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                    </span>
                    <span className="text-wrapper-7">▼</span>
                    </p>
                </div>
                <img className="rectangle-4" alt="Rectangle" src="rectangle-36.svg" />
                <div className="overlap-6">
                    <div className="text-wrapper-8">성별</div>
                    <img className="rectangle-5" alt="Rectangle" src="rectangle-33.svg" />
                    <div className="text-wrapper-9">남자</div>
                </div>
                <div className="text-wrapper-10">요청사항</div>
                <div className="overlap-7">
                    <div className="text-wrapper-11">여자</div>
                </div>
                <div className="overlap-8">
                    <div className="text-wrapper-8">시간</div>
                    <img className="rectangle-6" alt="Rectangle" src="rectangle-32.svg" />
                    <div className="text-wrapper-12">00:00</div>
                </div>
                <div className="text-wrapper-13">~</div>
                <div className="overlap-9">
                    <div className="text-wrapper-14">00:00</div>
                </div>
                </div>
                <img className="line" alt="Line" src="line-5.svg" />
            </div>
    </div>
                
            </div>
    </div>
    )
}

export default HelperRequest;