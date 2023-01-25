const express = require("express");
const app = express();
const PORT = 5000;
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

app.use(express.json());//express経由のため、json形式で書き込む場合は宣言が必要

app.use(express.static("./public"))//*****node.js経由でindex.htmlを開くための記述法*******

app.use("/api/v1/tasks/", taskRoute);
//全て途中まで同じurlを使っているため、ミドルウェアを設定して
//プログラムをわかりやすくしている

const start = () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(PORT, (req, res) => {
      //localhost5000番に接続して問題なければ
      // localhost:5000番のポートを開放して接続する
      console.log("サーバーが起動しました");
    });
  } catch (err) {
    console.log(err);
  }
};

start()
//データベースと接続
