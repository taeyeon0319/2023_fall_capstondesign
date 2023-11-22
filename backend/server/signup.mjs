import express from 'express';
import db from '../db.mjs';
import jwt from 'jsonwebtoken';

const signupRouter = express.Router();

signupRouter.get('/s', (req, res) => {
    res.json("signup");
});

// /signup : 회원가입 
const passwordRegex = /^.{8,16}$/;

signupRouter.post('/signup', async (req, res) => {
  try {
    const { id, name, password, password_confirm, email, mobile, type } = req.body;

    // 비밀번호 유효성 검사
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: '8~16자의 영문 대소문자, 숫자, 특수문자만 가능합니다' });
    }

    // 비밀번호와 확인 비밀번호가 일치하는지 확인
    if (password !== password_confirm) {
      return res.status(400).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    // 사용자 생성
    const query = `
      INSERT INTO signup (id, name, password, password_confirm, email, mobile, type)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [id, name, password, password_confirm, email, mobile, type];

    const user = await db.one(query, values);

    // JWT 생성
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

    // JWT를 클라이언트에게 반환
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '내부 서버 오류' });
  }
});



signupRouter.post('/login', async (req, res) => {
  try {
    const { id, password } = req.body;
    const user = await db.oneOrNone('SELECT * FROM signup WHERE id = $1', [id]);

    if (!user) {
      // 사용자가 존재하지 않음
      return res.status(401).json({ error: '아이디가 존재하지 않습니다' });
    }

    // 비밀번호 확인 (실제로는 bcrypt 등을 사용하여 비밀번호를 안전하게 확인해야 함)
    if (user.password !== password) {
      // 비밀번호가 일치하지 않음
      return res.status(401).json({ error: '비밀번호가 일치하지 않습니다' });
    }

    // 비밀번호가 일치하면 JWT 생성
    const token = jwt.sign({ userId: user.id, userType: user.type }, 'your-secret-key', { expiresIn: '1h' });

    // 사용자의 ID를 JSON으로 반환
    res.json({ userId: user.id, type: user.type, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 마이페이지 엔드포인트
signupRouter.get('/mypage', verifyToken, async (req, res) => {
  try {
    // req.userId를 사용하여 특정 사용자의 정보를 가져오는 쿼리를 작성
    const userData = await db.oneOrNone(
      'SELECT * FROM signup WHERE id = $1',
      [req.userId]
    );

    if (!userData) {
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
    }

    let userMypageData;
    if (userData.type === 'user') {
      // type이 user인 경우 user_mypage 테이블에서 정보를 가져오기
      userMypageData = await db.oneOrNone(
        'SELECT * FROM user_mypage WHERE user_id = $1',
        [req.userId]
      );
    } else if (userData.type === 'helper') {
      // type이 helper인 경우 helper_mypage 테이블에서 정보를 가져오기
      userMypageData = await db.oneOrNone(
        'SELECT * FROM helper_mypage WHERE helper_id = $1',
        [req.userId]
      );
    }

    if (!userMypageData) {
      return res.status(404).json({ error: '마이페이지 정보를 찾을 수 없습니다' });
    }

    // 사용자 및 마이페이지 정보를 응답
    const mergedData = {
      userData: {
        ...userData,
        region_state: userMypageData.region_state,
        region_country: userMypageData.region_country,
        image: userMypageData.image,
        age: userMypageData.age,
        gender: userMypageData.gender
      }
    };

    // type이 helper인 경우 certification 속성 추가
    if (userData.type === 'helper') {
      mergedData.userData.introduction = userMypageData.introduction;
      mergedData.userData.career = userMypageData.career;
      mergedData.userData.stars = userMypageData.stars;
      mergedData.userData.certification = userMypageData.certification;
      mergedData.userData.activity = userMypageData.activity ;
      mergedData.userData.quick_matching = userMypageData.quick_matching;
    }

    res.json(mergedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '내부 서버 오류' });
  }
});




// JWT를 확인하는 미들웨어
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: '인증되지 않음: 토큰이 제공되지 않았습니다' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: '인증되지 않음: 유효하지 않은 토큰' });
    }

    req.userId = decoded.userId; // 유저 ID를 요청 객체에 추가
    next();
  });
}

export default signupRouter;