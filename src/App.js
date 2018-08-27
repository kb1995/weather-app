import React, { Component } from 'react';
import './App.css';
import Map from './components/maps';
import Information from './components/information';

const API_Key = "06c881f3e298cad4cd789b46aee42258";

class App extends Component {
  state = {
      isloaded: false,
      hasError: false,
      weather: [],
      cityName: '',
      tempType: "C",
      temp: '',
      name: '',
      description: '',
      humidity: '',
      wind: '',
      lat: '',
      lon: '',
    }

    componentDidMount() {
      this.watchID = navigator.geolocation.watchPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      });
    }

  handleClick = (e) => {
    if (this.state.cityName.length !==0 && e.which === 13) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&APPID=${API_Key}`)
      .then(response =>response.json())
      .then((data) => {
        this.setState({
          weather: data,
          isloaded: true,
          cityName: '',
          tempType: "C",
        });
        this.setState((prevState) => ({
          temp: (prevState.weather.main.temp - 273).toFixed(2),
          name: prevState.weather.name,
          description: prevState.weather.weather[0].description,
          humidity: prevState.weather.main.humidity,
          wind: prevState.weather.wind.speed,
        }))
      },(error) => {
        if (error) {
          this.setState({
            name: 'Please enter a valid town'
          })
        }
      }
    );
  }}

  handleInput = (event) => {
    this.setState ({
      cityName: (event.target.value).charAt(0).toUpperCase() + event.target.value.slice(1)
    })
  }

convertTemp = () => {
  if (this.state.tempType === "C"){
    this.setState({tempType: "F"})
    this.setState((prevState) => ({
      temp: ((9/5 * prevState.temp) + 32).toFixed(2),
    }));
  }else if (this.state.tempType === "F"){
    this.setState({tempType: "C"});
    this.setState((prevState) => ({
      temp: ((prevState.temp - 32 ) * 5/9).toFixed(2)
    }));
  }
}

currentLocation = () => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lon}&APPID=${API_Key}`)
  .then(response =>response.json())
  .then((data) => {
    this.setState({
      weather: data,
      isloaded: true,
      cityName: '',
      tempType: "C",
    });
    this.setState((prevState) => ({
      temp: (prevState.weather.main.temp - 273).toFixed(2),
      name: prevState.weather.name,
      description: prevState.weather.weather[0].description,
      humidity: prevState.weather.main.humidity,
      wind: prevState.weather.wind.speed,
    }))
  });
}

  
  render() {
    let data = '';

    if (this.state.isloaded){
      return ( data =       <div className="wrapper">
      <div className ='header'>
        <h1 id = "heading">Worldwide Current Weather</h1>
      </div>
      <div className = 'input'>
        <input onKeyPress = {this.handleClick} id='inputForm' onChange = {this.handleInput} value = {this.state.cityName} type = 'text' placeholder='City...' required/> <br />
      </div>
      <div className= 'buttons'>
        {/* <button onClick = {this.handleClick} className = 'btn btn-primary'>City Weather</button>
        <button onClick = {this.currentLocation} className = 'btn btn-primary'>Current location</button> */}
      </div>
      <div className ='map'>
        <p id='city'>{this.state.name} </p>
        <Map lat = {this.state.weather.coord.lat} lon = {this.state.weather.coord.lon} />
      </div>
      <div className ='information'>
          <Information 
            temp = {this.state.temp} 
            tempType = {this.state.tempType}
            convertTemp = {this.convertTemp} 
            description = {this.state.description}
            humidity = {this.state.humidity}
            wind = {this.state.wind}
            icon = {this.state.weather.weather[0].icon}
            />
        </div>

    </div>)
    }
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Error occurred!</h1>;
    }
    return (
      <div className="wrapper">
        <div className ='header'>
          <h1 id = "heading">Worldwide Current Weather</h1>
        </div>
        <div className = 'input'>
          <input onKeyPress = {this.handleClick} id='inputForm' onChange = {this.handleInput} value = {this.state.cityName} type = 'text' placeholder='City...' required/> <br />
        </div>
        <div className= 'buttons'>
          {/* <button onClick = {this.handleClick} className = 'btn btn-primary'>City Weather</button> */}
          {/* <button onClick = {this.currentLocation} className = 'btn btn-primary'>Current location</button> */}
        </div>
        {data}
      </div>
    );
  }
}

export default App;
