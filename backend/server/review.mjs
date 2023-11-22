// helper.mjs
import express, { request } from "express";
import pg from "pg";
import dotenv from "dotenv";

const reviewRouter = express.Router();
dotenv.config();

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

reviewRouter.get("/", (req, res) => {
  res.json("success도우미");
});

// 이용자가 리뷰 작성시 리뷰 테이블에 리뷰를 추가하는 엔드포인트 : 이윤서 db 저장 확인완료
reviewRouter.post("/user-review", async (req, res) => {
  const client = await pool.connect();
  const { user_id, helper_id, title, content, rating } = req.body;
  try {
    const review = await client.query(
      `INSERT INTO review (user_id, helper_id, title, contents, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, helper_id, title, content, rating]
    );
    res.json(review.rows);
    client.release();
  } catch (err) {
    console.error("Error fetching user data:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user data." });
  }
});

// 이용자 자신이 작성한 리뷰들 출력하는 엔드포인드 : 이윤서 조회 확인완료 ++ helper data랑 조인해서 helper이름도 같이 출력
reviewRouter.get("/user-review/:user_id", async (req, res) => {
  const client = await pool.connect();
  const userId = parseInt(req.params.user_id);
  try {
    // request 테이블에서 start_time, end_time, timepay,totalpay도 같이 가져오기

    const review = await client.query(
      `SELECT * FROM review, requests WHERE review.user_id = $1 and requests.id = review.request_id`,
      [userId]
    );
    // 한 이용자에 대한 리뷰데이터와 도우미정보 합치기
    const reviewWithHelperData = await Promise.all(
      review.rows.map(async (request) => {
        const helperData = await client.query(
          `SELECT * FROM helper WHERE id = $1`,
          [request.helper_id]
        );
        return { ...request, user: helperData.rows[0] };
      })
    );
    res.json(reviewWithHelperData);

    res.json(reviewWithHelperData.rows);
    client.release();
  } catch (err) {
    console.error("Error fetching user data:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user data." });
  }
});

// 도우미 자신에 대한 리뷰들 출력하는 엔드포인트 : 확인완료  ++ user data랑 조인해서 user 이름도 같이 출력
reviewRouter.get("/helper-review/:helper_id", async (req, res) => {
  const client = await pool.connect();
  const helperId = parseInt(req.params.helper_id);
  try {
    const review = await client.query(
      `SELECT * FROM review,user_data WHERE review.user_id = user_data.id AND review.helper_id = $1`,
      [helperId]
    );
    res.json(review.rows);
    client.release();
  } catch (err) {
    console.error("Error fetching user data:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user data." });
  }
});

// 도우미별 리뷰들의 평균 출력하는 엔드포인트 : 확인완료
reviewRouter.get("/helper-review/:helper_id/average", async (req, res) => {
  const client = await pool.connect();
  const helperId = parseInt(req.params.helper_id);
  try {
    const review = await client.query(
      `SELECT AVG(rating) FROM review WHERE helper_id = $1`,
      [helperId]
    );
    res.json(review.rows);
    client.release();
  } catch (err) {
    console.error("Error fetching user data:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user data." });
  }
});

// 이용자가 특정리뷰를 수정하는 엔드포인트 ++ 확인완료
reviewRouter.post("/user-review/modify/:review_id", async (req, res) => {
  const client = await pool.connect();
  const reviewId = parseInt(req.params.review_id);
  const { title, content, rating } = req.body;
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const timestamp =
    year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  try {
    const review = await client.query(
      `UPDATE review SET title = $1, contents = $2, rating = $3, updated_at =$4 WHERE id = $5 returning * `,
      [title, content, rating, timestamp, reviewId]
    );
    res.json(review.rows);
    client.release();
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({
      error: "An error occurred while updating the request status.",
    });
  }
});

// 이용자가 특정리뷰를 삭제하는 엔드포인트 : 삭제되는거 확인
reviewRouter.delete("/user-review/delete/:review_id", async (req, res) => {
  const client = await pool.connect();
  const reviewId = parseInt(req.params.review_id);
  try {
    const review = await client.query(
      `DELETE FROM review WHERE id = $1 RETURNING *`,
      [reviewId]
    );
    res.json(review.rows);
    client.release();
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({
      error: "An error occurred while updating the request status.",
    });
  }
});

//도우미 월 도움 횟수 ---> 수정필요
reviewRouter.get("/helper-review/:helper_id/month", async (req, res) => {
  const client = await pool.connect();
  const helperId = parseInt(req.params.helper_id);
  try {
    const review = await client.query(
      `SELECT COUNT(*) FROM requests WHERE helper_id = $1 AND status='수락' AND date_part('month', date) = date_part('month', now())`,
      [helperId]
    );
    res.json(review.rows);
    client.release();
  } catch (err) {
    console.error("Error fetching user data:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user data." });
  }
});

export default reviewRouter;
