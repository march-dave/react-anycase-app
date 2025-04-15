import { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";

function App() {
  const [inputValue, setInputValue] = useState("10");
  const [renderCount, setRenderCount] = useState(0);
  
  // 컴포넌트가 렌더링될 때마다 카운트 증가
  useEffect(() => {
    setRenderCount(prevCount => prevCount + 1);
  }, []);

  // input 값이 변경될 때만 처리하는 메모이제이션 함수
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // 입력값에 따른 계산 결과를 메모이제이션
  const processedValue = useMemo(() => {
    console.log("입력값 처리 중...");
    return inputValue.length > 0 ? `입력값: ${inputValue}` : "입력값 없음";
  }, [inputValue]);

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
      />
      <h1>Render Count: {renderCount}</h1>
      <p>{processedValue}</p>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
