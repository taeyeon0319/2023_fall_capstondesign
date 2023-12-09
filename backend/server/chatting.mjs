import express, { request, response } from "express";
import pg from "pg";
import dotenv from "dotenv";
import { stat } from "fs";
import { count } from "console";

const chattingRouter = express.Router();
dotenv.config();

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

chattingRouter.get("/", (req, res) => {
  res.json("success채팅");
});

chattingRouter.get("/create-table", async (req, res) => {
  try {
    const client = await pool.connect();

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS roomList2 (
        roomId VARCHAR(255),
        roomName VARCHAR(255),
        userId VARCHAR(255),
        helperId VARCHAR(255),
        sub VARCHAR(255),
        lastChat VARCHAR(255)
      );
    `;

    await client.query(createTableQuery);

    client.release();
    
    res.json("Table created successfully!");
  } catch (error) {
    console.error("Error creating table:", error);
    res.status(500).json("Internal Server Error");
  }
});

chattingRouter.get("/insert-data", async (req, res) => {
  try {
    const client = await pool.connect();
    var now = new Date();
    var roomId = 
    ("00" + now.getFullYear()).slice(-2) +
    ("0" + (now.getMonth() + 1)).slice(-2) +
    ("0" + now.getDate()).slice(-2) +
    ("0" + now.getHours()).slice(-2) +
    ("0" + now.getMinutes()).slice(-2) +
    ("0" + now.getSeconds()).slice(-2);

    console.log(roomId);

    const insertDataQuery = (`
      INSERT INTO roomList2 (roomId, roomName, userId, helperId, sub ,lastChat) VALUES
      ($1, '김동국_전현정', 'dongguk123', 'hjyeeoonng', '아이 3시간 봐주실 분 구합니다.', '알겠습니다~')`);

    await client.query(insertDataQuery, [roomId]);


    client.release();
    
    res.json("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json("Internal Server Error");
  }
});

chattingRouter.get("/get-all-roomList", async (req, res) => {
  try {
    const client = await pool.connect();
    // Define your select query to retrieve all data
    const getAllDataQuery = `
      SELECT * FROM roomList2;
    `;
    // Execute the query
    const result = await client.query(getAllDataQuery);
    // Release the client back to the pool
    client.release();

    // Send the retrieved data as JSON response
    res.json(result.rows);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json("Internal Server Error");
  }
});

chattingRouter.get("/delete-all-data", async (req, res) => {
  try {
    const client = await pool.connect();
    // Define your delete query to remove all data
    const deleteAllDataQuery = `
      DELETE FROM roomList2;
    `;
    // Execute the query
    await client.query(deleteAllDataQuery);
    // Release the client back to the pool
    client.release();

    res.json("All data deleted successfully!");
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json("Internal Server Error");
  }
});

chattingRouter.get("/create-table2", async (req, res) => {
  try {
    const client = await pool.connect();

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS chatlog (
        roomId VARCHAR(255),
        type VARCHAR(255),
        text VARCHAR(255),
        time VARCHAR(255)
      );
    `;

    await client.query(createTableQuery);

    client.release();
    
    res.json("Table created successfully!");
  } catch (error) {
    console.error("Error creating table:", error);
    res.status(500).json("Internal Server Error");
  }
});

