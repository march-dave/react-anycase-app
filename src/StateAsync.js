import React, { Component, useState } from 'react';

/**
 * useState의 setState가 비동기인 이유
 *
 * 1. 성능 최적화 (Batching)
 *    - React는 여러 setState 호출을 배치로 묶어서 한 번에 처리
 *    - 불필요한 리렌더링을 방지하여 성능 향상
 *
 * 2. 비용 절감
 *    - DOM 업데이트는 비용이 많이 드는 작업
 *    - 여러 상태 변경을 모아서 한 번에 처리하면 DOM 업데이트 횟수 감소
 *
 * 3. 일관성 보장
 *    - 부모-자식 컴포넌트 간의 상태 일관성 유지
 *    - 렌더링 중간에 상태가 변경되는 것을 방지
 */

// 함수형 컴포넌트 예제 (Hooks 사용)
export const StateAsyncExample = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ❌ 잘못된 사용 예: setState는 비동기이므로 즉시 반영되지 않음
  const wrongExample = () => {
    setCount(count + 1);
    console.log(count); // 이전 값이 출력됨 (업데이트된 값이 아님)
  };

  // ✅ 올바른 사용 예 1: 함수형 업데이트 사용
  const correctExample1 = () => {
    setCount(prevCount => {
      const newCount = prevCount + 1;
      console.log('새로운 값:', newCount); // 업데이트될 값 확인 가능
      return newCount;
    });
  };

  // ✅ 올바른 사용 예 2: useEffect로 변경 감지
  // useEffect(() => {
  //   console.log('count가 변경됨:', count);
  // }, [count]);

  // 🔥 Batching 예제: 여러 setState가 한 번에 처리됨
  const batchingExample = () => {
    console.log('Before:', count);

    // 이 세 개의 setState는 한 번에 배치 처리됨
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);

    // 결과: count는 1만 증가 (3이 아님!)
    // 왜냐하면 세 호출 모두 같은 count 값을 참조하기 때문
    console.log('After:', count); // 이전 값 출력
  };

  // ✅ 여러 번 증가시키려면 함수형 업데이트 사용
  const correctBatchingExample = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    // 결과: count는 3 증가
  };

  // 여러 상태를 동시에 업데이트 (Batching의 이점)
  const multipleStatesUpdate = () => {
    setCount(prev => prev + 1);
    setName('Updated');
    // 두 개의 setState가 배치 처리되어 리렌더링은 한 번만 발생
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>setState 비동기 동작 예제</h2>

      <div style={{ marginBottom: '20px' }}>
        <p>Count: {count}</p>
        <p>Name: {name}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <button onClick={wrongExample}>
          ❌ 잘못된 예제 (콘솔 확인)
        </button>

        <button onClick={correctExample1}>
          ✅ 올바른 예제 (함수형 업데이트)
        </button>

        <button onClick={batchingExample}>
          🔥 Batching 예제 (1만 증가)
        </button>

        <button onClick={correctBatchingExample}>
          ✅ 올바른 Batching (3 증가)
        </button>

        <button onClick={multipleStatesUpdate}>
          복수 상태 업데이트 (한 번만 렌더링)
        </button>

        <button onClick={() => setCount(0)}>
          초기화
        </button>
      </div>

      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>핵심 포인트</h3>
        <ul>
          <li>setState는 즉시 실행되지 않고 스케줄링됨</li>
          <li>이전 상태에 기반한 업데이트는 함수형 업데이트 사용 (prevState =&gt; ...)</li>
          <li>여러 setState 호출은 배치 처리되어 한 번만 렌더링</li>
          <li>setState 직후 console.log로 확인하면 이전 값이 출력됨</li>
        </ul>
      </div>
    </div>
  );
};

// 클래스 컴포넌트 예제 (참고용)
export default class StateAsync extends Component {
  state = {
    count: 0,
    name: ''
  };

  // ❌ 잘못된 사용
  wrongExample = () => {
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count); // 이전 값 출력
  };

  // ✅ 올바른 사용 1: 콜백 함수로 업데이트된 값 확인
  correctExample1 = () => {
    this.setState(
      { count: this.state.count + 1 },
      () => {
        console.log('업데이트된 값:', this.state.count);
      }
    );
  };

  // ✅ 올바른 사용 2: prevState 사용
  correctExample2 = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  // 🔥 Batching 예제
  batchingExample = () => {
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
    // 결과: count는 1만 증가
  };

  // ✅ 올바른 Batching
  correctBatchingExample = () => {
    this.setState(prev => ({ count: prev.count + 1 }));
    this.setState(prev => ({ count: prev.count + 1 }));
    this.setState(prev => ({ count: prev.count + 1 }));
    // 결과: count는 3 증가
  };

  render() {
    return (
      <div style={{ padding: '20px' }}>
        <h2>클래스 컴포넌트 - setState 비동기 동작</h2>

        <p>Count: {this.state.count}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
          <button onClick={this.wrongExample}>
            ❌ 잘못된 예제
          </button>

          <button onClick={this.correctExample1}>
            ✅ 콜백 사용
          </button>

          <button onClick={this.correctExample2}>
            ✅ prevState 사용
          </button>

          <button onClick={this.batchingExample}>
            🔥 Batching (1만 증가)
          </button>

          <button onClick={this.correctBatchingExample}>
            ✅ 올바른 Batching (3 증가)
          </button>

          <button onClick={() => this.setState({ count: 0 })}>
            초기화
          </button>
        </div>
      </div>
    );
  }
}
