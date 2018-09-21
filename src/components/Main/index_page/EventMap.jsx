import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import {compose, withProps} from "recompose";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import marker from "../../../static/assets/images/marker.png";
import eventController from "../../../controllers/eventController";
import {Link} from "react-router";


const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD6VsUPahFrXaNhkUjOeKnlFgPUyT-l36k",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{
            height: `400px`, width: '94%', marginLeft: 'auto',
            marginRight: 'auto'
        }}/>,
        mapElement: <div style={{height: `100%`}}/>,
    }),
    withScriptjs,
    withGoogleMap
)((props) => {
        let map = React.createRef();
        const markers = props.locations.map((coordinate, index) => {
            return (
                <Marker key={index} position={coordinate} icon={marker} onClick={() => {
                    if (map) {
                        map.current.panTo(coordinate);
                    }
                    props.toToggleOpen(index);
                }}>
                    {index === props.cur_open && <InfoBox onCloseClick={props.toToggleClose} options={{
                        closeBoxURL: ``,
                        enableEventPropagation: true
                    }}>
                        <div style={{backgroundColor: `white`, opacity: 0.75, padding: `12px`}}>
                            <div style={{fontSize: `14px`, fontColor: `#008489`}}>
                                <Link to={`/events/${props.events[index].pk}`}>{props.events[index].fields.event_title}</Link>
                            </div>
                            <p style={{fontSize: `10px`, fontColor: `#ccc`}}><i className="fas fa-map-marker-alt"
                                style={{
                                    fontSize: '10px',
                                    padding: '2px 3px 2px 3px',
                                    color: 'rgb(0, 132, 137)',
                                    borderRadius: '50%',
                                    backgroundColor: 'white',
                                    border: '1px solid #ccc',
                                    margin: '0px 13px 0px 5px'

                                }}></i>{props.events[index].fields.address}</p>
                        </div>
                    </InfoBox>}
                </Marker>
            )
        });
        return (<GoogleMap
            defaultZoom={14}
            center={props.defaultCenter}
            options={{
                mapTypeId: "roadmap",
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                scrollwheel: false,
                fullscreenControl: true
            }}
            ref={map}
        >
            {markers}
        </GoogleMap>);
    }
);

export default class EventMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: 0,
                lng: 0
            },

            cur_open: -1,

            locations: [],

            events: []
        };
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let coordinate = {
                    lat: parseFloat(position.coords.latitude.toFixed(6)),
                    lng: parseFloat(position.coords.longitude.toFixed(6))
                };
                eventController.getNearbyEvents(coordinate).then(response => {
                    let data = response.data;
                    if (data.status === 'success') {
                        let events = JSON.parse(data.events);
                        let locations = events.map(event => {
                            return {
                                lat: parseFloat(event.fields.lat),
                                lng: parseFloat(event.fields.lng)
                            }
                        });
                        this.setState({
                            locations: locations,
                            center: coordinate,
                            events: events
                        });
                    }
                }).catch(err => {
                    return {
                        status: 'failed',
                        desc: err
                    }
                });

            });
        } else {
            console.log("geolocation not enabled");
        }
    }


    toToggleClose() {
        this.setState({
            cur_open: -1
        });
    }


    toToggleOpen(index) {
        this.setState({
            cur_open: index
        });
    }

    render() {
        return (
            <div>
                <MyMapComponent
                    defaultCenter={this.state.center}
                    toToggleOpen={this.toToggleOpen.bind(this)}
                    toToggleClose={this.toToggleClose.bind(this)}
                    locations={this.state.locations}
                    cur_open={this.state.cur_open}
                    events={this.state.events}
                />
            </div>
        );
    }
}