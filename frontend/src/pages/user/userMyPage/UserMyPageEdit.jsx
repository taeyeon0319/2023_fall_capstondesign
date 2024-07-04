import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import "./UserMyPageEdit.css";
import api from "../../../api";
import SelectBox from "../../../components/SelectBox";
import { Select } from 'antd';
import Header2 from "../../../components/Header2";
import edit_icon from "../../user/userMyPage/edit-icon.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UserMyPageEdit = ()=>{
    const userInfoString = localStorage.getItem('userInfo')
    const userInfo = JSON.parse(userInfoString)

    const [name, setName] = useState(`${userInfo.name}`);
    const [nickname, setNickName] = useState(`${userInfo.id}`);

    const [password, setPassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [passwordcheck, setPasswordcheck] = useState('');

    const navigate = useNavigate();


    const [city, setCity] = useState(`${userInfo.region_state}`);
    const [district, setDistrict] = useState(`${userInfo.region_country}`);

    const [cityData, setCityData] = useState([]);
    const [districts, setDistricts] = useState({}); //시/군/구 selectbox
    

    const [passwordVisible, setPasswordVisible] = React.useState(false);

    const getCities = () => {
        if (!!districts) {
            const districtList = Object.keys(districts);
            return districtList.map((el, idx) => (
                <option key={idx} value={el}>
                {el}
                </option>
            ));
            }
        };
        
        const getDistrict = () => {
            console.log('city:::',city)
            console.log('city:disticts:::',districts[`${city}`])
            if (city !== "" && districts[`${city}`] !== undefined) {

                return districts[`${city}`].map((d, idx) => {
                    return (
                    <option key={idx} value={d}>
                        {d}
                    </option>
                    );
                });
            } else {
            return [];
            }
        };
    
    const updateUserInfo = ()=>{
        if(name === '' || password === '' || newpassword === ''){
            alert('필수값을 입력해주세요')
            return;
        }

        if(password != userInfo.password){
            alert('비밀번호가 잘못되었습니다.')
            return;
        }

        if(newpassword !== passwordcheck){
            alert('새 비밀번호를 확인해주세요.')
            return;
        }

        const params = {
            name: name,
            password: newpassword,
            region_state: city,
            region_country: district,
            password_confirm: passwordcheck,
        }

        axios.patch(`${process.env.REACT_APP_SERVER_URL}/user/changeUser/${userInfo.id}`, params).then((res)=>{
            console.log(res)
            navigate('/usermypage')
            //console.log(res.data[0])
        })
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await api.get(`/city`);
            const data = response.data;
            setCityData(data);
            const districtInfo = {};
    
            for (let district of data) {
                // console.log(district)
              districtInfo[`${district.region_state}`] = [];
            }
            for (let district of data) {
                districtInfo[`${district.region_state}`].push(
                    district.region_country
                    );
                }
                setDistricts(districtInfo);
          } catch (error) {
            console.log("Error fetching data:", error);
          }
        };
        fetchData();
        
      }, []);

    return (
        <div className="mypage-edit-container">
            <Header2></Header2>
            <div className="mypage-edit-form">
                <div className="edit-form">
                    <ul>
                        <li>
                            <label htmlFor="name">이름</label>
                            <input className="w40" type="text" name="name" id="name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                        </li>
                        <li>
                            <label htmlFor="nickname">닉네임</label>
                            <input disabled className="w40" type="text" name="nickname" id="nickname" value={nickname} onChange={(e)=>{setNickName(e.target.value)}}/>
                        </li>
                        <hr />
                        <Space direction="vertical">
                            
                            
                            
                        </Space>
                        <li>
                            <label htmlFor="current_pw">현재 비밀번호</label>
                            {/* <input className="w80" type="password" name="current_pw" id="current_pw" /> */}
                            <Input.Password style={{
                                    width: '40%',
                                    position: 'relative',
                                    top: '-18px'
                                }} placeholder="input password"
                                value={password}
                                onChange={e=>setPassword(e.target.value)} />
                            <span style={{color: 'red', marginLeft: 20}}>{ password !== "" &&  password !== userInfo.password && '※잘못된 비밀번호입니다.' }</span>
                            <span style={{color: 'blue', marginLeft: 20}}>{ password === userInfo.password && '※올바른 비밀번호입니다.' }</span>
                        </li>
                        <li>
                            <label htmlFor="new_pw">새 비밀번호</label>
                            {/* <input className="w80" type="password" name="new_pw" id="new_pw" /> */}
                            <Input.Password
                                style={{
                                    width: '40%',
                                    position: 'relative',
                                    top: '-18px'
                                }}
                                value={newpassword}
                                onChange={e=>setNewpassword(e.target.value)}
                                placeholder="input password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </li>
                        <li>
                            <label htmlFor="new_pw_check">새 비밀번호 확인</label>
                            {/* <input className="w80" type="password" name="new_pw_check" id="new_pw_check"  /> */}

                                <Input.Password
                                style={{
                                    width: '40%',
                                    position: 'relative',
                                    top: '-18px'
                                }}
                                value={passwordcheck}
                                onChange={(e)=>setPasswordcheck(e.target.value)}
                                
                                placeholder="input password"
                                visibilityToggle={{
                                    visible: passwordVisible,
                                    onVisibleChange: setPasswordVisible,
                                }}
                                />                            
                                <span style={{color: 'red', marginLeft: 20}}>{ passwordcheck !== newpassword && '※잘못된 비밀번호입니다.' }</span>
                                <span style={{color: 'blue', marginLeft: 20}}>{newpassword !== "" && passwordcheck === newpassword && '※올바른 비밀번호입니다.' }</span>
    

                        </li>
                        <p style={{fontWeight: 400, fontSize: 16}}>
                            <span style={{fontWeight: 700, fontSize: 18, display: "inline-block", width: 210, marginRight: 20}}>비밀번호 변경시 유의사항</span>
                            영문 대/소문자와 숫자, 특수문자(~!@#$%^&*()-_?)를 조합하여 8~16자를 사용해 주세요.
                        </p>
                        <hr />
                        <li>
                            <label htmlFor="name">e-mail</label>
                            <input className="w80" type="email" name="name" id="name" />
                        </li>

                        <li>
                        
                            <label htmlFor="name">주소지 수정</label>
                           <span style={{width: '400px', marginLeft: 20}}>
                             {/* <input className="w80" type="text" name="name" id="name" /> */}
                             <select
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value);
                                }}
                                className="select-container-item"
                                style={{width: '200px'}}
                                name=""
                                id=""
                                >
                                <option value="">지역</option>
                                {getCities()}

                                {/* <option value="서울" >서울</option>
                                                    <option value="광주" >광주</option>
                                                <option value="대전" >대전</option> */}
                            </select>
                            <select
                                value={district}
                                                
                                className="select-container-item"
                                style={{width: '200px'}}
                                name=""
                                id=""
                                >
                                <option value="">시/군/구</option>
                                {getDistrict()}
                            </select>
                           </span>
                        </li>
                    </ul>
                    {/* <button style={{float: 'left', padding: '12px 20px', fontWeight: '700', backgroundColor: '#725f51', color: '#fff', borderRadius: 5, fontSize: '18px', border: 'none', marginLeft: 10}}>+ 주소지 추가</button> */}
                    
                    <a className="signout_btn" href="#">탈퇴하기</a>
                </div>
            </div>

            <div className="btn-container">
                <button onClick={()=>navigate(-1)} style={{lineHeight: 2, width: 200, border: '1px solid #EBEAEA', color: 'gray', borderRadius: 5, backgroundColor: '#fff', fontSize: 24, marginRight: 5}}>취소</button>
                <button onClick={updateUserInfo} style={{lineHeight: 2,width: 200, color: '#fff', border: '1px solid #EBEAEA', borderRadius: 5, backgroundColor: '#725f51', fontSize: 24, marginRight: 5}}>회원 정보 수정</button>
            </div>
        </div>
    )
}

export default UserMyPageEdit;