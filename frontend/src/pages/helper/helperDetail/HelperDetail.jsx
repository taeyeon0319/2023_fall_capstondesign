import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './HelperDetail.css';
import axios from "axios";
import { Button, Modal, DatePicker, Space, TimePicker  } from 'antd';
import Header2 from "../../../components/Header2";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const HelperDetail = ()=>{
    const navigate = useNavigate();
    const params = useParams();

    const helper_id = params.id;

    const [helperInfo, setHelperInfo] = useState({});

    const [secondStep, setSecondStep] = useState(false);

    const [city, setCity] = useState(""); //시/도 : 서울
    const [district, setDistrict] = useState(""); //시/군/구 : 종로구
    const [serviceType, setServiceType] = useState(""); //분야 : 베이비시터
    const [serviceStartTime, setServiceStartTime] = useState("");//시작시간 : 0830
    const [serviceEndTime, setServiceEndTime] = useState("");//끝시간 : 1130
    const [gender, setGender] = useState("");//성별 : 여
    const [orderby, setOrderby ] = useState(""); //등록순
    const [date, setDate] = useState("");
    const [age, setAge] = useState("");
    const [career, setCareer] = useState("");
    const [certification, setCertification] = useState("");


    const [cities, setCities] = useState([]);//시/도 selectbox
    const [districts, setDistricts] = useState([]);//시/군/구 selectbox
    const [services, setServices] = useState([]);//분야 selectbox
    const [helperlist, setHelperlist] = useState([]);

    const [cityData, setCityData] = useState([])

    
    //DatePicker 오늘 이후의 시간만 선택 가능한 component
    dayjs.extend(customParseFormat);
    const { RangePicker } = DatePicker;
    const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/city`);
                const data = response.data;
                setCityData(data);
                const districtInfo = {}

                for(let district of data){
                    districtInfo[`${district.region_state}`] = []
                }
                
                for(let district of data){
                    districtInfo[`${district.region_state}`].push(district.region_country)
                }
                setDistricts(districtInfo)
                
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }
        fetchData();

        const fetchData2 = async ()=>{
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/fields`);
                setServices(response.data)
            }catch(error){
                console.log('Error fetching data :', error);
            }
        }
        fetchData2();
        
    }, [])
    const getCities = () => {
        if (!!districts) {
        
            const districtList = Object.keys(districts)
            return districtList.map((el, idx) => (
                <option key={idx} value={el}>
                {el}
                </option>
            ));
            }
        };

    const getDistrict = ()=>{
        if(city !== "" ){
            console.log(districts)
            return districts[`${city}`].map((d, idx)=>{
                return <option key={idx} value={d}>{d}</option>
            })

        } else {
            return []
        }
    }



    const getServices = () => {
        if (!!services && services.length > 0) {
            return services.map((service) => (
                <option 
                
                key={service.id} value={service.field_name}>
                {service.field_name}
                </option>
            ));
            }
            return null;
        };

    // eslint-disable-next-line arrow-body-style
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current < dayjs().startOf('day') || current > dayjs().add(6,'day');
        //console.log(dayjs().add(0,'days'));
    };
    const disabledDateTime = () => ({
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
    });
    
    useEffect(() => {
        const response = axios.get(`${process.env.REACT_APP_SERVER_URL}/user/helper/${helper_id}`);

        response.then(res => {
            setHelperInfo(res.data)
        })
    }, [])

    return (
        <div className="app">

            {/* <header className='header'> */}
                {/* <div className="logo"> */}
                    {/* <img src={require('./images/home_logo.png')}></img> */}
                {/* </div>                 */}
            {/* </header> */}
            <Header2></Header2>

            <div className="helper-list-container">
                <div className="helper-search-form">
                    <div className='helper-list-searched-item'>
                        <img className='profile' src={helperInfo.image} />
                        <div className='description'>
                            <h4 className='name'>{helperInfo.name} <span style={{fontSize: '13px'}}>도우미</span></h4>
                            <p className='region'>{helperInfo.region_state} / {helperInfo.region_county}</p>
                            <p className='time-range'>
                            <span className="materail-time material-symbols-outlined">schedule</span>
                            <span>{helperInfo.start_time}</span>
                            &nbsp;~&nbsp;
                            <span>{helperInfo.end_time}</span>
                            </p>
                            <p className='career-list'>

                                <span className='career'>베이비시터</span>
                            </p>
                        </div>
                        <div></div>
                    </div>

                    <h3 className='description-1'>소개글</h3>
                    <div className='description-2'>
                        <textarea className='intro' readOnly value={helperInfo.introduction}></textarea>
                    </div>
                </div>
                {
                    !secondStep && 
                    <div className="helper-list-searched-container">
                        <div className='title'><span className='fl'>후기</span> <span className='count ft-size15 fr'>평균 4.5점 | 총 0건의 후기</span></div>
                        
                        <div></div>
                    </div>
                }
                {
                    secondStep && 
                    <div className="helper-list-searched-container">
                        <div className='title'>도우미 신청 양식</div>
                        
                        <div className="helper-search-form important-height">
                    <ul className='filter-list'>
                        <div><b>지역</b></div>
                        <li className='filter-list-item'> 
                            <div className="select-container-2">
                                <select onChange={(e)=>{setCity(e.target.value)}} className="select-container-item" name="" id="">
                                    <option value=""  >지역</option>
                                    {getCities()}

                                    {/* <option value="서울" >서울</option>
                                    <option value="광주" >광주</option>
                                    <option value="대전" >대전</option> */}
                                </select>

                                <select onChange={(e)=>{setDistrict(e.target.value)}} className="select-container-item" name="" id="">
                                    <option value="" >시/군/구</option>
                                    {getDistrict()}
                                </select>

                                <select onChange={(e)=>{setDistrict(e.target.value)}} className="select-container-item" name="" id="">
                                    <option value="" >읍/면/동</option>
                                    {/* {getDistricts()} */}
                                </select>
                            </div>
                        </li>
                        <li className='filter-list-item'>
                            <div><b>도우미 분야</b></div>
                            <div className="select-container-1">
                                <select onChange={(e)=>{setServiceType(e.target.value)}} className="select-container-item" name="" id="">
                                    {getServices()}
                                    {/* <option value="" >분야선택</option>
                                    <option value="" >베이비시터</option>
                                    <option value="" >등하원도우미  </option>
                                    <option value="" >요양보호사</option>
                                    <option value="" >간병인</option>
                                    <option value="" >기타</option> */}
                                </select>
                            </div>
                        </li>
            
                        <li className='filter-list-item'>
                            <div><b>날짜</b></div>
                            <div className="select-container-1">
                                <DatePicker 
                                    disabledDate={disabledDate}
                                    disabledTime={disabledDateTime}
                                    placeholder="날짜를 입력해주세요."
                                    inputReadOnly={true}
                                    style={{width: '100%'}}
                                    size='large' onChange={(dayjs, dayString)=>{setDate(dayString)}}
                                    />
                            </div>
                        </li>

                        <li className='filter-list-item'>
                            <div><b>시간</b></div>
                            <div className="select-container-4">
                                <TimePicker placeholder='00:00' onChange={(time, timeString)=>setServiceStartTime(timeString)} format={'HH:mm'} />
                                <span className='ft-center'>~</span>
                                <TimePicker placeholder='00:00' onChange={(time, timeString)=>setServiceStartTime(timeString)} format={'HH:mm'} />
                                <span> </span>
                                <button className='select-container-item'>상관 없음</button>

                            </div>
                        </li>
                        <li className='filter-list-item'>
                            <div><b>요청 사항</b></div>
                            <div className="select-container-1">
                                <textarea className='textarea-000'></textarea>
                            </div>
                        </li>
                    </ul>
                </div>
                    </div>
                }
                
            </div>

            <div className='btn-container'>
                {!secondStep && <button className='btn-1' onClick={()=>{navigate(-1)}}>취소</button>}
                {secondStep && <button className='btn-1' onClick={()=>{setSecondStep(false)}}>이전</button>}
                <button disabled={secondStep} className='btn-2' onClick={()=>{setSecondStep(true); console.log('hi')}}>도우미 요청</button>
            </div>
        </div>
    )
}

export default HelperDetail;