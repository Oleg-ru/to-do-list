import React from 'react';
import TodoItem from "./TodoItem.jsx";

function TodoList(props) {

    const {
        tasks = [],
        onDeleteTaskButtonClick,
        onTaskCompleteChange,
    } = props

    const hasTasks = true;

    if (!hasTasks) {
        return <div className="todo__empty-message"></div>
    }

    return (
        <ul className="todo__list">
            {tasks.map(task => (
                <TodoItem
                    className="todo__item"
                    key={task.id}
                    onDeleteTaskButtonClick={onDeleteTaskButtonClick}
                    onTaskComleteChange={onTaskCompleteChange}
                    {...task}
                />
            ))}
        </ul>
    );
}

export default TodoList;