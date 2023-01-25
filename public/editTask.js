const params = window.location.search;

//?以降の指定した文字以降のクエリ（文字列）を返す
//?id= と書かれていた場合は下記。?name=と書かれていたらget("name")とする
const id = new URLSearchParams(params).get("id");
const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const editForDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const taskCompleteDOM = document.querySelector(".task-edit-completed");

//一つの特定のタスクを取得する
const showTask = async () => {
  try {
    const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
    const { _id, completed, name } = task;
    taskIDDOM.innerHTML = _id;
    taskNameDOM.value = name;
    taskCompleteDOM.checked = completed

  } catch (err) {
    console.log(err);
  }
};
showTask();

//タスクの編集
editForDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const taskName = taskNameDOM.value;
  const taskCompleted = taskCompleteDOM.checked;
  try {
    await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    });
    formAlertDOM.innerHTML = "編集に成功しました";
    formAlertDOM.classList.add("text-success");
  } catch (err) {
    console.log(err);
  }
  setTimeout(() => {
    formAlertDOM.innerHTML = "";
  }, 3000);
});
