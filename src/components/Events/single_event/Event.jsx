import React, {PropTypes} from 'react';
import Modal from 'react-responsive-modal';
import '../css/Event.css';
import Auth from "../../../modules/Auth";
import {browserHistory} from "react-router";
import eventController from "../../../controllers/eventController";


// Showing one event details
class Event extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            event: false,
            openConfirmModal: false,
            error: false
        }
        this.onOpenConfirmModal = this.onOpenConfirmModal.bind(this);
        this.onCloseConfirmModal = this.onCloseConfirmModal.bind(this);
        this.onClickConfirm = this.onClickConfirm.bind(this);
        this.getData = this.getData.bind(this);
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
            if (response.status === 'success') {
                this.setState({
                    event: response.event
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
            }
            else {
                this.setState({
                    error: response.desc
                });
            }
        });
    }


    componentWillMount() {
        this.getData()
    }


    render() {

        if (this.state.event) {
            let event = this.state.event;
            return (
                <div id="section-aboutus" className="section-eventsdetails">
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
                    <div>
                        <div>
                            <div className="_2o6ibk"><img className="_154ar5hp" id="marqueeImage"
                                                          alt="Book unique <a href='/sitemaps/v2' >homes</a> and experiences."
                                                          sizes="100vw"
                                                          src="https://cigaguides.thinknewr.com/wp-content/uploads/sites/2/2018/06/Event-Blogging-Strategies.jpg"
                                                          height="300px"
                                                          srcSet="">
                            </img>
                            </div>
                            <div className="col-md-8 the-artist the-artist-horizontal events-page-list pad0 m-bot60" style={{paddingLeft: '10px'}}>
                                    <p style={{textAlign: 'left', padding: '20px 0px 20px 0px', color: '#484848', fontWeight: 'bold'}}>Description</p>
                                <p className='event-description'>
                                    Spend a unforgettable holiday in the enchanting surroundings of the town of Cisternino (reachable from the near airports of Bari and Brindisi). Trullo Edera offers a heaven of peace and tranquillity, set in an elevated position with a stunning view.

                                </p>

                                {/*<div className="button-share-events col-md-12 pad0">*/}
                                    {/*<button type="button" className="btn btn-info">*/}
                                        {/*<i className="fab fa-twitter"></i> Twitt*/}
                                    {/*</button>*/}
                                    {/*<button type="button" className="btn btn-primary">*/}
                                        {/*<i className="far fa-thumbs-up"></i> Like*/}
                                    {/*</button>*/}
                                    {/*<button type="button" className="btn btn-danger">*/}
                                        {/*<i className="fab fa-google-plus-g"></i>*/}
                                    {/*</button>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className="_hauh0a">
                        <div style={{width: '108px', float: 'right', paddingBottom: '20px' }}>
                            <button type="button" className="_qy64md" onClick={this.onOpenConfirmModal}>Register
                            </button>
                        </div>
                    </div>
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
                <div>Loading</div>
            )
        }

    }
}

export default Event;