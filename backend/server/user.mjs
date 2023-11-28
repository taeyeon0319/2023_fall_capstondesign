import express from 'express';
import db from '../db.mjs';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.json("success회원 - 개발자 김태연");
});

// /all : 모든 도우미 정보 get
userRouter.get('/helper/all', async (req, res) => {
    try {
        const rawData = await db.any(`
            SELECT signup.id as id, signup.name, signup.email, signup.mobile, helper_mypage.region_state, helper_mypage.region_country, helper_mypage.field, helper_mypage.image, helper_mypage.age, helper_mypage.gender, helper_mypage.introduction, helper_mypage.career, helper_mypage.stars, helper_mypage.certification, helper_mypage.quick_matching, helper_time.day, helper_time.start_time, helper_time.end_time
            FROM signup
            LEFT JOIN helper_mypage ON signup.id = helper_mypage.helper_id
            LEFT JOIN helper_time ON signup.id = helper_time.helper_id
            WHERE signup.type = 'helper';
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
        const { region, field, gender, age, career, certification, quick_matching, date, needtime_s, needtime_e } = req.query;
        const conditions = [];

        if (region) conditions.push(`helper_mypage.region_country = '${region}'`);
        if (field) conditions.push(`helper_mypage.field = '${field}'`);
        if (gender) conditions.push(`helper_mypage.gender = '${gender}'`);
        if (age) {
            const minAge = age;
            const maxAge = parseInt(age) + 9; // 10년 단위로 범위 설정
            conditions.push(`helper_mypage.age >= '${minAge}' AND helper_mypage.age <= '${maxAge}'`);
        }
        if (career) conditions.push(`helper_mypage.career = '${career}'`);
        if (certification) conditions.push(`helper_mypage.certification = '${certification}'`);
        if (quick_matching) conditions.push(`helper_mypage.quick_matching = '${quick_matching}'`);

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

        let whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : 'WHERE 1=1';

        const query = `
            SELECT
            signup.id as id,
            signup.name,
            signup.email,
            signup.mobile,
            helper_mypage.region_state,
            helper_mypage.region_country,
            helper_mypage.field,
            helper_mypage.image,
            helper_mypage.age,
            helper_mypage.gender,
            helper_mypage.introduction,
            helper_mypage.career,
            helper_mypage.stars,
            helper_mypage.certification,
            helper_mypage.quick_matching, 
            helper_time.day,
            helper_time.start_time,
            helper_time.end_time
            FROM signup
            LEFT JOIN helper_mypage ON signup.id = helper_mypage.helper_id
            LEFT JOIN helper_time ON signup.id = helper_time.helper_id
            ${whereClause} AND helper_time.helper_id IS NOT NULL
            ORDER BY helper_mypage.helper_id;
`;


        const data = await db.any(query);
        res.json(data);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// /helper/search/orderbystars? : 평점순
userRouter.get('/helper/search/orderbystars', async (req, res) => {
    try {
        const { region, field, gender, age, career, certification, quick_matching, date, needtime_s, needtime_e } = req.query;
        const conditions = [];

        if (region) conditions.push(`helper_mypage.region_country = '${region}'`);
        if (field) conditions.push(`helper_mypage.field = '${field}'`);
        if (gender) conditions.push(`helper_mypage.gender = '${gender}'`);
        if (age) {
            const minAge = age;
            const maxAge = parseInt(age) + 9; // 10년 단위로 범위 설정
            conditions.push(`helper_mypage.age >= '${minAge}' AND helper_mypage.age <= '${maxAge}'`);
        }
        if (career) conditions.push(`helper_mypage.career = '${career}'`);
        if (certification) conditions.push(`helper_mypage.certification = '${certification}'`);
        if (quick_matching) conditions.push(`helper_mypage.quick_matching = '${quick_matching}'`);
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


        let whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : 'WHERE 1=1';

        const query = `
            SELECT
            signup.id as id,
            signup.name,
            signup.email,
            signup.mobile,
            helper_mypage.region_state,
            helper_mypage.region_country,
            helper_mypage.field,
            helper_mypage.image,
            helper_mypage.age,
            helper_mypage.gender,
            helper_mypage.introduction,
            helper_mypage.career,
            helper_mypage.stars,
            helper_mypage.certification,
            helper_mypage.quick_matching, 
            helper_time.day,
            helper_time.start_time,
            helper_time.end_time
            FROM signup
            LEFT JOIN helper_mypage ON signup.id = helper_mypage.helper_id
            LEFT JOIN helper_time ON signup.id = helper_time.helper_id
            ${whereClause} AND helper_time.helper_id IS NOT NULL
            ORDER BY helper_mypage.stars DESC;
        `;

        const data = await db.any(query);
        res.json(data);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// /helper:id : 도우미 상세정보 출력 api(가상 테이블 데이터 출력) == OK
userRouter.get('/helper/:id', async (req, res) => {
    const helperId = req.params.id; // URL 파라미터에서 도우미의 ID를 가져옵니다.

    try {
        // 데이터베이스에서 해당 ID의 도우미 정보와 회원 정보를 검색합니다.
        const rawData = await db.any(`
            SELECT signup.id as id, signup.name, signup.email, signup.mobile, helper_mypage.region_state, helper_mypage.region_country, helper_mypage.field, helper_mypage.image, helper_mypage.age, helper_mypage.gender, helper_mypage.introduction, helper_mypage.career, helper_mypage.stars, helper_mypage.certification, helper_mypage.quick_matching, helper_time.day, helper_time.start_time, helper_time.end_time
            FROM signup
            LEFT JOIN helper_mypage ON signup.id = helper_mypage.helper_id
            LEFT JOIN helper_time ON signup.id = helper_time.helper_id
            WHERE signup.type = 'helper' AND helper_mypage.helper_id = $1;
        `, [helperId]);

        const mergedData = rawData.reduce((acc, current) => {
            const existingData = acc.find(item => item.user_id === current.user_id);

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



// /request : 도우미 요청 api(post)
// post하면 해당 user테이블의 ()속성들이랑 helper테입르의 ()속성들이 저장됨.


export default userRouter;
