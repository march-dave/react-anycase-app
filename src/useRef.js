import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function App() {
  const [inputValue, setInputValue] = useState("10");
  const count = useRef(81);
  
  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h1>Render Count: {count.current}</h1>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));