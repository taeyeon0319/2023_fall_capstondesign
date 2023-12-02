import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './HelperDetail.css';
import axios from "axios";
import { Button, Modal, DatePicker, Space, TimePicker  } from 'antd';
import Header2 from "../../../components/Header2";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { responsiveArray } from 'antd/es/_util/responsiveObserver';


const HelperDetail = ()=>{
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();


    const searchParams = location.state;

    // console.log(searchParams)

    const helper_id = params.id;

    const [helperInfo, setHelperInfo] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [secondStep, setSecondStep] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
    const [reviewList, setReviewList] = useState([]);
    const [requestText, setRequestText] = useState("");


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
    useEffect(()=>{
        const userInfoString = localStorage.getItem('userInfo')
        const userInfo = JSON.parse(userInfoString)
        axios.get(`${process.env.REACT_APP_SERVER_URL}/helper/users/${userInfo.id}`).then((res)=>{
            setUserInfo(res.data[0])
            //console.log(res.data[0])
        })
    },[])
    useEffect(()=>{
        if(location.state){
            setCity(location.state.city)
            setDistrict(location.state.region)
            setServiceType(location.state.field)
            setDate(location.state.date)
            setServiceStartTime(location.state.needtime_s)
            setServiceEndTime(location.state.needtime_e)
        }
    }, [])

    

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

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/review/helper-review/${helper_id}`).then(res=>{
            setReviewList(res.data)
        })
    },[])
    //도로명 주소
    // const findAddr = async()=> {
    //         try {
    //             new defaultMethod.Postcode({
    //             oncomplete : function(data) {
    //                 var addr=' ';
    //                 if(data.userSelectedType === 'R'){
    //                     addr = data.roadAddress;
    //                 }else{
    //                     addr = data.jibunAddress;
    //                 }
    //                 $("#c_main_address").val(addr);
    //             }
    //             }).open()
    //     }catch(error){
    //         console.log('Error fetching data :', error);
    //     }
    // }
    
    const getCities = () => {
        if (!!districts) {
            const districtList = Object.keys(districts)

            return districtList.map((el, idx) => {
                    return <option  key={idx} value={el}>
                    {el}
                    </option>
                });
            }
        };

    const getDistrict = ()=>{
        if(city !== "" ){
            return districts[`${city}`].map((d, idx)=>{
                return <option key={idx} value={d}>{d}</option>
            })

        } else {
            return []
        }
    }
    const getServices = () => {
        if (!!services && services.length > 0) {
            return services.map((service, i) => (
                <option 
                key={service.id} value={service.field_name}>
                {service.field_name}
                </option>
            ));
            }
            return null;
        };
    
    const getReviewList = ()=>{
        return reviewList.map((review)=>{
            return (
                <div className='review-item'>
                    <div className='left'>
                        <div className='img-container' style={{background: '#eee'}}>
                            <img className='img' src={review.user.image} alt="" />
                        </div>
                        <span style={{textAlign: 'center', width: '55px'}}>★ {review.rating}</span>
                    </div>
                    <div className='right'>
                        <div className='item-name'>{review.user.name}</div>
                        <div className='item-date'>{review.created_at}</div>
                        <div className='item-content'>{review.contents}</div>
                    </div>
                </div>
            )
        })
        
        
    }

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

    //도우미 신청 버튼 클릭하면 뜨는 Modal 창
    // const Modal = () => {
    //     // const [isModalOpen, setIsModalOpen] = useState(false);
    //     const showModal = () => {
    //         setIsModalOpen(true);
    //         };
    //         const handleOk = () => {
    //         setIsModalOpen(false);
    //         };
    //         const handleCancel = () => {
    //         setIsModalOpen(false);
    //         };
    //         return (
    //         <>
    //             <Button type="primary" onClick={showModal}>
    //             Open Modal
    //             </Button>
    //             <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    //             <p>Some contents...</p>
    //             <p>Some contents...</p>
    //             <p>Some contents...</p>
    //             </Modal>
    //         </>
    //         );
    //     };
        
    const requestHelper = ()=>{
        console.log('reqest!')
        axios.post(`${process.env.REACT_APP_SERVER_URL}/helper/requests/add`,{
            user_id : userInfo.id,
            helper_id : helperInfo.name,
            field : serviceType,
            region_state : city,
            region_country : district,
            region_eupmyeondong : " ",
            date : date,
            start_time : serviceStartTime,
            end_time : serviceEndTime,
            comment :requestText,
        }).then(response=>{
            console.log('성공적으로 요청 완료', response.data);
            navigate('/usermypage');
            
        })
        .catch(error =>{
            console.log('Requset Failed', error);
            //요청 실패 시 alert창 
        })
    }
    
    useEffect(() => {
        const response = axios.get(`${process.env.REACT_APP_SERVER_URL}/user/helper/${helper_id}`);

        response.then(res => {
            setHelperInfo(res.data[0])
            // console.log(res.data[0])
        })
    }, [])

        const handleOk = () => {
            requestHelper();
            
        };
        const handleCancel = () => {
        setIsModalOpen(false);
        };

    return (
        <div className="app">
            <Modal title="요청 여부 확인" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>요청을 하시겠습니까?</p>
                {/* <p>Some contents...</p>
                <p>Some contents...</p> */}
            </Modal>

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
                            <p className='region'>{helperInfo.region_state} / {helperInfo.region_country}</p>
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
                        <div className='title'><span className='fl'>후기</span> <span className='count ft-size15 fr'>평균 {reviewList.reduce((sum, curValue)=>{
                            return Math.round((sum + curValue.rating / reviewList.length)*100)/100
                        }, 0)}점 | 총 {reviewList.length}건의 후기</span></div>
                            
                        <div className='review-list'>
                            {getReviewList()}
                        </div>
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
                                <select onChange={(e)=>{setCity(e.target.value)}} value={city} className="select-container-item" name="" id="">
                                    <option value="">지역</option>
                                    {/* <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script> */}
                                    {/* <label for = "c_main_address">주소</label>
                                    <input type = "text" id="c_main_address" ></input>
                                    <button type='button' id="addressSearch" onClick="findAddr()">주소 검색</button> */}
                                    {getCities()}
                                    

                                    {/* <option value="서울" >서울</option>
                                    <option value="광주" >광주</option>
                                    <option value="대전" >대전</option> */}
                                </select>

                                <select onChange={(e)=>{setDistrict(e.target.value)}} value={district} className="select-container-item" name="" id="">
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
                                <select onChange={(e)=>{
                                        setServiceType(e.target.value)                                  
                                    }} className="select-container-item" value={serviceType} name="" id="">
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
                                    defaultValue={dayjs(date)}
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
                                <TimePicker placeholder='00:00' defaultValue={dayjs(`${date} ${serviceStartTime}:00`)} onChange={(time, timeString)=>setServiceStartTime(timeString)} format={'HH:mm'} />
                                <span className='ft-center'>~</span>
                                <TimePicker placeholder='00:00' defaultValue={dayjs(`${date} ${serviceEndTime}:00`)} onChange={(time, timeString)=>setServiceStartTime(timeString)} format={'HH:mm'} />
                                <span> </span>
                                <button className='select-container-item'>상관 없음</button>

                            </div>
                        </li>
                        <li className='filter-list-item'>
                            <div><b>요청 사항</b></div>
                            <div className="select-container-1">
                                <textarea className='textarea-000' onChange={(e)=>{setRequestText(e.target.value)}}></textarea>
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
                <button  className='btn-2' onClick={()=>{
                    if(!secondStep){
                        setSecondStep(true);
                        
                    } else {
                        setIsModalOpen(true);
                        
                        // requestHelper();
                        
                    }
                }}>도우미 요청</button>
            </div>
        </div>
    )
}

export default HelperDetail;