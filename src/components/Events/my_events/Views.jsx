import React, {PropTypes} from 'react';
import eventController from "../../../controllers/eventController";


class Views extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            views: false
        };
    }


    componentDidMount() {
    }

    render() {
        if (this.state.views) {
            return (
                <p><span>Views: </span>{this.state.views}</p>
            )
        }
        else {
            return (
                <p></p>
            )
        }


    }
}

export default Views;