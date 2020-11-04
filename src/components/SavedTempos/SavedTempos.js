import React, { Component } from 'react';
import './SavedTempos.css';
const SavedTempos = (props) => {
    const { songName } = props;
    const  { tempo } = props;
    console.log(songName,  tempo)
    return (
        <div className="songs-container">
<button className="song-btn">{songName}</button>
</div>
    )
}

export default SavedTempos