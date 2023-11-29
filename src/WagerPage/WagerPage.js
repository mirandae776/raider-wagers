import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import allGames from '../InitialGames.json';

const WagerPage = () => {
    const [bets, setBets] = useState([]);
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const gameID = parseInt(queryParams.get("gameID"));

    useEffect(() => {
        const fetchData = async () => {
            if (gameID){
                const selectedGame = allGames.filter(game => game.gameID === gameID);
                setBets(selectedGame[0].bets);
            }
        };

        fetchData();
    }, [gameID]);

    return (
        <div>
            <p>Available Bets</p>
            {bets.map((bet) => (
                <div
                    key={`${bet.propName}-${bet.prop}-${bet.odds}`}
                    onClick={() => {
                        // Handle click
                    }}
                >
                    <h1>{`${bet.propName} ${bet.prop}`}</h1>
                    <h2>{`${bet.odds}`}</h2>
                </div>
            ))}
        </div>
    );
};

export default WagerPage;
