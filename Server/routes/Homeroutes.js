import {
  emailExists,
  usernameExists,
} from "../controllers/Home/AlreadyExists.js";
import { Router } from "express";
import { login, register } from "../controllers/Home/AuthManager.js";

const router = Router();

router.post("/emailExists", emailExists);
router.post("/usernameExists", usernameExists);
router.post("/register", register);
router.post("/login", login);

export default router;
