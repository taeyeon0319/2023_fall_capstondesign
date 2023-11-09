import express from 'express'; // module
import bodyParser from "body-parser";
import cors from "cors";
import pgPromise from 'pg-promise';
import dotenv from 'dotenv'; //env파일 불러오기
import userRouter from './server/user.mjs'; // user 모듈 불러오기
import helperRouter from './server/helper.mjs'; // helper 모듈 불러오기

//variable
const PORT = 5000;
const app = express()

dotenv.config();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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

app.get("/", (req, res) => {
  res.json("success");
});

//회원용
app.use('/user', userRouter);

//도우미용
app.use('/helper', helperRouter);

// /city : 위치 테이블 출력
app.get('/city', async (req, res) => {
  try{
    const searchResult = await db.any("SELECT * FROM city");
    res.json(searchResult);
  } catch(error){
    console.error('Error: ', error);
    res.status(500).json({error:'Internal Server Error'});
  }
});

// /fields : 위치 테이블 출력
app.get('/fields', async(req, res) => {
  try{
    const searchResult = await db.any("SELECT * FROM fields");
    res.json(searchResult);
  } catch(error){
    console.error('Error: ', error);
    res.status(500).json({ error:'Internal Server Error'});
  }
});

// server start
app.listen(PORT, () => {
  console.log(`✅ Listening on http://localhost:5000/`);
});








