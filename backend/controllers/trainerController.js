const Trainer = require("../models/trainerModel");

exports.createTrainer = async (req, res) => {
  const trainer = await Trainer.create(req.body);
  res.status(201).json(trainer);
};

exports.getTrainers = async (req, res) => {
  const filter = {};
  if (req.query.available) filter.available = req.query.available;
  if (req.query.specialization)
    filter.specialization = req.query.specialization;

  const trainers = await Trainer.find(filter);
  res.json(trainers);
};

exports.getTrainerById = async (req, res) => {
  const trainer = await Trainer.findById(req.params.id);
  res.json(trainer);
};

exports.updateTrainer = async (req, res) => {
  const trainer = await Trainer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(trainer);
};

exports.deleteTrainer = async (req, res) => {
  await Trainer.findByIdAndDelete(req.params.id);
  res.json({ message: "Trainer deleted" });
};
