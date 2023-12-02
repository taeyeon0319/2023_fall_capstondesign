import express from "express"; // module
import bodyParser from "body-parser";
import cors from "cors";
import db from "./db.mjs";
import userRouter from "./server/user.mjs"; // user 모듈 불러오기
import helperRouter from "./server/helper.mjs"; // helper 모듈 불러오기
import signupRouter from "./server/signup.mjs";
import reviewRouter from "./server/review.mjs";
import chatRouter from "./server/chat.js";

//variable
const PORT = 4000;
const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json("success");
});

//회원용
app.use("/user", userRouter);

//도우미용
app.use("/helper", helperRouter);

app.use("/", signupRouter);

//리뷰
app.use("/review", reviewRouter);

//채팅
app.use("/chat", chatRouter);

// /city : 위치 테이블 출력
app.get("/city", async (req, res) => {
  try {
    const searchResult = await db.any("SELECT * FROM city ORDER BY id");
    res.json(searchResult);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// /fields : 위치 테이블 출력
app.get("/fields", async (req, res) => {
  try {
    const searchResult = await db.any("SELECT * FROM fields");
    res.json(searchResult);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// server start
app.listen(PORT, () => {
  console.log(`✅ Listening on http://localhost:4000/`);
});
