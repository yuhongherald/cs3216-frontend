import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import '../../Main/css/CategoryList.css';
import '../css/filter.css';
import Form from '../../Main/index_page/Form.jsx';

class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gotFilters: false,
            filters: {
                location: 'Bedok',
                category: 'Choose an option',
                event_start_date: '',
                event_end_date: ''
            },
            startDate: new Date('09/12/2018'),
            endDate: new Date('9/20/2018'),
            isPaneOpen: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
        this.remapEventType = this.remapEventType.bind(this);
    }

    resetFilters() {
        this.setState({
            filters: {
                location: '',
                category: '',
                event_start_date: '',
                event_end_date: ''
            },
            gotFilters: false
        })
    }

    onChange(event) {
        event.preventDefault();
        const field = event.target.name;
        const filters = this.state.filters;
        filters[field] = event.target.filters;
        this.setState({
            filters: filters,
            gotFilters: true
        });
    }

    remapEventType(event){
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

    onSelect(e) {
        const filters = this.state.filters;
        filters['category'] = this.remapEventType(e.value);
        this.setState({
            filters: filters,
            gotFilters: true
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

    componentDidMount() {
        Modal.setAppElement(this.el);
    }

    componentWillMount() {
    }


    render() {
        return (
            <div>
                {this.getSlidingPane()}
            </div>
        )
    }

    getSlidingPane() {
        const options = [
            {value: 'none', label: 'Choose an option'},
            {value: 'arts', label: 'Arts'},
            {value: 'food', label: 'Food'},
            {value: 'sports', label: 'Sports'},
            {value: 'social', label: 'Social'}
        ];

        return <div ref={ref => this.el = ref}>
            <p onClick={() => this.setState({ isPaneOpen: true })}><i className="fas fa-search" style={{
                marginRight: '10px',
                fontSize: '16px',
                color: "rgb(255, 90, 95)",
                padding: '0px 0px'
            }}></i>Search & Filter</p>
            <SlidingPane
                isOpen={ this.state.isPaneOpen }
                title='Search'
                from='right'
                // subtitle='Optional subtitle.'
                onRequestClose={ () => {
                    // triggered on "<" on left top click or on outside click
                    this.setState({ isPaneOpen: false });
                } }>
                <Form onClick={this.resetFilters} onChange={this.onChange} filters={this.state.filters}
                      handleChange={this.changeStartDate} value={this.state.startDate}
                      handleChange1={this.changeEndDate} value1={this.state.endDate} options={options}
                      onChange1={this.onSelect}/>
            </SlidingPane>
        </div>;
    }
}


export default Filters;


