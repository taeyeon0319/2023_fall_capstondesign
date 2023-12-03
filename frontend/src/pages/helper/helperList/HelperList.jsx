import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./helper.css";
import axios from "axios";
import api from "../../../api";
import { Button, Modal, DatePicker, Space, TimePicker } from "antd";
import Header2 from "../../../components/Header2";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const HelperList = () => {
  const [city, setCity] = useState(""); //시/도 : 서울
  const [district, setDistrict] = useState(""); //시/군/구 : 종로구
  const [serviceType, setServiceType] = useState(""); //분야 : 베이비시터
  const [serviceStartTime, setServiceStartTime] = useState(""); //시작시간 : 0830
  const [serviceEndTime, setServiceEndTime] = useState(""); //끝시간 : 1130
  const [gender, setGender] = useState(""); //성별 : 여
  const [orderby, setOrderby] = useState("등록순"); //등록순
  const [date, setDate] = useState("");
  const [age, setAge] = useState("");
  const [career, setCareer] = useState("");
  const [certification, setCertification] = useState(""); //자격증 유무
  const [fastmatch, setFastmatch] = useState(false);

  const anonymousRef = useRef();

  const [cityData, setCityData] = useState([]);
  const [cities, setCities] = useState([]); //시/도 selectbox
  const [districts, setDistricts] = useState({}); //시/군/구 selectbox

  const [services, setServices] = useState([]); //분야 selectbox
  const [helperlist, setHelperlist] = useState([]);

  const [render, setrender] = useState(0);

  //DatePicker 지난 날짜.시간 비활성화 >
  dayjs.extend(customParseFormat);
  // const { RangePicker } = DatePicker;
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  // eslint-disable-next-line arrow-body-style
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current < dayjs().startOf("day") || current > dayjs().add(6, "day");
    //console.log(dayjs().add(0,'days'));
  };
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  });
  // const a = {
  //     'b' : 1,
  //     c: 2,
  //     '1ef': 3,
  // }

  // console.log(a.b)
  // console.log(a['b'])
  // console.log(a.c)
  // console.log(a['c'])
  // console.log(a['1ef'])

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/city`);
        const data = response.data;
        setCityData(data);
        const districtInfo = {};

        for (let district of data) {
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

    const fetchData2 = async () => {
      try {
        const response = await api.get(`/fields`);
        setServices(response.data);
      } catch (error) {
        console.log("Error fetching data :", error);
      }
    };
    fetchData2();
  }, []);

  useEffect(() => {
    getHelperSearch();
  }, [orderby]);

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
    if (city !== "") {
      console.log(districts);
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

  const getServices = () => {
    if (!!services && services.length > 0) {
      return services.map((service) => (
        <option key={service.id} value={service.field_name}>
          {service.field_name}
        </option>
      ));
    }
    return null;
  };

  const getHelperSearch = async () => {
    const requestParams = {
      city: city,
      region: district,
      field: serviceType,
      date: date,
      age: age,
      career: career,
      certification: true,
      needtime_s: serviceStartTime,
      needtime_e: serviceEndTime,
      gender: gender,
      // orderby : orderby,
    };

    try {
      const response = await api.get(
        `/user/helper/search${orderby === "평점순" ? "/orderbystars" : ""}`,
        { params: requestParams }
      );
      setHelperlist(response.data);
    } catch (error) {
      console.log("Error fetching data :", error);
    }
  };

  useEffect(() => {
    //     const fetchData = async ()=>{
    //         try {
    //             const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/search`);
    //             setHelperlist(response.data.helperList)
    //         }catch(error){
    //             console.log('Error fetching data :', error);
    //         }
    //     }
    //     fetchData();
    getHelperSearch();
  }, []);

  const handlerenderChange = () => {
    setrender((prevState) => (prevState === 0 ? 1 : 0));
  };

  const getHelperList = () => {
    const result = helperlist.map((helper, idx) => {
      return (
        <li
          onClick={() => {
            const requestParams = {
              city: city,
              region: district,
              field: serviceType,
              date: date,
              age: age,
              career: career,
              certification: true,
              needtime_s: serviceStartTime,
              needtime_e: serviceEndTime,
              gender: gender,
              // orderby : orderby,
            };

            navigate(`/user/helper/${helper.id}`, {
              state: {
                ...requestParams,
              },
            });
          }}
          key={idx}
          className="helper-list-searched-item"
        >
          <img className="profile" src={helper.image} />
          <div className="description">
            <h4 className="name">
              {helper.name} <span style={{ fontSize: "13px" }}>도우미</span>
            </h4>
            <p className="region">
              {helper.region_state} / {helper.region_country}
            </p>
            <p className="time-range">
              <span class="materail-time material-symbols-outlined">
                schedule
              </span>
              <span style={{ margin: "0px 0px 0px 5px" }}>
                {helper.start_time.substr(0, 5)}
              </span>
              &nbsp;~&nbsp;
              <span>{helper.end_time.substr(0, 5)}</span>
            </p>
            <p className="career-list">
              <span className="career">베이비시터</span>
            </p>
          </div>
          <div></div>
        </li>
      );
    });
    return result;
  };

  return (
    <div className="app">
      {/* <header className='header'>
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
            </header> */}
      <Header2 data={render} onDataChange={handlerenderChange}></Header2>

      <div className="helper-list-container">
        <div className="helper-search-form">
          <ul className="filter-list">
            <div>
              <b>지역</b>
            </div>
            <li className="filter-list-item">
              <div className="select-container-2">
                <select
                  defaultValue={""}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                  className="select-container-item"
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
                  defaultValue={""}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                  }}
                  className="select-container-item"
                  name=""
                  id=""
                >
                  <option value="">시/군/구</option>
                  {getDistrict()}
                </select>
              </div>
            </li>

            <button
              ref={anonymousRef}
              className="fast-match-button"
              onClick={(e) => {
                //console.log(anonymousRef.current)
                anonymousRef.current.classList.toggle("anonymous-click");
                setFastmatch(!fastmatch);
              }}
            >
              빠른 매칭
            </button>
            <div className="match-text">
              채팅 없이 빠른 매칭을 원한다면 클릭하시오
            </div>

            <li className="filter-list-item">
              <div>
                <b>도우미 분야</b>
              </div>
              <div className="select-container-1">
                <select
                  onChange={(e) => {
                    setServiceType(e.target.value);
                  }}
                  className="select-container-item"
                  name=""
                  id=""
                >
                  <option value="">분야선택</option>
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
            <li className="filter-list-item">
              <div>
                <b>날짜</b>
              </div>
              <div className="select-container-1">
                <DatePicker
                  disabledDate={disabledDate}
                  disabledTime={disabledDateTime}
                  placeholder="날짜를 입력해주세요."
                  inputReadOnly={true}
                  style={{ width: "100%" }}
                  size="large"
                  onChange={(dayjs, dayString) => {
                    setDate(dayString);
                  }}
                />
              </div>
            </li>

            <li className="filter-list-item">
              <div>
                <b>시간</b>
              </div>
              <div className="select-container-4">
                <TimePicker
                  placeholder="00:00"
                  onChange={(time, timeString) =>
                    setServiceStartTime(timeString)
                  }
                  format={"HH:mm"}
                />
                <span className="ft-center">~</span>
                <TimePicker
                  placeholder="00:00"
                  onChange={(time, timeString) => setServiceEndTime(timeString)}
                  format={"HH:mm"}
                />
                <span> </span>
                <button
                  className="select-container-item"
                  onClick={() => {
                    setServiceEndTime("");
                  }}
                >
                  상관 없음
                </button>
              </div>
            </li>
            {/* setGender */}
            {/* 버튼 둘 중 하나만 선택되도록 하기 */}
            <li className="filter-list-item">
              <div>
                <b>성별</b>
              </div>
              <div className="select-container-3">
                <button
                  placeholder=""
                  onClick={() => {
                    setGender("남");
                  }}
                  className="select-container-item ft-center"
                  type="text"
                >
                  남자
                </button>
                <button
                  placeholder=""
                  onClick={() => {
                    setGender("여");
                  }}
                  className="select-container-item ft-center"
                  type="text"
                >
                  여자
                </button>
                <button
                  className="select-container-item"
                  onClick={() => setGender("")}
                >
                  상관 없음
                </button>
              </div>
            </li>
            {/* <li className='filter-list-item'>
                            <div><b>자격증</b></div>
                            <div className="select-container-3">
                                <button placeholder='' onClick={()=>{setCertification(true)}} className='select-container-item ft-center' type="text">O</button>
                                <button placeholder='' onClick={()=>{setCertification(false)}} className='select-container-item ft-center' type="text">X</button>
                                <button className='select-container-item' onClick={()=>setCertification('')}>상관 없음</button>
                            </div>
                        </li> */}
          </ul>

          <button
            onClick={() => {
              getHelperSearch();
            }}
            className="search-helper-button"
          >
            도우미 찾기
          </button>
        </div>

        <div className="helper-list-searched-container">
          <div className="title">
            <span className="fl">도우미 목록</span>{" "}
            <span className="count ft-size15 fr">
              총 {helperlist.length}건 검색
            </span>
          </div>
          <div className="options-container">
            <select
              onChange={(e) => {
                const value = e.target.value;
                setOrderby(value);
              }}
              className="sorted-option ft-color"
              name=""
              id=""
            >
              <option value="등록순">등록순</option>
              <option value="평점순">평점순</option>
            </select>
          </div>
          <ul className="helper-list-searched">
            {getHelperList()}
            {/* <li className='helper-list-searched-item'>
                            <img className='profile' src={require('./images/profile-2.png')} />
                            <div className='description'>
                                <span className='description-item'>서울 / 강서구</span>
                                <span className='description-item'>베이비시터</span>
                                <span className='description-item'>윤바덕</span>
                                <span className='description-item'>오후</span>
                            </div>
                        </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelperList;
