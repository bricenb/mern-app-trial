import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Event from "./event";
import EventEditor from './eventEditor';

function Home() {
    const[event,setEvent] = useState([]);
    const [evetEditorOpen, setEventEditorOpen] = useState(false);
    const [editEventData, setEditEventData] = useState(null);
    


    useEffect(() => {
        //get events
        getEvent();
    },[]);

    async function getEvent() {
        const eventRes = await axios.get("http://localhost:5000/customer/");
        setEvent(eventRes.data);
    }

    function editEvent (eventData) {
        setEditEventData(eventData);
        setEventEditorOpen(true);
    }

    function renderEvent() {
        return (
                event.map((event,i) =>{ return <Event key={i} event={event} getEvent={getEvent}
                editEvent={editEvent}
                />
            })
        );
    }

    return (
        <div className="home">
            {!evetEditorOpen && (<button onClick={() => setEventEditorOpen(true)}>
                Add event
                </button>
            )}
            {evetEditorOpen && (
                <EventEditor
                setEventEditorOpen={setEventEditorOpen}
                getEvent={getEvent}
                editEventData={editEventData}
                />
                )}
            {renderEvent()}
        </div>
    ); 
}

export default Home;