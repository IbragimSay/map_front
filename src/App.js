import React, { useState } from "react";
import { Map } from "./modules";
import "./App.css"
import tabe_data from "./data/tabe_data";
import classNames from "classnames";

export default function App() {

  
  const [tabList, setTabeList] = useState(tabe_data)

  const onTabe = (id) => {
    setTabeList(prive =>
      prive.map(i =>
        i.id === id
          ? { ...i, activ: true }
          : { ...i, activ: false }
      ))
  }
  let [tag, setTag] = useState('one')

  return (
    <div className="page">

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

      <Map tagValue={tag} />

    </div>
  );

}