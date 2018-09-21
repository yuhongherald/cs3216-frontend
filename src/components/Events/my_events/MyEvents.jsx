import React, {PropTypes} from 'react';
import {events} from '../..//Events/data.js';
import userController from "../../../controllers/userController";
import {Link} from 'react-router';
import Modal from 'react-responsive-modal';
import ParticipantsList from "./ParticipantsList.jsx";
import Views from "./Views.jsx";
import Helpers from "../../../modules/Helpers";

class MyEvents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: false,
            open: false

        };
        this.readImage = this.readImage.bind(this);
        this.mapEventCategory = this.mapEventCategory.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(id, title) {
        this.setState({
            currentEvent: id,
            eventTitle: title
        });
        this.setState({
            open: true
        })
    }

    closeModal() {
        this.setState({
            open: false
        });
    }


    getData() {
        userController.eventCreated().then(response => {
            if (response.status === 'success') {
                this.setState({
                    eventTitle: JSON.parse(response.events)[0].fields.event_title,
                    currentEvent: JSON.parse(response.events)[0].pk,
                    events: JSON.parse(response.events),
                });
            }
            else {
                this.setState({
                    error: response.desc
                });
            }
        });
    }


    readImage(file) {
        if (file) {
            return (
                <img style={{width: '100%', height: '250px'}} src={`http://54.169.251.138/media/${file}`}/>
            )
        }
        else {
            return (
                <img style={{width: '100%', height: '250px'}}
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQhWs2_oaas5sO0iEjtkZKIBG5Civh0-X3Tk1eoO2rnFVLJBdviw"/>
            )
        }
    }

    mapEventCategory(event) {
        let mapList = {
            "0": "arts",
            "1": "food",
            "2": "sports",
            "3": "social"
        };
        if (event in mapList) {
            return mapList[event];
        }
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        if (!this.state.events) {
            return (
                <div style={{height: '1000px'}}>
                    <div className="guru-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )
        }
        else if (this.state.events && this.state.events[0]) {
            let events = this.state.events;
            const listOfEvents = events.map((event) =>
                <div key={event.pk} className="row" style={{marginBottom: '-40px'}}>
                    <div className="item col-md-4">
                        <Link to={`/events/${event.pk}`}>
                            {this.readImage(event.fields.image)}
                        </Link>
                        <div className="col-md-12 events-description eventslistartist-grid">
                            <span className="country-label"
                                  style={{
                                      textTransform: 'uppercase',
                                      backgroundColor: "#FF5A5F"
                                  }}>{this.mapEventCategory(event.fields.event_type)}</span>
                            <div className="events-text">
                                <Link to={`/events/${event.pk}`}><h3
                                    style={{textTransform: 'uppercase'}}>{event.fields.event_title}</h3></Link>
                                <p><span>Participants: </span>{event.fields.num_participants}
                                    <button type="button" className="participant-list" ref={event.pk} onClick={() => this.openModal(event.pk, event.fields.event_title)}>See the list
                                    </button>
                                </p>
                                <Views eid={event.pk} />
                                <p><span>Date: </span>{Helpers.dateConvert(event.fields.event_start_date)}</p>
                                <p><span><i className="fas fa-map-marker-alt"
                                            style={{
                                                fontSize: '14px',
                                                padding: '2px 3px 2px 3px',
                                                color: 'rgb(0, 132, 137)',
                                                borderRadius: '50%',
                                                backgroundColor: 'white',
                                                border: '1px solid #ccc',
                                                margin: '0px 13px 0px 5px'

                                            }}></i></span>{event.fields.address}</p>

                                <div style={{width: '80px', float: 'right', paddingBottom: '20px'}}>
                                    <button type="button" className="schedule-button">Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            );

            return (
                <div>
                    <div>
                        <h4 style={{padding: "10px 10px 10px 10px"}}>Manage my events</h4>
                    </div>
                    <div>
                        {listOfEvents}
                    </div>
                    <Modal open={this.state.open}
                           onClose={this.closeModal} center>
                        <ParticipantsList eid={this.state.currentEvent} eventTitle={this.state.eventTitle}/>
                    </Modal>
                </div>
            )
        }

        else if (!this.state.events[0] && this.state.events) {
            return (
                <div style={{height: '1000px', color: 'rgb(255, 90, 95)'}}>Oops! We cannot find any event</div>
            )
        }
        else if (this.state.error) {
            return (
                <div style={{height: '1000px', color: 'rgb(255, 90, 95)'}}>{this.state.error}</div>
            )
        }
        else {
            return (
                <div style={{height: '1000px'}}>
                    <div className="guru-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )
        }
    }
}

export default MyEvents;