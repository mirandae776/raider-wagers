import React, {useEffect} from "react";
import SignInForm from "./Login";
import {Link} from "react-router-dom";
// import bootstrap from "bootstrap/dist/css/bootstrap.css";
const initialDabloons = 5000;

const HomePage = () => {
    useEffect(() => {
        const dabloons = localStorage.getItem('dabloons');
        if (!dabloons){
            localStorage.setItem('dabloons', `${initialDabloons}`);
        } else {
            console.log(`dabloons: ${dabloons}`);
        }
    }, []);
    return (
        <div>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/raider-wagers/#/events">Place A Bet</a>
                    </li>
                </ul>
        </div>
    );
};


export default HomePage;