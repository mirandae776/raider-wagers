import React from "react";
import {Link} from "react-router-dom";


const StatsPage = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>

                </ul>
            </nav>
            <p>Stats PAGE</p>
        </div>
    );
};


export default StatsPage;