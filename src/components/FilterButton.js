import React from "react";

const FilterButton = (props) => {
    return (
        <button type="button" 
            className={props.darkMode ? "btn toggle-btn dark" : "btn toggle-btn light"} 
            aria-pressed={props.isPressed}
            onClick={() => props.setFilter(props.name)}>
            <span className="visually-hidden">Show </span>
            <span>{props.name}</span>
            <span className="visually-hidden"> tasks</span>
        </button>
    );
};

export default FilterButton;