import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, Popup, Polyline, useMap, } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'; // Убедитесь, что подключен CSS Leaflet
import './map.css'
import L, { Icon, map, point, polyline } from 'leaflet'
import axios from 'axios';


export function Map({ filValue }) {
  const [line, setLine] = useState([])
  const [pointer, setPointer] = useState([
    { id: 2, position: [37.639728,55.822728], img: "", time: 40, title: "Музей космонавтики", teg: "deti" },
    { id: 2, position: [37.631857, 55.829856], img: "", time: 20, title: "Фонтан Дружба народов", teg: "deti" },
    { id: 5, position: [37.638585, 55.830391], img: "", time: 20, title: "ВДНХ Экспо",  teg: "deti" },
    { id: 2, position: [37.625171, 55.833239], img: "", time: 20, title: "cheburek", teg: "one" },
    { id: 9, position: [37.628180, 55.830380],img: "", time: 20, title: "cheburek", teg: "one" },
    { id: 3, position: [37.637777, 55.828552],img: "", time: 20, title: "mac", teg: "one" },
    { id: 6, position: [37.618359,55.832956],img: "", time: 20, title: "Москвариум", teg: "para" },
    { id: 6, position: [37.634592, 55.833356],img: "", time: 20, title: "Дом культуры", teg: "para" },
    { id: 4, position: [37.637522, 55.829654],img: "", time: 20, title: "Алые паруса", teg: "para" },
    { id: 4, position: [37.637633,55.826303],img: "", time: 20, title: "aly parusa", teg: "deti" },
    { id: 4, position: [37.637633,55.826303],img: "", time: 20, title: "aly parusa", teg: "one" },
    { id: 4, position: [37.637633,55.826303],img: "", time: 20, title: "aly parusa", teg: "para" },
  ])
  const [pointClone, setPointerClone] = useState([

      { id: 2, position: [55.822728, 37.639728], img: "https://cdn.culture.ru/images/4d639fcf-7787-5992-89b3-2b682a74eeb0", time: 20, title: "Музей космонавтики", teg: "deti" },
      { id: 2, position: [55.829856,37.631857], img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/31/1e/39/the-fountain.jpg?w=1100&h=-1&s=1",  time: 20, title: "Фонтан Дружба народов", teg: "deti" },
      { id: 5, position: [55.830391,37.638585], img: "https://regions.kidsreview.ru/sites/default/files/styles/oww/public/12/12/2014_-_1746/vdnh-ekspo.jpg", time: 20, title: "ВДНХ Экспо", teg: "deti" },
      { id: 2, position: [55.833239, 37.625171], img: "", time: 20, title: "cheburek", teg: "one" },
      { id: 9, position: [55.830380,37.628180],img: "", time: 20, title: "cheburek", teg: "one" },
      { id: 3, position: [55.828552,37.637777],img: "", time: 20, title: "mac", teg: "one" },
      { id: 6, position: [55.833322, 37.618515],img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/6e/ad/27/img-20180620-104558-largejpg.jpg?w=1400&h=-1&s=1", time: 20, title: "Москвариум", teg: "para" },
      { id: 6, position: [55.833356,37.634592],img: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Moscow%2C_VDNKh%2C_model_House_of_Culture_%2810656153396%29.jpg", time: 20, title: "Дом культуры", teg: "para" },
      { id: 4, position: [55.829654,37.637522],img: "https://cdn.spbdnevnik.ru/uploads/block/image/836838/__medium_%D0%B0%D0%BB%D1%8B%D0%B5%D0%BF%D0%B0%D1%80%D1%83%D1%81%D0%B0%D1%84%D1%83%D1%84%D0%B0%D0%B5%D0%B2.jpg.jpg", time: 20, title: "Алые паруса", teg: "para" },
      { id: 10, position: [55.826303,37.637633],img: "https://um.mos.ru/uploads/house/media/4076/16392ccfaed501.jpg", time: 20, title: "Главный вход ВДНХ", teg: "deti" },
      { id: 10, position: [55.826303,37.637633], img: "https://um.mos.ru/uploads/house/media/4076/16392ccfaed501.jpg", time: 20, title: "Главный вход ВДНХ", teg: "one" },
      { id: 10, position: [55.826303,37.637633],img: "https://um.mos.ru/uploads/house/media/4076/16392ccfaed501.jpg", time: 20, title: "Главный вход ВДНХ", teg: "para" },
    
  ])
  const [time, setTime] = useState(0)



  
  

  const fil = filValue
  let dataC = []
  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [38, 38]
    }
  })

  let ar
  ar = pointClone.filter(i => i.teg == fil)
  
  
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
    console.log(arr2)
  }
  useEffect(() => {
    getPointer()
  }, [fil])

  const leafIcon = new LeafIcon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/1201/1201643.png" });
  const mestoIcon = new LeafIcon({ iconUrl: "image/point.svg" });
  return (
    <div className='contener'>
      <MapContainer  className='map' center={[55.831605, 37.629239]} zoom={15}>
        
        <TileLayer
          attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          ar.map(i=>(
            <Marker icon={mestoIcon} position={i.position}>
              <Popup className='custom_popup'>
                <img className='image' src={i.img} alt="" />
                <p>{i.title}</p>
              </Popup>
            </Marker>
          ))
        }
        

        <Polyline dashArray={[5, 5]}  positions={line} color='#000' />
      </MapContainer>
      <div className='contener__time'>Средняя продолжительность маршрута: <span> {time} M</span></div>
    </div>

  )
}
