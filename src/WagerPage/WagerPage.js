import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import allGames from '../InitialGames.json';

const WagerPage = () => {
    const [bets, setBets] = useState([]);
    const [selectedBet, setSelectedBet] = useState(null);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [betAmount, setBetAmount] = useState(0);

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const gameID = parseInt(queryParams.get("gameID"));

    useEffect(() => {
        const fetchData = async () => {
            if (gameID) {
                const selectedGame = allGames.filter(game => game.gameID === gameID);
                setBets(selectedGame[0].bets);
            }
        };
        fetchData();
    }, [gameID]);

    const handleBetClick = (bet) => {
        setSelectedBet(bet);
        setIsOverlayVisible(true);
    };

    const handleConfirmBet = () => {
        // You can perform additional logic here, e.g., send the bet to the server
        console.log(`Placing bet for ${selectedBet.propName} ${selectedBet.prop} - Amount: ${betAmount}`);

        // Reset state
        setSelectedBet(null);
        setIsOverlayVisible(false);
        setBetAmount(0);
    };

    return (
        <div>
            <p>Available Bets</p>
            {bets.map((bet) => (
                <div
                    key={`${bet.propName}-${bet.prop}-${bet.odds}`}
                    onClick={() => handleBetClick(bet)}
                    style={{
                        cursor: "pointer",
                        transition: "background 0.3s",
                        position: "relative",
                        margin: "5px",
                        padding: "10px",
                        borderRadius: "8px",
                        background: "#fff",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(0, 0, 0, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#fff";
                    }}
                >
                    <h1>{`${bet.propName} ${bet.prop}`}</h1>
                    <h2>{`${bet.odds}`}</h2>
                </div>
            ))}
            {isOverlayVisible && (
                <div>
                    {/* Darkened background overlay */}
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: "rgba(0, 0, 0, 0.5)", // Adjust the transparency as needed
                            zIndex: 998, // Set a lower z-index than the overlay
                        }}
                    ></div>

                    {/* Popup overlay */}
                    <div
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            background: "#fff",
                            color: "#000",
                            padding: "20px",
                            borderRadius: "8px",
                            zIndex: 999,
                        }}
                    >
                        <div className="overlay-content">
                            <h3>Enter Amount to Bet</h3>
                            <input
                                type="number"
                                value={betAmount}
                                onChange={(e) => setBetAmount(e.target.value)}
                            />
                            <button onClick={handleConfirmBet}>Confirm Bet</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WagerPage;
