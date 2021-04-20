const form     = document.getElementById('form');
const todoList = document.getElementById('todo-list');
const input    = document.getElementById("text");

const todos = JSON.parse(localStorage.getItem('todos'));
console.log(todos);

// localStorageのtodos(key)に値があれば(true = 空でなければ)
if (todos) {
  todos.forEach(todo => {
    todoListAdd(todo);
  })
}

form.addEventListener('submit', function(event) {
  // preventDefault form要素に送信先が指定されていない場合、現在のURLに対してフォームの内容を送信する
  event.preventDefault();

  todoListAdd();
})

function todoListAdd(todo) {
  let inputValue = input.value;

  if (todo) {
    // todoに値があればinputValueに値を入れる
    inputValue = todo;
  }

  if (inputValue) {
    // liタグの追加
    const li = document.createElement("li");
    li.innerText = input.value;

    // 右クリックでliタグの削除
    li.addEventListener('contextmenu', function(event) {
      event.preventDefault();
      li.remove();
      saveData();
    });

    todoList.appendChild(li);
    input.value = '';
    saveData();
  }
}

function saveData() {
  const lists = document.querySelectorAll('li');
  let todos = [];
  lists.forEach(list => {
    todos.push(list.innerText);
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}


