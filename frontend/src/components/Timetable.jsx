import React, { useState, useRef, useEffect } from "react";
import { Table, Button, Select } from "antd";
import axios from "axios";
import "./Timetable.css";
const { Option } = Select;

const customTableStyle = {
  width: "70%",
  margin: "0 auto",
  padding: "20px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Timetable = () => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const timeSlots = Array.from({ length: 49 }, (_, i) => 0 + i / 2);

  const [responseData, setResponseData] = useState([]);
  const [serviceStartTime, setServiceStartTime] = useState(""); //시작시간 : 0830
  const [serviceEndTime, setServiceEndTime] = useState(""); //끝시간 : 1130
  const [inputData, setInputData] = useState({
    helper_id: 1,
    day: "",
    startTime: "",
    endTime: "",
  });
  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/helper/helpertimetable/1"
      );
      setResponseData(response.data);
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };

  const generateTimetableData = () => {
    const timetableData = [];

    for (let i = 0; i < timeSlots.length; i++) {
      const hours = Math.floor(timeSlots[i]);
      const minutes = i % 2 === 0 ? "00" : "30";
      const time = `${hours >= 10 ? hours : "0" + hours}:${minutes}`;
      const row = {
        key: i,
        time: time,

        // Initialize all days as available
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      };
      timetableData.push(row);
    }

    return timetableData;
  };

  const [data, setData] = useState(generateTimetableData());
  const [isMouseDown, setIsMouseDown] = useState(false);

  //드래그한 데이터 저장하는 로직 - startTime, endTime
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleCellClick = async (day, time) => {
    const newData = [...data];
    //클릭한 데이터 저장하는 로직
    const target = newData.find((item) => item.time === time);
    target[day] = !target[day];

    // 클라이언트에서 서버로 해당 시간과 요일을 전송
    try {
      if (!target[day]) {
        // 클릭 시 색칠된 경우

        await axios.post("http://localhost:5000/helper/saveTimetable", {
          helper_id: 1,
          day,
          startTime,
          endTime,
        });
      } else {
        // 클릭 시 흰색으로 변경된 경우
        await axios.post("http://localhost:5000/helper/deleteTimetable", {
          helper_id: 1,
          day,
          startTime: time,
        });
      }

      // 성공적으로 서버에 전송되면 클라이언트의 상태 업데이트
      target[day] = !target[day];
      setData(newData);
      // fetchData();
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };

  const handleCellMouseDown = (e, day, time) => {
    setIsMouseDown(true);

    setStartTime(time);
    e.preventDefault();
  };

  const handleCellMouseEnter = (day, time) => {
    if (isMouseDown) {
      setEndTime(time);
      handleCellClick(day, startTime, endTime);
    }
  };

  const handleCellMouseUp = () => {
    setIsMouseDown(false);
    //window.location.reload();
  };

  const timetableRef = useRef(null);

  // 이벤트 리스너 등록
  useEffect(() => {
    const handleMouseUp = () => {
      handleCellMouseUp();
    };

    document.addEventListener("mouseup", handleMouseUp);

    // 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const getBackgroundColor = (day, time) => {
    for (let i = 0; i < responseData.length; i++) {
      const item = responseData[i];

      if (
        item.available_day === day &&
        item.starttime <= time &&
        item.endtime >= time
      ) {
        return "#93796A";
      }
    }
    // 색칠할 데이터가 없을 경우 기본 배경색 반환
    return "";
  };
  const times = [];
  for (let i = 0; i < timeSlots.length; i++) {
    const hours = Math.floor(timeSlots[i]);
    const minutes = i % 2 === 0 ? "00" : "30";
    const time = `${hours >= 10 ? hours : "0" + hours}:${minutes}`;
    times.push(time);
  }

  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      fixed: "left",
      width: 80,
    },
    ...daysOfWeek.map((day) => ({
      title: day,
      dataIndex: day.toLowerCase(),
      key: day.toLowerCase(),
      width: 120,
      align: "center",
      render: (text, record) => (
        <div
          className={`ant-table-cell ${
            record[day.toLowerCase()] ? "booked" : ""
          }`}
          onClick={() => handleCellClick(day.toLowerCase(), record.time)}
          onMouseDown={(e) =>
            handleCellMouseDown(e, day.toLowerCase(), record.time)
          }
          onMouseEnter={() =>
            handleCellMouseEnter(day.toLowerCase(), record.time)
          }
          style={{
            background: getBackgroundColor(day.toLowerCase(), record.time),
            margin: 0,
          }}
        >
          {record[day.toLowerCase()] ? "Available" : ""}
        </div>
      ),
    })),
  ];

  const handleChangeDay = (value) => {
    setInputData({
      ...inputData,
      day: value,
    });
  };
  const handleChangeStartTime = (value) => {
    setInputData({
      ...inputData,
      startTime: value,
    });
  };
  const handleChangeEndTime = (value) => {
    setInputData({
      ...inputData,
      endTime: value,
    });
  };

  const handleAddTimetable = async () => {
    try {
      console.log(inputData);
      console.log(inputData.day);
      await axios.post("http://localhost:5000/helper/saveTimetable", {
        helper_id: 1,
        day: inputData.day,
        startTime: inputData.startTime,
        endTime: inputData.endTime,
      });
      fetchData();
      //페이지 새로고침
      // window.location.reload();
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };

  return (
    <>
      <div
        style={customTableStyle}
        ref={timetableRef}
        onMouseLeave={() => handleCellMouseUp()}
      >
        <Table
          style={{ margin: 0 }}
          columns={columns}
          dataSource={data}
          scroll={{ x: "100%", y: 400 }}
          pagination={false}
        />
      </div>

      <div className="time-setting">
        <li className="filter-list-item">
          <div className="select-container">
            <Select id="day" defaultValue="Day" onChange={handleChangeDay}>
              {daysOfWeek.map((day) => (
                <Option key={day} value={day.toLowerCase()}>
                  {day}
                </Option>
              ))}
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Select
              id="start-time"
              defaultValue="start time"
              onChange={handleChangeStartTime}
            >
              {times.map((time) => (
                <Option key={time} value={time}>
                  {time}
                </Option>
              ))}
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Select
              id="end-time"
              defaultValue="end time"
              onChange={handleChangeEndTime}
            >
              {times.map((time) => (
                <Option key={time} value={time}>
                  {time}
                </Option>
              ))}
            </Select>
          </div>
        </li>

        <div>
          <Button id="add-btn" onClick={handleAddTimetable}>
            Add
          </Button>
        </div>
      </div>

      {/* <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          style={{
            width: "100px",
            height: "40px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#806332",
            color: "white",
          }}
        >
          Cancel
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button
          style={{
            width: "100px",
            height: "40px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#806332",
            color: "white",
          }}
        >
          Save
        </button>
      </div> */}
    </>
  );
};

export default Timetable;
