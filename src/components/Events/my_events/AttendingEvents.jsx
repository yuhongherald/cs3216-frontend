import React, {PropTypes} from 'react';

class AttendingEvents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: true
        }
    }

    componentDidMount(){
        
    }

    render(){
        if (this.state.events){
            return(
                <div>Some data</div>
            )
        }
        else {
            return (
                <div>Loading</div>
            )
        }
    }
}

export default AttendingEvents;