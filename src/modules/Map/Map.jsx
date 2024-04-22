import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import point_data from '../../data/point_data';
import position_data from '../../data/position_data';
import './map.css';
import L from 'leaflet';
import axios from 'axios';
export function Map({ tagValue }) {
  const [line, setLine] = useState([]);
  const [time, setTime] = useState(0);

  const convertTime = (min) => {
    const hours = Math.floor(min / 60);
    const minuts = Math.floor(min % 60);
    setTime(`${hours} час  ${minuts} минут`);
  };

  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [38, 38],
    },
  });

  let positionFilter = point_data.filter((i) => i.teg == tagValue);

  const getRoute = async () => {
    try {
      positionFilter = position_data.filter((i) => i.teg == tagValue);
      let travel_time = 0;
      let postitionRequest = [];
      positionFilter.forEach((i) => {
        postitionRequest.push(i.position);
        travel_time = travel_time + i.time;
      });
      convertTime(travel_time);

      const cordinat = await axios.post(
        `https://graphhopper.com/api/1/route?key=cf044edf-53fa-411f-8b5d-80c0f2ff4875`,
        {
          points: postitionRequest,
          snap_preventions: ['motorway', 'ferry', 'tunnel'],
          details: ['road_class', 'surface'],
          profile: 'foot',
          locale: 'en',
          instructions: true,
          calc_points: true,
          points_encoded: false,
        },
      );
      const lineData = cordinat.data.paths[0].points.coordinates.map((i) => {
        return i.reverse();
      });
      setLine(lineData);
    } catch (e) {
      setLine([]);
      positionFilter = [];
    }
  };
  useEffect(() => {
    getRoute();
  }, [tagValue]);
  const mestoIcon = new LeafIcon({ iconUrl: 'image/point.svg' });
  return (
    <div className="contener">
      <MapContainer className="map" center={[55.831605, 37.629239]} zoom={15}>
        <TileLayer
          attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {point_data.map((i) => (
          <Marker icon={mestoIcon} position={i.position}>
            <Popup className="custom_popup">
              <img className="image" src={i.img} alt="" />
              <p>{i.title}</p>
            </Popup>
          </Marker>
        ))}
        <Polyline dashArray={[5, 5]} positions={line} color="#000" />
      </MapContainer>
      <div className="contener__time">Средняя продолжительность маршрута: {time}</div>
    </div>
  );
}