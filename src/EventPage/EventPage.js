import React from "react";
import {Link} from "react-router-dom";


const EventsPage = () => {
    const events = [];
    return (
        <div>
            {events.map(sportingEvent =>
                <Link to={`/wager?gameID=${sportingEvent.gameID}`}>
                    <h1>{`Raiders vs ${sportingEvent.opponent}`}</h1>
                    <h2>{sportingEvent.date}</h2>
                    <h2>{sportingEvent.location}</h2>
                </Link>
            )}
        </div>
    );
};


export default EventsPage;