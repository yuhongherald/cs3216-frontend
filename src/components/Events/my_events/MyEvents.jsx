import React, {PropTypes} from 'react';
import {events} from '../..//Events/data.js';
import userController from "../../../controllers/userController";
import {Link} from 'react-router';
import Modal from 'react-responsive-modal';
import ParticipantsList from "./ParticipantsList.jsx";
import Views from "./Views.jsx";
import Helpers from "../../../modules/Helpers";
import eventController from "../../../controllers/eventController";
import EditEvent from "./EditEvent.jsx";

class MyEvents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: false,
            open: false,
            openClosingModal: false,
            openDeletingModal: false,
            openEditingModal: false,
            currentEvent: false,
            toggle: {
                one: true,
                two: false
            },
            activeEvents: [],
            endedEvents: [],
            pendingEvents: false

        };
        this.readImage = this.readImage.bind(this);
        this.mapEventCategory = this.mapEventCategory.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onCloseClosingModal = this.onCloseClosingModal.bind(this);
        this.onOpenClosingModal = this.onOpenClosingModal.bind(this);
        this.onClickConfirm = this.onClickConfirm.bind(this);
        this.onCloseDeletingModal = this.onCloseDeletingModal.bind(this);
        this.onOpenDeletingModal = this.onOpenDeletingModal.bind(this);
        this.onClickDeleteConfirm = this.onClickDeleteConfirm.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.onOpenEditingModal = this.onOpenEditingModal.bind(this);
        this.onCloseEditingModal = this.onCloseEditingModal.bind(this);
    }

    onOpenDeletingModal(id) {
        this.setState({
            openDeletingModal: true,
            currentEvent: id
        });
    }

    onOpenEditingModal(event) {
        this.setState({
           editedEvent: event,
            openEditingModal: true
        });
    }

    onCloseEditingModal() {
        this.setState({
            openEditingModal: false
        })
    }


    toggleFilter(e) {
        const newObj = {
            [e.target.id]: !this.state.toggle[e.target.id]
        };
        this.setState({
            toggle: newObj
        });
        if (e.target.id === 'one') {
            // this.resetEvents();
            this.setState({
                events: this.state.activeEvents
            })
        }
        else if (e.target.id === 'two') {
            this.setState({
                events: this.state.endedEvents
            })
        }
    }

    onCloseDeletingModal() {
        this.setState({openDeletingModal: false});
    }

    onClickDeleteConfirm() {
        let postData = {
            eid: this.state.currentEvent
        };
        eventController.deleteEvent(postData).then(response => {
            if (response.status === 'success') {
                this.getData();
                setTimeout(this.onCloseDeletingModal(), 2000);
            }
            else {
                this.setState({
                    error: response.desc
                });
            }
        });
    }

    onOpenClosingModal(id) {
        this.setState({
            openClosingModal: true,
            currentEvent: id
        });
    }

    onCloseClosingModal() {
        this.setState({openClosingModal: false});
    }

    onClickConfirm() {
        let postData = {
            eid: this.state.currentEvent
        };
        eventController.closeEvent(postData).then(response => {
            if (response.status === 'success') {
                this.getData();
                setTimeout(this.onCloseClosingModal(), 2000);
            }
            else {
                this.setState({
                    error: response.desc
                });
            }
        });
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
                if (JSON.parse(response.events)[0]) {
                    this.setState({
                        eventTitle: JSON.parse(response.events)[0].fields.event_title,
                        currentEvent: JSON.parse(response.events)[0].pk,
                        events: JSON.parse(response.events).filter(function (event) {
                            return event.fields.state === 1
                        }),
                        activeEvents: JSON.parse(response.events).filter(function (event) {
                            return event.fields.state === 1
                        }),
                        endedEvents: JSON.parse(response.events).filter(function (event) {
                            return event.fields.state === 3
                        })
                    })
                }
                else {
                    this.setState({
                        eventTitle: null,
                        currentEvent: null,
                        events: [],
                    });
                }
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
                <img style={{width: '100%', height: '250px'}} src={`https://boredgowhere.live/media/${file}`}/>
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
                                    <button type="button" className="participant-list" ref={event.pk}
                                            onClick={() => this.openModal(event.pk, event.fields.event_title)}>See the
                                        list
                                    </button>
                                </p>
                                <Views eid={event.pk}/>
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

                                {
                                    event.fields.state !== 3 ? (
                                        <div>
                                            <div style={{width: '120px', float: 'left', paddingBottom: '20px'}}>
                                                <button type="button" className="close-event-button"
                                                        onClick={() => this.onOpenClosingModal(event.pk)}>Close event
                                                </button>
                                            </div>
                                            <div style={{width: '60px', float: 'right', paddingBottom: '20px'}}>
                                                <button type="button" className="delete-button"
                                                        onClick={() => this.onOpenDeletingModal(event.pk)}><i
                                                    className="far fa-trash-alt"
                                                    style={{fontSize: '18px', color: "FF5A5F", padding: '0px 0px'}}></i>
                                                </button>
                                            </div>
                                            <div style={{width: '40px', float: 'right', paddingBottom: '20px'}}>
                                                <button type="button" className="delete-button"
                                                        onClick={() => this.onOpenEditingModal(event)}><i
                                                    className="fas fa-edit"
                                                    style={{fontSize: '18px', color: "FF5A5F", padding: '0px 0px'}}></i>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div style={{width: '80px', float: 'right', paddingBottom: '20px'}}>
                                                <button type="button" className="register-button">Ended
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>

                </div>
            );


            return (
                <div>

                    <Modal open={this.state.openDeletingModal} onClose={this.onCloseDeletingModal} center
                           className="popup centred">
                        <span className="yes-reply centred"></span>
                        <span className="no-reply centred"></span>
                        <p>Are you sure you want to DELETE the event? </p>
                        <div className="button yes transition" style={{float: 'right'}}
                             onClick={this.onClickDeleteConfirm}>Confirm
                        </div>
                        <div className="button no transition" style={{float: 'right'}}
                             onClick={this.onCloseConfirmModal}>Cancel
                        </div>
                        <div className="error-message"
                             style={{display: 'block', marginTop: '60px', textAlign: 'center'}}>
                            {
                                this.state.error ? (
                                    <div>{this.state.error}. Please try again</div>
                                ) : (
                                    <div></div>
                                )
                            }
                        </div>

                    </Modal>


                    {
                        this.state.editedEvent ? (
                            <Modal open={this.state.openEditingModal} onClose={this.onCloseEditingModal} center
                                   className="popup centred">
                                <EditEvent
                                    eid={this.state.editedEvent.pk}
                                    event_title={this.state.editedEvent.fields.event_title}
                                    address={this.state.editedEvent.fields.address}
                                    event_desc={this.state.editedEvent.fields.event_desc}
                                    event_type={this.state.editedEvent.fields.event_type}
                                    max_quota={this.state.editedEvent.fields.max_quota}
                                    event_start_time={this.state.editedEvent.fields.event_start_date.split(" ")[1]}
                                    event_end_time={this.state.editedEvent.fields.event_end_date.split(" ")[1]}
                                    event_start_date={this.state.editedEvent.fields.event_start_date.split(" ")[0]}
                                    event_end_date={this.state.editedEvent.fields.event_end_date.split(" ")[0]}
                                    lat={this.state.editedEvent.fields.lat}
                                    lng={this.state.editedEvent.fields.lng}
                                />
                                <div className="button no transition" style={{float: 'right'}}
                                     onClick={this.onCloseEditingModal}>Close
                                </div>

                            </Modal>
                        ) : (
                            <div></div>
                        )
                    }


                    <div>
                        <h4 style={{padding: "10px 10px 10px 10px"}}>Manage my events</h4>
                    </div>

                    <div>
                        <div style={{display: 'flex', flexDirection: 'row', margin: '20px 0px 20px 10px'}}>
                            <div className={this.state.toggle.one ? 'filter-active' : 'filter-inactive'} id="one"
                                 onClick={this.toggleFilter}>Active
                            </div>
                            <div className={this.state.toggle.two ? 'filter-active' : 'filter-inactive'} id="two"
                                 onClick={this.toggleFilter}>Ended
                            </div>
                        </div>

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
                <div>
                    <div>
                        <h4 style={{padding: "10px 10px 10px 10px"}}>Manage my events</h4>
                    </div>

                    <div>
                        <div style={{display: 'flex', flexDirection: 'row', margin: '20px 0px 20px 10px'}}>
                            <div className={this.state.toggle.one ? 'filter-active' : 'filter-inactive'} id="one"
                                 onClick={this.toggleFilter}>Active
                            </div>
                            <div className={this.state.toggle.two ? 'filter-active' : 'filter-inactive'} id="two"
                                 onClick={this.toggleFilter}>Ended
                            </div>
                        </div>
                    </div>

                    <div style={{height: '1000px', color: 'rgb(255, 90, 95)'}}>Oops! We cannot find any event</div>
                </div>
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