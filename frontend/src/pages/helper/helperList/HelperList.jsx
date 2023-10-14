import { useState, useEffect } from 'react';
import './helper.css';
import axios from "axios";

const HelperList = ()=>{
    const [city, setCity] = useState(""); //시/도 : 서울
    const [district, setDistrict] = useState(""); //시/군/구 : 종로구
    const [serviceType, setServiceType] = useState(""); //분야 : 베이비시터
    const [serviceStartTime, setServiceStartTime] = useState("");//시작시간 : 0830
    const [serviceEndTime, setServiceEndTime] = useState("");//끝시간 : 1130
    const [gender, setGender] = useState("");//성별 : 여
    const [orderby, setOrderby ] = useState(""); //등록순

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8085/city');
                setCities(response.data.cities)
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }
        fetchData();
        
    }, [])
    
    const getCities = ()=>{
        // for (let i=0 ;i<cities.length;i++){
        //     return <option value={cities[i]} >{cities[i]}</option>
        //     // return cities[i]
        //     // console.log(cities[i])
        // }
        const result = cities.map((city,idx)=>{

            return <option key={idx} value={city} >{city}</option>
        })

        // console.log(result) // [<option>서울</option>, <option>광주</option>, <option>용산</option>..]

        return result;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8085/district');
                setDistricts(response.data.districts)
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }
        fetchData();
        
    }, [])

    const getDistricts = ()=>{
        const result = districts.map((district, idx)=>{
            return <option key={idx} value={district}>{district}</option>
        })
        return result;
    }

    return (
        <div className="app">
            <header className='header'>
                <select className='select-type' placeholder='종류 선택'>
                    <option value="" >종류선택</option>
                    <option value="">A</option>
                    <option value="">B</option>
                    <option value="">C</option>
                    <option value="">D</option>
                </select>
                <div className="logo">
                    <img src={require('./images/home_logo.png')}></img>
                </div>                
            </header>

            <div className="helper-list-container">
                <div className="helper-search-form">
                    <ul className='filter-list'>
                        <li className='filter-list-item'>
                            <div><b>지역</b></div>
                            <div className="select-container-2">
                                <select onChange={(e)=>{setCity(e.target.value)}} className="select-container-item" name="" id="">
                                    <option value=""  >시/도</option>
                                    {getCities()}

                                    {/* <option value="서울" >서울</option>
                                    <option value="광주" >광주</option>
                                    <option value="대전" >대전</option> */}
                                </select>

                                <select className="select-container-item" name="" id="">
                                    <option value="" >시/군/구</option>
                                    {getDistricts()}
                                </select>
                            </div>
                        </li>
                        <li className='filter-list-item'>
                            <div><b>분야</b></div>
                            <div className="select-container-1">
                                <select className="select-container-item" name="" id="">
                                    <option value="" >분야선택</option>
                                    <option value="" >베이비시터</option>
                                    <option value="" >등하원도우미  </option>
                                    <option value="" >요양보호사</option>
                                    <option value="" >간병인</option>
                                    <option value="" >기타</option>
                                </select>
                            </div>
                        </li>

                        <li className='filter-list-item'>
                            <div><b>시간</b></div>
                            <div className="select-container-4">
                                <input placeholder='00:00' className='select-container-item ft-center' type="text" />
                                <span className='ft-center'>~</span>
                                <input placeholder='00:00' className='select-container-item ft-center' type="text" />
                                <span> </span>
                            </div>
                        </li>

                        <li className='filter-list-item'>
                            <div><b>성별</b></div>
                            <div className="select-container-3">
                                <button placeholder='' className='select-container-item ft-center' type="text">남자</button>
                                <button placeholder='00:00' className='select-container-item ft-center' type="text">여자</button>
                                <span> </span>
                            </div>
                        </li>
                    </ul>

                    <button className='search-helper-button'>도우미 찾기</button>
                </div>

                <div className="helper-list-searched-container">
                    <div className='options-container'>
                        <select className='sorted-option ft-color' name="" id="">
                            <option value="" >등록순</option>
                        </select>
                    </div>
                    <ul className='helper-list-searched'>
                        <li className='helper-list-searched-item'>
                            <img className='profile' src={require('./images/profile-2.png')} />
                            <div className='description'>
                                <span className='description-item'>서울 / 강서구</span>
                                <span className='description-item'>베이비시터</span>
                                <span className='description-item'>윤바덕</span>
                                <span className='description-item'>오후</span>
                            </div>
                        </li>
                        <li className='helper-list-searched-item'>
                            <img className='profile' src={require('./images/profile-2.png')} />
                            <div className='description'>
                                <span className='description-item'>서울 / 강서구</span>
                                <span className='description-item'>베이비시터</span>
                                <span className='description-item'>윤바덕</span>
                                <span className='description-item'>오후</span>
                            </div>
                        </li>
                        <li className='helper-list-searched-item'>
                            <img className='profile' src={require('./images/profile-2.png')} />
                            <div className='description'>
                                <span className='description-item'>서울 / 강서구</span>
                                <span className='description-item'>베이비시터</span>
                                <span className='description-item'>윤바덕</span>
                                <span className='description-item'>오후</span>
                            </div>
                        </li>

                        <li className='helper-list-searched-item'>
                            <img className='profile' src={require('./images/profile-2.png')} />
                            <div className='description'>
                                <span className='description-item'>서울 / 강서구</span>
                                <span className='description-item'>베이비시터</span>
                                <span className='description-item'>윤바덕</span>
                                <span className='description-item'>오후</span>
                            </div>
                        </li>

                        <li className='helper-list-searched-item'>
                            <img className='profile' src={require('./images/profile-2.png')} />
                            <div className='description'>
                                <span className='description-item'>서울 / 강서구</span>
                                <span className='description-item'>베이비시터</span>
                                <span className='description-item'>윤바덕</span>
                                <span className='description-item'>오후</span>
                            </div>
                        </li>

                        <li className='helper-list-searched-item'>
                            <img className='profile' src={require('./images/profile-2.png')} />
                            <div className='description'>
                                <span className='description-item'>서울 / 강서구</span>
                                <span className='description-item'>베이비시터</span>
                                <span className='description-item'>윤바덕</span>
                                <span className='description-item'>오후</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default HelperList;