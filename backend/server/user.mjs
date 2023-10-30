import express from 'express';
import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

const userRouter = express.Router();
dotenv.config();

// PostgreSQL 연결 설정
const pgp = pgPromise();
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
};
const db = pgp(dbConfig);

userRouter.get('/', (req, res) => {
    res.json("success회원 - 개발자 김태연");
});

// /all : 모든 도우미 정보 get
userRouter.get('/helper/all', async (req, res) => {
    try {
        const data = await db.any("SELECT * FROM temp_helper ORDER BY id");
        res.json(data);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// /helper : 도우미 검색 get(가상 테이블 중 특정 도우미들만 출력)
// 검색url 예시 : /helper/search?region=강동구&field=베이비시터&starttime=15:00:00&endtime=17:00:00&gender=M&age=20
// 강동구에 사는 오후3시부터 5시까지 베이비시터로 일할 수 있는 20대 남자 출력
userRouter.get('/helper/search', async (req, res) => {
    const searchAge = req.query.age;
    const searchActive = true;
    const searchRegion = req.query.region;
    const searchField = req.query.field;
    const searchStartTime = req.query.starttime;
    const searchEndTime = req.query.endtime;
    const searchGender = req.query.gender;

    try {
        const searchResults = await db.any(
            "SELECT * FROM temp_helper WHERE region_country = $1 AND field = $2 AND start_time <= $3 AND end_time >= $4 AND gender = $5 AND age >= $6 AND age <= $7 AND active = $8", 
            [searchRegion, searchField, searchStartTime, searchEndTime, searchGender, searchAge, parseInt(searchAge)+9, searchActive]
        );

        if (searchResults.length === 0) {
            res.json('검색결과가 없습니다.');
        } else {
            res.json(searchResults);
        }
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//~~순(평점순) ==> /helper/order


// /helper:id : 도우미 상세정보 출력 api(가상 테이블 데이터 출력)
userRouter.get('/helper/:id', async (req, res) => {
    const helperId = req.params.id; // URL 파라미터에서 도우미의 ID를 가져옵니다.

    try {
        // 데이터베이스에서 해당 ID의 도우미 정보를 검색합니다.
        const searchResult = await db.oneOrNone("SELECT * FROM temp_helper WHERE id = $1", [helperId]);

        if (searchResult) {
            // 도우미 정보를 찾은 경우 해당 정보를 반환합니다.
            res.json(searchResult);
        } else {
            // 도우미 정보를 찾지 못한 경우 에러 메시지를 반환합니다.
            res.status(404).json({ error: '도우미를 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// /request : 도우미 요청 api(post)

export default userRouter;
