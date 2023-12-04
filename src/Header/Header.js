import {Link} from "react-router-dom";
import home from './home.png';
import coin from './coin.png';
import React, { useEffect, useState } from "react";



const Header = ({currDoubloons}) => {

    return (
        <div className='App-header'>
            <a href="/raider-wagers/#/home">
                <img
                    src={home}
                    alt="Home Page Icon"
                    className='icon'
                />
            </a>
            <div className='doubloons'>
                <img
                    src={coin}
                    alt="Doubloon Icon"
                    className='icon'
                />
                <p>{currDoubloons}</p>
            </div>
        </div>
    );
};


export default Header;