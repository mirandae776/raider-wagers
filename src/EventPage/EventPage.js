import React from "react";
import {Link} from "react-router-dom";
import NavBar from "../NavBar/NavBar";


const EventsPage = () => {
    return (
        <div>
            <NavBar></NavBar>
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>

                </ul>
            </nav>
            <p>EVENTS PAGE</p>
        </div>
    );
};


export default EventsPage;