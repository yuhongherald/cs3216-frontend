import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class MyEvents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: true
        }

    }

    componentWillMount() {

    }

    render() {
        if (this.state.events) {
            return (
                <div>
                    <div>
                        <div className="lb-header">
                            <Link to="/my_created_events" className="active" id="login-box-link">Events created by me</Link>
                            <Link to="/my_scheduled_events" id="signup-box-link">Events I'm attending</Link>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }

    }
}

export default MyEvents;