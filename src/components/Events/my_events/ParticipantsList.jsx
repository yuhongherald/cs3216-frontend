import React, {PropTypes} from 'react';
import eventController from "../../../controllers/eventController";


class ParticipantsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: false
        };
        this.getData = this.getData.bind(this);
    }

    getData() {
        let data = {
            eid: this.props.eid
        };
        eventController.getParticipants(data).then(response => {
            if (response.status === 'success') {
                this.setState({
                    participants: JSON.parse(response.participators),
                });
            }
            else {
                this.setState({
                    error: response.desc
                });
            }
        });
    }

    componentDidMount(){
        this.getData()
    }

    render() {
        if (this.state.participants && this.state.participants[0]) {
            let participants = this.state.participants;
            const listOfParticipants = participants.map((participant, index) =>
                <li key={participant.pk}>
                    <p>{index + 1}. {participant.fields.username}</p>
                    <span style={{marginLeft: '10px', display: 'inline-block'}}>
                        <i className="fas fa-envelope" style={{padding: '0px 0px', fontSize: '12px', color: 'rgb(0, 132, 137)', marginRight: '10px'}}></i>
                    {participant.fields.email}</span>
                </li>
            );
            return (
                <div style={{height: '100%'}}>
                    <h5 style={{color: 'rgb(0, 132, 137)', marginBottom: '20px', textTransform: 'upperCase'}}>{this.props.eventTitle}</h5>
                    <ul style={{padding: '0px 0px'}}>{listOfParticipants}</ul>
                </div>
            )
        }
        else if (this.state.participants && !this.state.participants[0]) {
            return (
                <div>
                    <h5 style={{color: 'rgb(0, 132, 137)', marginBottom: '20px', textTransform: 'upperCase'}}>{this.props.eventTitle}</h5>
                    <div style={{color: 'rgb(255, 90, 95)'}}>Oops! No participant found</div>
                </div>
            )
        }
        else {
            return (
                <div>
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

export default ParticipantsList;
