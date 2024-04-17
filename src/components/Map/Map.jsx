import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, Popup, Polyline, useMap, } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'; // Убедитесь, что подключен CSS Leaflet
import './map.css'
import L, { Icon, map, point, polyline } from 'leaflet'
import axios from 'axios';


export function Map({ filValue }) {
  const [line, setLine] = useState([])
  const [pointer, setPointer] = useState([
    { id: 2, position: [37.631857, 55.829856], time: 20, title: "fontan", teg: "deti" },
    { id: 5, position: [37.638585, 55.830391], time: 20, title: "moscov ekspa", teg: "deti" },
    { id: 9, position: [37.628180, 55.830380], time: 20, title: "cheburek", teg: "one" },
    { id: 2, position: [37.625171, 55.833239], time: 20, title: "cheburek", teg: "one" },
    { id: 3, position: [37.637777, 55.828552], time: 20, title: "mac", teg: "one" },
    { id: 6, position: [37.634592, 55.833356], time: 20, title: "dom cultur", teg: "para" },
    { id: 4, position: [37.637522, 55.829654], time: 20, title: "aly parusa", teg: "para" },


  ])
  const [time, setTime] = useState(0)
  const [loading, setLoading] = useState(false)

  const fil = filValue
  let dataC = []
  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [38, 38]
    }
  })
  const getPointer = async () => {
    dataC = pointer.filter(i => i.teg == fil)
    let time2 = 0
    let argen = []
    dataC.forEach(i => {
      argen.push(i.position)
      console.log(i.time)
      time2 = time2 + i.time
    })
    setTime(time2)
    const cordinat = await axios.post(`https://graphhopper.com/api/1/route?key=cf044edf-53fa-411f-8b5d-80c0f2ff4875`, {
      points: argen,
      snap_preventions: ['motorway', 'ferry', 'tunnel'],
      details: ['road_class', 'surface'],
      profile: 'foot',
      locale: 'en',
      instructions: true,
      calc_points: true,
      points_encoded: false,
    })
    const arr2 = cordinat.data.paths[0].points.coordinates.map(i => {
      return i.reverse()
    })
    setLine(arr2)
  }
  useEffect(() => {
    setLoading(false)
    getPointer()
    setLoading(true)
  }, [fil])

  const leafIcon = new LeafIcon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/1201/1201643.png" });
  const mestoIcon = new LeafIcon({ iconUrl: "https://cdn-icons-png.flaticon.com/128/9931/9931684.png" });
  return (
    <div className='contener'>


      <MapContainer className='map' center={[55.831605, 37.629239]} zoom={16}>
        <Polyline positions={line} color='red' />
        <TileLayer
          attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <h1>{time}M</h1>
    </div>

  )
}
