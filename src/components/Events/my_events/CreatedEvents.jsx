import React, {PropTypes} from 'react';
<<<<<<< HEAD:client/src/components/Events/CreatedEvents.jsx
import axios from 'axios';
import {events} from '../..//Events/data.js';
import 'axios' from 'axios';

class CreatedEvents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: true
        }

    }

    getEvents() {
        //TODO get events created by the user
        //TODO get the list of registration for the event
        this.setState({

            events: events,
            registration: null,

        })
    }

    componentDidMount() {
        this.getEvents()
    }

    render() {
        if (this.state.events) {
            const listOfEvents = this.state.events.map((event) =>
                <div key={event.pk}>
                    <h3>{events.event_title}</h3>
                    <p>{events.event_desc}</p>
                </div>
            )

            return (
                {listOfEvents}
            )
        }
        else {
            return (
                <div>Loading</div>
            )
        }
    }
}

export default CreatedEvents;