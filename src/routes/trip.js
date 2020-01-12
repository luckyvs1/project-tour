import express from 'express';
const router = express.Router();

import TripController from '../controllers/TripController';
const controller = new TripController();

router.get("/trip", (req, res) => controller.trip(req, res));

export default router