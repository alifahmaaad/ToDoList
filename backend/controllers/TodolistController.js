import Todolist from "../models/TodolistModel.js";

export const createTask = async (req, res) => {
  const { task, description, label, datetime } = req.body;
  try {
    await Todolist.create({ task, description, label, datetime }).then((data) =>
      res.status(200).json(data)
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
