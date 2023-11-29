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
                        <a className="nav-link" href="/raider-wagers/#/stats">Statistics</a>
                    </li>
                </ul>
                
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/raider-wagers/#/exchange">Exchanges</a>
                    </li>
                </ul>

                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/raider-wagers/#/events">Events</a>
                    </li>
                </ul>

                <ul className="navbar-nav mr-auto">
                    <li className="navbar-nav mr-auto">
                        <a className="nav-link" href="/raider-wagers/#/wager">Wagers</a>
                    </li>
                </ul>
            </nav>

        </div>
    );
};


export default HomePage;