chattingRouter.get("/insert-data2", async (req, res) => {
  try {
    const client = await pool.connect();
    var now = new Date();
    var time = ("0" + now.getHours()).slice(-2) + ':' + ("0" + now.getMinutes()).slice(-2)

    console.log(time);

    const insertDataQuery = (`
      INSERT INTO chatlog (roomId, type, text, time) VALUES
      ('231209134419','user','안녕하세요',$1)`);

    await client.query(insertDataQuery, [time]);


    client.release();
    
    res.json("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json("Internal Server Error");
  }
});

chattingRouter.get("/get-all-chatlog", async (req, res) => {
  try {
    const client = await pool.connect();
    // Define your select query to retrieve all data
    const getAllDataQuery = `
      SELECT * FROM chatlog;
    `;
    // Execute the query
    const result = await client.query(getAllDataQuery);
    // Release the client back to the pool
    client.release();

    // Send the retrieved data as JSON response
    res.json(result.rows);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json("Internal Server Error");
  }
});

chattingRouter.put("/add-room-data", async (req, res) => {
  try {
    const { roomId, roomName, userId, helperId, sub, lastChat } = req.body;

    if (!roomId || !roomName || !userId || !helperId || !sub || !lastChat) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const client = await pool.connect();

    // If data with the specified roomId doesn't exist, insert the new data
    const insertDataQuery = `
      INSERT INTO roomList2 (roomId, roomName, userId, helperId, sub, lastChat)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    await client.query(insertDataQuery, [roomId, roomName, userId, helperId, sub, lastChat]);

    client.release();

    res.json({ success: true, message: "Data added successfully" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

chattingRouter.get("/delete-all-logdata", async (req, res) => {
  try {
    const client = await pool.connect();
    // Define your delete query to remove all data
    const deleteAllDataQuery = `
      DELETE FROM chatlog;
    `;
    // Execute the query
    await client.query(deleteAllDataQuery);
    // Release the client back to the pool
    client.release();

    res.json("All data deleted successfully!");
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json("Internal Server Error");
  }
});

chattingRouter.get("/create-table3", async (req, res) => {
  try {
    const client = await pool.connect();

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS matching (
        roomId VARCHAR(255),
        userOk VARCHAR(255),
        helperOk VARCHAR(255)
      );
    `;

    await client.query(createTableQuery);

    client.release();
    
    res.json("Table created successfully!");
  } catch (error) {
    console.error("Error creating table:", error);
    res.status(500).json("Internal Server Error");
  }
});

chattingRouter.post("/insert-data3", async (req, res) => {
  try {
    const client = await pool.connect();
    const { roomId, userOk, helperOk } = req.body;

    const insertDataQuery = (`
      INSERT INTO matching (roomId, userOk, helperOk) VALUES
      ($1,$2,$3)`);

    await client.query(insertDataQuery, [roomId,userOk,helperOk]);

    client.release();
    
    res.json("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json("Internal Server Error");
  }
});

chattingRouter.put("/updateOk", async (req, res) => {
  try {
    const client = await pool.connect();
    const { roomId, userOk, helperOk } = req.body;

    const insertDataQuery = (`
    UPDATE matching
    SET helperOk = $3,
        userOk = $2
    WHERE roomId = $1`);

    await client.query(insertDataQuery, [roomId,userOk,helperOk]);

    const selectQuery = (`SELECT * FROM matching WHERE roomId=$1`);
    const response = await client.query(selectQuery, [roomId]);
    var answer = ""
    if (response.rows[0].userok==='T'&&response.rows[0].helperok==='T'){
      answer = '매칭성공';
    }else{
      answer = '매칭실패';
    }

    client.release();
    res.json(answer);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json("Internal Server Error");
  }
});

chattingRouter.get("/delete-all-match", async (req, res) => {
  try {
    const client = await pool.connect();
    // Define your delete query to remove all data
    const deleteAllDataQuery = `
      DELETE FROM matching;
    `;
    // Execute the query
    await client.query(deleteAllDataQuery);
    // Release the client back to the pool
    client.release();

    res.json("All data deleted successfully!");
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json("Internal Server Error");
  }
});

chattingRouter.put("/roomdata", async (req, res) => {
  try {
    const client = await pool.connect();
    const { roomId } = req.body;
    const selectQuery = (`SELECT * FROM matching WHERE roomId=$1`);
    var answer = await client.query(selectQuery, [roomId]);
    res.json(answer.rows[0]);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json("Internal Server Error");
  }
});
export default chattingRouter;