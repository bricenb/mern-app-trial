import axios from "axios";
import React from "react";

function Event({event, getEvent, editEvent}) {
    async function deleteEvent() {
        await axios.delete(`http://localhost:5000/customer/${event._id}`);

        getEvent();
    }

   

    return (
    <div className="event">
        {event.title && <h2>{event.title}</h2>}
        {event.name && <p>{event.name}</p>}
        {event.time && <p>{event.time}</p>}
        {event.location && <p>{event.location}</p>}
        {event.description && <p>{event.description}</p>}

        <button onClick={() => editEvent(event)}>Edit</button>

        <button onClick={deleteEvent}>Delete</button>

    </div>
    );
}

export default Event;