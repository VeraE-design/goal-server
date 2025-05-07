const GOAL = require("../models/goal");

const createGoal = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "provide title and description" });
  }
  try {
    // create  save
    const goal = await GOAL.create(req.body);
    return res.status(201).json({ success: true, goal });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

const getAllGoals = async (req, res) => {
  const goals = await GOAL.find().sort("-createdAt");
  res.status(200).json({ success: true, num: goals.length, goals });
};

const getOngoingGoals = async (req, res) => {
  const goals = await GOAL.find({ progress: { $lt: 100 } }).sort("-createdAt");
  res.status(200).json({ success: true, num: goals.length, goals });
};

const getCompletedGoals = async (req, res) => {
  const goals = await GOAL.find({ progress: { $eq: 100 } }).sort("-createdAt");
  res.status(200).json({ success: true, num: goals.length, goals });
};
// find by Id
const getSingleGoal = async (req, res) => {
  const { goalId } = req.params;
  const goal = await GOAL.findById(goalId);
  res.status(200).json({ success: true, goal });
};
// find by Id and update
const updateGoal = async (req, res) => {
  const { goalId } = req.params;
  try {
    const goal = await GOAL.findByIdAndUpdate(goalId, req.body, {
      runValidators: true,
      new: true,
    });
    return res.status(200).json({ success: true, goal });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
// findByIdAndDelete
const deleteGoal = async (req, res) => {
  const { goalId } = req.params;
  await GOAL.findByIdAndDelete(goalId)
  res.status(200).json({ success: true, message: "Goal Deleted"})
};

module.exports = {
  createGoal,
  getAllGoals,
  getCompletedGoals,
  getOngoingGoals,
  getSingleGoal,
  updateGoal,
  deleteGoal,
};
