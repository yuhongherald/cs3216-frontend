import React, {PropTypes} from 'react';
import '../css/CategoryList.css';
import {Link} from 'react-router';


class CategoryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: true
        }
    }


    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div className="parent">
                    <div className="child"><Link to="/events/categories/arts"><i className="fas fa-music" aria-hidden="true"></i></Link></div>
                    <div className="child"><Link to="/events/categories/food"><i className="fas fa-utensils" aria-hidden="true"></i></Link></div>
                </div>
                <div className="parent">
                    <div className="icon-title"><Link to="/events/categories/arts" className="icon-link"><p>Arts</p></Link></div>
                    <div className="icon-title"><Link to="/events/categories/food" className="icon-link"><p>Food</p></Link></div>
                </div>

                <div className="parent">
                    <div className="child"><Link to="/events/categories/sports"><i className="fas fa-basketball-ball" aria-hidden="true"></i></Link></div>
                    <div className="child"><Link to="/events/categories/social"><i className="fas fa-users" aria-hidden="true"></i></Link></div>
                </div>
                <div className="parent last-parent">
                    <div className="icon-title"><Link to="/events/categories/sports" className="icon-link"><p>Sports</p></Link></div>
                    <div className="icon-title"><Link to="/events/categories/social" className="icon-link"><p>Social</p></Link></div>
                </div>
            </div>
        )
    }
}

export default CategoryList