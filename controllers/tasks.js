const Task = require("../models/Tack");

const getAllTasks = async (req, res) => {
  try {
    const allTask = await Task.find({}); //取得するためのメソッドはfind
    res.status(200).json(allTask);
  } catch (err) {
    res.status(500).json(err);
  }
};
const createTask = async (req, res) => {
  //作成
  try {
    const createTask = await Task.create(req.body); //取得するためのメソッドはcreate
    res.status(200).json(createTask);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getsingleTask = async (req, res) => {
  try {
    const getSingleTask = await Task.findOne({ _id: req.params.id }); //取得するためのメソッドはfindone
    if (!getSingleTask) {
      res.status(404).json(`_id:${req.params.id}は存在しません`);
    }
    res.status(200).json(getSingleTask);
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateTask = async (req, res) => {
  //putとほぼ同じで情報を更新するもの
  try {
    const updateTask = await Task.findOneAndUpdate(
      //取得するためのメソッドはfindOneAndUpdate
      //またアップデート方法はpatchメソッドで指定
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    //第一引数は検索する値を設定。第二引数は更新する値を設定。
    //第三引数はあってもなくてもいいが、オプションとしてnewをつけることができ
    //このオプションはアップデートした内容を表示する
    //設定しない場合はアップデートした内容ではなくアップデート前の内容を表示する
    if (!updateTask) {
      res.status(404).json(`_id:${req.params.id}は存在しません`);
    }
    res.status(200).json(updateTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTask = async(req, res) => {
  //削除
  try {
    const deleteTask = await Task.findOneAndDelete({ _id: req.params.id }); 
    //取得するためのメソッドはfindOneAndDelete
    if (!deleteTask) {
      res.status(404).json(`_id:${req.params.id}は存在しません`);
    }
    res.status(200).json(deleteTask);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getsingleTask,
  updateTask,
  deleteTask,
};
