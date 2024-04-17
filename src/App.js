import React, { useState } from "react";
import { Map } from "./components";
import "./App.css"
import classNames from "classnames";

export default function App() {
  const [arr, setArr] = useState([
    { id: 1, text: "Один", title: "one", activ: true },
    { id: 2, text: "с Детьми", title: "deti", activ: false },
    { id: 3, text: "Пара", title: "para", activ: false }
  ])
  const [activ, setActiv] = useState('')
  const [filter, setFilter] = useState(arr.filter(e => {
    if (e.activ) return e
  }))


  const tabe = (id) => {
    setArr(prive =>
      prive.map(i =>
        i.id === id
          ? { ...i, activ: true }
          : { ...i, activ: false }
      ))
  }
  let [fil, setFil] = useState('one')


  return (
    <div className="page"> {/* Контейнер с явно заданной высотой */}

      <div className="filter">
        {
          arr.map(i => (
            <div key={i.id} onClick={() => {
              tabe(i.id)
              setFil(i.title)
            }} className="box"><div className={classNames("activ", {
              ["activ_not"]: i.activ
            })}></div><p>{i.text}</p></div>
          ))
        }
      </div>
      <Map filValue={fil} />
    </div>
  );

}