const express = require("express");
const router = express.Router();
const trainerCtrl = require("../controllers/trainerController");

router.post("/", trainerCtrl.createTrainer);
router.get("/", trainerCtrl.getTrainers);
router.get("/:id", trainerCtrl.getTrainerById);
router.put("/:id", trainerCtrl.updateTrainer);
router.delete("/:id", trainerCtrl.deleteTrainer);

module.exports = router;
