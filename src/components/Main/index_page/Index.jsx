import React from 'react';
import {Link} from 'react-router';
import '../../Events/css/Events.css';
import Events from './Events.jsx';
import CategoryList from './CategoryList.jsx';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {ReactDatez} from 'react-datez';
import 'react-datez/dist/css/react-datez.css';
import EventsByPage from "../../Common/EventsByPage.jsx";
import EventMap from "./EventMap.jsx";
import eventController from '../../../controllers/eventController.js';


class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gotFilters: false,
            filters: {
                address: 'Bedok',
                event_type: 'Choose an option',
                event_start_date: '',
                event_end_date: '',
                page_limit: 10,
                page_num: 1
            },
            startDate: new Date('09/12/2018'),
            endDate: new Date('9/20/2018'),
            events: false
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
        this.remapEventType = this.remapEventType.bind(this);
        this.submitFilter = this.submitFilter.bind(this);
        this.mapEventType = this.mapEventType.bind(this);
        this.getData = this.getData.bind(this);
    }

    resetFilters() {
        this.setState({
            filters: {
                page_limit: 10,
                page_num: 1
            },
            gotFilters: false,
            events: false
        })
    }

    getData() {
        let data = this.state.filters;

        eventController.getEvents(data).then(response => {
            if (response.status === 'success') {
                this.setState({
                    totalCount: response.total_pages,
                    events: JSON.parse(response.events)
                });


            }
            else {
                this.setState({
                    error: response.desc
                });
            }
        });

    }

    submitFilter(){
        this.getData();
    }


    onInputChange(event) {
        event.preventDefault();
        const field = event.target.name;
        const filters = this.state.filters;
        filters[field] = event.target.value;
        this.setState({
            filters: filters
        });
    }

    remapEventType(event) {
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

    mapEventType(event) {
        let mapList = {
            "0": "arts",
            "1": "food",
            "2": "sports",
            "3": "social"
        };
        if (event === 'Choose an option'){
            return event;
        }
        if (event in mapList){
            return mapList[event];
        }
    }

    onSelect(e) {
        const filters = this.state.filters;
        filters['event_type'] = this.remapEventType(e.value);
        this.setState({
            filters: filters
        });
    }

    formatDate(date) {
        return new Date(date).toISOString().substr(0, 10);
    }

    changeStartDate(date) {
        const filters = this.state.filters;
        filters['event_start_date'] = this.formatDate(date) + " 00:00";
        this.setState({
            filters: filters,
            startDate: date
        });
    }

    changeEndDate(date) {
        const filters = this.state.filters;
        filters['event_end_date'] = this.formatDate(date) + " 00:00";
        this.setState({
            filters: filters,
            endDate: date
        });
    }

    componentDidMount() {
    }

    componentWillMount() {

    }

    componentDidUpdate() {

    }


    render() {

        const options = [
            {value: 'none', label: 'Choose an option'},
            {value: 'arts', label: 'Arts'},
            {value: 'food', label: 'Food'},
            {value: 'sports', label: 'Sports'},
            {value: 'social', label: 'Social'}
        ];


        return (
            <div>
                <div className="_obpazuf" data-veloute="landing_page_header">
                    <div>
                        <div className="_nplrdyu">
                            <div className="_5rbuw4">
                                <div className="_1yd927w"></div>
                                <div className="_2o6ibk"><img className="_154ar5hp" id="marqueeImage"
                                                              alt="Book unique <a href='/sitemaps/v2' >homes</a> and experiences."
                                                              sizes="100vw"
                                                              width="400px"
                                                              src="https://cigaguides.thinknewr.com/wp-content/uploads/sites/2/2018/06/Event-Blogging-Strategies.jpg"
                                                              height="200px"
                                                              srcSet="">
                                </img>
                                </div>
                                <div className="_1m05dcv"></div>
                            </div>
                            <div className="_dakdiq">
                                <div className="_djxl322">
                                    <div className="_ni9axhe">
                                        <div className="_ovebx1" style={{backgroundColor: 'transparent'}}>
                                            <div className="_14pemr6">
                                                <div className="_iv990q">
                                                    <h1 className="_tpbrp">
                                                        <div>
                                                            <Link to="/events" style={{color: 'white'}}>Explore
                                                                events <i className="fas fa-chevron-circle-right"
                                                                          style={{
                                                                              fontSize: '0.7em',
                                                                              padding: '5px 5px 5px 5px'
                                                                          }}></i></Link>
                                                        </div>
                                                    </h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{padding: '20px 20px'}}>
                            <div className="_ovebx1" style={{backgroundColor: 'transparent'}}>
                                <div className="_slilk2">
                                    <form id="MagicCarpetSearchBar">
                                        <div>
                                            <div>
                                                <div>
                                                    <div className="_fhlaevk" style={{width: '130px'}} onClick={this.resetFilters} >
                                                        <p style={{backgroundColor: 'rgb(255, 90, 95)', padding: '5px 0px 5px 10px', color: 'white', borderRadius: '5px', border: '1px solid rgb(255, 90, 95)'}}>
                                                            Reset filters
                                                            <i className="fas fa-undo" style={{marginLeft: '10px',
                                                                fontSize: '12px',
                                                                color: "white",
                                                                padding: '0px 0px'}}
                                                            ></i>
                                                        </p>
                                                    </div>
                                                    <div style={{marginBottom: '8px'}}><label className="_rin72m"
                                                                                              htmlFor="magic-carpet-koan-search-bar">
                                                        <small className="_fhlaevk" >WHERE</small>

                                                    </label></div>
                                                    <input type="text" className="form-control big-form"
                                                           id="formInput113" name="address"
                                                           onChange={this.onInputChange}
                                                           value={this.state.filters.address} required
                                                           style={{marginBottom: '20px'}}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{marginTop: '30x', marginBottom: '16px'}}>

                                                <div style={{marginTop: '8px', display: 'flex', flexDirection: 'row'}}>

                                                    <div className="_1k6rf4u" style={{width: '50%'}}>
                                                        <div>
                                                            <div style={{marginBottom: '8px'}}><label
                                                                className="_rin72m" htmlFor="checkin_input">
                                                                <small className="_fhlaevk">START DATE</small>
                                                            </label></div>
                                                        </div>
                                                        <ReactDatez name="dateInput" handleChange={this.changeStartDate}
                                                                    value={this.state.startDate} style={{width: '160px'}} required/>
                                                    </div>
                                                    <div className="_1k6rf4u" style={{width: '50%'}}>
                                                        <div>
                                                            <div style={{marginBottom: '8px'}}><label
                                                                className="_rin72m" htmlFor="checkout_input">
                                                                <small className="_fhlaevk">END DATE</small>
                                                            </label></div>
                                                        </div>
                                                        <ReactDatez name="dateInput" handleChange={this.changeEndDate}
                                                                    value={this.state.endDate} style={{width: '165px'}} required/>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div style={{marginTop: '16px', marginBottom: '16px'}}>
                                            <div>
                                                <div style={{marginBottom: '8px'}}><label className="_rin72m"
                                                                                          htmlFor="lp-guestpicker">
                                                    <small className="_fhlaevk">CATEGORY</small>
                                                </label></div>
                                                <Dropdown
                                                    options={options} onChange={this.onSelect}
                                                    value={this.mapEventType(this.state.filters.event_type)}
                                                    placeholder="Select an option" required/>

                                            </div>
                                        </div>

                                        <div className="_12cyg0af" aria-busy="false"><span
                                            className="_cgr7tc7" onClick={this.submitFilter}>Search</span></div>

                                    </form>

                                </div>
                            </div>

                        </div>
                        <span style={{fontSize: '0'}}></span></div>
                </div>


                {
                    !this.state.gotFilters && !this.state.events ? (
                        <div>
                            <CategoryList/>

                            <div className="col-md-12 artistlist-title" style={{marginBottom: '20px', marginTop: '-20px '}}>
                                <h3 >Near Me</h3>
                            </div>
                            <EventMap/>
                            <Events
                                events={false}
                            />
                        </div>
                    ) : (
                        <div style={{padding: '0px 20px 0px 20px'}}>
                            <h4 style={{fontWeight: 'bold', marginBottom: '20px'}}>Results by
                                filters</h4>
                            <EventsByPage activePage={this.state.activePage}
                                          eventLimit="null"
                                          pagination={true}
                                          filters={this.state.filters}
                                          sortBy={'event_start_date'}
                                          events={this.state.events}
                            />
                        </div>
                    )
                }


            </div>
        )
    }

}

export default Index;

