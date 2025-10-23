import React from 'react';
import AddTaskForm from "./AddTaskForm.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import TodoInfo from "./TodoInfo.jsx";
import TodoList from "./TodoList.jsx";

function Todo() {

    const tasks= [
        {id: 1, title: "Закрывать зеленые квадратики в git", isDone: true},
        {id: 2, title: "Проходить путь самурая", isDone: false},
    ]

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm />
            <SearchTaskForm />
            <TodoInfo
                total={tasks.length}
                done={tasks.filter(task => task.isDone).length}
            />
            <TodoList tasks={tasks}/>
        </div>
    );
}

export default Todo;