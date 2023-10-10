import express from 'express'; // module
// import pg from 'pg';
import bodyParser from "body-parser";
import cors from "cors";

//variable
const PORT = 5000;
const app = express()

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//routing
// const pool = new pg.Pool({
//   host: process.env.DB_HOST, 
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

app.get("/", (req, res) => {
  res.json("success");
});



// server start
app.listen(PORT, () => {
  console.log(`✅ Listening on http://localhost:5000/`);
});