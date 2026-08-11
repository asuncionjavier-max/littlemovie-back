import express from "express";

import* as authController from "../controllers/auth.js";

import checker from "../middlewares/checker.js";

const router = express.Router();

const checkRegister = checker("name", "email", "password");

const checkLogin = checker("email", "password");

router.post("/register", checkRegister, authController.register);

router.post("/login", authController.login);

router.post("/logout",authController.logout);

export default router;