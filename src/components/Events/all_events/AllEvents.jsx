import React, {PropTypes} from 'react';
import '../../Main/css/CategoryList.css';
import '../../Events/css/Events.css';
import {Link} from 'react-router';
import EventsByPage from "../../Common/EventsByPage.jsx";
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import '../css/filter.css';


class AllEvents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: true,
            filters: {
            },
            mapView: false,
            isPaneOpen: false
        };
        this.closeMapView = this.closeMapView.bind(this);
        this.openMapView = this.openMapView.bind(this);
        this.getSlidingPane = this.getForm.bind(this);
        this.openSlidingPane = this.openSlidingPane.bind(this);

    }

    openSlidingPane() {
        this.setState({
            isPaneOpen: true
        })
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

    getSlidingPane() {
        return (
            <div ref={ref => this.el = ref}>
                <SlidingPane
                    isOpen={ this.state.isPaneOpen }
                    title='Search'
                    from='right'
                    // subtitle='Optional subtitle.'
                    onRequestClose={ () => {
                        // triggered on "<" on left top click or on outside click
                        this.setState({isPaneOpen: false });
                    } }>
                    {this.getForm()}
                </SlidingPane>
            </div>
        );
    }

    getForm() {
        <div className="filter-panel">
            <div className="col-md-12 pad0 col-sm-12">
                <div id="custom-search-input">
                    <div className="input-group col-xs-12 col-sm-12 col-md-12 absolute width-80">
                        <input type="text" className="  search-query form-control"
                               placeholder="search for event"/>
                        <span className="input-group-btn">
                                <button className="btn btn-danger" type="button">
                                    <span className=" glyphicon glyphicon-search"></span>
                                </button>
                            </span>
                    </div>
                </div>
                <h4 className="grey-text">ADVANCED OPTIONS</h4>
                <hr />
                <br />

                <h4>LOCATION</h4>
                <div>
                    <input className="search-query form-control input-field" id="date1" name="location" placeholder="enter postal code"
                           type="text">
                    </input>
                    <button className="location-btn"></button>
                </div>
                <br />
                <h4>TIME</h4>
                <div>
                        <span className="date-container">
                            <input className="search-query form-control input-field" id="start-date" name="start-date" placeholder="start date"
                                   type="text">
                            </input>
                            <button className="calendar-btn"></button>
                        </span>
                    <span className="date-container">
                            <input className="search-query form-control input-field" id="start-time" name="start-time" placeholder="start time"
                                   type="text">
                            </input>
                            <button className="clock-btn"></button>
                        </span>
                </div>
                <div>
                        <span className="date-container">
                            <input className="search-query form-control input-field" id="end-date" name="end-date" placeholder="end date"
                                   type="text">
                            </input>
                            <button className="calendar-btn"></button>
                        </span>
                    <span className="date-container">
                            <input className="search-query form-control input-field" id="end-time" name="end-time" placeholder="end time"
                                   type="text">
                            </input>
                            <button className="clock-btn"></button>
                        </span>
                </div>
            </div>
            <br />
            <div className="genre sidebar-popularcategories col-md-12 pad0 col-sm-12">
                <h4>TYPE</h4>
                <div className="col-md-12 popularcategories-item genre-type border-btm">
                    <h5><label>
                        <div className="custom-checkbox">
                            <input type="checkbox" className="list-5" name="list-5" id="list-5"
                                   value=""/> Food
                            <label htmlFor="list-5"></label>
                        </div>
                    </label>
                    </h5>
                </div>
                <div className="col-md-12 popularcategories-item genre-type border-btm">
                    <h5><label>
                        <div className="custom-checkbox">
                            <input type="checkbox" className="list-5" name="list-5" id="list-5"
                                   value=""/> Music
                            <label htmlFor="list-5"></label>
                        </div>
                    </label>
                    </h5>
                </div>
                <div className="col-md-12 popularcategories-item genre-type border-btm">
                    <h5><label>
                        <div className="custom-checkbox">
                            <input type="checkbox" className="list-6" name="list-6" id="list-6"
                                   value=""/> Art
                            <label htmlFor="list-6"></label>
                        </div>
                    </label>
                    </h5>
                </div>
            </div>
        </div>
    }



    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div>
                    <div className="parent border-top-bottom" style={{padding: '20px 0px 20px 20px', height: '60px'}}>
                        <div className="child" style={{width: '100%', textAlign: 'center', fontWeight: 'bold'}}>
                            <p><i className="fas fa-filter" style={{
                                marginRight: '10px',
                                fontSize: '16px',
                                color: "rgb(255, 90, 95)",
                                padding: '0px 0px'
                            }} onClick={this.openSlidingPane}></i>Search & Filter</p>
                        </div>

                        </div>
                </div>


                <div>
                    <div className="parent border-top-bottom" style={{padding: '20px 0px 20px 00px'}}>
                        <div className="child child-60"><p><Link to="/events/categories/arts" style={{color: '#333'}}>Arts</Link></p></div>
                        <div className="child child-60"><p><Link to="/events/categories/food" style={{color: '#333'}}>Food</Link></p></div>
                        <div className="child child-60"><p><Link to="/events/categories/sports" style={{color: '#333'}}>Sports</Link></p></div>
                        <div className="child child-60 last-child-60"><p><Link to="/events/categories/social" style={{color: '#333'}}>Social</Link></p></div>
                    </div>
                </div>

                <div>{this.getSlidingPane()}</div>

                <div style={{backgroundColor: "#f2f2f2", height: '100%', marginTop: '-20px'}}>
                    <h4 style={{padding: '20px 20px', textAlign: 'center', fontWeight: 'bold', marginBottom: '20px'}}>All events</h4>
                    <div className="content-right col-md-9" style={{marginTop: '-40px'}}>
                        {
                            !this.state.mapView ? (
                                <div>
                                    <div style={{margin: '40px 0px 20px 0px'}}>
                                        <button className="navtab-view active" onClick={this.closeMapView}><i className="fa-th-list fa fa-2x" style={{color: 'white'}}></i></button>
                                        <button className="navtab-view" onClick={this.openMapView}><i className="fa-map-marker-alt fa fa-2x" style={{color: 'black'}}></i></button>
                                    </div>
                                    <div className="tab-content">
                                        <div id="list-view" className="tab-pane fade active in" role="tabpanel">
                                            <EventsByPage activePage={this.state.activePage}
                                                          eventLimit="null"
                                                          pagination={true}
                                                          filters={this.state.filters}
                                                          sortBy={'event_start_date'}
                                                          mapView={this.state.mapView}
                                                          events={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div style={{margin: '40px 0px 20px 0px'}}>
                                        <button className="navtab-view" onClick={this.closeMapView}><i className="fa-th-list fa fa-2x" style={{color: 'black'}}></i></button>
                                        <button className="navtab-view active" onClick={this.openMapView}><i className="fa-map-marker-alt fa fa-2x" style={{color: 'white'}}></i></button>
                                    </div>
                                    <div id="locations-view" className="tab-pane fade active in" role="tabpanel">
                                        <EventsByPage activePage={this.state.activePage}
                                                      eventLimit="null"
                                                      pagination={true}
                                                      filters={this.state.filters}
                                                      sortBy={'event_start_date'}
                                                      mapView={this.state.mapView}
                                                      events={false}
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

export default AllEvents;