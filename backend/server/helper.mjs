// helper.mjs
import express, { request } from "express";
import pg from "pg";
import dotenv from "dotenv";
import { stat } from "fs";

const helperRouter = express.Router();
dotenv.config();

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

helperRouter.get("/", (req, res) => {
  res.json("success도우미 - 수정 버전");
});

// 이용자 목록을 반환하는 엔드포인트
helperRouter.get("/users", async (req, res) => {
  const client = await pool.connect();
  try {
    const users = await client.query(`
      SELECT signup.id as id, signup.name, signup.email, signup.mobile, user_mypage.region_state, user_mypage.region_country, user_mypage.image, user_mypage.age, user_mypage.gender
      FROM signup
      LEFT JOIN user_mypage ON signup.id = user_mypage.user_id
      WHERE signup.type = 'user';
    `);
    res.json(users.rows);
    client.release();
  } catch (err) {
    console.error("Error fetching user data:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user data." });
  }
});

// 특정 이용자 정보 반환하는 엔드포인트
helperRouter.get("/users/:id", async (req, res) => {
  const client = await pool.connect();

  try {
    const userId = req.params.id; // 수정: req.params.user_id -> req.params.id
    const user = await client.query(
      `
      SELECT signup.id as id, signup.name, signup.email, signup.mobile, user_mypage.region_state, user_mypage.region_country, user_mypage.image, user_mypage.age, user_mypage.gender
      FROM signup
      LEFT JOIN user_mypage ON signup.id = user_mypage.user_id
      WHERE signup.type = 'user' AND user_mypage.user_id = $1;
    `,
      [userId]
    );
    res.json(user.rows);
  } catch (err) {
    console.error("Error fetching user data:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user data." });
  } finally {
    client.release(); // 추가: 클라이언트 항상 반환
  }
});

//여기부터 수정 필요!!!!!!
/*
helperRouter.put("/response-request/:id", async (req, res) => {
  const client = await pool.connect();
  const requestId = req.params.request_id;
  const { status } = req.body;
  try {
    const result = await client.query(
      `UPDATE requests SET status=$1 WHERE id = $2`,
      [requestId, status]
    );
  } catch (err) {
    console.error("Error updating request status:", err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the request status." });
  }
});
*/

// 도우미가 수락/거절했을경우 이용자의 요구사항목록 데이터에서 status를 수락/거절으로 변경하는 엔드포인트
helperRouter.put("/response-request", async (req, res) => {
  const client = await pool.connect();
  const { status , id } = req.body;
  console.log(status);
  console.log(id);
  try {
    const result = await client.query('UPDATE requests SET status=$1 WHERE id=$2',[status,id]);
    //const result2 = await client.query('select * from requests where id=$1',[id]);
    res.json(result2.rows);
  } catch (err) {
    console.error("Error updating request status:", err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the request status." });
  }
});

// 이용자의 요구사항 목록을 반환하는 엔드포인트 - 확인
helperRouter.get("/requests-user/:id", async (req, res) => {
  const client = await pool.connect();
  const userId = req.params.id;
  try {
    const user = await client.query(
      `
      SELECT signup.id as id, signup.name, signup.email, signup.mobile, user_mypage.region_state, user_mypage.region_country, user_mypage.image, user_mypage.age, user_mypage.gender
      FROM signup
      LEFT JOIN user_mypage ON signup.id = user_mypage.user_id
      WHERE signup.type = 'user' AND user_mypage.user_id = $1;
    `,
      [userId]
    );
    const requestsWithUserData = await Promise.all(
      user.rows.map(async (user) => {
        const requests = await client.query(
          `SELECT * FROM requests WHERE user_id = $1`,
          [userId]
        );
        return { ...user, requests: requests.rows };
      })
    );

    res.json(requestsWithUserData);
    client.release();
  } catch (err) {
    console.error("Error fetching request data:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the request data." });
  }
});

// 도우미의 호출된 목록 반환하는 엔드포인트 - 확인
helperRouter.get("/requests-helper/:id", async (req, res) => {
  const client = await pool.connect();
  const helperId = req.params.id;
  console.log("helperId", helperId);
  if (helperId == "") {
    res.status(400).json({ error: "Invalid helper ID" });
    return;
  }
  try {
    const requests = await client.query(
      `SELECT * FROM requests
      LEFT JOIN signup on requests.user_id=signup.id 
      left join user_mypage on signup.id=user_mypage.user_id
      WHERE requests.helper_id = $1  AND requests.status = '요청' and signup.type = 'user' `,
      [helperId]
    );

    res.json(requests.rows);
    client.release();
  } catch (err) {
    console.error("Error fetching request data:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the request data." });
  }
});

