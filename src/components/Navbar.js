import React, { useState } from "react";

const Navbar = (props) => {
    const [isPressed, setIsPressed] = useState(false);
    const toggleIsPressed = () => {
        props.toggleDarkMode();
        setIsPressed(!isPressed);
    };
    return (
        <nav>
            <h1>TodoMatic</h1>
            <div className="toggler">
                <p className="toggler--light" aria-hidden="true">Light</p>
                <button className="toggler--slider" 
                    onClick={toggleIsPressed}
                    aria-pressed={isPressed}
                    aria-label={props.darkMode ? "Disable dark mode" : "Enable dark mode"}>
                    <div className="toggler--slider--circle" aria-hidden="true"></div>
                </button>
                <p className="toggler--dark" aria-hidden="true">Dark</p>
            </div>
        </nav>
    );
};

export default Navbar;