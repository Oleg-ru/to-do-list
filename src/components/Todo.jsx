import React, {useEffect, useRef, useState} from 'react';
import AddTaskForm from "./AddTaskForm.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import TodoInfo from "./TodoInfo.jsx";
import TodoList from "./TodoList.jsx";
import Button from "./Button.jsx";

function Todo() {

    const [tasks, setTasks] = useState(() => {
        const saveTasks = localStorage.getItem('tasks');

        if (saveTasks) {
            return JSON.parse(saveTasks);
        }

        return [
            {id: 1, title: "Закрывать зеленые квадратики в git", isDone: true},
            {id: 2, title: "Проходить путь самурая", isDone: false},
        ]
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const newTaskInputRef = useRef(null);
    const firstIncompleteTaskRef = useRef(null);
    const firstIncompleteTaskId = tasks.find(task => !task.isDone)?.id;

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

    const addTask = () => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false
            };
            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
            setSearchQuery('');
            newTaskInputRef.current.focus();
        }
    };

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        newTaskInputRef.current.focus();
    }, []);

    const clearSearchQuery = searchQuery.trim().toLowerCase();
    const filteredTasks = clearSearchQuery.length > 0
        ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
        : null;


    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTask={addTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
                newTaskInputRef={newTaskInputRef}
            />
            <SearchTaskForm
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <TodoInfo
                total={tasks.length}
                done={tasks.filter(task => task.isDone).length}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <Button onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({behavior: 'smooth'})}>
                Show first incomplete task
            </Button>
            <TodoList
                tasks={tasks}
                filteredTasks={filteredTasks}
                firstIncompleteTaskRef={firstIncompleteTaskRef}
                firstIncompleteTaskId={firstIncompleteTaskId}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskComplete}
            />
        </div>
    );
}

export default Todo;