import React, {PropTypes} from 'react';
import '../css/CategoryList.css';


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
                    <div className="child"><i className="fas fa-music" aria-hidden="true"></i></div>
                    <div className="child"><i className="fas fa-utensils" aria-hidden="true"></i></div>
                </div>
                <div className="parent">
                    <div className="icon-title"><p>Arts</p></div>
                    <div className="icon-title"><p>Food</p></div>
                </div>

                <div className="parent">
                    <div className="child"><i className="fas fa-basketball-ball" aria-hidden="true"></i></div>
                    <div className="child"><i className="fas fa-users" aria-hidden="true"></i></div>
                </div>
                <div className="parent last-parent">
                    <div className="icon-title"><p>Sports</p></div>
                    <div className="icon-title"><p>Social</p></div>
                </div>
            </div>
        )
    }
}

export default CategoryList