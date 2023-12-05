import React, {useEffect} from "react";
// import bootstrap from "bootstrap/dist/css/bootstrap.css";
const initialDabloons = 5000;

const HomePage = ({ setCurrDoubloons }) => {
    useEffect(() => {
        const dabloons = localStorage.getItem('dabloons');
        if (!dabloons) {
            localStorage.setItem('dabloons', `${initialDabloons}`);
            setCurrDoubloons(initialDabloons);
        } else {
            console.log(`dabloons: ${dabloons}`);
        }
    }, [setCurrDoubloons]);


    return (
        <div style={{ textAlign: 'center' }}>
            <span>Welcome to Raider Wagers. Place a Bet to get started. Once you've placed a bet, you can View Bet History.</span>
                <ul className="navbar-nav mr-auto">
                    <li className="">
                        <a className="nav-item" href="/raider-wagers/#/events">Place A Bet</a>
                    </li>
                    <li className="">
                        <a className="nav-item" href="/raider-wagers/#/BetHistory">View Bet History</a>
                    </li>
                </ul>
        </div>
    );
};


export default HomePage;