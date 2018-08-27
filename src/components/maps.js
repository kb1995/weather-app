import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
import './maps.css'

export default class Map extends Component {
    render() {
        return (
            <div className = "map">
            <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyCKI-kaeO5cSkTejmNCBz8e3CA1xx3Unak" }}
            center={{lat: this.props.lat, lng: this.props.lon}}
            zoom={10}
            >
            </GoogleMapReact>
            </div>
        )
    }
}
