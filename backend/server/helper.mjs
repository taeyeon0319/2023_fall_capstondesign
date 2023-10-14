// helper.mjs
import express from 'express';

const helperRouter = express.Router();

helperRouter.get('/', (req, res) => {
    res.json("success도우미");
});

//user가상 데이터 테이블 설계에 고민이 필요할듯..!!
// /user :user 정보 출력 api(가상 테이블 데이터 출력)



export default helperRouter;
