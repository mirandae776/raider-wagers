import React from "react";
import {Link} from "react-router-dom";


const EventsPage = () => {
    return (
        <div>
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