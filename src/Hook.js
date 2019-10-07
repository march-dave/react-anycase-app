import React, { useState, useEffect } from 'react';

// https://www.youtube.com/watch?v=GuIiGOMJgUI
// React hooks 을 배워야 하는 2 가지 이유 
// useState, useEffect 가 있는데
// useState 는 State를 관리 하고 useEffect 는 라이프 사이클을 관리 한다.
// useEffect는 두번 이상 호출 되는 것을 라이프 사이클에서 관리 할 수 있다.

// https://www.youtube.com/watch?v=y52Av3JxNW4



// React Hooks 은 버전 16.8 이상에서 지원 한다.( 버전 1.8 이상이다 !!!)
// 라이프 사이클은 componentDidMount, componentDidUnmount, componentWillUnmount 만 지원한다. 이얘기는 rendering 이 끝난 후에 만 사용 가능 하나는 얘기 인데?

const Sample = (props) => {
    // ? count, setCount 이것은 어디서 나왔냐?
    // ? useState(0) 이것은 무엇이냐?
    // ? [count, setCount] 이것은 무엇인데 배열인가?
    // ? [count, setCount] = useState(0) 는 어떻게 할당 되나?
    const [count, setCount] = useState(0);
    const [newTodo, setNewCount] = useState();

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