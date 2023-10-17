import Todolist from "../models/TodolistModel.js";
import User from "../models/UserModel.js";
import { kv } from "@vercel/kv";
// Implementasi redis cache sebenarnya tidak diperlukan untuk kasus ini
// karna get dari database tidak masalah dan tidak lama dan juga data pada todolist pasti
// sering berubah-ubah walaupun sering dilakukan get data, namun implementasi redis hanya digunakan untuk belajar implent redis saja.
// khususnya redis yang disediakan oleh vercel
export const createTask = async (req, res) => {
  // #swagger.tags = ['Todolist']
  const { task, description, label, datetime } = req.body;

  try {
    const dataUser = await User.findOne({ username: req.username });
    await kv.del(dataUser.id);
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
  // #swagger.tags = ['Todolist']
  try {
    const dataUser = await User.findOne({ username: req.username });
    const dataFromRedis = await kv.get(dataUser.id);
    if (dataFromRedis == null) {
      const tasks = await Todolist.find({ user_id: dataUser.id }).sort({
        isChecked: "asc",
        datetime: -1,
      });
      await kv.set(dataUser.id, tasks);
      res.status(200).json(tasks);
    } else {
      res.status(200).json(dataFromRedis);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateTask = async (req, res) => {
  // #swagger.tags = ['Todolist']
  try {
    const task = await Todolist.findByIdAndUpdate(
      { _id: req.body.id },
      req.body
    );
    await kv.del(task.user_id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteTask = async (req, res) => {
  // #swagger.tags = ['Todolist']
  const id = req.params.id;
  try {
    const task = await Todolist.findByIdAndDelete({ _id: id });
    await kv.del(task.user_id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
