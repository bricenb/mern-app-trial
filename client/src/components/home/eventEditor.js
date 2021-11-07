import React, {useEffect, useState} from "react";
import axios from 'axios';

function EventEditor({getEvent, setEventEditorOpen, editEventData}) {
    const[editorTitle, setEditorTitle] = useState("");
    const[editorName, setEditorName] = useState("");
    const[editorTime, setEditorTime] = useState("");
    const[editorLoc, setEditorLoc] = useState("");
    const[editorDes, setEditorDes] = useState("");

    useEffect(() => {
        if(editEventData) {
            setEditorTitle(editEventData.title);
            setEditorName(editEventData.name);
            setEditorTime(editEventData.time);
            setEditorLoc(editEventData.location);
            setEditorDes(editEventData.description);
        }
    }, [editEventData]);

    async function saveEvent(e) {
        e.preventDefault();

        const eventData = {
            name: editorName,
            title: editorTitle,
            time: editorTime,
            location: editorLoc,
            description: editorDes
        };

        if(!editEventData) {
            await axios.post("http://localhost:5000/customer/", eventData);
        }
        else {
            await axios.put(`http://localhost:5000/customer/${editEventData._id}`, eventData);
        }

        getEvent();

       closeEditor();
    }

    function closeEditor() {
        setEventEditorOpen(false);
        setEditorName("");
        setEditorTitle("");
        setEditorTime("");
        setEditorLoc("");
        setEditorDes("");
    }

    return  (
    <div className="event-editor">
    <form onSubmit={saveEvent}>

        <label htmlFor="editor-title">Title</label>
        <input 
        id="editor-title"
        type="text"
        value={editorTitle}
        onChange={(e) => setEditorTitle(e.target.value)}
            />

        <label htmlFor="editor-name">name</label>
        <input
        id="editor-name"
        type="text" 
        value={editorName}
        onChange={(e) => setEditorName(e.target.value)}
        />

        <label htmlFor="editor-time">Time</label>
        <input
        id="editor-time"
        type="text"
        value={editorTime}
        onChange={(e) => setEditorTime(e.target.value)}
        />

        <label htmlFor="editor-loc">Location</label>
        <input
        id="editor-loc"
        type="text"
        value={editorLoc}
        onChange={(e) => setEditorLoc(e.target.value)}
        />

        <label htmlFor="editor-des">Description</label>
        <textarea
        id="editor-des"
        type="text"
        value={editorDes}
        onChange={(e) => setEditorDes(e.target.value)}
        />

        <button type="submit">save event</button>
        <button type="button" onClick={closeEditor}>cancel</button>
    </form>
</div>
    );
};

export default EventEditor;