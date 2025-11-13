import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';

/**
 * React 면접 필수 3가지
 *
 * 1. Hooks (useState, useEffect)
 * 2. Re-rendering 최적화 (React.memo, useMemo, useCallback)
 * 3. Lifecycle Methods vs Hooks
 */

// ============================================
// 1. Hooks (useState, useEffect)
// ============================================
const HooksExample = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // useEffect: componentDidMount + componentDidUpdate
  useEffect(() => {
    console.log('Component mounted or updated');
    document.title = `Count: ${count}`;

    // cleanup function: componentWillUnmount
    return () => {
      console.log('Cleanup before next effect or unmount');
    };
  }, [count]); // dependency array: count가 변경될 때만 실행

  // useEffect with empty dependency: componentDidMount만
  useEffect(() => {
    console.log('Component mounted only once');
  }, []);

  return (
    <div style={styles.section}>
      <h3>1. Hooks (useState, useEffect)</h3>
      <div>
        <p><strong>useState:</strong> 상태 관리</p>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>

        <p style={{ marginTop: '20px' }}>Name: {name}</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <div style={styles.codeBlock}>
        <strong>핵심 포인트:</strong>
        <ul>
          <li>useState는 함수형 컴포넌트에서 상태를 관리</li>
          <li>useEffect는 사이드 이펙트를 처리 (API 호출, DOM 조작 등)</li>
          <li>dependency array로 실행 조건을 제어</li>
          <li>cleanup function으로 메모리 누수 방지</li>
        </ul>
      </div>
    </div>
  );
};

// ============================================
// 2. Re-rendering 최적화
// ============================================

// React.memo로 최적화된 자식 컴포넌트
const ChildComponent = memo(({ name, onClick }) => {
  console.log('ChildComponent rendered');
  return (
    <div style={styles.childBox}>
      <p>Child Component: {name}</p>
      <button onClick={onClick}>Click from Child</button>
    </div>
  );
});

const OptimizationExample = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  // useMemo: 비싼 계산 결과를 메모이제이션
  const expensiveCalculation = useMemo(() => {
    console.log('Running expensive calculation...');
    return items.reduce((acc, item) => acc + item, 0) * count;
  }, [items, count]); // items나 count가 변경될 때만 재계산

  // useCallback: 함수를 메모이제이션
  const handleClick = useCallback(() => {
    console.log('Button clicked!');
    alert('Hello from callback!');
  }, []); // 의존성이 없으므로 컴포넌트 생명주기 동안 동일한 함수 참조 유지

  return (
    <div style={styles.section}>
      <h3>2. Re-rendering 최적화</h3>

      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment Count</button>

        <p style={{ marginTop: '10px' }}>Text: {text}</p>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type here (won't re-render child)"
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <p><strong>useMemo Result:</strong> {expensiveCalculation}</p>

        {/* React.memo + useCallback으로 최적화된 자식 컴포넌트 */}
        {/* text가 변경되어도 ChildComponent는 리렌더링되지 않음 */}
        <ChildComponent name="Optimized Child" onClick={handleClick} />
      </div>

      <div style={styles.codeBlock}>
        <strong>핵심 포인트:</strong>
        <ul>
          <li><strong>React.memo:</strong> props가 변경되지 않으면 리렌더링 방지</li>
          <li><strong>useMemo:</strong> 비싼 계산 결과를 캐싱</li>
          <li><strong>useCallback:</strong> 함수를 메모이제이션하여 참조 동일성 유지</li>
          <li>불필요한 리렌더링을 방지하여 성능 최적화</li>
        </ul>
      </div>
    </div>
  );
};

