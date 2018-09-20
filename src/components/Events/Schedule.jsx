import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React, {PropTypes} from 'react';
import '../Events/css/Events.css';
import "../Events/css/schedule.css";
import Dropdown from "react-dropdown";

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.state = {
            filter: 0,
        };
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
    }


    componentWillMount() {
    }

    render() {
        return (
            <div>
                {this.getSchedule()}
            </div>
        )
    }

    onSelect(e) {
        this.setState({
            filter:e.value
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
                    onChange={this.onSelect}
                    value={options[this.state.filter]}
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
                    <div className="sticky-header">
                        <h1 className="text-center">Schedule</h1>
                        {this.getDropdown()}
                    </div>
                    <TabPanel className="createdEvents">
                        <br />
                        {this.createEventTemplate()}
                        <br />
                    </TabPanel>
                    <TabPanel className="attendingEvents">
                        <br />
                        {this.createEventTemplate()}
                        <br />
                    </TabPanel>
                    <TabPanel className="attendingEvents">
                        <br />
                        {this.createEventTemplate()}
                        <br />
                    </TabPanel>
                    <TabPanel className="attendingEvents">
                        <br />
                        {this.createEventTemplate()}
                        <br />
                    </TabPanel>
                    <TabPanel className="attendingEvents">
                        <br />
                        {this.createEventTemplate()}
                        <br />
                    </TabPanel>
                    <TabPanel className="attendingEvents">
                        <br />
                        {this.createEventTemplate()}
                        <br />
                    </TabPanel>
                </span>

            </Tabs>
        </div>;
    }

    createEventSummary() {
        return <div className="eventBanner">
            <span className="eventLabel event-title-large">
                CS3216<br />
                30 Sep<br />
                Sun
            </span>
        </div>
    }

    createEventTemplateEditable() {
        return <div className="eventContainer">
                        <span className="dateLabel">
                            30 Sep Sun
                        </span>
            <span className="eventContent">
                            <div className="eventBanner">
                                <div className="eventDetails">
                                    <span className="eventTime">
                                        <span className="clock-icon"></span>
                                        3:00-5:00
                                    </span>
                                    <span className="eventLocation">
                                        <span className="location-icon"></span>
                                        LT19
                                    </span>
                                </div>
                            </div>
                            <button className="edit-btn"></button>
            </span>
        </div>;
    }

    createEventTemplate() {
        return <div className="eventContainer">
                            <div className="eventBanner">
                                <div className="eventDetails">
                                    <span className="eventEmptySpace"></span>
                                    <span className="eventTime">
                                        <span className="clock-icon"></span>
                                        3:00-5:00
                                    </span>
                                    <span className="eventLocation">
                                        <span className="location-icon"></span>
                                        LT19
                                    </span>
                                </div>
                            </div>
                            <button className="exit-btn"></button>
                            <h3>Ticket details</h3>
            <img src="/assets/images/QR.png"/>
        </div>;
    }
}

export default Schedule;