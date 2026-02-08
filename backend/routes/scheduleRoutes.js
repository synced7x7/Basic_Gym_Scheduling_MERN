const express = require("express");
const router = express.Router();
const scheduleCtrl = require("../controllers/scheduleController");

router.post("/", scheduleCtrl.scheduleWorkout);
router.get("/", scheduleCtrl.getAllSchedules);

module.exports = router;
