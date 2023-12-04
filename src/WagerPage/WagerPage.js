import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import allGames from '../InitialGames.json';
import { v4 as uuidv4 } from 'uuid';
import Table from "react-bootstrap/Table";
import 'bootstrap/dist/css/bootstrap.min.css';

const WagerPage = ({ currDoubloons, setCurrDoubloons }) => {
    const [bets, setBets] = useState([]);
    const [selectedBet, setSelectedBet] = useState(null);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [isConfirmationOverlayVisible, setIsConfirmationOverlayVisible] = useState(false);
    const [betAmount, setBetAmount] = useState(0);

    const navigate = useNavigate();
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const gameID = parseInt(queryParams.get("gameID"));
    const overlayQueryParam = queryParams.get("showOverlay");

    useEffect(() => {
        const fetchData = async () => {
            if (gameID) {
                const selectedGame = allGames.filter(game => game.gameID === gameID);
                setBets(selectedGame[0].bets);
            }
        };
        fetchData();
    }, [gameID]);

    useEffect(() => {
        setIsOverlayVisible(overlayQueryParam === "true");
    }, [overlayQueryParam]);

    const handleBetClick = (bet) => {
        setSelectedBet(bet);
        setIsOverlayVisible(true);

        const newSearchParams = new URLSearchParams(search);
        newSearchParams.set("showOverlay", "true");
        navigate(`?${newSearchParams.toString()}`);
    };

    const handleConfirmBet = () => {
        const currentDabloons = parseInt(localStorage.getItem('dabloons'));
        setCurrDoubloons(currentDabloons);
        if (currentDabloons >= betAmount && betAmount > 0){
            localStorage.setItem('dabloons', `${currentDabloons-betAmount}`);
            const placedBet = selectedBet;
            placedBet.uid = uuidv4();
            placedBet.amount = betAmount;
            setCurrDoubloons(currentDabloons - betAmount);

            const existingBets = localStorage.getItem('bets');
            let existingBetsArray
            if (existingBets) {
                existingBetsArray = JSON.parse(existingBets);
            } else {
                existingBetsArray = [];
            }
            existingBetsArray.push(placedBet);
            localStorage.setItem('bets', JSON.stringify(existingBetsArray));

            setSelectedBet(null);
            setIsOverlayVisible(false);
            setBetAmount(0);
            setIsConfirmationOverlayVisible(true)
        } else{
            console.log('not enough dabloons for bet');
        }
    };

    const handleReuseLastBetAmount = () => {
        const existingBets = JSON.parse(localStorage.getItem('bets'));
        if (existingBets && existingBets.length > 0) {
            const lastBet = existingBets[existingBets.length - 1].amount
            const inputButton = document.getElementById("inputButton")
            inputButton.value = lastBet
        } else {
            console.log("Something happened to the bets in local storage")
        }
    }

    const  handleUndoLastBet = () => {

    };
    return (
        <div>
            <p>Available Bets</p>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Property Name</th>
                    <th>Property</th>
                    <th>Odds</th>
                    <th>Place Bet</th>
                </tr>
                </thead>
                <tbody>
                {bets.map((bet) => (
                    <tr key={`${bet.propName}-${bet.prop}-${bet.odds}`}>
                        <td>{bet.date}</td>
                        <td>{bet.propName}</td>
                        <td>{bet.prop}</td>
                        <td>{bet.odds}</td>
                        <td>
                            <button onClick={() => handleBetClick(bet)}>
                                Place Bet
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
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
                            background: "rgba(0, 0, 0, 0.5)",
                            zIndex: 998,
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ marginRight: '10px' }}>Enter Amount to Bet</h3>
                                <button onClick={() => setIsOverlayVisible(false)}>X</button>
                            </div>

                            <input
                                type="number"
                                id="inputButton"
                                value={betAmount}
                                onChange={(e) => setBetAmount(e.target.value)}
                            />
                            <button onClick={handleConfirmBet}>Confirm Bet</button>
                            <button
                                onClick={handleReuseLastBetAmount}
                                disabled={
                                    (() => {
                                        const existingBets = JSON.parse(localStorage.getItem('bets'));
                                        return !(existingBets !== null && existingBets.length > 0);
                                    })()
                                }
                            >
                                Reuse last bet amount
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isConfirmationOverlayVisible && (

                <div className={"overlay-content"}
                     style={{
                         position: "fixed",
                         top: "65%",
                         left: "50%",
                         transform: "translate(-50%, -50%)",
                         background: "#fff",
                         color: "#000",
                         padding: "20px",
                         borderRadius: "8px",
                         zIndex: 999,
                     }}

                >
                    <button onClick={() => setIsConfirmationOverlayVisible(false)}>X</button>
                    <p>Bet has been placed</p>
                    <button onClick={() => handleUndoLastBet}>Undo bet</button>
                </div>
            )


            }
        </div>
    );
};

export default WagerPage;
