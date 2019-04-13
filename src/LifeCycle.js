import React, { Component } from 'react'

export default class LifeCycle extends Component {
    state = {
        number: 0
      }
    
      constructor(props) {
        super(props);
        console.log('constructor');
      }
      
      componentWillMount() {
        console.log('componentWillMount (deprecated)');
      }
    
      componentDidMount() {
        // 외부 라이브러리 연동 Ajax 콜
        // DOM의 속성을 읽거나 변경하는 작업도 여기
        console.log('componentDidMount');
      }
    
      shouldComponentUpdate(nextProps, nextState) {
        // 5 의 배수라면 리렌더링 하지 않음
        console.log('shouldComponentUpdate');
        if (nextState.number % 5 === 0) return false;
        return true;
      }
    
      componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate');
      }
      
      componentDidUpdate(prevProps, prevState) {
        // 컴포넌트에서 render 호출 후 다음에 발생
        // this.props 와  this.state 가 바뀐다.
        // 이전 값인 prevProps, prevState 를 조회 할 수 있다.
        console.log('componentDidUpdate');
      }
      
      componentWillUnmount() {
        // 컴포넌트가 더 이상 필요 하지 않게 되면 호출 된다.
        // 이벤트 setTimer 외부 라이브러리 인스턴스
      }
    
      handleIncrease = () => {
        const { number } = this.state;
        this.setState({
          number: number + 1
        });
      }
    
      handleDecrease = () => {
        this.setState(
          ({ number }) => ({
            number: number - 1
          })
        );
      }
      
      render() {
        console.log('render');
        return (
          <div>
            <h1>카운터</h1>
            <div>값: {this.state.number}</div>
            <button onClick={this.handleIncrease}>+</button>
            <button onClick={this.handleDecrease}>-</button>
          </div>
        );
      }
    }
