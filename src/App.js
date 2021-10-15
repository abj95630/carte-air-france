// eslint-disable-next-line
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import React from 'react';

export default class App extends React.Component {

  state = {
    data: {}
  } 

  componentDidMount() {
    axios.get("https://docs.openaq.org/v2/measurements?date_from=2000-01-01T00%3A00%3A00%2B00%3A00&date_to=2021-10-13T17%3A00%3A00%2B00%3A00&limit=1&page=1&offset=0&sort=desc&radius=1000&country_id=FR&country=FR&city=Paris&order_by=city")
    .then(res => {
        for(const [key, index] of Object.entries(res.data.results)) {
          this.setState({
            // eslint-disable-next-line
            data: this.state.data[key] = index
          })
        }
        console.log(this.state.data)
    })
  }

  render() {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
      iconUrl: require('leaflet/dist/images/marker-icon.png').default,
      shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
    });
      
    const positionFR = [46.232, 2.20];
    const postionParis = [48.8277822163547, 2.32749896854232]
    
    return (
      <MapContainer center={positionFR} 
        zoom={6} 
        scrollWheelZoom={false} 
        style={{ width: "100%", height: "735px"}}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={postionParis}>
          <Popup>
            <h1>{this.state.data.city}</h1>
            <p>{this.state.data.value} {this.state.data.unit}</p>
            <p>{this.state.data.country}</p>
          </Popup>
        </Marker>
      </MapContainer>
    )
  }
}
