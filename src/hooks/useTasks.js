import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import useTasksLocalStorage from "./useTasksLocalStorage.js";

const useTasks = () => {

    const {
        savedTasks,
        saveTasks
    } = useTasksLocalStorage();

    const [tasks, setTasks] = useState(savedTasks ?? [
        {id: 1, title: "Закрывать зеленые квадратики в git", isDone: true},
        {id: 2, title: "Проходить путь самурая", isDone: false},
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const newTaskInputRef = useRef(null);

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm('Вы точно уверены что хотите удалить все задания?');

        if (isConfirmed) {
            setTasks([]);
        }
    }, []);

    const deleteTask = useCallback((taskId) => {
        setTasks(
            tasks.filter(task => task.id !== taskId)
        )
    }, [tasks]);

    const toggleTaskComplete = useCallback((taskId, isDone) => {
        setTasks(
            tasks.map(task => task.id === taskId ? {...task, isDone} : task)
        )
    }, [tasks]);

    const addTask = useCallback(() => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false
            };
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setNewTaskTitle('');
            setSearchQuery('');
            newTaskInputRef.current.focus();
        }
    }, [newTaskTitle]);

    useEffect(() => {
        saveTasks(tasks)
    }, [tasks, saveTasks]);

    useEffect(() => {
        newTaskInputRef.current.focus();
    }, []);

    const filteredTasks = useMemo(() => {
        const clearSearchQuery = searchQuery.trim().toLowerCase();
        return clearSearchQuery.length > 0
            ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
            : null
    }, [searchQuery, tasks]);

    return {
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
    }
};

export default useTasks