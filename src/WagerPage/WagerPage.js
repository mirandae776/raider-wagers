import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import allGames from '../AthleticEvents.json';
import { v4 as uuidv4 } from 'uuid';
import Table from "react-bootstrap/Table";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";

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

        queryParams.set("showOverlay", "true");
        navigate(`?gameID=${gameID}&showOverlay=true`);
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
            setBetAmount(lastBet);
        } else {
            console.log("Something happened to the bets in local storage")
        }
    }

    const  handleUndoLastBet = () => {
        const existingBets = JSON.parse(localStorage.getItem('bets'));
        const totalDabloons = parseInt(localStorage.getItem('dabloons'));
        let lastBet = existingBets.pop();
        let refundedAmount = parseInt(lastBet.amount);
        localStorage.setItem('bets',JSON.stringify(existingBets));
        localStorage.setItem('dabloons',refundedAmount + totalDabloons);
        setCurrDoubloons(refundedAmount + totalDabloons);
        setIsConfirmationOverlayVisible(false);
    };
    return (
        <div>
            <p>Available Bets</p>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Prop Name</th>
                    <th>Prop</th>
                    <th>Odds</th>
                    <th>Place Bet</th>
                </tr>
                </thead>
                <tbody>
                {bets.map((bet) => (
                    <tr key={`${bet.propName}-${bet.prop}-${bet.odds}`}>
                        <td>{bet.propName}</td>
                        <td>{bet.prop}</td>
                        <td>{bet.odds}</td>
                        <td>
                            <Button onClick={() => handleBetClick(bet)}>
                                Place Bet
                            </Button>
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
                                <button onClick={() => {
                                    setIsOverlayVisible(false);
                                    queryParams.set("showOverlay", "false");
                                    navigate(`?gameID=${gameID}&showOverlay=false`);
                                }}>X</button>
                            </div>

                            <input
                                type="number"
                                id="inputButton"
                                value={betAmount}
                                onChange={(e) => setBetAmount(e.target.value)}
                            />
                            <Button variant={"primary"} onClick={handleConfirmBet}>Confirm Bet</Button>
                            <Button
                                onClick={handleReuseLastBetAmount}
                                variant={"primary"}
                                disabled={
                                    (() => {
                                        const existingBets = JSON.parse(localStorage.getItem('bets'));
                                        return !(existingBets !== null && existingBets.length > 0);
                                    })()
                                }
                            >
                                Reuse last bet amount
                            </Button>
                        </div>
                    </div>
                </div>
            )}



            {isConfirmationOverlayVisible && (

                <div>
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



                <div className={"overlay-content"}
                     style={{
                         position: "fixed",
                         top: "65%",
                         left: "50%",
                         transform: "translate(-50%, -50%)",
                         background: "#ffffff",
                         color: "#000",
                         padding: "20px",
                         borderRadius: "8px",
                         zIndex: 999,
                     }}

                >
                    <button onClick={() => setIsConfirmationOverlayVisible(false)} class="btn btn-primary">Continue</button>
                    <p class="fs-3" >Bet has been placed</p>
                    <button onClick={handleUndoLastBet} class="btn btn-danger">Undo bet</button>
                </div>
                </div>
            )

            }
        </div>

    );
};

export default WagerPage;
