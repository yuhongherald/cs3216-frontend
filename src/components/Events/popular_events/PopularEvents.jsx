import React, {PropTypes} from 'react';
import '../../Main/css/CategoryList.css';
import '../../Events/css/Events.css';
import {Link} from 'react-router';
import EventsByPage from "../../Common/EventsByPage.jsx";
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import '../css/filter.css';
import Modal from "react-modal";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {ReactDatez} from 'react-datez';
import 'react-datez/dist/css/react-datez.css';
import '../../Events/css/filterForm.css';


class PopularEvents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: false,
            filters: {
                address: '',
                event_type: '',
                event_start_date: '',
                event_end_date: '',
                page_limit: 10,
                page_num: 1
            },
            startDate: new Date('09/12/2018'),
            endDate: new Date('9/20/2018'),
            mapView: false,
            isPaneOpen: false,
            gotFilters: false
        };
        this.closeMapView = this.closeMapView.bind(this);
        this.openMapView = this.openMapView.bind(this);
        this.openSlidingPane = this.openSlidingPane.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
        this.remapEventType = this.remapEventType.bind(this);
        this.mapEventType = this.mapEventType.bind(this);
        this.submitFilter = this.submitFilter.bind(this);
        this.getFilterForm = this.getFilterForm.bind(this);
    }

    openSlidingPane() {
        this.setState({
            isPaneOpen: true
        });
    }

    openMapView() {
        this.setState({
            mapView: true
        });
    }

    closeMapView() {
        this.setState({
            mapView: false
        })
    }

    resetFilters() {
        this.setState({
            filters: {
                page_limit: 10,
                page_num: 1
            },
            gotFilters: false,
        });
    }


    submitFilter() {
        this.setState({
            gotFilters:  Math.random()
        })
    }

    onChange(event) {
        event.preventDefault();
        const field = event.target.name;
        const filters = this.state.filters;
        filters[field] = event.target.value;
        this.setState({
            filters: filters,
            gotFilters: true
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

    mapEventType(event) {
        let mapList = {
            "0": "arts",
            "1": "food",
            "2": "sports",
            "3": "social"
        };
        if (event === 'Choose an option') {
            return event;
        }
        if (event in mapList) {
            return mapList[event];
        }
    }

    onSelect(e) {
        const filters = this.state.filters;
        filters['event_type'] = this.remapEventType(e.value);
        console.log(filters);
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
            gotFilters: true,
            startDate: date
        });
    }

    changeEndDate(date) {
        const filters = this.state.filters;
        filters['event_end_date'] = this.formatDate(date) + " 00:00";
        this.setState({
            filters: filters,
            gotFilters: true,
            endDate: date
        });
    }


    getFilterForm() {
        const options = [
            {value: 'none', label: 'Choose an option'},
            {value: 'arts', label: 'Arts'},
            {value: 'food', label: 'Food'},
            {value: 'sports', label: 'Sports'},
            {value: 'social', label: 'Social'}
        ];

        return <div style={{padding: "20px 20px"}}>
            <div className="_ovebx1" style={{backgroundColor: "transparent"}}>
                <div className="_slilk2">
                    <form id="MagicCarpetSearchBar">
                        <div>
                            <div>
                                <div>
                                    <div className="_fhlaevk" style={{width: "130px"}} onClick={this.resetFilters}>
                                        <p style={{
                                            backgroundColor: "rgb(255, 90, 95)",
                                            padding: "5px 0px 5px 10px",
                                            color: "white",
                                            borderRadius: "5px",
                                            border: "1px solid rgb(255, 90, 95)"
                                        }}>
                                            Reset filters
                                            <i className="fas fa-undo" style={{
                                                marginLeft: "10px",
                                                fontSize: "12px",
                                                color: "white",
                                                padding: "0px 0px"
                                            }}
                                            ></i>
                                        </p>
                                    </div>
                                    <div style={{marginBottom: "8px"}}><label className="_rin72m"
                                                                              htmlFor="magic-carpet-koan-search-bar">
                                        <small className="_fhlaevk">WHERE</small>

                                    </label></div>
                                    <input type="text" className="form-control big-form"
                                           id="formInput113" name="address"
                                           onChange={this.onChange}
                                           value={this.state.filters.address} required
                                           style={{marginBottom: "20px"}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style={{marginTop: "30x", marginBottom: "16px"}}>

                                <div style={{marginTop: "8px", display: "flex", flexDirection: "row"}}>

                                    <div className="_1k6rf4u" style={{width: "50%"}}>
                                        <div>
                                            <div style={{marginBottom: "8px"}}><label
                                                className="_rin72m" htmlFor="checkin_input">
                                                <small className="_fhlaevk">START DATE</small>
                                            </label></div>
                                        </div>
                                        <ReactDatez name="dateInput" handleChange={this.changeStartDate}
                                                    value={this.state.startDate} required/>
                                    </div>
                                    <div className="_1k6rf4u" style={{width: "50%"}}>
                                        <div>
                                            <div style={{marginBottom: "8px"}}><label
                                                className="_rin72m" htmlFor="checkout_input">
                                                <small className="_fhlaevk">END DATE</small>
                                            </label></div>
                                        </div>
                                        <ReactDatez name="dateInput" handleChange={this.changeEndDate}
                                                    value={this.state.endDate} required/>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div style={{marginTop: "16px", marginBottom: "16px"}}>
                            <div>
                                <div style={{marginBottom: "8px"}}><label className="_rin72m"
                                                                          htmlFor="lp-guestpicker">
                                    <small className="_fhlaevk">CATEGORY</small>
                                </label></div>
                                <Dropdown
                                    options={options} onChange={this.onSelect}
                                    value={this.mapEventType(this.state.filters.event_type)}
                                    placeholder="Select an option" required/>

                            </div>
                        </div>

                    </form>
                    <div className="_12cyg0af" aria-busy="false"><span
                        className="_cgr7tc7" onClick={this.submitFilter}>Search</span></div>
                </div>
            </div>
        </div>;
    }



    componentDidMount() {
        Modal.setAppElement(this.el);
    }

    render() {
        return (
            <div>
                <div>
                    <div className="parent border-top-bottom" style={{padding: '20px 0px 20px 20px', height: '60px'}}>
                        <div className="child" style={{width: '100%', textAlign: 'center', fontWeight: 'bold'}}
                             ref={ref => this.el = ref}>
                            <p onClick={() => this.setState({isPaneOpen: true})}><i className="fas fa-search" style={{
                                marginRight: '10px',
                                fontSize: '16px',
                                color: "rgb(255, 90, 95)",
                                padding: '0px 0px'
                            }}></i>Search & Filter</p>
                            <SlidingPane
                                isOpen={this.state.isPaneOpen}
                                title='Search'
                                from='right'
                                // subtitle='Optional subtitle.'
                                onRequestClose={() => {
                                    // triggered on "<" on left top click or on outside click
                                    this.setState({isPaneOpen: false});
                                }}>
                                {this.getFilterForm()}
                            </SlidingPane>
                        </div>
                    </div>
                </div>


                <div>
                    <div className="parent border-top-bottom" style={{padding: '20px 0px 20px 00px'}}>
                        <div className="child child-60"><p><Link to="/events/categories/arts"
                                                                 style={{color: '#333'}}>Arts</Link></p></div>
                        <div className="child child-60"><p><Link to="/events/categories/food"
                                                                 style={{color: '#333'}}>Food</Link></p></div>
                        <div className="child child-60"><p><Link to="/events/categories/sports"
                                                                 style={{color: '#333'}}>Sports</Link></p></div>
                        <div className="child child-60 last-child-60"><p><Link to="/events/categories/social"
                                                                               style={{color: '#333'}}>Social</Link></p>
                        </div>
                    </div>
                </div>


                <div style={{backgroundColor: "#f2f2f2", height: '100%', marginTop: '-20px'}}>
                    <h4 style={{
                        padding: '20px 20px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginBottom: '20px'
                    }}>Popular events</h4>


                    <div className="content-right col-md-9" style={{marginTop: '-40px'}}>
                        {
                            !this.state.mapView ? (
                                <div>
                                    <div style={{margin: '40px 0px 20px 0px'}}>
                                        <button className="navtab-view active" onClick={this.closeMapView}><i
                                            className="fa-th-list fa fa-2x" style={{color: 'white'}}></i></button>
                                        <button className="navtab-view" onClick={this.openMapView}><i
                                            className="fa-map-marker-alt fa fa-2x" style={{color: 'black'}}></i>
                                        </button>
                                    </div>
                                    <div className="tab-content">
                                        <div id="list-view" className="tab-pane fade active in" role="tabpanel">
                                            <EventsByPage activePage={this.state.activePage}
                                                          eventLimit="null"
                                                          pagination={true}
                                                          filters={this.state.filters}
                                                          sortBy={'num_participants'}
                                                          mapView={this.state.mapView}
                                                          events={this.state.events}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div style={{margin: '40px 0px 20px 0px'}}>
                                        <button className="navtab-view" onClick={this.closeMapView}><i
                                            className="fa-th-list fa fa-2x" style={{color: 'black'}}></i></button>
                                        <button className="navtab-view active" onClick={this.openMapView}><i
                                            className="fa-map-marker-alt fa fa-2x" style={{color: 'white'}}></i>
                                        </button>
                                    </div>
                                    <div id="locations-view" className="tab-pane fade active in" role="tabpanel">
                                        <EventsByPage activePage={this.state.activePage}
                                                      eventLimit="null"
                                                      pagination={true}
                                                      filters={this.state.filters}
                                                      sortBy={'num_participants'}
                                                      mapView={this.state.mapView}
                                                      events={this.state.events}
                                                      gotFilters={this.state.gotFilters}
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default PopularEvents;