import React from "react";
import SignInForm from "./Login";
import {Link} from "react-router-dom";
// import bootstrap from "bootstrap/dist/css/bootstrap.css";

const HomePage = () => {
    return (
        <div>

            <nav className="navbar navbar-dark bg-dark">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/#/stats">Statistics</a>
                    </li>
                </ul>
                
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/#/exchange">Exchanges</a>
                    </li>
                </ul>

                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/#/events">Events</a>
                    </li>
                </ul>

                <ul className="navbar-nav mr-auto">
                    <li className="navbar-nav mr-auto">
                        <a className="nav-link" href="/#/wager">Wagers</a>
                    </li>
                </ul>
            </nav>

        </div>
    );
};


export default HomePage;