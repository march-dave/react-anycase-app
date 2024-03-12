import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function App(){
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);

  useEffect(()=>{
    if ( count != 0 && count < 3 ) {
      setAge(age+1)
    }
   }, [count]) 

  return (
    <div>
      <div>안녕하십니까 전 {age}</div>
      <button onClick={()=>{
            setCount(count+1);
            }}>누르면한살먹기1
        </button> 
    </div>
  )

}



ReactDOM.render(<App />, document.getElementById('root'));