import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MongoClient } from 'mongodb';

const WagerPage = () => {
    const [bets, setBets] = useState([]);
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const gameID = queryParams.get("gameID");

    useEffect(() => {
        const fetchData = async () => {
            const client = new MongoClient('mongodb://localhost:27017/test');
            await client.connect();
            const db = client.db('RaiderWagers');
            const collection = db.collection('games');
            const result = await collection.find({ gameID }).toArray();
            setBets(result[0].bets)
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
