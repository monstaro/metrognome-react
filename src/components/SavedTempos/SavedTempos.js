import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SavedTempos.css';
import ListGroup from 'react-bootstrap/ListGroup';

const SavedTempos = (props) => {
    const { songName } = props;
    const  { tempo } = props;
    const { clickHandler } = props;
    const { currentTempo } = props;
    console.log(currentTempo, parseInt(tempo))
    const determineIfActive = () => {
        if (currentTempo === parseInt(tempo)) {
            return <ListGroup.Item as="li" className="song-name" active onClick={() => clickHandler('custom', tempo)} >
            {songName} ({tempo} BPM)
          </ListGroup.Item>
        } else {
            return <ListGroup.Item as="li" className="song-name" onClick={() => clickHandler('custom', tempo)} >
            {songName} ({tempo} BPM)
          </ListGroup.Item>
        }
    }
    return (
    <>
    <ListGroup as="ul" defaultActiveKey="#link1">
    {determineIfActive()}
    </ListGroup>
</>
    )
}

export default SavedTempos