// helper.mjs
import express, { request } from "express";
import pg from "pg";
import dotenv from "dotenv";
import { stat } from "fs";
import { count } from "console";

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
  const { status, id } = req.body;
  console.log(status);
  console.log(id);
  try {
    const result = await client.query(
      "UPDATE requests SET status=$1 WHERE id=$2",
      [status, id]
    );
    const result2 = await client.query("select * from requests where id=$1", [
      id,
    ]);
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

// 이용자의 요구사항 목록을 반환하는 엔드포인트 - 확인
helperRouter.get("/requests-user-ing/:id", async (req, res) => {
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
          `SELECT requests.*, helper_mypage.image FROM requests, helper_mypage WHERE user_id = $1 AND status='요청' AND requests.helper_id=helper_mypage.helper_id`,
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
      `SELECT region_country, region_state, image, requests.id as request_id, signup.name, signup.email, signup.mobile, requests.user_id, requests.helper_id, requests.field, requests.care_gender, requests.care_age, requests.comment, requests.start_time, requests.end_time, requests.totalpay, requests.timepay, requests.created_at, requests.quick_matching, requests.date, requests.address FROM requests
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
      `SELECT region_country, region_state, image, requests.id as request_id, signup.name, signup.email, signup.mobile, requests.user_id, requests.helper_id, requests.field, requests.care_gender, requests.care_age, requests.comment, requests.start_time, requests.end_time, requests.totalpay, requests.timepay, requests.created_at, requests.quick_matching, requests.date, requests.address FROM requests
      LEFT JOIN signup on requests.user_id=signup.id 
      left join user_mypage on signup.id=user_mypage.user_id
      WHERE requests.helper_id = $1  AND requests.status = '수락' and signup.type = 'user' `,
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
  const helperId = req.params.helper_id;
  try {
    const requests = await client.query(
      `SELECT * FROM helper_time WHERE helper_id = $1`,
      [helperId]
    );
    requests.rows.map((request) => {
      if (request.day == "MON") {
        request.day = "monday";
      } else if (request.day == "TUE") {
        request.day = "tuesday";
      } else if (request.day == "WED") {
        request.day = "wednesday";
      } else if (request.day == "THU") {
        request.day = "thursday";
      } else if (request.day == "FRI") {
        request.day = "friday";
      } else if (request.day == "SAT") {
        request.day = "saturday";
      } else if (request.day == "SUN") {
        request.day = "sunday";
      }
    });
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
  let available_day = req.body.day;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  //값이 없을시 에러처리
  if (!helper_id || !available_day || !startTime || !endTime) {
    res.status(400).json({ error: "Incorrect request body" });
    return;
  }
  //db는 요일이 MON, TUE, WED, THU, FRI, SAT, SUN로 되어있음
  //그런데 프론트에서 받아오는 요일은 monday, tuesday, wednesday, thursday, friday, saturday, sunday로 되어있음
  //그래서 요일을 db에 맞게 바꿔줌
  if (available_day == "monday") {
    available_day = "MON";
  } else if (available_day == "tuesday") {
    available_day = "TUE";
  } else if (available_day == "wednesday") {
    available_day = "WED";
  } else if (available_day == "thursday") {
    available_day = "THU";
  } else if (available_day == "friday") {
    available_day = "FRI";
  } else if (available_day == "saturday") {
    available_day = "SAT";
  } else if (available_day == "sunday") {
    available_day = "SUN";
  }

  try {
    // helper_time의 행 수 +1 한 값으로 id 설정
    const id = await client.query("SELECT COUNT(*) FROM helper_time");
    //id에 +1 한 값으로 helper_time에 정보 넣기
    await client.query(
      `INSERT INTO helper_time(id,helper_id, day, start_time,end_time) VALUES( $1, $2, $3, $4,$5)`,
      [id.rows[0].count + 1, helper_id, available_day, startTime, endTime]
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
helperRouter.get("/requestsCheck", async (req, res) => {
  const client = await pool.connect();
  const reqTable = await client.query("SELECT * FROM requests");
  res.json(reqTable);
});

//helpertimetable에 정보 수정
helperRouter.post("/updateTimetable", async (req, res) => {
  const client = await pool.connect();
  const helper_id = req.body.helper_id;
  let available_day = req.body.day;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;

  try {
    if (available_day == "monday") {
      available_day = "MON";
    } else if (available_day == "tuesday") {
      available_day = "TUE";
    } else if (available_day == "wednesday") {
      available_day = "WED";
    } else if (available_day == "thursday") {
      available_day = "THU";
    } else if (available_day == "friday") {
      available_day = "FRI";
    } else if (available_day == "saturday") {
      available_day = "SAT";
    } else if (available_day == "sunday") {
      available_day = "SUN";
    }
    await client.query(
      "UPDATE helper_time SET start_time = $1 end_time = $2 WHERE helper_id = $3 AND day = $4",
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
  let available_day = req.body.day;
  const startTime = req.body.startTime;
  //const endTime = req.body.endTime;

  //db는 요일이 MON, TUE, WED, THU, FRI, SAT, SUN로 되어있음
  //그런데 프론트에서 받아오는 요일은 monday, tuesday, wednesday, thursday, friday, saturday, sunday로 되어있음
  //그래서 요일을 db에 맞게 바꿔줌

  try {
    if (available_day == "monday") {
      available_day = `MON`;
    } else if (available_day == "tuesday") {
      available_day = `TUE`;
    } else if (available_day == "wednesday") {
      available_day = `WED`;
    } else if (available_day == "thursday") {
      available_day = `THU`;
    } else if (available_day == "friday") {
      available_day = `FRI`;
    } else if (available_day == "saturday") {
      available_day = `SAT`;
    } else if (available_day == "sunday") {
      available_day = `SUN`;
    }
    await client.query(
      "DELETE FROM helper_time WHERE helper_id = $1 AND day = $2 AND start_time = $3",
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

//마이페이 도우미 변경하는 엔드포인트
helperRouter.patch("/changeHelper/:id", async (req, res) => {
  const client = await pool.connect();
  const helper_id = req.params.id;
  const { region_country, region_state, name, password, password_confirm } =
    req.body;

  try {
    // helper_mypage와 signup 테이블 동시에 업데이트

    // 변경할 필드만 업데이트
    if (password) {
      if (password !== password_confirm) {
        res.status(400).json({ error: "Password does not match" });
        return;
      }

      if (password.length < 8) {
        res
          .status(400)
          .json({ error: "Password must be at least 6 characters" });
        return;
      }
      if (password.length > 16) {
        res
          .status(400)
          .json({ error: "Password must be at most 20 characters" });
        return;
      }
    }

    if (name || password || password_confirm) {
      const updatedSignupFields = {
        name: name,
        password: password,
        password_confirm: password_confirm,
      };
      // 변경된 필드만 업데이트 (signup 테이블)
      const signupUpdateQuery = Object.entries(updatedSignupFields)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value], index) => `${key} = $${index + 1}`)
        .join(", ");

      await client.query(
        `UPDATE signup SET ${signupUpdateQuery} WHERE id = $${
          Object.keys(updatedSignupFields).length + 1
        }`,
        [...Object.values(updatedSignupFields), helper_id]
      );
    }

    if (region_state || region_country) {
      const updatedMypageFields = {
        region_state: region_state,
        region_country: region_country,
      };

      // 변경된 필드만 업데이트 (helper_mypage 테이블)
      const helperMypageUpdateQuery = Object.entries(updatedMypageFields)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value], index) => `${key} = $${index + 1}`)
        .join(", ");

      await client.query(
        `UPDATE helper_mypage SET ${helperMypageUpdateQuery} WHERE helper_id = $${
          Object.keys(updatedMypageFields).length + 1
        }`,
        [helper_id, ...Object.values(updatedMypageFields)]
      );
    }

    res.json({ message: "회원정보가 수정되었습니다." });
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({
      error: "An error occurred while updating the request status.",
    });
  } finally {
    client.release();
  }
});

export default helperRouter;
