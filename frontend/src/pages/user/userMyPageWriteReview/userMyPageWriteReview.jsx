import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Rate } from 'antd';
import './UserMyPageWriteReview.css';
import Header2 from "../../../components/Header2";
import axios from "axios";

const UserMyPageWriteReview = ()=>{
    const navigate = useNavigate();
    const param = useParams()
    const [userInfo, setUserInfo] = useState({});
    const [userAverageRate, setUserAverageRate] = useState(5);
    const [reviewTag1, setReviewTag1] = useState(false);
    const [reviewTag2, setReviewTag2] = useState(false);
    const [reviewTag3, setReviewTag3] = useState(false);
    const [reviewTag4, setReviewTag4] = useState(false);

    const [comment, setComment] = useState("");


    const handlerenderChange = () =>{
        setrender(prevState => (prevState === 0 ? 1 : 0));
    };
    const [render, setrender] = useState(0);

    useEffect(()=>{
        const helper_id = param.helper_id
        //console.log(userInfo.name)
        axios.get(`${process.env.REACT_APP_SERVER_URL}/user/helper/${helper_id}`).then((res)=>{
            console.log(res.data[0])
            setUserInfo(res.data[0])
            //console.log(res.data[0])
        })

        axios.get(`${process.env.REACT_APP_SERVER_URL}/review/helper-review/${helper_id}/average`)
        .then(res => {
            setUserAverageRate(Math.floor(res.data[0].avg*100)/100)
        })

    }, [])

    const saveTheInfo=()=>{
        const requestParams = {
            // user_id : userInfo.id,
            // helper_id : helperInfo.id,
            // field : serviceType,
            // region_state : city,
            // region_country : district,
            // region_eupmyeondong : " ",
            // date : date,
            // start_time : serviceStartTime,
            // end_time : serviceEndTime,
            // comment :requestText,
            // gender: gender,
        }

        axios.post(`${process.env.REACT_APP_SERVER_URL}/user-review`, requestParams).then((res=>{
            console.log('수정 성공')
        }))
        .catch(()=>console.log('수정 실패'))
    }

    return (
        <div>
            <Header2 data={render} onDataChange={handlerenderChange}></Header2>
            <div className="user-mypage-container">
                <div className="user-mypage-profile-change">
                    <div className="user-mypage-image">
                        <img src={userInfo.image} height='146' width='145'></img>
                    </div>
                    <div className="user-name">{userInfo.name}<span style={{fontSize : 25}}>님</span></div>
                    
                    <div className="user-address">{userInfo.region_country} {userInfo.region_state}</div>
                </div>

                <div style={{width: 1200, display: 'flex', justifyContent: 'space-between'}}> 
                    
                    <div>
                        <div className="user-mypage-helper-usage-history write-review write-review-1">
                            <p style={{backgroundColor: '#725F51', lineHeight: '67px', color: '#fff', fontWeight: 700, paddingLeft: 30, borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}}>
                                별점
                            </p>
                            <div className="" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <div style={{display: 'block', marginTop: 50}}>
                                    <Rate style={{fontSize: 50, color: '#725F31'}} disabled={true} allowHalf defaultValue={userAverageRate} />
                                    <h1 style={{textAlign: 'center', marginTop: 20}}>{userAverageRate}점</h1>
                                </div>   
                            </div>
                        </div>

                        <div className="user-mypage-helper-usage-history write-review write-review-2">
                            <p style={{backgroundColor: '#725F51', lineHeight: '67px', color: '#fff', fontWeight: 700, paddingLeft: 30, borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}}>
                                리뷰 태그
                            </p>
                            <div>
                                <div style={{border: reviewTag1 && '2px solid #555' }}  onClick={()=>setReviewTag1(!reviewTag1)} className="temp-0-1"><span>⏱️</span> 시간 약속을 잘지켜요</div>
                                <div style={{border: reviewTag2 && '2px solid #555' }} onClick={()=>setReviewTag2(!reviewTag2)} className="temp-0-1"><span>🎉</span> 친절해요</div>
                                <div style={{border: reviewTag3 && '2px solid #555' }} onClick={()=>setReviewTag3(!reviewTag3)} className="temp-0-1"><span>🧸</span> 아이들이 좋아해요</div>
                                <div style={{border: reviewTag4 && '2px solid #555' }} onClick={()=>setReviewTag4(!reviewTag4)} className="temp-0-1"><span>👍</span> 믿음직해요</div>
                            </div>
                        </div>
                    </div>

                    <div className="user-mypage-helper-usage-history write-review write-review-3">
                        <p style={{backgroundColor: '#725F51', lineHeight: '67px', color: '#fff', fontWeight: 700, paddingLeft: 30, borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}}>
                            리뷰 상세
                        </p>
                        <div>
                            <select className="temp-0-1-select">
                                <option>잠깐 아이 3시간 돌봐주실 분 구합니다!</option>
                            </select>
                            <textarea onChange={(e)=>{
                                setComment(e.target.value)
                                // console.log(e.target.value)
                            }} className="textarea-temp-0-1">
                            </textarea>
                            
                        </div>
                    </div>

                </div>
            </div>
            <div style={{textAlign: 'center'}}>
                <button onClick={()=>navigate(-1)} style={{lineHeight: 2, marginRight: 30, width: 200, border: '1px solid #EBEAEA', color: 'gray', borderRadius: 5, backgroundColor: '#fff', fontSize: 24, marginRight: 30}}>이전</button>
                <button onClick={saveTheInfo} style={{lineHeight: 2,width: 200, color: '#fff', border: '1px solid #EBEAEA', borderRadius: 5, backgroundColor: '#725f51', fontSize: 24, marginRight: 5}}>수정하기</button>
            </div>
        </div>

        
    )
}
export default UserMyPageWriteReview;