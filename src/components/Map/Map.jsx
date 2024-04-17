import React, {useState, useEffect} from 'react'
import {MapContainer, TileLayer, Marker, useMapEvents, Popup, Polyline, useMap, } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'; // Убедитесь, что подключен CSS Leaflet
import './map.css'
import L, { Icon, map, point, polyline } from 'leaflet'
import axios from 'axios';
console.log('argen')

export function Map({filValue}) {
  const [line, setLine] = useState([])
    
  const [pointer, setPointer] = useState([
    {id: 2, position: [37.631857,55.829856], title: "fontan" , teg: "deti" },
    {id: 2, position: [37.625171,55.833239], title: "cheburek" , teg: "one" },
    {id: 6, position: [37.634592,55.833356], title: "dom cultur" , teg: "para" },
      {id: 5, position: [37.638585, 55.830391], title: "moscov ekspa" , teg: "deti" },
      {id: 4, position: [ 37.637522,55.829654], title: "aly parusa" , teg: "para" },
        {id: 3, position:[37.637777,55.828552], title: "mac" , teg: "one" },
        
    ])

    const fil = filValue
    const dataC = pointer.filter(i=>i.teg == fil)


    const LeafIcon = L.Icon.extend({
        options: {
            iconSize: [38, 38]
        }
    })
    
    const [mapC, setMapC] = useState([])
    const getPointer =  async ( index)=>{
      
      console.log(dataC)
       dataC.forEach(i=>{
          setMapC(mapC.push(i.position.reverse()))
       })
      console.log(mapC)
      const cordinat = await  axios.post(`https://graphhopper.com/api/1/route?key=cf044edf-53fa-411f-8b5d-80c0f2ff4875`, {
        points: mapC,
        snap_preventions: ['motorway', 'ferry', 'tunnel'],
        details: ['road_class', 'surface'],
        profile: 'foot',
        locale: 'en',
        instructions: true,
        calc_points: true,
        points_encoded: false,
      
      })
      
      const arr2 = cordinat.data.paths[0].points.coordinates.map(i=>{
        
        return i.reverse()
      })
      setLine(arr2)
      
    }
    useEffect(()=>{
      getPointer()
      
    },[fil])

    


    const leafIcon = new LeafIcon({iconUrl: "https://cdn-icons-png.flaticon.com/512/1201/1201643.png"});
    const mestoIcon = new LeafIcon({iconUrl: "https://cdn-icons-png.flaticon.com/128/9931/9931684.png"});
  return (
        <MapContainer className='map' center={[55.826197, 37.637720]} zoom={15}>
          <Polyline positions={line} color='red' />
        <TileLayer
            attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[55.826197, 37.637720]} icon={leafIcon}>
          </Marker>
          {
            dataC.map(i=>(
                <Marker key={i.id} position={i.position.reverse()} icon={mestoIcon}>
                  <Popup>{i.teg}</Popup>
                </Marker>
            ))
          }
        
        </MapContainer>

  )
}
  