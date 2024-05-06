import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import point_data from '../../data/point_data';
import position_data from '../../data/position_data';
import './map.css';
import L from 'leaflet';
import axios from 'axios';
export function Map({ tagValue, priceValue }) {
  const [line, setLine] = useState([]);
  const [time, setTime] = useState(0);
  const [price, setPrice] = useState(0);

  // Функция для получения красивого времени
  const convertTime = (min) => {
    const hours = Math.floor(min / 60);
    const minuts = Math.floor(min % 60);
    setTime(`${hours} час  ${minuts} минут`);
  };

  // Установка размера поинта
  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [38, 38],
    },
  });

  // Получает только выборный по тегу Координаты
  let positionFilter = point_data.filter((i) => i.tag == tagValue);

  // Получить навигацию
  const getRoute = async () => {
    try {
      // Получает только выборный по тегу Координаты
      positionFilter = position_data.filter((i) => i.tag == tagValue);
      positionFilter = positionFilter.filter((i) => i.price <= priceValue);
      let travel_time = 0;
      let travel_price = 0;
      let postitionRequest = [];
      positionFilter.forEach((i) => {
        postitionRequest.push(i.position);
        travel_time = travel_time + i.time;
        travel_price = travel_price + i.price;
      });
      setPrice(travel_price);
      convertTime(travel_time);

      // Запрос на поучение маршрута
      const coordinates = await axios.post(
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
      const lineData = coordinates.data.paths[0].points.coordinates.map((i) => {
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
  }, [tagValue, priceValue]);
  // Установка Картинки поинта
  const mestoIcon = new LeafIcon({ iconUrl: 'image/point.svg' });
  return (
    <div className="contener">
      <MapContainer className="map" center={[55.831605, 37.629239]} zoom={15}>
        <TileLayer
          attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {point_data.map((i, index) => (
          <Marker key={index} icon={mestoIcon} position={i.position}>
            <Popup className="custom_popup">
              <img className="image" src={i.img} alt="" />
              <p>{i.title}</p>
            </Popup>
          </Marker>
        ))}
        <Polyline dashArray={[5, 5]} positions={line} color="#000" />
      </MapContainer>
      <div className="contener__time">
        <p className="contener_text">Средняя продолжительность прогулки: {time}</p>
        <p className="contener_text2">Средняя стоимость прогулки на человека: {price} р</p>
      </div>
    </div>
  );
}
