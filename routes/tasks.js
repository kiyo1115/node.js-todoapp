const express = require("express");
const router = express.Router(); //appと同様に使用可能
const {
  getAllTasks,
  createTask,
  getsingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

//ミドルウェアの設定
router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/:id", getsingleTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
