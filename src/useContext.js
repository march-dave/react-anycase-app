(App.js)
export let 재고context = React.createContext();

function App(){
  let [재고, 재고변경] = useState([10,11,12]);

  return (
    <Context1.Provider value={ {재고, shoes} }>
      <Detail shoes={shoes}/>
    </Context1.Provider>
    
  )
}

(Detail.js)
import {useState, useEffect, useContext} from 'react';
import {Context1} from './../App.js';

function Detail(){
  let {재고} = useContext(Context1)

  return (
    <div>{재고}</div>
  )
}