import {Link} from "react-router-dom";
import home from './home.png';
import coin from './coin.png';
import React, { useEffect, useState } from "react";



const NavBar = ({currDoubloons}) => {

    return (
        <div class='App-header'>
            <a href="/raider-wagers/#/home">
                <img
                    src={home}  // Replace with the actual URL of your image
                    alt="Home Page Icon"
                    class='icon'
                />
            </a>
            <div class='doubloons'>
                <img
                    src={coin}  // Replace with the actual URL of your image
                    alt="Doubloon Icon"
                    class='icon'
                />
                <p>{currDoubloons}</p>
            </div>
        </div>
    );
};


export default NavBar;