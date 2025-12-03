import React, {memo, useContext} from 'react';
import TodoItem from "./TodoItem.jsx";
import {TasksContext} from "../context/TasksContext.jsx";

function TodoList() {

    const {
        tasks,
        filteredTasks,
    } = useContext(TasksContext)

    const hasTasks = tasks.length > 0;
    const isEmptyFilteredTasks = filteredTasks?.length === 0;

    if (!hasTasks) {
        return <div className="todo__empty-message">There are not tasks yet</div>
    }

    if (hasTasks && isEmptyFilteredTasks) {
        return <div className="todo__empty-message">Tasks not found</div>
    }

    return (
        <ul className="todo__list">
            {(filteredTasks ?? tasks).map(task => (
                <TodoItem
                    className="todo__item"
                    key={task.id}
                    {...task}
                />
            ))}
        </ul>
    );
}

export default memo(TodoList);