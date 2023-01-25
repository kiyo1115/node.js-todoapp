const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

// /api/v1/tasksからタスクを読み込む
const showTasks = async () => {
  try {
    //自作のAPIを叩く
    const { data: tasks } = await axios.get("/api/v1/tasks");

    //タスクが一つもないとき
    if(tasks.length === 0){
      tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`
      return //returnを入れることで下記を処理しないようにする
    }
    //タスクを出力
    const allTasks = tasks
      .map((task) => {
        const { completed, name, _id } = task;

        return `<div class="single-task ${completed && "task-completed"}">
        <h5>
          <span> <i class="far fa-check-circle"></i> </span>${name}
        </h5>
        <div class="task-links">
          <!-- 編集リンク -->
          <a href="edit.html?id=${_id}" class="edit-link">
            <i class="fas fa-edit"></i>
          </a>
          <!-- ゴミ箱リンク -->
          <button type="button" class="delete-btn" data-id=${_id}>
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>`;
        //allTasksへreturn内のタグが格納される
      })
      .join(""); //配列として認識するため、join関数で連結させることで対処する
    tasksDOM.innerHTML = allTasks;
  } catch (err) {
    console.log(err);
  }
};
showTasks();

//タスクを新規作成する
formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const inner = taskInputDOM.value; //innerHTMLには値は挿入されていなかった
    await axios.post("/api/v1/tasks", { name: inner });
    showTasks();
    taskInputDOM.value = "";
    formAlertDOM.innerHTML="タスクを追加しました"
    formAlertDOM.classList.add("text-success")

  } catch (err) {
    console.log(err);
    formAlertDOM.innerHTML="30文字以内で指定してください"
    formAlertDOM.classList.remove("text-success")

  }
  setTimeout(() => {
    formAlertDOM.innerHTML=""
  }, 3000);
});

//タスクを削除する
tasksDOM.addEventListener("click", async (e) => {
  const element = e.target
  if(element.parentElement.classList.contains("delete-btn")){
    const id = element.parentElement.dataset.id;//data-idの数値を取得。他にもやり方はある
    try{
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();

    }catch(err){
      console.log(err)
    }
  }
});
