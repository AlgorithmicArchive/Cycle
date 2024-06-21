import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import cors from "cors";
dotenv.config();

import homeroutes from "./routes/Homeroutes.js";

import userroutes from "./routes/Userroutes.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/home", homeroutes);
app.use("/api/user", userroutes);

app.listen(process.env.PORT, () =>
  console.log(`Server Started at PORT: ${process.env.PORT}`)
);