// ============================================
// 3. Lifecycle Methods vs Hooks
// ============================================
const LifecycleComparisonExample = () => {
  const [mounted, setMounted] = useState(true);

  return (
    <div style={styles.section}>
      <h3>3. Lifecycle Methods vs Hooks</h3>

      <button onClick={() => setMounted(!mounted)}>
        {mounted ? 'Unmount' : 'Mount'} Component
      </button>

      {mounted && <LifecycleComponent />}

      <div style={styles.codeBlock}>
        <strong>클래스형 vs 함수형 Lifecycle 비교:</strong>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>클래스형 컴포넌트</th>
              <th>함수형 컴포넌트 (Hooks)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>componentDidMount()</td>
              <td>useEffect(() =&gt; {'{}'}, [])</td>
            </tr>
            <tr>
              <td>componentDidUpdate()</td>
              <td>useEffect(() =&gt; {'{}'}, [deps])</td>
            </tr>
            <tr>
              <td>componentWillUnmount()</td>
              <td>useEffect(() =&gt; {'{'} return () =&gt; {'{}'} {'}'})</td>
            </tr>
            <tr>
              <td>shouldComponentUpdate()</td>
              <td>React.memo()</td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: '15px' }}>
          <strong>면접 꿀팁:</strong>
          <ul>
            <li>Hooks는 React 16.8부터 도입</li>
            <li>함수형 컴포넌트를 선호하는 추세 (더 간결하고 테스트 용이)</li>
            <li>여러 lifecycle을 하나의 useEffect로 통합 가능</li>
            <li>Custom Hooks로 로직 재사용 가능</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// useEffect로 Lifecycle 데모
const LifecycleComponent = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log('✅ Component Mounted (componentDidMount)');

    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      console.log('🔴 Component Will Unmount (componentWillUnmount)');
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    console.log('🔄 Component Updated (componentDidUpdate)');
  }, [seconds]);

  return (
    <div style={styles.lifecycleBox}>
      <p>Component is mounted! Seconds: {seconds}</p>
      <small>Check console for lifecycle logs</small>
    </div>
  );
};

// ============================================
// Main Component
// ============================================
const ReactInterviewEssentials = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⚛️ React 면접 필수 3가지</h1>

      <div style={styles.summary}>
        <h2>면접에서 가장 많이 나오는 질문들:</h2>
        <ol>
          <li><strong>Hooks</strong>: useState와 useEffect의 차이는? dependency array는 왜 필요한가?</li>
          <li><strong>최적화</strong>: React에서 성능 최적화 방법은? (memo, useMemo, useCallback)</li>
          <li><strong>Lifecycle</strong>: 클래스형과 함수형 컴포넌트의 차이는? useEffect는 어떻게 lifecycle을 대체하나?</li>
        </ol>
      </div>

      <HooksExample />
      <OptimizationExample />
      <LifecycleComparisonExample />

      <div style={styles.bonus}>
        <h3>보너스: 추가로 알아두면 좋은 것들</h3>
        <ul>
          <li><strong>useRef:</strong> DOM 참조, 리렌더링 없이 값 저장</li>
          <li><strong>useContext:</strong> Context API로 전역 상태 관리</li>
          <li><strong>useReducer:</strong> 복잡한 상태 로직 관리 (Redux 패턴)</li>
          <li><strong>Custom Hooks:</strong> 로직 재사용을 위한 커스텀 훅</li>
          <li><strong>Virtual DOM:</strong> React의 핵심 렌더링 메커니즘</li>
          <li><strong>Reconciliation:</strong> 효율적인 DOM 업데이트 알고리즘</li>
        </ul>
      </div>
    </div>
  );
};

// ============================================
// Styles
// ============================================
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#61dafb',
    marginBottom: '20px',
  },
  summary: {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
  },
  section: {
    backgroundColor: '#fff',
    border: '2px solid #61dafb',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
  },
  codeBlock: {
    backgroundColor: '#f5f5f5',
    padding: '15px',
    borderRadius: '5px',
    marginTop: '15px',
    fontSize: '14px',
  },
  childBox: {
    backgroundColor: '#e3f2fd',
    padding: '15px',
    borderRadius: '5px',
    marginTop: '10px',
  },
  lifecycleBox: {
    backgroundColor: '#fff3e0',
    padding: '15px',
    borderRadius: '5px',
    marginTop: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  bonus: {
    backgroundColor: '#e8f5e9',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px',
  }
};

// 테이블 스타일 추가 (CSS-in-JS)
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    table th, table td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    table th {
      background-color: #61dafb;
      color: white;
      font-weight: bold;
    }
    table tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  `;
  document.head.appendChild(style);
}

export default ReactInterviewEssentials;