// 도우미의 호출된 목록 중 수락된 목록 반환하는 엔드포인트
helperRouter.get("/requests-helper/:helper_id/accepted", async (req, res) => {
  const client = await pool.connect();
  const helperId = req.params.helper_id;
  try {
    const requests = await client.query(
      `SELECT * FROM requests
      LEFT JOIN signup on requests.user_id=signup.id 
      left join user_mypage on signup.id=user_mypage.user_id
      WHERE requests.helper_id = $1  AND requests.status = '수락' and signup.type = 'user'  `,
      [helperId]
    );
    res.json(requests.rows);
    client.release();
  } catch (err) {
    console.error("Error fetching request data:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the request data." });
  }
});

// 도우미 총수입 불러오기
helperRouter.get("/requests-helper/:helper_id/totalpay", async (req, res) => {
  const client = await pool.connect();
  const helperId = req.params.helper_id;
  try {
    const requests = await client.query(
      `SELECT SUM(totalpay) FROM requests WHERE helper_id = $1 AND status = '수락'`,
      [helperId]
    );
    res.json(requests.rows);
    client.release();
  } catch (err) {
    console.error("Error fetching request data:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the request data." });
  }
});
//requests 테이블에 요청서 추가하는 엔드포인트
helperRouter.post("/requests/add", async (req, res) => {
  const client = await pool.connect();
  const {
    user_id,
    helper_id,
    field,
    region_state,
    region_country,
    region_eupmyeondong,
    date,
    start_time,
    end_time,
    comment,
  } = req.body;
  const address =
    region_state + " " + region_country + " " + region_eupmyeondong;
  try {
    const result = await client.query(
      `INSERT INTO requests (user_id, helper_id, address, date, start_time,end_time,field , comment, care_gender,care_age,timepay,totalpay) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11,$12) RETURNING *`,
      [
        user_id,
        helper_id,
        address,
        date,
        start_time,
        end_time,
        field,
        comment,
        "",
        0,
        0,
        0,
      ]
    );
    res.json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ error: "An error occurred while inserting data." });
  }
});

//helpertimetable 정보 불러오는
helperRouter.get("/helpertimetable/:helper_id", async (req, res) => {
  const client = await pool.connect();
  const helperId = parseInt(req.params.helper_id);
  try {
    const requests = await client.query(
      `SELECT * FROM helper_timetable WHERE helper_id = $1`,
      [helperId]
    );
    res.json(requests.rows);
    client.release();
  } catch (err) {
    console.error("Error fetching request data:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the request data." });
  }
});
//helpertimetable에 정보 넣는
helperRouter.post("/saveTimetable", async (req, res) => {
  const client = await pool.connect();
  const helper_id = req.body.helper_id;
  const available_day = req.body.day;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;

  try {
    console.log(helper_id, available_day, startTime, endTime);
    await client.query(
      `INSERT INTO helper_timetable(helper_id, available_day, startTime,endTime) VALUES( $1, $2, $3, $4)`,
      [helper_id, available_day, startTime, endTime]
    );
    client.release();
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({
      error: "An error occurred while updating the request status.",
    });
  }
});

// 현정 추가 요청 확인용
helperRouter.get('/requestsCheck', async (req, res) => {
  const client = await pool.connect();
  const reqTable = await client.query('SELECT * FROM requests');
  res.json(reqTable);
});

//helpertimetable에 정보 수정
helperRouter.post("/updateTimetable", async (req, res) => {
  const client = await pool.connect();
  const helper_id = req.body.helper_id;
  const available_day = req.body.day;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  try {
    await client.query(
      "UPDATE helper_timetable SET startTime = $1 endTime = $2 WHERE helper_id = $3 AND available_day = $4",
      [startTime, endTime, helper_id, available_day]
    );
    client.release();
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({
      error: "An error occurred while updating the request status.",
    });
  }
});

// helpertimetable에 정보 삭제
helperRouter.post("/deleteTimetable", async (req, res) => {
  const client = await pool.connect();
  const helper_id = req.body.helper_id;
  const available_day = req.body.day;
  const startTime = req.body.startTime;
  //const endTime = req.body.endTime;

  try {
    await client.query(
      "DELETE FROM helper_timetable WHERE helper_id = $1 AND available_day = $2 AND startTime = $3",
      [helper_id, available_day, startTime]
    );
    client.release();
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({
      error: "An error occurred while updating the request status.",
    });
  }
});

export default helperRouter;
