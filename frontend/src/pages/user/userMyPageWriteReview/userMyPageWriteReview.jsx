import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './UserMyPageWriteReview.css';
import Header2 from "../../../components/Header2";
import axios from "axios";

const UserMyPageWriteReview = ()=>{
    const navigate = useNavigate();




    return (
        <div className='app'>

            <Header2></Header2>
            <div className="user-mypage-container">
                <div className='profile-container'>
                    <div className='helper-name'>김헬퍼<span style={{fontSize : 20,fontWeight:500, lineHeight:28.96}} >도우미님</span></div>
                    <div className='helper-address'>서울특별시 중구 충무로 1길 36</div>
                    <img src="" className='helepr-profile-img' ></img>
                </div>
                <div className='bottom-left-container'>

                </div>
                <div className='bottom-right-container'>

                </div>
            </div>
            
        </div>
    )
}
export default UserMyPageWriteReview;