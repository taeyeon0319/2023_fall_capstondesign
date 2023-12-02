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
  const {
    user_id,
    helper_id,
    request_id,
    title,
    content,
    rating,
    time_good,
    kind,
    child_like,
    reliable,
  } = req.body;
  try {
    const review = await client.query(
      `INSERT INTO review (user_id, helper_id, request_id, title, contents, rating, time_good, kind, child_like, reliable) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        user_id,
        helper_id,
        request_id,
        title,
        content,
        rating,
        time_good,
        kind,
        child_like,
        reliable,
      ]
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
  const userId = req.params.user_id;
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
          `SELECT * FROM signup right join helper_mypage on helper_mypage.helper_id = signup.id WHERE signup.id = $1 and signup.type = 'helper'  `,
          [request.helper_id]
        );
        return { ...request, helper: helperData.rows[0] };
      })
    );
    res.json(reviewWithHelperData);
    client.release();
  } catch (err) {
    console.error("Error fetching user data:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user data." });
  }
});
//도우미 기타 정보 퍼센트 출력하는 api
reviewRouter.get("/helper-review/:helper_id/percent", async (req, res) => {
  const client = await pool.connect();
  const helperId = req.params.helper_id;
  try {
    const time_good = await client.query(
      `SELECT COUNT(*) FROM review WHERE helper_id = $1 AND time_good = 'true'`,
      [helperId]
    );
    const kind = await client.query(
      `SELECT COUNT(*) FROM review WHERE helper_id = $1 AND kind = 'true'`,
      [helperId]
    );
    const child_like = await client.query(
      `SELECT COUNT(*) FROM review WHERE helper_id = $1 AND child_like = 'true'`,
      [helperId]
    );
    const reliable = await client.query(
      `SELECT COUNT(*) FROM review WHERE helper_id = $1 AND reliable = 'true'`,
      [helperId]
    );
    //도우미 총 도움 횟수
    const total = await client.query(
      `SELECT COUNT(*) FROM review WHERE helper_id = $1`,
      [helperId]
    );
    const time_good_percent =
      (time_good.rows[0].count / total.rows[0].count) * 100;
    const kind_percent = (kind.rows[0].count / total.rows[0].count) * 100;
    const child_like_percent =
      (child_like.rows[0].count / total.rows[0].count) * 100;
    const reliable_percent =
      (reliable.rows[0].count / total.rows[0].count) * 100;
    const percent = {
      time_good_percent: time_good_percent,
      kind_percent: kind_percent,
      child_like_percent: child_like_percent,
      reliable_percent: reliable_percent,
    };
    res.json(percent);
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
  const helperId = req.params.helper_id;
  try {
    // request 테이블에서 start_time, end_time, timepay,totalpay도 같이 가져오기

    const review = await client.query(
      `SELECT * FROM review, requests where requests.id = review.request_id and review.helper_id = $1`,
      [helperId]
    );
    // 한 이용자에 대한 리뷰데이터와 도우미정보 합치기
    const reviewWithUserData = await Promise.all(
      review.rows.map(async (request) => {
        const UserData = await client.query(
          `SELECT * FROM signup right join user_mypage on user_mypage.user_id = signup.id WHERE signup.id = $1 and signup.type = 'user'  `,
          [request.user_id]
        );
        return { ...request, user: UserData.rows[0] };
      })
    );
    res.json(reviewWithUserData);

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
  const helperId = req.params.helper_id;
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
  const helperId = req.params.helper_id;
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
