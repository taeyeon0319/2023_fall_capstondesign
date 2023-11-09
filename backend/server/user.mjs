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
        const rawData = await db.any(`
            SELECT helper.*, helper_time.day, helper_time.start_time, helper_time.end_time
            FROM helper
            LEFT JOIN helper_time ON helper.id = helper_time.helper_id
            ORDER BY helper.id
        `);

        // 데이터를 가공하여 중복되는 항목을 합치기
        const mergedData = rawData.reduce((acc, current) => {
            const existingData = acc.find(item => item.id === current.id);

            if (!existingData) {
                // 새로운 데이터를 추가
                acc.push(current);
            } else {
                // 이미 있는 데이터에 day, start_time, end_time 추가
                existingData.day = existingData.day + ', ' + current.day;
                existingData.start_time = existingData.start_time + ', ' + current.start_time;
                existingData.end_time = existingData.end_time + ', ' + current.end_time;
            }

            return acc;
        }, []);

        res.json(mergedData);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// /helper : 도우미 검색 get(가상 테이블 중 특정 도우미들만 출력)
// /helper/search?region=중구&field=베이비시터&date=2023-11-01&gender=여&age=20&career=1&certification=true&needtime_s=15:00:00&needtime_e=17:00:00
// 회원 A씨 : 중구에 사는 여자 20대 베이비시터가 필요하다. career는 1년 이상 인증인 된 사람이면 좋겠다. 2023년 11월 01일 15시부터 17시까지 쓰고 싶다.
// 도우미 B씨 : 중구에 사는 여자 20대 베이비시터이다. career는 1년이상, 인증이 되어 있다. 수요일에는 10시부터 17시까지 일을 할 수 있다.
userRouter.get('/helper/search', async (req, res) => {
    try {
        const { region, field, gender, age, career, certification, date, needtime_s, needtime_e } = req.query;
        const conditions = [];

        if (region) conditions.push(`region_county = '${region}'`);
        if (field) conditions.push(`field = '${field}'`);
        if (gender) conditions.push(`gender = '${gender}'`);
        if (age) {
            const minAge = age;
            const maxAge = parseInt(age) + 9; // 10년 단위로 범위 설정
            conditions.push(`age >= ${minAge} AND age <= ${maxAge}`);
        }
        if (career) conditions.push(`career = '${career}'`);
        if (certification) conditions.push(`certification = '${certification}'`);
        
        let targetDay = '';
        if (date) {
            const targetDate = new Date(date);
            const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
            targetDay = daysOfWeek[targetDate.getDay()];
            conditions.push(`helper_time.day = '${targetDay}'`);
        }
        
        if (needtime_s && needtime_e) {
            conditions.push(`helper_time.start_time <= '${needtime_s}'`);
            conditions.push(`helper_time.end_time >= '${needtime_e}'`);
        }

        let whereClause = '';
        if (conditions.length > 0) {
            whereClause = 'WHERE ' + conditions.join(' AND ');
        }

        const query = `
            SELECT helper.*, helper_time.day, helper_time.start_time, helper_time.end_time
            FROM helper
            LEFT JOIN helper_time ON helper.id = helper_time.helper_id
            ${whereClause}
            ORDER BY helper.id
        `;

        const data = await db.any(query);
        res.json(data);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// /helper/orderbystars : 평점순
userRouter.get('/helper/orderbystars', async (req, res) => {
    try {
        const data = await db.any("SELECT * FROM helper ORDER BY stars DESC");
        res.json(data);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// /helper:id : 도우미 상세정보 출력 api(가상 테이블 데이터 출력)
userRouter.get('/helper/:id', async (req, res) => {
    const helperId = req.params.id; // URL 파라미터에서 도우미의 ID를 가져옵니다.

    try {
        // 데이터베이스에서 해당 ID의 도우미 정보를 검색합니다.
        const searchResult = await db.oneOrNone("SELECT * FROM helper WHERE id = $1", [helperId]);

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
// post하면 해당 user테이블의 ()속성들이랑 helper테입르의 ()속성들이 저장됨.


export default userRouter;
