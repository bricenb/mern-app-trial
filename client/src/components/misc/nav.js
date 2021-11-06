import React from "react";
import {Link} from "react-router-dom";

function Navbar() {
    return (
    <div className="navbar">
        <Link to="/">
        <h1>LINK2RSVP</h1>
        </Link>

        <Link to="/login">
            Login
        </Link>

        <Link to="/signup">
            Sign UP
        </Link>

    </div>
    );
}

export default Navbar;