import React from 'react';
import Filters from '../../Events/filters/Filters.jsx';
import EventsByPage from '../../Common/EventsByPage.jsx';
import '../css/Index.css';
import {Link} from 'react-router';


class Events extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filters: {
            },
            events: this.props.events
        };

    }

    componentDidMount() {

    }

    componentWillMount() {

    }

    componentDidUpdate() {

    }

    render() {
        return (
            <div style={{marginTop: '180px'}}>
                <div id="section-contentblogs" className="section-artistlist">
                    <div className="container">
                        <div className="row" style={{marginTop: '0px'}}>
                            <div className="col-md-12 artistlist-title">
                                <h3 style={{display: 'inline-block', float: 'left'}}>Latest events</h3>
                                <span style={{display: 'inline-block', float: 'right', marginTop: '20px'}}><Link to="/popular_events" style={{color: '#8f939c'}}><span className="viewAll">View all</span> <i className="fas fa-chevron-right" style={{fontSize: '1em', padding: '0px 0px 0px 10px'}}></i> </Link></span>
                            </div>

                            <div className="content-right col-md-9" style={{marginTop: '20px', paddingTop: '10px'}}>
                                <div className="tab-content">
                                    {/*LIST VIEW*/}
                                    <div id="list-view" className="tab-pane fade active in" role="tabpanel">
                                        <EventsByPage activePage={this.state.activePage} eventLimit={4} pagination={false}
                                                      sortBy={'num_participants'}
                                                      filters={this.state.filters}
                                                      smallView={true}
                                                      events={this.props.events}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{padding: '20px 40px 20px 40px'}}>
                                <button type="button" className="_3uc7cf" aria-busy="false"><span className="_1y3tyc"><Link to="/popular_events" style={{color: 'rgb(0, 132, 137)'}}> Show all</Link></span><span
                                    className="_s2tar8"><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true"
                                                             focusable="false"
                                                             style={{height: '10px', width: '10px', fill: 'currentcolor'}}/></span>
                                </button>
                            </div>

                            <div className="col-md-12 artistlist-title-second">
                                <h3 style={{display: 'inline-block', float: 'left'}}>Popular events</h3>
                                <span style={{display: 'inline-block', float: 'right', marginTop: '20px'}}><Link to="/events" style={{color: '#8f939c'}}><span className="viewAll">View all</span> <i className="fas fa-chevron-right" style={{fontSize: '1em', padding: '0px 0px 0px 10px'}}></i> </Link></span>
                            </div>

                            <div style={{clear: 'both'}}></div>

                            <div className="content-right col-md-9">
                                <div className="tab-content">
                                    {/*LIST VIEW*/}
                                    <div >
                                        <EventsByPage activePage={this.state.activePage} eventLimit={4} pagination={false}
                                                      sortBy={'num_participants'}
                                                      filters={this.state.filters}
                                                      smallView={true}
                                                      events={this.props.events}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{padding: '20px 40px 20px 40px'}}>
                                <button type="button" className="_3uc7cf" aria-busy="false"><span className="_1y3tyc"><Link to="/events" style={{color: 'rgb(0, 132, 137)'}}> Show all</Link></span><span
                                    className="_s2tar8"><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true"
                                                             focusable="false"
                                                             style={{height: '10px', width: '10px', fill: 'currentcolor'}}/></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Section Latest Artist*/}
            </div>

        )
    }
}

export default Events;
