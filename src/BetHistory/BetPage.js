import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const BetTable = () => {
    const [bets, setBets] = useState([]);

    useEffect(() => {
        const storedBets = localStorage.getItem('bets');
        if (storedBets) {
            setBets(JSON.parse(storedBets));
        }
    }, []);

    const handleDelete = (uid, gameDate) => {
        // Filter out the bet with the specified UUID
        console.log(uid)
        const updatedBets = bets.filter((bet) => bet.uid !== uid);
        const now = new Date();
        const currentDate = now.toLocaleDateString();

        // Check if the current date is past the game date
        if (new Date(currentDate) > new Date(gameDate)) {
            console.log('No, cannot delete. Game date has already passed.');
            return; // Exit the function without updating state or local storage
        }

        // Update the state and local storage with the modified data
        setBets(updatedBets);
        localStorage.setItem('bets', JSON.stringify(updatedBets));
    };


    return (
        <div>
            <a className="nav-link" href="/raider-wagers/home#/home">Home</a>
            <h2>Bet History</h2>
            {bets.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Game Date</th>
                        <th>Amount</th>
                        <th>Odds</th>
                        <th>Prop</th>
                        <th>Prop Name</th>
                        <th>Cancel</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bets.map((bet, index) => (
                        <tr key={index}>
                            <td>{bet.date}</td>
                            <td>{bet.amount}</td>
                            <td>{bet.odds}</td>
                            <td>{bet.prop}</td>
                            <td>{bet.propName}</td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(bet.uid)}>
                                    Cancel
                                </Button>
                                {''}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            ) : (
                <p>When you start to place bets, you can find the history here</p>
            )}
        </div>
    );
};

export default BetTable;
