import React, { useState } from "react";
import { Map } from "./modules";
import "./App.css"
import tabe_data from "./data/tabe_data";
import classNames from "classnames";

export default function App() {
  
  const [tabList, setTabeList] = useState(tabe_data)

  const [tag, setTag] = useState('')
  const [price, setPrice] = useState(Infinity)
 
  const [PriceFilter, setPriceFilter] = useState([
    {id: 1, title: "Бесплатные", price: 0, activ: false},
    {id: 2, title: "Все", price: Infinity, activ: true}
  ])

  // Табы
  const onTabe = (id) => {
    setTabeList(prive =>
      prive.map(i =>
        i.id === id
          ? { ...i, activ: true }
          : { ...i, activ: false }
      ))
  }
  const onPrice = (e)=>{
    setPrice(e.price)
    setPriceFilter(prive =>
      prive.map(i =>
        i.id === e.id
          ? { ...i, activ: true }
          : { ...i, activ: false }
      ))
  }

  return (
    <div className="page">
      <div className="page__filters">
      <div className="filter">
        <h2 className="filter__title">Категории</h2>
        <div className="filter__block">
          {
            tabList.map(i => (
              <div className={classNames("box", {
                ["box__activ"]: i.activ
              })} key={i.id} onClick={() => {
                onTabe(i.id)
                setTag(i.tag)
              }}>{i.text}</div>
            ))
          }
        </div>
      </div>
      <div className="prices">
        {
          PriceFilter.map((i)=>(
            <button key={i.id} className={classNames("prices__block", {
              ["prices__block_activ"]: i.activ
            })} onClick={()=>onPrice(i)} >{i.title}</button>
          ))
        }
      </div>
      </div>

      <Map priceValue={price} tagValue={tag} />

    </div>
  );

}