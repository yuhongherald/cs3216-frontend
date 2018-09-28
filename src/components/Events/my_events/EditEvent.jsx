import React, {PropTypes} from 'react';
import {ReactDatez} from 'react-datez';
import 'react-datez/dist/css/react-datez.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../css/Events.css';
import TextField from '@material-ui/core/TextField';
import eventController from '../../../controllers/eventController.js';
import ReactGoogleMapLoader from "react-google-maps-loader";
import {browserHistory} from 'react-router';
import ReactGooglePlacesSuggest from "react-google-places-suggest";



class EditEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: this.props.event_title,
                address: this.props.address,
                description: this.props.event_desc,
                category: this.mapEventType(this.props.event_type),
                maxQuota: this.props.max_quota,
                startTime: this.props.event_start_time,
                endTime: this.props.event_end_time,
                lat: this.props.lat,
                lng: this.props.lng
            },
            error: false,
            submissionSuccess: false,
            submissionError: false,
            search: "",
            value: "",
            startDate: this.props.event_start_date,
            endDate: this.props.event_end_date

        }
        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.changeStartTime = this.changeStartTime.bind(this);
        this.changeEndTime = this.changeEndTime.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.remapEventType = this.remapEventType.bind(this);
    }

    handleInputChange(e) {
        this.setState({search: e.target.value, value: e.target.value})
    }

    handleSelectSuggest(suggest) {
        let filters = this.state.data;
        filters['address'] = suggest.formatted_address;
        this.setState({
            address: suggest.formatted_address
        });
        filters['lng'] = this.calculateCoordinate(suggest.geometry.viewport.b.b, suggest.geometry.viewport.b.f).toFixed(6).toString();
        filters['lat'] = this.calculateCoordinate(suggest.geometry.viewport.f.b, suggest.geometry.viewport.f.f).toFixed(6).toString();
        this.setState({
            search: "",
            filters: filters
        })
    }

    calculateCoordinate(c1, c2){
        return (c1 + c2)/2
    }


    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    onSelect(e) {
        const data = this.state.data;
        data['category'] = e.value;
        this.setState({
            data: data
        });

    }

    onChange(event) {
        event.preventDefault();
        const field = event.target.name;
        const data = this.state.data;
        data[field] = event.target.value;
        this.setState({
            data: data
        });
    }

    remapEventType(event){
        let mapList = {
            "arts": "0",
            "food": "1",
            "sports": "2",
            "social": "3"
        };
        if (event in mapList){
            return mapList[event];
        }
    }

    mapEventType(event){
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

    changeStartTime(time) {
        this.setState({startTime: time})
    }

    changeEndTime(time) {
        this.setState({endTime: time})
    }

    changeStartDate(date) {
        this.setState({startDate: date})

    }

    changeEndDate(date) {
        this.setState({endDate: date})

    }

    formatDate(date) {
        return date.slice(0,10)
    }

    handleClick(event) {
        // turn off first

        event.preventDefault();
        let postData = {
            "eid": this.props.eid,
            "event_title": this.state.data.title,
            "event_desc": this.state.data.description,
            "max_quota": this.state.data.maxQuota.toString(),
            "event_type": this.remapEventType(this.state.data.category),
            "event_start_date": this.formatDate(this.state.startDate) + " " + this.state.data.startTime,
            "event_end_date": this.formatDate(this.state.endDate) + " " + this.state.data.endTime,
            "is_open_ended": "1",
            "address": this.state.data.address,
            'lat': this.state.data.lat,
            'lng': this.state.data.lng
        };
        eventController.editEvent(postData).then(response => {
            if (response.status === 'success') {
                this.setState({
                    submissionSuccess: true
                });
                setTimeout(browserHistory.push('/manage-events'), 2000);
            }
            else {
                this.setState({
                    submissionError: response.desc
                });
            }
        });
    }

    componentWillMount() {
    }


    render() {
        console.log(this.props);
        const options = [
            {value: 'none', label: 'Choose an option'},
            {value: 'arts', label: 'Arts'},
            {value: 'food', label: 'Food'},
            {value: 'sports', label: 'Sports'},
            {value: 'social', label: 'Social'}
        ];

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img style={{width: '300px', height: '200px'}} src={imagePreviewUrl}/>);
        }
        if (this.state.submissionSuccess) {
            return (
                <div>Successfully edited an event</div>
            )
        }
        else {
            return (
                <div id="section-contactform">
                    <div className="container">
                        <div className="col-md-12 text-center">
                            <h1>Edit event: <h5 style={{color: '#FF5A5F'}}>{this.state.data.title}</h5></h1>
                        </div>
                        <form>
                            <div className="col-md-3 col-subject">
                                <div className="form-group">
                                    <label className="control-label">TITLE
                                        <span>*</span>
                                    </label>
                                    <input type="text" className="form-control" id="formInput113" name="title"
                                           onChange={this.onChange}
                                           value={this.state.data.title} required/>
                                </div>
                            </div>
                            <div className="col-md-3 col-subject">
                                <div className="form-group">
                                    <label className="control-label">LOCATION
                                        <span>*</span>
                                    </label>
                                    {/*<input type="text" className="form-control" id="formInput113" name="location"*/}
                                    {/*onChange={this.onChange}*/}
                                    {/*value={this.state.data.location} required/>*/}
                                    <ReactGoogleMapLoader
                                        params={{
                                            key: "AIzaSyD6VsUPahFrXaNhkUjOeKnlFgPUyT-l36k",
                                            libraries: "places,geocode",
                                        }}
                                        render={googleMaps =>
                                            googleMaps && (
                                                <div>
                                                    <ReactGooglePlacesSuggest
                                                        autocompletionRequest={{input: this.state.search}}
                                                        googleMaps={googleMaps}
                                                        onSelectSuggest={this.handleSelectSuggest.bind(this)}
                                                    >
                                                        <input
                                                            type="text"
                                                            value={this.state.data.address}
                                                            placeholder="Search a location"
                                                            onChange={this.handleInputChange.bind(this)}
                                                        />
                                                    </ReactGooglePlacesSuggest>
                                                </div>
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-md-3 col-phone">
                                <div className="form-group">
                                    <label className="control-label">CATEGORY
                                        <span>*</span>
                                    </label>
                                    <Dropdown options={options} onChange={this.onSelect}
                                              value={this.state.data.category}
                                              placeholder="Select an option" required/>

                                </div>
                            </div>
                            <div className="col-md-3 col-subject">
                                <div className="form-group">
                                    <label className="control-label">NUMBER OF PARTICIPANTS
                                        <span>*</span>
                                    </label>
                                    <input type="number" className="form-control" id="formInput113" name="maxQuota"
                                           onChange={this.onChange}
                                           value={this.state.data.maxQuota} required/>
                                </div>
                            </div>
                            <div className="col-md-3 col-phone">
                                <div className="form-group">
                                    <label className="control-label">START DATE
                                        <span>*</span>
                                    </label>
                                </div>
                                <ReactDatez position="right" name="dateInput" handleChange={this.changeStartDate}
                                            value={this.state.startDate} required/>
                            </div>

                            <div className="col-md-3 col-phone">
                                <div className="form-group">
                                    <label className="control-label">START TIME
                                    </label>
                                    <TextField
                                        id="time"
                                        type="time"
                                        //defaultValue="07:30"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                        name="startTime"
                                        onChange={this.onChange}
                                        value={this.state.data.startTime}
                                    />
                                </div>
                            </div>

                            <div className="col-md-3 col-phone">
                                <div className="form-group">
                                    <label className="control-label">END DATE
                                        <span>*</span>
                                    </label>
                                </div>
                                <ReactDatez name="dateInput" handleChange={this.changeEndDate}
                                            value={this.state.endDate}/>
                            </div>


                            <div className="col-md-3 col-phone">
                                <div className="form-group">
                                    <label className="control-label">END TIME
                                    </label>
                                    <TextField
                                        id="time"
                                        type="time"
                                        //defaultValue="07:30"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                        name="endTime"
                                        onChange={this.onChange}
                                        value={this.state.data.endTime}
                                    />
                                </div>
                            </div>


                            <div className="col-md-12 col-message">
                                <button className="btn btn-warning pull-right btn-subscribe"
                                        onClick={this.handleClick}>EDIT EVENT
                                </button>
                            </div>
                        </form>
                    </div>

                    {this.state.submissionError ? (
                        <div style={{color: 'red'}}>{this.state.submissionError}</div>
                    ) : (
                        <div></div>
                    )}
                </div>
            )
        }
    }

}

export default EditEvent;