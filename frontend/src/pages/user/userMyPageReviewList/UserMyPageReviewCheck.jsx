import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './UserMyPageReviewCheck.css';
import Header2 from "../../../components/Header2";
import axios from "axios";


const UserMyPageReviewCheck = ()=>{
    const navigate = useNavigate();
    const params = useParams();
    const [helperInfo, setHelperInfo] = useState({});
    const [helperMonth, setHelperMonth] = useState({});
    const [helperReview, setHelperReview] = useState([]);
    const helper_id = params.id;

    const getReviewList = ()=>{
        return helperReview.map((review)=>{
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

    //도우미 정보 가져오기
    useEffect(() => {
        const response = axios.get(`${process.env.REACT_APP_SERVER_URL}/user/helper/taeyeon0319`);

        response.then(res => {
            setHelperInfo(res.data[0])
            //console.log(res.data[0])
        })
    }, [])

    //도우미 해당월 도움 횟수 : 월 도움 횟수 : 15회
    useEffect(() => {
        const response = axios.get(`${process.env.REACT_APP_SERVER_URL}/review/helper-review/taeyeon0319/month`);

        response.then(res => {
            setHelperMonth(res.data[0].count)
            //console.log(res.data[0].count)
        })
    }, [])

    //도우미 자신에 대한 리뷰 가져오기 : ./helper-review/:helper_id
    useEffect(() => {
        const response = axios.get(`${process.env.REACT_APP_SERVER_URL}/review/helper-review/taeyeon0319`);

        response.then(res => {
            setHelperReview(res.data)
            console.log(res.data)
        })
    }, [])

    return (
        <div className='app'>
            <Header2></Header2>
            <div className="helper-list-container">
                <div className= "helper-search-form1">
                    <div className='helper-review-profile'>
                        <img style={{height: 106, width:106}} className='profile' src={helperInfo.image}/>
                        <div><span className='helper-name'>{helperInfo.name}</span><span className='literally-helper'>도우미</span></div>
                        <div className='helper-address'>{helperInfo.region_state} {helperInfo.country} 충무로 1길 36</div>
                        <div className='certification-container'>
                            <div className='helper-address-certification'>지역 인증 완료</div>
                            <div className='helper-certification'>요양보호사 자격증 인증 완료</div>
                        </div>
                        <div className='helper-review-container'>
                            <div className='review-title'>리뷰 평점</div>
                            <div className='stars'>★★★★☆ </div>
                            <div className='score'>4.92</div>
                        </div>
                    </div>
                    <div className='helper-review-button'>
                        <div className='title'><span className='fl'>월 도움 횟수</span> </div>
                        <div className='review-button-container'>
                            <div className='btn-1'>시간 약속을 잘 지켜요<div className='review-button-percent'>66.7%</div></div>
                            <div className='btn-1'>친절해요<div className='review-button-percent'>60.0%</div></div>
                            <div className='btn-1'>아이들을 좋아해요<div className='review-button-percent'>46.7%</div></div>
                            <div className='btn-1'>믿음직해요<div className='review-button-percent'>40.0%</div></div>

                        </div>
                    </div>
                </div>
                
                <div className="helper-list-searched-container">
                    <div className='title'><span className='fl'>최근 리뷰</span> </div>
                    <div className='review-list'>
                        {getReviewList()}
                    </div>
                </div>
            </div>
            <div className='btn-container'>
                <button className='button-1' onClick={()=>{navigate('/usermypage')}}>이전</button>
                <button className='button-2' onClick={()=>{navigate('/usermypage/edit')}}>도움 신청</button>
            </div>
            
        </div>
    )
}
export default UserMyPageReviewCheck;