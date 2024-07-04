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
    const [reviewTag1, setReviewTag1] = useState("false");
    const [reviewTag2, setReviewTag2] = useState("false");
    const [reviewTag3, setReviewTag3] = useState("false");
    const [reviewTag4, setReviewTag4] = useState("false");
    const [render, setRender] = useState(0);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const request_id = param.request_id
    const [review_id, set_review_id] = useState(null); 
    const [helper_id, set_helper_id] = useState(null); 
    
    const handleRenderChange = () => {
        setRender(prevState => (prevState === 0 ? 1 : 0));
    };
    
    useEffect(()=>{
        const request_id2 = param.request_id
        //console.log(userInfo.name)
        axios.get(`${process.env.REACT_APP_SERVER_URL}/review/user-reviews/${request_id}`).then((res)=>{
            console.log('res:::',res.data.helper)
            setUserInfo(res.data.helper)
            //console.log(res.data[0])

            setReviewTag1(res.data.review.time_good)
            setReviewTag2(res.data.review.kind)
            setReviewTag3(res.data.review.child_like)
            setReviewTag4(res.data.review.reliable)
            setComment(res.data.review.contents)
            setUserAverageRate(res.data.review.rating)
            setTitle(res.data.review.title)
            set_review_id(res.data.review.id)
            set_helper_id(res.data.review.helper_id)
        })

        // axios.get(`${process.env.REACT_APP_SERVER_URL}/review/helper-review/${helper_id}/average`)
        // .then(res => {
        //     setUserAverageRate(Math.floor(res.data[0].avg*10)/10)
        // })

    }, [])
        

    const saveTheInfo=()=>{
        const myInfo = JSON.parse(localStorage.getItem('userInfo'))
        //console.log('userInfo :::',myInfo)
        const requestParams = {
            user_id : myInfo.id,
            helper_id : helper_id,
            title : title,
            rating : userAverageRate,
            request_id :request_id,
            time_good:reviewTag1,
            kind:reviewTag2,
            child_like:reviewTag3,
            reliable:reviewTag4,
            // field : serviceType,
            // region_state : city,
            // region_country : district,
            // region_eupmyeondong : " ",
            // date : date,
            // start_time : serviceStartTime,
            // end_time : serviceEndTime,
            contents :comment,
            // gender: gender,
        }

        axios.patch(`${process.env.REACT_APP_SERVER_URL}/review/user-review/modify/${review_id}`, requestParams).then((res=>{
            console.log('수정 성공')
            navigate('/usermypage')
        }))
        .catch(()=>{
            alert('실패했습니다.')
            console.log('수정 실패')
        })
    }

    return (
        <div>
            <Header2 data={render} onDataChange={handleRenderChange}></Header2>
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
                                    <Rate onChange={(value)=>{
                                        setUserAverageRate(value)
                                    }} style={{fontSize: 50, color: '#725F31'}} allowHalf value={userAverageRate} />
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
                        <select className="temp-0-1-select" disabled>
                            <option>{title}</option>
                        </select>
                            <textarea
                            value={comment}
                            onChange={(e)=>{
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
                <button onClick={()=>saveTheInfo()} style={{lineHeight: 2,width: 200, color: '#fff', border: '1px solid #EBEAEA', borderRadius: 5, backgroundColor: '#725f51', fontSize: 24, marginRight: 5}}>수정하기</button>
            </div>
        </div>

        
    )
}
export default UserMyPageWriteReview;