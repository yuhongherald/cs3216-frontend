import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, {PropTypes} from 'react';
import '../Events/css/Events.css';
import "../Events/css/schedule.css";
import Dropdown from "react-dropdown";

class Manage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventFilter: 0,
            particpantFilter: 0,
        };
        this.onSelectEvent = this.onSelectEvent.bind(this);
        this.onSelectParticpant = this.onSelectParticpant.bind(this);
    }

    componentDidMount() {
    }


    componentWillMount() {
    }

    render() {
        return (
            <div>
                <div className="sticky-header">
                    <h1 className="text-center">Manage</h1>
                    {this.getDropdown()}
                </div>
                {this.getSchedule()}
            </div>
        )
    }

    onSelectEvent(e) {
        this.setState({
            eventFilter:e.value
        });
        switch (e) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            default:
                break;
        }
    }

    onSelectParticpant(e) {
        this.setState({
            participantFilter:e.value
        });
        switch (e) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            default:
                break;
        }
    }

    getDropdown() {
        const options = [
            {value: 0, label: 'Time'},
            {value: 1, label: 'Event Type'},
            {value: 2, label: 'Name'}
        ];

        return <div>
            <div className="dropdown-form"><div className="dropdown-label">Sort by:&nbsp;</div></div>
            <div className="dropdown-form">
                <Dropdown
                    options={options}
                    onChange={this.onSelectEvent}
                    value={options[this.state.eventFilter]}
                    placeholder="Time" required/>
            </div>
        </div>
    }

    getSchedule() {
        return <div>
            <Tabs>
                <TabList className="tabList">
                    <Tab className="btn tab">{this.createEventSummary()}</Tab>
                    <Tab className="btn tab">{this.createEventSummary()}</Tab>
                    <Tab className="btn tab">{this.createEventSummary()}</Tab>
                    <Tab className="btn tab">{this.createEventSummary()}</Tab>
                    <Tab className="btn tab">{this.createEventSummary()}</Tab>
                    <Tab className="btn tab">{this.createEventSummary()}</Tab>
                </TabList>
                <span className="tab-container">
                    <TabPanel className="createdEvents">
                        <br />
                        {this.createEventTemplateEditable()}
                        <br />
                    </TabPanel>
                    <TabPanel className="attendingEvents">
                        <br />
                        {this.createEventTemplateEditable()}
                        <br />
                    </TabPanel>
                    <TabPanel className="attendingEvents">
                        <br />
                        {this.createEventTemplateEditable()}
                        <br />
                    </TabPanel>
                    <TabPanel className="attendingEvents">
                        <br />
                        {this.createEventTemplateEditable()}
                        <br />
                    </TabPanel>
                    <TabPanel className="attendingEvents">
                        <br />
                        {this.createEventTemplateEditable()}
                        <br />
                    </TabPanel>
                    <TabPanel className="attendingEvents">
                        <br />
                        {this.createEventTemplateEditable()}
                        <br />
                    </TabPanel>
                </span>

            </Tabs>
        </div>;
    }

    createEventSummary() {
        return <div className="eventBanner">
            1/8
            <span className="eventLabel">
                CS3216<br />
                30 Sep<br />
                Sun
            </span>
        </div>
    }

    createEventTemplateEditable() {
        const options = [
            {value: 0, label: 'Name'},
            {value: 1, label: 'Time Registered'},
        ];

        return <div>
        <div className="eventContainer">
                            <div className="eventBanner">
                                <div className="eventDetails">
                                    <span className="eventEmptySpace">
                                    </span>
                                    <span className="eventTime">
                                        <span className="clock-icon"></span>
                                        3:00-5:00
                                    </span>
                                    <span className="eventEmptySpace">
                                    </span>
                                    <span className="eventLocation">
                                        <span className="location-icon"></span>
                                        LT19
                                    </span>
                                </div>
                            </div>
                <button className="edit-btn"></button>
        </div>
        <div className="dropdown-form"><div className="dropdown-label">Sort by:&nbsp;</div></div>
            <div className="dropdown-form">
                <Dropdown
                    options={options}
                    onChange={this.onSelectParticpant}
                    value={options[this.state.participantFilter]}
                    placeholder="Name" required/>
            </div>
            {this.createParticpantList()}
        </div>;
    }

    createParticpantList() {
        // put some padding here
        return <div>
            {this.createParticpant()}
            {this.createParticpant()}
            {this.createParticpant()}
        </div>
    }

    createParticpant() {
        // profile picture
        // name
        // phone number
        // registered since
        return this.createEventTemplate();//<div>Particpant</div>;
    }

    createEventTemplate() {
        return <div className="participantContainer">
            <span className="participantEmptySpace"></span>
            <span className="participantName">
                <span className="profile-icon"></span>
                3:00-5:00
            </span>
            <span className="participantNumber">
                <span className="phone-icon"></span>
                91234567
            </span>
            <span className="delete-icon"></span>
        </div>;
    }
}

export default Manage;