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

    const deleteAllTasks = () => {
        console.log('Delete all tasks')
    };

    const deleteTask = (taskId) => {
        console.log(`Delete task with id ${taskId}`)
    };

    const toggleTaskComlete = (taskId, isDone) => {
        console.log(`Task ${taskId} ${isDone ? 'done' : 'active'}`)
    };

    const filterTasks = (query) => {
        console.log(`Search ${query}`);
    };

    const addTask = () => {
        console.log("Task added")
    };

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm addTask={addTask}/>
            <SearchTaskForm onSearchInput={filterTasks}/>
            <TodoInfo
                total={tasks.length}
                done={tasks.filter(task => task.isDone).length}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <TodoList
                tasks={tasks}
                onDeleteTaskButtonClick={deleteTask}
                onTaskComleteChange={toggleTaskComlete}
            />
        </div>
    );
}

export default Todo;