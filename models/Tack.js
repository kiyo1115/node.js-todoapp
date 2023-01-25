const mongoose = require("mongoose");
const { Schema } = mongoose;

//スキーマの設定→いわゆるデータ構造の作成し、
//クリエイトの時にスキーマの情報をmongodbへ書き込みする
const TaskSchema = new Schema({
    name:{
        type:String,
        required:[true,"タスク名を入れてください"],
        trim:true,
        maxlength:[30,"タスク名は20文字以内で入力してください"]
    },
    completed:{
        type:Boolean,
        default:false,
    },
})

module.exports = mongoose.model("task",TaskSchema)