import express from 'express'; // module
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from './server/user.mjs'; // user 모듈 불러오기
import helperRouter from './server/helper.mjs'; // helper 모듈 불러오기

//variable
const PORT = 5000;
const app = express()

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json("success");
});

//회원용
app.use('/user', userRouter);

//도우미용
app.use('/helper', helperRouter);

// server start
app.listen(PORT, () => {
  console.log(`✅ Listening on http://localhost:5000/`);
});








