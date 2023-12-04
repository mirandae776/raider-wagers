import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import initialGames from '../InitialGames.json';
import Table from "react-bootstrap/Table";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";

const EventsPage = () => {
    const [games, setGames] = useState([]);


    const handleNavigateToGame = (gameID) => {
        // eslint-disable-next-line no-restricted-globals
        history.push(`/wager?gameID=${gameID}`);
    };

    useEffect(() => {
        setGames(initialGames);
    }, []);
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Date</th>
                <th>Opponent</th>
                <th>location</th>
                <th>Props</th>
            </tr>
            </thead>
            <tbody>
            {games.map((sportingEvent) => (
                <tr>
                    <td>{sportingEvent.date}</td>
                    <td>{`Raiders vs ${sportingEvent.opponent}`}</td>
                    <td>{sportingEvent.location}</td>
                    <td>
                        <Button>
                            <a className="nav-link" href={`#/wager?gameID=${sportingEvent.gameID}` }>
                                View Props
                            </a>

                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};


export default EventsPage;