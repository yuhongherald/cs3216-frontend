import React, {PropTypes} from 'react';
import userController from '../../../controllers/userController.js';
import {Link} from "react-router";
import '../my_events/css/Schedule.css';
import Helpers from "../../../modules/Helpers";
import Modal from 'react-responsive-modal';
import eventController from "../../../controllers/eventController";

class MySchedule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: false,
            toggle: {
                one: true,
                two: false,
                three: false,
                four: false
            },
            unFilteredEvents: false,
            openConfirmModal: false,
            error: false,
            currentEvent: false
        }
        this.readImage = this.readImage.bind(this);
        this.mapEventCategory = this.mapEventCategory.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.onOpenConfirmModal = this.onOpenConfirmModal.bind(this);
        this.onCloseConfirmModal = this.onCloseConfirmModal.bind(this);
        this.onClickConfirm = this.onClickConfirm.bind(this);
        this.getTodayEvents = this.getTodayEvents.bind(this);
        this.getEventInWeeks = this.getEventInWeeks.bind(this);
        this.resetEvents = this.resetEvents.bind(this);
        this.getEventInMonths = this.getEventInMonths.bind(this);
    }

    getTodayEvents(){
        if (this.state.events){
            let todayEvents = [];
            this.state.events.forEach(event => {
                let eventDate = new Date(Helpers.dateConvert(event.fields.event_start_date));
                if (Helpers.isToday(eventDate)){
                    todayEvents.push(event)
                }
            });
            this.setState({
                events: todayEvents
            })
        }

    }

    getEventInWeeks() {
        if (this.state.unFilteredEvents){
            let thisWeekEvents = [];
            this.state.unFilteredEvents.forEach(event => {
                let eventDate = new Date(Helpers.dateConvert(event.fields.event_start_date));
                if (Helpers.isInWeek(eventDate)){
                    thisWeekEvents.push(event)
                }
            });
            this.setState({
                events: thisWeekEvents
            })
        }
    }


    getEventInMonths() {
        if (this.state.unFilteredEvents){
            let thisMonthEvents = [];
            this.state.unFilteredEvents.forEach(event => {
                let eventDate = new Date(Helpers.dateConvert(event.fields.event_start_date));
                if (Helpers.isInMonth(eventDate)){
                    thisMonthEvents.push(event)
                }
            });
            this.setState({
                events: thisMonthEvents
            })
        }
    }

    resetEvents() {
        if (this.state.unFilteredEvents){
            this.setState({
                events: this.state.unFilteredEvents
            });
        }
    }

    toggleFilter(e){
        const newObj = {
            [e.target.id]: !this.state.toggle[e.target.id]
        };
        this.setState({
            toggle: newObj
        });
        if (e.target.id === 'one'){
            this.resetEvents();
        }
        else if (e.target.id === 'two') {
            this.getTodayEvents();
        }
        else if (e.target.id === 'three') {
            this.getEventInWeeks();
        }
        else if (e.target.id === 'four') {
            this.getEventInMonths();
        }
    }

    getData() {
        userController.eventParticipated().then(response => {
            if (response.status === 'success') {
                this.setState({
                    events: JSON.parse(response.events),
                    unFilteredEvents: JSON.parse(response.events)
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

    mapEventCategory(event){
        let mapList = {
            "0": "arts",
            "1": "food",
            "2": "sports",
            "3": "social"
        };
        if (event in mapList){
            return mapList[event];
        }
    }

    onOpenConfirmModal(id) {
        this.setState({
            openConfirmModal: true,
            currentEvent: id
        });

    };

    onCloseConfirmModal() {
        this.setState({openConfirmModal: false});
    };

   onClickConfirm(){
       let postData = {
           eid: this.state.currentEvent,
           op_type: 2
       };
       eventController.participateEvent(postData).then(response => {
           if (response.status === 'success') {
               this.getData();
               setTimeout(this.onCloseConfirmModal(), 2000);
           }
           else {
               this.setState({
                   error: response.desc
               });
           }
       });
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
                                <p><span>Participants: </span>{event.fields.num_participants}</p>
                                <p><span>Date:</span> {Helpers.dateConvert(event.fields.event_start_date)}</p>
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

                                <div style={{width: '120px', float: 'right', paddingBottom: '20px'}}>
                                    <button type="button" className="schedule-button" onClick={() => this.onOpenConfirmModal(event.pk)}>Unparticipating
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            );

            return (

                <div>
                    <Modal open={this.state.openConfirmModal} onClose={this.onCloseConfirmModal} center
                           className="popup centred">
                        <span className="yes-reply centred"></span>
                        <span className="no-reply centred"></span>
                        <p>Are you sure you want to unparticipate? </p>
                        <div className="button yes transition" style={{float: 'right'}}
                             onClick={this.onClickConfirm}>Confirm
                        </div>
                        <div className="button no transition" style={{float: 'right'}}
                             onClick={this.onCloseConfirmModal}>Cancel
                        </div>
                        <div className="error-message" style={{display: 'block', marginTop: '60px', textAlign: 'center'}}>
                            {
                                this.state.error ?(
                                    <div>{this.state.error}. Please try again</div>
                                ) : (
                                    <div></div>
                                )
                            }
                        </div>

                    </Modal>
                    <div style={{display: 'flex', flexDirection: 'row', margin: '20px 0px 20px 10px'}}>
                        <div className={this.state.toggle.one ? 'filter-active' : 'filter-inactive'} id="one" onClick={this.toggleFilter}>All</div>
                        <div className={this.state.toggle.two ? 'filter-active' : 'filter-inactive'} id="two" onClick={this.toggleFilter}>Today</div>
                        <div className={this.state.toggle.three ? 'filter-active' : 'filter-inactive'} id="three" onClick={this.toggleFilter}>This week</div>
                        <div  className={this.state.toggle.four ? 'filter-active' : 'filter-inactive'}  id="four" onClick={this.toggleFilter}>This month</div>
                    </div>
                    <div>
                        {listOfEvents}
                    </div>
                </div>
            )
        }

        else if (!this.state.events[0] && this.state.events) {
            return (
                <div>
                    <div style={{display: 'flex', flexDirection: 'row', margin: '20px 0px 20px 10px'}}>
                        <div className={this.state.toggle.one ? 'filter-active' : 'filter-inactive'} id="one" onClick={this.toggleFilter}>All</div>
                        <div className={this.state.toggle.two ? 'filter-active' : 'filter-inactive'} id="two" onClick={this.toggleFilter}>Today</div>
                        <div className={this.state.toggle.three ? 'filter-active' : 'filter-inactive'} id="three" onClick={this.toggleFilter}>This week</div>
                        <div  className={this.state.toggle.four ? 'filter-active' : 'filter-inactive'}  id="four" onClick={this.toggleFilter}>This month</div>
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

export default MySchedule;