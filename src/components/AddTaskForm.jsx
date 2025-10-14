import React from 'react';
import Field from "./Field.jsx";
import Button from "./Button.jsx";

function AddTaskForm() {
    return (
        <form className="todo__form">
            <Field />
            <Button />
        </form>
    );
}

export default AddTaskForm;