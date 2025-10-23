import React from 'react';
import TodoItem from "./TodoItem.jsx";

function TodoList(props) {

    const {
        tasks = [],

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
                    {...task}
                />
            ))}
        </ul>
    );
}

export default TodoList;