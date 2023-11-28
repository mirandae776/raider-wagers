import React from "react";
import {Link} from "react-router-dom";


const WagerPage = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>

                </ul>
            </nav>
            <p>WAGER PAGE</p>
        </div>
    );
};


export default WagerPage;