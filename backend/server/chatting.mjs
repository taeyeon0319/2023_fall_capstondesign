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
  res.json("success채팅");
});