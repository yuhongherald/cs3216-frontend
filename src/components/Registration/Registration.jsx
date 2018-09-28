import React, {PropTypes} from 'react';
import Auth from "../../modules/Auth";


let QRCode = require('qrcode.react');

class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.params.eventID + Auth.getUserData().uid
        }

    }

    render() {
        if (this.state.value){
            return (
                <div style={{padding: '10px', fontSize: '22px'}}>
                    <p>This is your ticket to <p style={{color: 'rgb(0, 132, 137'}}>{this.props.params.event}</p></p>
                    <p style={{marginBottom: '10px'}}>Name: {Auth.getUserData().username}</p>
                    <QRCode value={this.state.value}/>
                </div>
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

export default Registration;
