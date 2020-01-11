import express from 'express';
const router = express.Router();

import AuthController from '../controllers/AuthController';
const controller = new AuthController();

router.post("/login", (req, res) => controller.login(req, res));

export default router