import React, { useState, useEffect } from 'react';

// React Hooks 은 버전 16.8 이상에서 지원 한다.
// 라이프 사이클은 componentDidMount, componentDidUnmount, componentWillUnmount 만 지원한다. 이얘기는 rendering 이 끝난 후에 만 사용 가능 하나는 얘기 인데?

const Sample = (props) => {
    // ? count, setCount 이것은 어디서 나왔냐?
    // ? useState(0) 이것은 무엇이냐?
    // ? [count, setCount] 이것은 무엇인데 배열인가?
    // ? [count, setCount] = useState(0) 는 어떻게 할당 되나?
    const [count, setCount] = useState(0);

    // Similar to componentDidMount and componentDidUpdate:
    // ? useEffect 이것도 조사해 보자
    useEffect(() => {
      // Update the document title using the browser API
      document.title = `You clicked ${count} times`;
    });
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
};

export default Sample;