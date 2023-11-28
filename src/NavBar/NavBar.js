import React from "react";
import {Link} from "react-router-dom";


const NavBar = () => {
    return (
        <div>
            <p>Navigation</p>
            <nav>
                <ul>
                    <li>
                        <Link to="/exchange">exchange</Link>
                    </li>
                    <li>
                        <Link to="/stats">Stats Page</Link>
                    </li>
                    <li>
                        <Link to="/events">Events</Link>
                    </li>
                    <li>
                        <Link to="/wager">Wagers</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};


export default NavBar;