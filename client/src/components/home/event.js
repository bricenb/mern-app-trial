import React from "react";

function Event({event}) {
    return (
    <div className="event">
        {event.title && <h2>{event.title}</h2>}
        {event.name && <p>{event.name}</p>}
        {event.time && <p>{event.time}</p>}
        {event.location && <p>{event.location}</p>}
        {event.description && <p>{event.description}</p>}
    </div>)
    ;
};

export default Event;