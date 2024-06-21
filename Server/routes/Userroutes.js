import { Router } from "express";
import { GetLastRecord } from "../controllers/User/GetData.js";

const router = Router();

router.get("/lastrecord", GetLastRecord);

export default router;
