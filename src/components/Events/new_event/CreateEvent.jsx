import React, {PropTypes} from 'react';
import Auth from '../../../modules/Auth';
import {ReactDatez} from 'react-datez';
import 'react-datez/dist/css/react-datez.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../css/Events.css';
import TextField from '@material-ui/core/TextField';
import eventController from '../../../controllers/eventController.js';
import {browserHistory} from 'react-router';
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";

class CreateEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                title: '',
                address: '',
                description: '',
                category: 'Choose an option',
                maxQuota: 20,
                startTime: '00:00',
                endTime: '00:00',
                lat: '',
                lng: ''
            },
            file: '',
            imagePreviewUrl: '',
            error: false,
            submissionSuccess: false,
            submissionError: false,
            search: "",
            value: "",
            startDate: new Date().toJSON(),
            endDate: new Date().toJSON()

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
        console.log(e.target.value);
        this.setState({
            search: e.target.value,
            value: e.target.value
        })
    }

    handleSelectSuggest(suggest) {
        let filters = this.state.data;
        filters['address'] = suggest.formatted_address;
        this.setState({
            value: suggest.formatted_address
        });
        console.log(suggest.geometry.viewport);
        filters['lng'] = this.calculateCoordinate(suggest.geometry.viewport.b.b, suggest.geometry.viewport.b.f).toFixed(6).toString();
        filters['lat'] = this.calculateCoordinate(suggest.geometry.viewport.f.b, suggest.geometry.viewport.f.f).toFixed(6).toString();
        this.setState({
            search: "",
            filters: filters
        })
    }

    calculateCoordinate(c1, c2) {
        return (c1 + c2) / 2
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

    remapEventType(event) {
        let mapList = {
            "arts": "0",
            "food": "1",
            "sports": "2",
            "social": "3"
        };
        if (event in mapList) {
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
        return date.slice(0, 10)
    }

    handleClick(event) {
        event.preventDefault();
        let postData = {
            "event_title": this.state.data.title,
            "event_desc": this.state.data.description,
            "max_quota": this.state.data.maxQuota.toString(),
            "event_type": this.remapEventType(this.state.data.category),
            "event_start_date": this.formatDate(this.state.startDate) + " " + this.state.data.startTime,
            "event_end_date": this.formatDate(this.state.endDate) + " " + this.state.data.endTime,
            "is_open_ended": "1",
            "address": this.state.data.address,
            "image": this.state.file,
            'lat': this.state.data.lat,
            'lng': this.state.data.lng
        };
        eventController.createEvent(postData).then(response => {
            console.log(response);
            if (response.status === 'success') {
                this.setState({
                    submissionSuccess: true
                });
                // browserHistory.push('/');
            }
            else {
                this.setState({
                    submissionError: response.desc
                });
            }
        });
    }

    componentWillMount() {
        if (!Auth.getUserData()) {
            browserHistory.push('/login');
        }
    }


    render() {
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
                <div>Successfully created an event</div>
            )
        }
        else {
            return (
                <div id="section-contactform">
                    <div className="container">
                        <div className="col-md-12 text-center">
                            <h1>Create your own event</h1>
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
                                                            value={this.state.value}
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
                                <div className="form-group">
                                    <label className="control-label">DESCRIPTION</label>
                                    <textarea className="form-control" rows="10" id="formInput135" name="description"
                                              onChange={this.onChange}
                                              value={this.state.data.description}></textarea>
                                </div>

                                <input className="fileInput"
                                       type="file"
                                       onChange={(e) => this.handleImageChange(e)}/>
                                {$imagePreview ? (
                                    <div>
                                        {$imagePreview}
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                                <button onClick={this.handleClick}>CREATE EVENT
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


export default CreateEvent;