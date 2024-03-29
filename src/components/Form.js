import React, { useState } from "react"

const Form = (props) => {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name !== "") {
            // send the values collected in the input up to the App component
            props.onSubmit(name);
            // reset the input after submit 
            setName("");
        }
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className={props.darkMode ? "input input__lg dark" : "input input__lg light"}
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
};

export default Form;