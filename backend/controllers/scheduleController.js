const User = require("../models/userModel");
const Trainer = require("../models/trainerModel");
const ScheduledWorkout = require("../models/scheduledWorkoutModel");

exports.scheduleWorkout = async (req, res) => {
  const { userId, trainerId, scheduledAt, workoutTypes, notes } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!["premium", "elite"].includes(user.membershipType)) {
    return res.status(403).json({
      message: "Only premium or elite users can schedule workouts",
    });
  }

  const trainer = await Trainer.findById(trainerId);
  if (!trainer || !trainer.available) {
    return res.status(400).json({
      message: "Trainer not available",
    });
  }

  const trainerConflict = await ScheduledWorkout.findOne({
    trainer: trainerId,
    scheduledAt,
    status: "scheduled",
  });

  if (trainerConflict) {
    return res.status(409).json({
      message: "Trainer already booked at this time",
    });
  }

  const userConflict = await ScheduledWorkout.findOne({
    user: userId,
    scheduledAt,
    status: "scheduled",
  });

  if (userConflict) {
    return res.status(409).json({
      message: "User already has a workout scheduled at this time",
    });
  }

  const workout = await ScheduledWorkout.create({
    user: userId,
    trainer: trainerId,
    scheduledAt,
    workoutTypes,
    notes,
  });

  res.status(201).json({
    message: "Workout scheduled successfully",
    workout,
  });
};

exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await ScheduledWorkout.find()
    res.json(schedules);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
