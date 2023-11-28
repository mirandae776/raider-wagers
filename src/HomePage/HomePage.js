import React from "react";
import SignInForm from "./Login";
import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <div>
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


export default HomePage;