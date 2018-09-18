import React, {PropTypes} from 'react';
import '../../Main/css/CategoryList.css';
import '../../Events/css/Events.css';
import {Link} from 'react-router';
import EventsByPage from "../../Common/EventsByPage.jsx";


class PopularEvents extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: true,
            filters: {
            },
            mapView: false
        };
        this.closeMapView = this.closeMapView.bind(this);
        this.openMapView = this.openMapView.bind(this);
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


    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div>
                    <div className="parent border-top-bottom" style={{padding: '20px 0px 20px 20px', height: '60px'}}>
                        <div className="child" style={{width: '100%', textAlign: 'center', fontWeight: 'bold'}}>
                            <p><i class="fas fa-filter" style={{marginRight: '10px', fontSize: '16px', color: "rgb(255, 90, 95)", padding: '0px 0px'}}></i>Search & Filter</p></div>
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

                <div style={{backgroundColor: "#f2f2f2", height: '100%', marginTop: '-20px'}}>
                    <h4 style={{padding: '20px 20px', textAlign: 'center', fontWeight: 'bold', marginBottom: '20px'}}>Popular events</h4>
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
                                                          sortBy={'num_participants'}
                                                          mapView={this.state.mapView}
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
                                                      sortBy={'num_participants'}
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

export default PopularEvents;