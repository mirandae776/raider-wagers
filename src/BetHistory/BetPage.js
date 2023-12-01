import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const BetTable = () => {
    // State to store the retrieved data
    const [bets, setBets] = useState([]);

    // useEffect to run once when the component mounts
    useEffect(() => {
        // Get data from local storage using the key "bets"
        const storedBets = localStorage.getItem('bets');

        // Parse the JSON data and update the state
        if (storedBets) {
            setBets(JSON.parse(storedBets));
        }
    }, []);

    // Render a table with Bootstrap styling or a 'no results' message
    return (
        <div>
            <a className="nav-link" href="/raider-wagers/home#/home">Home</a>
            <h2>Bet History</h2>
            {bets.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                    <tr>
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
                            <td>{bet.amount}</td>
                            <td>{bet.odds}</td>
                            <td>{bet.prop}</td>
                            <td>{bet.propName}</td>
                            <td>
                                <Button variant="danger">Cancel</Button>
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
