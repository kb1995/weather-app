import React, { Component } from 'react'
import './information.css'

export default class Information extends Component {
    render() {
        return (
            <div>
            <ul className = 'list-group'>
              <li className="list-group-item">Temperature: {this.props.temp} {this.props.tempType}  <button onClick = {this.props.convertTemp} className ='btn btn-secondary'>Convert</button> </li>
              <li className="list-group-item">Description: {this.props.description} </li>
              <li className="list-group-item">Humidity: {this.props.humidity} <br /> </li>
              <li className="list-group-item">Wind: {this.props.wind} </li>
              <li className="list-group-item"> <img src = {`http://openweathermap.org/img/w/${this.props.icon}.png`} /> </li>
            </ul>
            </div>
        )
    }
}
