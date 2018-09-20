import React, {PropTypes} from 'react';
import '../../Main/css/CategoryList.css';
import '../../Events/css/Events.css';
import SpecialCategoryList from '../../Events/events_by_category/SpecialCategoryList.jsx';


class EventsByCategory extends React.Component {

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
                <SpecialCategoryList category={this.props.params.category}/>
            </div>
        )
    }
}

export default EventsByCategory;