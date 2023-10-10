// user.mjs
import express from 'express';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.json("success회원");
});

// /helper : 도우미 검색 api(가상 테이블 중 특정 도우미들만 출력)

// /helper:id : 도우미 상세정보 출력 api(가상 테이블 데이터 출력)

// /request : 도우미 요청 api(post)

export default userRouter;
