import express from 'express';
import db from '../db.mjs';
import jwt from 'jsonwebtoken';

const signupRouter = express.Router();

signupRouter.get('/s', (req, res) => {
    res.json("signup");
});

// /signup : 회원가입 
signupRouter.post('/signup', async (req, res) => {
  try {
    const { id, name, password, password_confirm, email, mobile, type } = req.body;

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
    res.status(500).json({ error: 'Internal Server Error' });
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
      const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
  
      // JWT를 클라이언트에게 반환
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


export default signupRouter;