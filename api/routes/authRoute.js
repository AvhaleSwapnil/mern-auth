import express from "express";
import {
  Google,
  SignIn,
  SignUp,
  signOut,
} from "../controllers/authController.js";

const router = express.Router();
// http://localhost:3000/api/auth/signup
router.post("/signup", SignUp);
// http://localhost:3000/api/auth/signin
router.post("/signin", SignIn);
// http://localhost:3000/api/auth/google
router.post("/google", Google);

router.get("/signout", signOut);
export default router;
