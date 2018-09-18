import React, {PropTypes} from 'react';
import '../../Main/css/CategoryList.css';
import '../../Events/css/Events.css';
import {Link} from 'react-router';
import EventsByPage from "../../Common/EventsByPage.jsx";


class SpecialCategoryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: true,
            filters: {
                event_type: "1"
            }
        }

    }


    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div>
                    <div className="parent border-top-bottom" style={{padding: '20px 0px 20px 00px'}}>
                        <div className="child child-60"><p>Chinese</p></div>
                        <div className="child child-60"><p>Japanese</p></div>
                        <div className="child child-60 last-child-60"><p>Western</p></div>
                    </div>
                </div>
                <div style={{backgroundColor: "#f2f2f2", height: '100%', marginTop: '-20px'}}>
                    <h4 style={{padding: '20px 20px', fontWeight: 'bold'}}>All {this.props.category} events</h4>
                    <div className="content-right col-md-9">
                        <div className="tab-content">
                            {/*LIST VIEW*/}
                            <div id="list-view" className="tab-pane fade active in" role="tabpanel">
                                <EventsByPage activePage={this.state.activePage} eventLimit="null"
                                              pagination={true}
                                              filters={this.state.filters}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SpecialCategoryList;