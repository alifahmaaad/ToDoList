import Todolist from "../models/TodolistModel.js";
import User from "../models/UserModel.js";

export const createTask = async (req, res) => {
  const { task, description, label, datetime } = req.body;
  try {
    const dataUser = await User.findOne({ username: req.username });
    await Todolist.create({
      task,
      description,
      label,
      datetime,
      user_id: dataUser.id,
    }).then((data) => res.status(200).json(data));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllTaskByUserId = async (req, res) => {
  try {
    const dataUser = await User.findOne({ username: req.username });
    const tasks = await Todolist.find({ user_id: dataUser.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateTask = async (req, res) => {
  try {
    const task = await Todolist.findByIdAndUpdate(
      { id: req.body.id },
      req.body
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteTask = async (req, res) => {
  const { id } = req.body;
  try {
    await Todolist.findByIdAndDelete({ id: id });
    res.status(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
