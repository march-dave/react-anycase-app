import React, { Component } from 'react'

export default class LifeCycle extends Component {
    state = {
        number: 0
      }
    
      constructor(props) {
        super(props);
        console.log('constructor');
      }
      
      // deprecate
      componentWillMount() {
        // 화면에 나가기 바로 직전에 호출 되는 API 16.3 에서 deprecated
        // 16.3 이후에는 UNSAFE_componentWillMount 로 사용 되어 지며
        // 주로 서버 사이드 처리 용도로 사용되어 졌다.
        // constructor 와 componentDidMount 에서 처리 된다.
        console.log('componentWillMount (deprecated)');
      }
    
      componentDidMount() {
        // 외부 라이브러리 연동 Ajax 콜
        // DOM의 속성을 읽거나 변경하는 작업도 여기
        // 이곳은 랜더링 끝나고 실행되는 사이클이다. 따라서 DOM의 속성을 읽을 수 있다. 업로드 컨트롤의 속성을 이곳에서 읽을 수 있다. 
        console.log('componentDidMount');
      }

      getDerivedStateFromProps(nextProps, prevState) {
        // 16.3 이후에 만들어진 라이프 사이클
        // 여기서는 setState 를 하는 것이 아니라
        // 특정 props 가 바뀔 때 설정하고 설정하고 싶은 state 값을 리턴하는 형태로
        // 사용됩니다.
        /*
        if (nextProps.value !== prevState.value) {
          return { value: nextProps.value };
        }
        return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미
        */
      }
    
      shouldComponentUpdate(nextProps, nextState) {
        // 5 의 배수라면 리렌더링 하지 않음  false 이면 업데이트 안함
        console.log('shouldComponentUpdate');
        if (nextState.number % 5 === 0) return false;
        return true; // true  이면 업데이트, true 가 기본 설정 값이다.
      }
    
      // deprecate
      componentWillUpdate(nextProps, nextState) {
        // true 반환 할때만 호출 false 반환 되면 호출 안함
        // 애니메이션 효과 초기화, 이벤트 리스너 없애는 작업 
        // 이 함수 호출되고 난 후에 render() 호출
        // 16.3 이후 deprecate 그러면 어디서 대체 되나
        // 요기로 ==> getSnapshotBeforeUpdate 
        console.log('componentWillUpdate');
      }
      
      getSnapshotBeforeUpdate() {
        // News API
        // 이 API 가 발생하는 시점은 다음과 같습니다.

        //  1. render()
        //  2. getSnapshotBeforeUpdate()
        //  3. 실제 DOM 에 변화 발생
        //  4. componentDidUpdate
      }

      componentDidUpdate(prevProps, prevState, snapshot) {
        // 컴포넌트에서 render 호출 후 다음에 발생
        // this.props 와  this.state 가 바뀐다.
        // 이전 값인 prevProps, prevState 를 조회 할 수 있다.
        // getSnapshotBeforeUpdate 에서 반환한 snapshot 값은 세번째 값으로 받아 온다.
        console.log('componentDidUpdate');
      }
      
      componentWillUnmount() {
        // 컴포넌트가 더 이상 필요 하지 않게 되면 호출 된다.
        // 이벤트 setTimer 외부 라이브러리 인스턴스
      }
      // tihs.forceUpdate() 함수를 통해 강제 렌더링 
    
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
