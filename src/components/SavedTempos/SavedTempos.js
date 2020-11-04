import React, { Component } from 'react';
import './SavedTempos.css';
const SavedTempos = (props) => {
    const { songName } = props;
    const  { tempo } = props;
    const { clickHandler } = props;
    console.log(songName,  tempo)
    return (
        <div className="songs-container">
<button className="song-btn" onClick={() => clickHandler('custom', tempo)}>{songName}</button>
</div>
    )
}

export default SavedTempos