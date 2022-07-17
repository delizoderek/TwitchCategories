// submitting it
form = document.forms.myform;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  list_item = document.getElementById("list_task");
  var list = document.createElement("li");
  var listcontent = document.createTextNode(form.task.value);
  list.appendChild(listcontent);
  list_item.appendChild(list);
  form.task.value = "";
});

// marking it as complete
const ul = document.getElementById("list_task");
ul.addEventListener("click", function (e) {
  e.target.classList.toggle("checked");
});