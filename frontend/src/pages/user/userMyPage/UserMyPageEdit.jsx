import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import "./UserMyPageEdit.css";
import SelectBox from "../../../components/SelectBox";
import { Select } from 'antd';
import Header2 from "../../../components/Header2";
import edit_icon from "../../user/userMyPage/edit-icon.png";
import axios from "axios";
import { Link } from "react-router-dom";

const UserMyPageEdit = ()=>{

    return (
        <div className="mypage-edit-container">
            <Header2></Header2>
            <div className="side-menu">
                <ul>
                    <li><Link to="#">개인 정보 수정</Link></li>
                    <li><Link to="#">이용 신청 내역</Link></li>
                    <li><Link to="#">작성한 리뷰 목록</Link></li>
                </ul>
            </div>
            <div className="mypage-edit-form">
                <div className="edit-form">
                    <ul>
                        <li>
                            <label htmlFor="name">이름</label>
                            <input className="w40" type="text" name="name" id="name" />
                        </li>
                        <li>
                            <label htmlFor="nickname">닉네임</label>
                            <input className="w40" type="text" name="nickname" id="nickname" />
                        </li>
                        <hr />
                        <li>
                            <label htmlFor="current_pw">현재 비밀번호</label>
                            <input className="w80" type="text" name="current_pw" id="current_pw" />
                        </li>
                        <li>
                            <label htmlFor="new_pw">새 비밀번호</label>
                            <input className="w80" type="text" name="new_pw" id="new_pw" />
                        </li>
                        <li>
                            <label htmlFor="new_pw_check">새 비밀번호 확인</label>
                            <input className="w80" type="text" name="new_pw_check" id="new_pw_check" />
                        </li>
                        <p style={{fontWeight: 400, fontSize: 16}}>
                            <span style={{fontWeight: 700, fontSize: 18, display: "inline-block", width: 210, marginRight: 20}}>비밀번호 변경시 유의사항</span>
                            영문 대/소문자와 숫자, 특수문자(~!@#$%^&*()-_?)를 조합하여 8~16자를 사용해 주세요.
                        </p>
                        <hr />
                        <li>
                            <label htmlFor="name">대표 주소지</label>
                            <input className="w80" type="text" name="name" id="name" />
                        </li>
                        <li>
                            <label htmlFor="name">주소지 수정</label>
                            <input className="w80" type="text" name="name" id="name" />
                        </li>
                    </ul>
                    <button style={{float: 'right', padding: '12px 20px', fontWeight: '700', backgroundColor: '#725f51', color: '#fff', borderRadius: 5, fontSize: '18px', border: 'none', marginRight: 50}}>+ 주소지 추가</button>
                    
                    <a className="signout_btn" href="#">탈퇴하기</a>
                </div>
            </div>

            <div className="btn-container">
                <button style={{lineHeight: 2, width: 200, border: '1px solid #EBEAEA', color: 'gray', borderRadius: 5, backgroundColor: '#fff', fontSize: 24, marginRight: 5}}>취소</button>
                <button style={{lineHeight: 2,width: 200, color: '#fff', border: '1px solid #EBEAEA', borderRadius: 5, backgroundColor: '#725f51', fontSize: 24, marginRight: 5}}>회원 정보 수정</button>
            </div>
        </div>
    )
}

export default UserMyPageEdit;