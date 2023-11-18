// helper.mjs
import express, { request } from "express";
import pg from "pg";
import dotenv from "dotenv";

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
  res.json("success도우미");
});

// 이용자 목록을 반환하는 엔드포인트
helperRouter.get("/users", async (req, res) => {
  const client = await pool.connect();
  try {
    const users = await client.query(`SELECT * FROM user_data`);
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
helperRouter.get("/users/:user_id", async (req, res) => {
  const client = await pool.connect();
  const userId = parseInt(req.params.user_id);
  try {
    const user = await client.query(`SELECT * FROM user_data WHERE id = $1`, [
      userId,
    ]);
    res.json(user.rows);
    client.release();
  } catch (err) {
    console.error("Error fetching user data:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user data." });
  }
});

// 도우미가 수락/거절했을경우 이용자의 요구사항목록 데이터에서 status를 수락/거절으로 변경하는 엔드포인트
helperRouter.put("/response-request/:request_id", async (req, res) => {
  const client = await pool.connect();
  const requestId = parseInt(req.params.request_id);
  const { status } = req.body;
  try {
    const result = await client.query(
      `UPDATE requests_data SET status=$1 WHERE id = $2`,
      [requestId, status]
    );
  } catch (err) {
    console.error("Error updating request status:", err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the request status." });
  }
});

// 이용자의 요구사항 목록을 반환하는 엔드포인트
helperRouter.get("/requests-user/:user_id", async (req, res) => {
  const client = await pool.connect();
  const userId = parseInt(req.params.user_id);
  try {
    const requests = await client.query(
      `SELECT * FROM requests WHERE user_id = $1`,
      [userId]
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

// 도우미의 호출된 목록 반환하는 엔드포인트
helperRouter.get("/requests-helper/:helper_id", async (req, res) => {
  const client = await pool.connect();
  const helperId = parseInt(req.params.helper_id);
  if (isNaN(helperId)) {
    res.status(400).json({ error: "Invalid helper ID" });
    return;
  }
  try {
    const requests = await client.query(
      `SELECT * FROM requests WHERE helper_id = $1  AND status = '요청'`,
      [helperId]
    );
    //한 도우미에 대한 요청데이터와 이용자 정보 합치기
    const requestsWithUserData = await Promise.all(
      requests.rows.map(async (request) => {
        const userData = await client.query(
          `SELECT * FROM user_data WHERE id = $1`,
          [request.user_id]
        );
        return { ...request, helper: userData.rows[0] };
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

// 도우미의 호출된 목록 중 수락된 목록 반환하는 엔드포인트
helperRouter.get("/requests-helper/:helper_id/accepted", async (req, res) => {
  const client = await pool.connect();
  const helperId = parseInt(req.params.helper_id);
  try {
    const requests = await client.query(
      `SELECT * FROM requests WHERE helper_id = $1 AND status = '수락'`,
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
  const helperId = parseInt(req.params.helper_id);
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

// 도우미가 일하는시간 설정하고 확정 누르면 success table에 request_id, 일하는 시작시간 끝나는 시간 추가하고 request table의 matching을 true로 바꾸는 엔드포인트
helperRouter.post("/requests-helper/confirmed", async (req, res) => {
  const client = await pool.connect();
  const request_id = req.body.request_id;
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  try {
    await client.query(
      "INSERT INTO confirmed_table(request_id, start_time, end_time) VALUES( $1, $2, $3)",
      [request_id, start_time, end_time]
    );
    await client.query("UPDATE requests SET matching = true WHERE id = $1", [
      request_id,
    ]);
    client.release();
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({
      error: "An error occurred while updating the request status.",
    });
  }
});

// 도우미 정보 insert하는 엔드포인트
helperRouter.post("/helper", async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query(
      "INSERT INTO helper(name,region_state,region_country,field,gender,introduction,image,career,stars,certification,activity) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [
        req.body.name,
        req.body.region_state,
        req.body.region_country,
        req.body.field,
        req.body.gender,
        req.body.introduction,
        req.body.image,
        req.body.career,
        req.body.stars,
        req.body.certification,
        req.body.activity,
      ]
    );
    res.json("success");
    client.release();
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({
      error: "An error occurred while updating the request status.",
    });
  }
});

// 이용자 정보 insert하는 엔드포인트
// helperRouter.post("/user", async (req, res) => {
//   const client = await pool.connect();
//   try{
//     await client.query(
//       "INSERT"

//   }
// })

export default helperRouter;
