import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Rate } from 'antd';
import './UserMyPageWriteReview.css';
import Header2 from "../../../components/Header2";
import axios from "axios";

const UserMyPageWriteReview = ()=>{
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const handlerenderChange = () =>{
        setrender(prevState => (prevState === 0 ? 1 : 0));
    };
    const [render, setrender] = useState(0);

    useEffect(()=>{
        const userInfoString = localStorage.getItem('userInfo')
        const userInfo = JSON.parse(userInfoString)
        //console.log(userInfo.name)
        axios.get(`${process.env.REACT_APP_SERVER_URL}/helper/users/${userInfo.id}`).then((res)=>{
            setUserInfo(res.data[0])
            //console.log(res.data[0])
        })

    }, [])

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
                                    <Rate style={{fontSize: 50, color: '#725F31'}} disabled={true} allowHalf defaultValue={4.92} />
                                    <h1 style={{textAlign: 'center', marginTop: 20}}>{'4.5'}점</h1>
                                </div>   
                            </div>
                        </div>

                        <div className="user-mypage-helper-usage-history write-review write-review-2">
                            <p style={{backgroundColor: '#725F51', lineHeight: '67px', color: '#fff', fontWeight: 700, paddingLeft: 30, borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}}>
                                리뷰 태그
                            </p>
                            <div>
                                <div className="temp-0-1"><span>⏱️</span> 시간 약속을 잘지켜요</div>
                                <div className="temp-0-1"><span>🎉</span> 친절해요</div>
                                <div className="temp-0-1"><span>🧸</span> 아이들이 좋아해요</div>
                                <div className="temp-0-1"><span>👍</span> 믿음직해요</div>
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
                            <textarea disabled={true} className="textarea-temp-0-1" value={
                                '김헬퍼 헬퍼님 덕분에 맘 놓고 장 보러 다녀왔어요~ 급하게 어머니가 방문한다고 해서 마음 졸였는데 헬퍼님이 아이들 돌봐주신 덕분에 소고기랑 이것저것 준비했네요. 헬퍼님이 너무 재미있게 놀아주셔서 아이들이 헬퍼님 또 언제 오냐고 자꾸 물어보네요 조만간 또 이용할게요 ^^*'}>
                            </textarea>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    )
}
export default UserMyPageWriteReview;