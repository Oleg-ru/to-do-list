import React, {useState} from 'react';
import AddTaskForm from "./AddTaskForm.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import TodoInfo from "./TodoInfo.jsx";
import TodoList from "./TodoList.jsx";

function Todo() {

    const [tasks, setTasks] = useState([
        {id: 1, title: "Закрывать зеленые квадратики в git", isDone: true},
        {id: 2, title: "Проходить путь самурая", isDone: false},
    ]);

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const deleteAllTasks = () => {
        const isConfirmed = confirm('Вы точно уверены что хотите удалить все задания?');

        if (isConfirmed) {
            setTasks([]);
        }
    };

    const deleteTask = (taskId) => {
        setTasks(
            tasks.filter(task => task.id !== taskId)
        )
    };

    const toggleTaskComplete = (taskId, isDone) => {
        setTasks(
            tasks.map(task => task.id === taskId ? {...task, isDone} : task)
        )
    };

    const filterTasks = (query) => {
        console.log(`Search ${query}`);
    };

    const addTask = () => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false
            };
            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
        }
    };

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTask={addTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
            />
            <SearchTaskForm onSearchInput={filterTasks}/>
            <TodoInfo
                total={tasks.length}
                done={tasks.filter(task => task.isDone).length}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <TodoList
                tasks={tasks}
                onDeleteTaskButtonClick={deleteTask}
                onTaskComleteChange={toggleTaskComplete}
            />
        </div>
    );
}

export default Todo;