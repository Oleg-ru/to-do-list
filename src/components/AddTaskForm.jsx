import React from 'react';
import Field from "./Field.jsx";
import Button from "./Button.jsx";

function AddTaskForm() {
    return (
        <form className="todo__form">
            <Field
                className="todo__field"
                label="New task title"
                id="new-task"
            />
            <Button type="submit">Add</Button>
        </form>
    );
}

export default AddTaskForm;