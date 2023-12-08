import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";

const EventsPage = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchAllGames = async () => {
            try {
                const response = await fetch(process.env.PUBLIC_URL + '/db/AthleticEvents.rwdb');
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error('Error fetching JSON data:', error);
            }
        };
        fetchAllGames();
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
                <tr key={`${sportingEvent.oponent}-${sportingEvent.date}`}>
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