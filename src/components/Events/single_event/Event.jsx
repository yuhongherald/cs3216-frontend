import React, {PropTypes} from 'react';
import Modal from 'react-responsive-modal';
import '../css/Event.css';
import Auth from "../../../modules/Auth";
import {browserHistory} from "react-router";
import eventController from "../../../controllers/eventController";
import Comments from "../../Comments/Comments.jsx";
import {Link} from "react-router";


// Showing one event details
class Event extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            event: false,
            openConfirmModal: false,
            error: false,
            isParticipated: false,
            confirmEvent: false,
            views: false
        }
        this.onOpenConfirmModal = this.onOpenConfirmModal.bind(this);
        this.onCloseConfirmModal = this.onCloseConfirmModal.bind(this);
        this.onClickConfirm = this.onClickConfirm.bind(this);
        this.getData = this.getData.bind(this);
        this.readImage = this.readImage.bind(this);
        this.getClicks = this.getClicks.bind(this);
    }

    onOpenConfirmModal() {
        if (!Auth.getUserData()) {
            browserHistory.push('/login');
        }
        else {
            this.setState({openConfirmModal: true});
        }

    };

    onCloseConfirmModal() {
        this.setState({openConfirmModal: false});
    };

    getData() {
        let data = {
            eid: this.props.params.eventID
        };

        eventController.getEvent(data).then(response => {
            console.log(response);
            if (response.status == 'success') {

                this.setState({
                    event: JSON.parse(response.event),
                    isParticipated: response.is_participated
                });
            }
            else {
                this.setState({
                    error: response.desc
                });
            }
        });
    }

    getClicks() {
        let data = {
            eid: this.props.params.eventID
        };
        eventController.getClickRecords(data).then(response => {
            if (response.status === 'success') {
                this.setState({
                    views: response.views_count,
                });
            }
            else {
                this.setState({
                    error: response.desc
                });
            }
        });
    }


    onClickConfirm() {
        let postData = {
            eid: this.props.params.eventID,
            op_type: 1
        };
        eventController.participateEvent(postData).then(response => {
            if (response.status === 'success') {
                this.onCloseConfirmModal();
                this.getData();
                this.setState({
                    confirmEvent: true
                })
            }
            else {
                this.setState({
                    error: response.desc
                });
            }
        });
    }

    readImage(file) {
        return (
            <img className="_154ar5hp" id="marqueeImage"
                 alt="Book unique <a href='/sitemaps/v2' >homes</a> and experiences."
                 sizes="100vw"
                 width="400"
                 src={`https://boredgowhere.live/media/${file}`}
                 height="300px"
                 srcSet="">
            </img>
        )
    }

    renderButton(event_status) {
        console.log(event_status)
        if (event_status === 1) {
            return (
                <button type="button" className="register-button"
                        onClick={this.onOpenConfirmModal}>Register
                </button>
            )
        }
        else if (event_status === 2){
            return (
                <button type="button" className="register-button"
                        style={{backgroundColor: '#FF5A5F' }}>Full
                </button>
            )
        }
        else if (event_status === 3){
            return (
                <button type="button" className="register-button"
                        style={{backgroundColor: '#FF5A5F' }}>Ended
                </button>
            )
        }


    }


    componentWillMount() {
        this.getData();
        this.getClicks();
    }


    render() {

        if (this.state.event) {
            let event = this.state.event;
            console.log(event);
            return (
                <div id="section-aboutus" className="section-eventsdetails" style={{backgroundColor: '#eeeeee'}}>
                    <Modal open={this.state.openConfirmModal} onClose={this.onCloseConfirmModal} center
                           className="popup centred">
                        <span className="yes-reply centred"></span>
                        <span className="no-reply centred"></span>
                        <p>Please confirm your registration </p>
                        <div className="button yes transition" style={{float: 'right'}}
                             onClick={this.onClickConfirm}>Confirm
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
                    <div>
                        <div>
                            <div className="_2o6ibk">
                                <Link to={`/events/${event.pk}`}>
                                    {this.readImage(event.fields.image)}
                                </Link>
                            </div>
                            <div className="col-md-8 the-artist the-artist-horizontal events-page-list pad0 m-bot60"
                                 style={{paddingLeft: '10px', marginTop: '20px'}}>
                                <h3 className="_12ei9u44">{event.fields.event_title}</h3>
                                <p className='event-description' style={{
                                    paddingBottom: '10px',
                                    paddingTop: '10px'
                                }}>Participants: {event.fields.num_participants}</p>
                                <p style={{
                                    textAlign: 'left',
                                    padding: '20px 0px 0px 0px',
                                    color: '#484848',
                                    fontWeight: 'bold'
                                }}>Description</p>
                                <p className='event-description'
                                   style={{paddingBottom: '20px', borderBottom: '1px solid #ccc'}}>
                                    {event.fields.event_desc}
                                </p>
                                <div style={{height: '20px'}}></div>
                                <p style={{
                                    textAlign: 'left',
                                    padding: '20px 0px 10px 0px',
                                    color: '#484848',
                                    fontWeight: 'bold'
                                }}>Comments</p>

                                <Comments eid={this.props.params.eventID}/>

                                {
                                    (this.state.isParticipated || this.state.confirmEvent) ? (
                                        <span style={{textAlign: 'right', paddingTop: '40px'}}> This event has been added <Link
                                            to="/my-schedule" style={{textDecoration: 'underline'}}>your schedule</Link></span>
                                    ) : (
                                        <div></div>
                                    )
                                }

                            </div>
                        </div>
                    </div>

                    {
                        (this.state.isParticipated || this.state.confirmEvent) && event.fields.state !== 3 ? (
                            <div className="_hauh0a">
                                <div style={{width: '130px', float: 'right', paddingBottom: '20px'}}>
                                    <button type="button" className="_qy64md green">Participating
                                    </button>
                                </div>
                            </div>

                        ) : (
                            <div className="_hauh0a">
                                <div style={{width: '108px', float: 'right', paddingBottom: '20px'}}>
                                    {this.renderButton(event.fields.state)}
                                </div>
                            </div>
                        )
                    }

                </div>
            )
        }
        else if (this.state.error) {
            return (
                <div>{this.state.error}</div>
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

export default Event;