import express from 'express';
const router = express.Router();

import LocationsController from '../controllers/LocationsController';
const controller = new LocationsController();

router.get("/locations", (req, res) => controller.getLocations(req, res));

export default router