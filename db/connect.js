const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDB = async (url) => {
  await mongoose
      //mongoose.connectでデータベースへ接続できる。
    // urlはmongodbのアプリケーション接続から取得できる
    .connect(url)
    .then(() => console.log("データベースと接続中・・・"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;