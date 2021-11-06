import axios from 'axios';
import React, {useEffect, useState} from 'react';

function Home() {
    const[event,setEvent] = useState([]);

    useEffect(() => {
        //get events
        getEvent();
    },[]);

    async function getEvent() {
        const eventRes = await axios.get("http://localhost:5000/customer/");
        setEvent(eventRes.data);
    }


    return (
        <div><h1>Home</h1></div>
    ); 
}

export default Home;