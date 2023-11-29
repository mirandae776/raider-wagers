import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import initialGames from '../InitialGames.json';

const EventsPage = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        setGames(initialGames);
    }, []);
    return (
        <div>
            {games.map(sportingEvent =>
                <Link to={`/wager?gameID=${sportingEvent.gameID}`} key={sportingEvent.gameID}>
                    <h1>{`Raiders vs ${sportingEvent.opponent}`}</h1>
                    <h2>{sportingEvent.date}</h2>
                    <h2>{sportingEvent.location}</h2>
                </Link>
            )}
        </div>
    );
};


export default EventsPage;