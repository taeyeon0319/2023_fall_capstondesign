// 도우미 리스트
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import "./UserMyPage.css";
import SelectBox from "../../../components/SelectBox";
import { Select } from 'antd';
import Header2 from "../../../components/Header2";
import edit_icon from "../../user/userMyPage/edit-icon.png";
import axios from "axios";

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
    const [userInfo, setUserInfo] = useState({});
    const [reviewlist, setReviewlist] = useState([]);
    const [requestIngList, setRequestIngList] = useState([]);
    const handlerenderChange = () =>{
        setrender(prevState => (prevState === 0 ? 1 : 0));
    };
    const [render, setrender] = useState(0);
    const navigate = useNavigate();
    const userInfoString = localStorage.getItem('userInfo')
    const loginedUserInfo = JSON.parse(userInfoString)

    useEffect(()=>{
        // const user_id = sessionStorage.getItem('user_id')
        const userInfoString = localStorage.getItem('userInfo')
        const userInfo = JSON.parse(userInfoString)
        //console.log(userInfo.name)
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/review/user-review/${userInfo.id}`);
                const data = response.data;
                console.log('review-data:::', data)
                setReviewlist(data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }
        fetchData();
        if(userInfo === undefined && userInfo.id === undefined){
            console.error('로그인된 유저가 아닙니다.')
        }

        axios.get(`${process.env.REACT_APP_SERVER_URL}/helper/users/${userInfo.id}`).then((res)=>{
            setUserInfo(res.data[0])
            //console.log(res.data[0])
        })

        axios.get(`${process.env.REACT_APP_SERVER_URL}/helper/requests-helper/${userInfo.id}`).then(res=>{
            console.log('helper request:::', res.data)
            // setRequestIngList(res.data.requests)
        })
        
    }, [])

    const convertYYYYMMDD = function(dateObj){
        const date = new Date(dateObj);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDay();
        return `${year}-${month}-${day}`
    }

    useEffect(() => {
        const response = axios.get(`${process.env.REACT_APP_SERVER_URL}/helper/requests-user-ing/${loginedUserInfo.id}`);

        response.then(res => {
            // console.log('ing:::',res.data[0].requests)
            setRequestIngList(res.data[0].requests)
        })
    }, [])

    const historyItemList = ()=>{


        return reviewlist.map((review, idx)=>{
            return (
                        <div className="history-item" key={idx}>
                            <div style={{position: "absolute", top: 20, right: 10}}>
                                <p style={{textAlign: 'right', fontWeight: 500, fontSize: 18, color: '#725F51'}}>도우미 비용</p>
                                <p style={{textAlign: 'right', fontSize: 24, fontWeight: 700, color: '#54493F', lineHeight: 2}}>{review.totalpay}원</p>
                            </div>
                            <div style={{position: "absolute", bottom: 10, right: 10}}>
                                <button onClick={()=>navigate(`/usermypage/helperReview/${review.helper.id}`)} style = {{padding : "6px 29px", border: "1px solid #725F51", background: "none", borderRadius :"5px", color:"#725F51", marginRight:"13px"}}>자세히 보기</button>
                                <button onClick={()=>navigate(`/usermypage/writeReview/${review.request_id}`)} style = {{padding : "6px 29px", border: "1px solid #725F51", background: "#725F51", borderRadius :"5px", color:"#fff"}}>리뷰 수정</button>

                            </div>
                            <div style={{width: 106, height: 106, margin: 25, borderRadius: '50%', overflow: 'hidden', display: 'flex', justifyContent: 'center', float: "left" }}>
                                <img style={{height: 106}} src={review.helper.image}></img>
                            </div>
                            <div className="history-item-desc">
                                <p className="history-item-title" style={{width: 850}}>{review.contents} - {convertYYYYMMDD(review.updated_at)}</p>
                                <ul style={{float: 'left', paddingTop: 5}}>
                                    <li style={{lineHeight: 2,}}><span style={{display: 'inline-block', fontWeight: 500, fontSize: 18, width: 100}}>도우미</span> <span style={{fontWeight: 700, fontSize: 20}}>{review.helper.name}</span> <span>도우미님</span></li>
                                    <li style={{lineHeight: 1.5,}}><span style={{display: 'inline-block', fontWeight: 500, fontSize: 18, width: 100}}>요청시각</span> <span style={{fontWeight: 700, fontSize: 20}}>{review.start_time} ~ {review._time}</span> </li>
                                </ul>
                            </div>
                        </div>
            )
        })
    }

    const requestIngItemList = ()=>{


        return requestIngList.map((request, idx)=>{
            return (
                        <div className="history-item" key={idx}>
                            <div style={{position: "absolute", top: 20, right: 10}}>
                                {/* <p style={{textAlign: 'right', fontWeight: 500, fontSize: 18, color: '#725F51'}}>도우미 비용</p>
                                <p style={{textAlign: 'right', fontSize: 24, fontWeight: 700, color: '#54493F', lineHeight: 2}}>{1000}원</p> */}
                            </div>
                            <div style={{position: "absolute", bottom: 10, right: 10}}>
                                <button disabled={true} style = {{padding : "6px 29px", border: "1px solid #725F51", backgroundColor: "#725F51", borderRadius :"5px", color:"#fff", marginRight:"13px"}}>요청중</button>
                            </div>
                            <div style={{width: 106, height: 106, margin: 25, borderRadius: '50%', overflow: 'hidden', display: 'flex', justifyContent: 'center', float: "left" }}>
                                <img style={{height: 106}} src={request.image}></img>
                            </div>
                            <div className="history-item-desc">
                                <p className="history-item-title" style={{width: 850}}>{request.comment} - {convertYYYYMMDD(request.date)}</p>
                                <ul style={{float: 'left', paddingTop: 5}}>
                                    <li style={{lineHeight: 2,}}><span style={{display: 'inline-block', fontWeight: 500, fontSize: 18, width: 100}}>도우미</span> <span style={{fontWeight: 700, fontSize: 20}}>{request.helper_id}</span> <span>도우미님</span></li>
                                    <li style={{lineHeight: 1.5,}}><span style={{display: 'inline-block', fontWeight: 500, fontSize: 18, width: 100}}>요청시각</span> <span style={{fontWeight: 700, fontSize: 20}}>{request.start_time} ~ {request.end_time}</span> </li>
                                </ul>
                            </div>
                        </div>
            )
        })
    }

    return (
        
        <div>
            {/* <Header2></Header2> */}
            <Header2 data={render} onDataChange={handlerenderChange}></Header2>
            <div className="user-mypage-container">
                <div className="user-mypage-profile-change">
                    <div className="user-mypage-image">
                        <img src={userInfo.image} height='146' width='145'></img>
                    </div>
                    <div className="user-name">{userInfo.name}<span style={{fontSize : 25}}>님</span>
                    <img src={edit_icon} onClick={()=>{navigate(`/usermypage/edit`)}} style={{height:30, width:30, marginLeft:20, cursor: 'pointer' }}></img>
                    </div>
                    
                    <div className="user-address">{userInfo.region_country} {userInfo.region_state}</div>
                    <div className="user-phonenumber"> {userInfo.mobile}</div>
                </div>

                <div>
                    
                </div>
                <div className="user-mypage-helper-usage-history">
                    <p style={{backgroundColor: '#725F51', lineHeight: '67px', color: '#fff', fontWeight: 700, paddingLeft: 30, borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}}>
                        최근 이용 내역
                    </p>
                    <div className="history-list-container">
                        {requestIngItemList()}
                        {historyItemList()}
                        {/* <div className="history-item">
                            <div style={{position: "absolute", top: 20, right: 10}}>
                                <p style={{textAlign: 'right', fontWeight: 500, fontSize: 18, color: '#725F51'}}>도우미 비용</p>
                                <p style={{textAlign: 'right', fontSize: 24, fontWeight: 700, color: '#54493F', lineHeight: 2}}>{'16000'}원</p>
                            </div>
                            <div style={{position: "absolute", bottom: 10, right: 10}}>
                                <button style = {{padding : "6px 29px", border: "1px solid #725F51", background: "none", borderRadius :"5px", color:"#725F51", marginRight:"13px"}}>도우미 요청</button>
                                <button style = {{padding : "6px 29px", border: "1px solid #725F51", background: "#725F51", borderRadius :"5px", color:"#fff"}}>리뷰 남기기</button>

                            </div>
                            <div style={{width: 106, height: 106, margin: 25, borderRadius: '50%', overflow: 'hidden', display: 'flex', justifyContent: 'center', float: "left" }}>
                                <img style={{height: 106}} src={userInfo.image}></img>
                            </div>
                            <div className="history-item-desc">
                                <p className="history-item-title">동국 초등학교 등원 구해요 - {'2023.12.25'}</p>
                                <ul style={{float: 'left', paddingTop: 5}}>
                                    <li style={{lineHeight: 2,}}><span style={{display: 'inline-block', fontWeight: 500, fontSize: 18, width: 100}}>도우미</span> <span style={{fontWeight: 700, fontSize: 20}}>박도움</span> <span>도우미님</span></li>
                                    <li style={{lineHeight: 1.5,}}><span style={{display: 'inline-block', fontWeight: 500, fontSize: 18, width: 100}}>요청시각</span> <span style={{fontWeight: 700, fontSize: 20}}>{'09:00'} ~ {'12:00'}</span> </li>
                                </ul>
                            </div>
                        </div> */}
                        
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserMyPage;