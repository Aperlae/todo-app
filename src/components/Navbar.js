import React from "react";

const Navbar = () => {
    return (
        <nav>
            <h1>TodoMatic</h1>
            <div className="toggler">
                <p className="toggler--light">Light</p>
                <div className="toggler--slider">
                    <div className="toggler--slider--circle"></div>
                </div>
                <p className="toggler--dark">Dark</p>
            </div>
        </nav>
    );
};

export default Navbar;