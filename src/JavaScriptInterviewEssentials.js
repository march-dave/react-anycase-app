import React, { useState } from 'react';

/**
 * JavaScript 면접 필수 3가지
 *
 * 1. Closure (클로저) - 스코프와 렉시컬 환경
 * 2. Promise & Async/Await - 비동기 처리
 * 3. this 바인딩 (call, apply, bind)
 */

// ============================================
// 1. Closure (클로저)
// ============================================
const ClosureExample = () => {
  const [output, setOutput] = useState([]);
  const [counter, setCounter] = useState(0);

  // 클로저 예제 1: 카운터 생성
  const createCounter = () => {
    let count = 0;
    return {
      increment: () => ++count,
      decrement: () => --count,
      getCount: () => count
    };
  };

  const handleCounterDemo = () => {
    const counter1 = createCounter();
    const counter2 = createCounter();

    const results = [
      `counter1.increment(): ${counter1.increment()}`,  // 1
      `counter1.increment(): ${counter1.increment()}`,  // 2
      `counter2.increment(): ${counter2.increment()}`,  // 1 (독립적)
      `counter1.getCount(): ${counter1.getCount()}`,    // 2
      `counter2.getCount(): ${counter2.getCount()}`     // 1
    ];

    setOutput(results);
  };

  // 클로저 예제 2: 실용적인 사용 (private 변수)
  const createBankAccount = (initialBalance) => {
    let balance = initialBalance; // private 변수

    return {
      deposit: (amount) => {
        balance += amount;
        return balance;
      },
      withdraw: (amount) => {
        if (amount > balance) {
          return "잔액 부족";
        }
        balance -= amount;
        return balance;
      },
      getBalance: () => balance
    };
  };

  const handleBankDemo = () => {
    const myAccount = createBankAccount(1000);

    const results = [
      `초기 잔액: ${myAccount.getBalance()}원`,
      `입금 500원: ${myAccount.deposit(500)}원`,
      `출금 300원: ${myAccount.withdraw(300)}원`,
      `출금 2000원: ${myAccount.withdraw(2000)}`,
      `최종 잔액: ${myAccount.getBalance()}원`,
      `balance 변수 직접 접근: ${typeof myAccount.balance} (private!)`,
    ];

    setOutput(results);
  };

  // 클로저 예제 3: 일반적인 실수 (var vs let)
  const handleLoopDemo = () => {
    const results = [];

    // var 사용 시 문제
    results.push('--- var 사용 (문제 발생) ---');
    const funcsVar = [];
    for (var i = 0; i < 3; i++) {
      funcsVar.push(() => i);
    }
    funcsVar.forEach((fn, idx) => {
      results.push(`funcsVar[${idx}](): ${fn()}`); // 모두 3
    });

    // let 사용 시 해결
    results.push('--- let 사용 (정상 작동) ---');
    const funcsLet = [];
    for (let j = 0; j < 3; j++) {
      funcsLet.push(() => j);
    }
    funcsLet.forEach((fn, idx) => {
      results.push(`funcsLet[${idx}](): ${fn()}`); // 0, 1, 2
    });

    setOutput(results);
  };

  return (
    <div style={styles.section}>
      <h3>1. Closure (클로저)</h3>

      <div style={styles.buttonGroup}>
        <button onClick={handleCounterDemo} style={styles.button}>
          카운터 예제
        </button>
        <button onClick={handleBankDemo} style={styles.button}>
          은행 계좌 예제
        </button>
        <button onClick={handleLoopDemo} style={styles.button}>
          var vs let 예제
        </button>
      </div>

      {output.length > 0 && (
        <div style={styles.outputBox}>
          {output.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
      )}

      <div style={styles.codeBlock}>
        <strong>클로저란?</strong>
        <p>함수가 생성될 때의 렉시컬 환경(Lexical Environment)을 기억하여, 외부 함수의 변수에 접근할 수 있는 특성</p>

        <pre style={styles.code}>{`function createCounter() {
  let count = 0;  // 외부 함수의 지역 변수

  return {
    increment: () => ++count,  // 클로저: count 접근 가능
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2`}</pre>

        <strong>핵심 포인트:</strong>
        <ul>
          <li><strong>렉시컬 스코프:</strong> 함수를 어디서 호출했는지가 아니라 어디서 선언했는지에 따라 스코프 결정</li>
          <li><strong>Private 변수:</strong> 클로저를 이용해 캡슐화 구현 가능</li>
          <li><strong>메모리 관리:</strong> 불필요한 클로저는 메모리 누수 가능성</li>
          <li><strong>var vs let:</strong> 반복문에서 let을 사용해야 블록 스코프 활용 가능</li>
        </ul>
      </div>
    </div>
  );
};

// ============================================
// 2. Promise & Async/Await
// ============================================
const PromiseAsyncExample = () => {
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);

  // Promise 기본 예제
  const handlePromiseBasic = () => {
    setOutput(['Promise 실행 중...']);

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.3;
        if (success) {
          resolve('✅ Promise 성공!');
        } else {
          reject('❌ Promise 실패!');
        }
      }, 1000);
    });

    promise
      .then(result => {
        setOutput(prev => [...prev, result]);
      })
      .catch(error => {
        setOutput(prev => [...prev, error]);
      })
      .finally(() => {
        setOutput(prev => [...prev, '🏁 Promise 종료']);
      });
  };

  // Promise 체이닝
  const handlePromiseChaining = () => {
    setOutput(['Promise 체이닝 시작...']);

    Promise.resolve(1)
      .then(value => {
        setOutput(prev => [...prev, `Step 1: ${value}`]);
        return value * 2;
      })
      .then(value => {
        setOutput(prev => [...prev, `Step 2: ${value}`]);
        return value * 2;
      })
      .then(value => {
        setOutput(prev => [...prev, `Step 3: ${value}`]);
        return value * 2;
      })
      .then(value => {
        setOutput(prev => [...prev, `최종 결과: ${value}`]);
      });
  };

  // Async/Await 예제
  const fetchUserData = (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: userId, name: `User ${userId}`, email: `user${userId}@example.com` });
      }, 500);
    });
  };

  const handleAsyncAwait = async () => {
    setOutput(['Async/Await 실행 중...']);
    setLoading(true);

    try {
      const user1 = await fetchUserData(1);
      setOutput(prev => [...prev, `User 1: ${user1.name} (${user1.email})`]);

      const user2 = await fetchUserData(2);
      setOutput(prev => [...prev, `User 2: ${user2.name} (${user2.email})`]);

      setOutput(prev => [...prev, '✅ 모든 데이터 로드 완료!']);
    } catch (error) {
      setOutput(prev => [...prev, `❌ 에러: ${error}`]);
    } finally {
      setLoading(false);
    }
  };

  // Promise.all 예제
  const handlePromiseAll = async () => {
    setOutput(['Promise.all 실행 중... (병렬 처리)']);
    setLoading(true);

    const startTime = Date.now();

    try {
      const promises = [
        fetchUserData(1),
        fetchUserData(2),
        fetchUserData(3)
      ];

      const users = await Promise.all(promises);
      const endTime = Date.now();

      users.forEach((user, idx) => {
        setOutput(prev => [...prev, `User ${idx + 1}: ${user.name}`]);
      });

      setOutput(prev => [...prev, `⚡ 소요 시간: ${endTime - startTime}ms (병렬 처리)`]);
    } catch (error) {
      setOutput(prev => [...prev, `❌ 에러: ${error}`]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.section}>
      <h3>2. Promise & Async/Await</h3>

      <div style={styles.buttonGroup}>
        <button onClick={handlePromiseBasic} style={styles.button}>
          Promise 기본
        </button>
        <button onClick={handlePromiseChaining} style={styles.button}>
          Promise 체이닝
        </button>
        <button onClick={handleAsyncAwait} style={styles.button} disabled={loading}>
          Async/Await
        </button>
        <button onClick={handlePromiseAll} style={styles.button} disabled={loading}>
          Promise.all
        </button>
      </div>

      {output.length > 0 && (
        <div style={styles.outputBox}>
          {output.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
          {loading && <div style={styles.loading}>⏳ Loading...</div>}
        </div>
      )}

      <div style={styles.codeBlock}>
        <strong>Promise vs Async/Await 비교:</strong>
        <pre style={styles.code}>{`// Promise 방식
fetchUser()
  .then(user => fetchPosts(user.id))
  .then(posts => console.log(posts))
  .catch(error => console.error(error));

// Async/Await 방식 (더 읽기 쉬움)
async function getPosts() {
  try {
    const user = await fetchUser();
    const posts = await fetchPosts(user.id);
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}`}</pre>

        <strong>핵심 포인트:</strong>
        <ul>
          <li><strong>Promise 상태:</strong> Pending → Fulfilled / Rejected</li>
          <li><strong>then/catch/finally:</strong> Promise 체이닝으로 비동기 제어</li>
          <li><strong>async/await:</strong> Promise를 동기적으로 작성 (가독성 향상)</li>
          <li><strong>Promise.all:</strong> 여러 Promise를 병렬로 처리 (성능 최적화)</li>
          <li><strong>Promise.race:</strong> 가장 먼저 완료된 Promise 반환</li>
          <li><strong>에러 처리:</strong> try/catch 또는 .catch() 필수</li>
        </ul>
      </div>
    </div>
  );
};

// ============================================
// 3. this 바인딩
// ============================================
const ThisBindingExample = () => {
  const [output, setOutput] = useState([]);

  // this 바인딩 예제 1: 일반 함수 vs 화살표 함수
  const handleThisBasic = () => {
    const obj = {
      name: 'Object',
      regularFunc: function() {
        return `Regular: ${this.name}`;
      },
      arrowFunc: () => {
        return `Arrow: ${this.name}`;
      }
    };

    const results = [
      '--- 객체 메서드로 호출 ---',
      obj.regularFunc(), // "Regular: Object"
      obj.arrowFunc(),   // "Arrow: undefined" (화살표 함수는 상위 스코프의 this)
    ];

    const regular = obj.regularFunc;
    const arrow = obj.arrowFunc;

    results.push('--- 함수로 할당 후 호출 ---');
    try {
      results.push(regular()); // TypeError 가능 (strict mode)
    } catch (e) {
      results.push(`Regular: ${e.message}`);
    }
    results.push(arrow()); // "Arrow: undefined"

    setOutput(results);
  };

  // call, apply, bind 예제
  const handleCallApplyBind = () => {
    const person = {
      name: 'John',
      age: 30
    };

    function introduce(greeting, punctuation) {
      return `${greeting}, I'm ${this.name}, ${this.age} years old${punctuation}`;
    }

    const results = [
      '--- call (인자를 개별적으로) ---',
      introduce.call(person, 'Hello', '!'),
      '',
      '--- apply (인자를 배열로) ---',
      introduce.apply(person, ['Hi', '.']),
      '',
      '--- bind (새로운 함수 반환) ---',
    ];

    const boundIntroduce = introduce.bind(person);
    results.push(boundIntroduce('Hey', '!!!'));

    const partialIntroduce = introduce.bind(person, 'Greetings');
    results.push(partialIntroduce('~'));

    setOutput(results);
  };

  // 실전 예제: 이벤트 핸들러
  const handleEventExample = () => {
    class Counter {
      constructor() {
        this.count = 0;
      }

      // 일반 메서드 (this 문제 발생 가능)
      incrementRegular() {
        this.count++;
        return this.count;
      }

      // 화살표 함수 (this 자동 바인딩)
      incrementArrow = () => {
        this.count++;
        return this.count;
      }

      // bind 사용
      getIncrementBound() {
        return this.incrementRegular.bind(this);
      }
    }

    const counter = new Counter();

    const results = [
      '--- 일반 메서드 ---',
      `직접 호출: ${counter.incrementRegular()}`,
    ];

    const regular = counter.incrementRegular;
    try {
      results.push(`할당 후 호출: ${regular()}`);
    } catch (e) {
      results.push(`할당 후 호출: ❌ ${e.message}`);
    }

    results.push('');
    results.push('--- 화살표 함수 ---');
    results.push(`직접 호출: ${counter.incrementArrow()}`);

    const arrow = counter.incrementArrow;
    results.push(`할당 후 호출: ${arrow()} ✅`);

    results.push('');
    results.push('--- bind 사용 ---');
    const bound = counter.getIncrementBound();
    results.push(`bind된 함수 호출: ${bound()} ✅`);

    setOutput(results);
  };

  // this 바인딩 규칙
  const handleBindingRules = () => {
    const results = [
      '=== JavaScript this 바인딩 4가지 규칙 ===',
      '',
      '1️⃣ 기본 바인딩 (Default Binding)',
      '   - 단독 함수 실행',
      '   - strict mode: undefined, non-strict: window/global',
      '',
      '2️⃣ 암시적 바인딩 (Implicit Binding)',
      '   - 객체의 메서드로 호출',
      '   - 호출한 객체가 this',
      '   예: obj.func() → this는 obj',
      '',
      '3️⃣ 명시적 바인딩 (Explicit Binding)',
      '   - call, apply, bind 사용',
      '   - 명확하게 this 지정',
      '   예: func.call(obj) → this는 obj',
      '',
      '4️⃣ new 바인딩',
      '   - 생성자 함수로 호출',
      '   - 새로 생성된 객체가 this',
      '   예: new Func() → this는 새 인스턴스',
      '',
      '🎯 우선순위: new > 명시적 > 암시적 > 기본',
      '',
      '⚠️ 화살표 함수는 이 규칙을 따르지 않음!',
      '   (렉시컬 this - 선언된 위치의 상위 스코프 this)',
    ];

    setOutput(results);
  };

  return (
    <div style={styles.section}>
      <h3>3. this 바인딩 (call, apply, bind)</h3>

      <div style={styles.buttonGroup}>
        <button onClick={handleThisBasic} style={styles.button}>
          this 기본
        </button>
        <button onClick={handleCallApplyBind} style={styles.button}>
          call/apply/bind
        </button>
        <button onClick={handleEventExample} style={styles.button}>
          이벤트 핸들러 예제
        </button>
        <button onClick={handleBindingRules} style={styles.button}>
          바인딩 규칙
        </button>
      </div>

      {output.length > 0 && (
        <div style={styles.outputBox}>
          {output.map((line, idx) => (
            <div key={idx} style={{ whiteSpace: 'pre-wrap' }}>{line}</div>
          ))}
        </div>
      )}

      <div style={styles.codeBlock}>
        <strong>call vs apply vs bind:</strong>
        <pre style={styles.code}>{`const obj = { name: 'John' };

function greet(greeting, punctuation) {
  return \`\${greeting}, \${this.name}\${punctuation}\`;
}

// call: 인자를 개별적으로 전달
greet.call(obj, 'Hello', '!');  // "Hello, John!"

// apply: 인자를 배열로 전달
greet.apply(obj, ['Hi', '.']);  // "Hi, John."

// bind: 새로운 함수 반환 (나중에 호출)
const boundGreet = greet.bind(obj);
boundGreet('Hey', '?');  // "Hey, John?"`}</pre>

        <strong>핵심 포인트:</strong>
        <ul>
          <li><strong>일반 함수:</strong> 호출 방식에 따라 this가 동적으로 결정</li>
          <li><strong>화살표 함수:</strong> 렉시컬 this (선언 시점의 상위 스코프)</li>
          <li><strong>call:</strong> 즉시 실행, 인자 개별 전달</li>
          <li><strong>apply:</strong> 즉시 실행, 인자 배열로 전달</li>
          <li><strong>bind:</strong> 새 함수 반환, 부분 적용(Partial Application) 가능</li>
          <li><strong>React 이벤트:</strong> 클래스 컴포넌트에서 bind 필요 (또는 화살표 함수)</li>
        </ul>
      </div>
    </div>
  );
};

// ============================================
// Main Component
// ============================================
const JavaScriptInterviewEssentials = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📚 JavaScript 면접 필수 3가지</h1>

      <div style={styles.summary}>
        <h2>면접에서 가장 많이 나오는 JavaScript 질문들:</h2>
        <ol>
          <li>
            <strong>Closure</strong>: 클로저가 무엇인가? 어떻게 활용하나?
            <br/>
            <small>→ 스코프, 렉시컬 환경, private 변수, 메모리 관리</small>
          </li>
          <li>
            <strong>Promise & Async/Await</strong>: 비동기 처리 방법과 차이점은?
            <br/>
            <small>→ Promise 상태, 체이닝, async/await 문법, 에러 처리, Promise.all</small>
          </li>
          <li>
            <strong>this 바인딩</strong>: JavaScript의 this는 어떻게 결정되나?
            <br/>
            <small>→ 4가지 바인딩 규칙, call/apply/bind, 화살표 함수</small>
          </li>
        </ol>
      </div>

      <ClosureExample />
      <PromiseAsyncExample />
      <ThisBindingExample />

      <div style={styles.bonus}>
        <h3>보너스: 추가로 알아두면 좋은 것들</h3>
        <div style={styles.bonusGrid}>
          <div>
            <h4>🔹 프로토타입 & 상속</h4>
            <ul>
              <li>Prototype chain</li>
              <li>class vs function constructor</li>
              <li>Object.create()</li>
            </ul>
          </div>
          <div>
            <h4>🔹 이벤트 루프</h4>
            <ul>
              <li>Call Stack</li>
              <li>Task Queue (Macro/Micro)</li>
              <li>동기 vs 비동기</li>
            </ul>
          </div>
          <div>
            <h4>🔹 ES6+ 기능</h4>
            <ul>
              <li>구조 분해 할당</li>
              <li>Spread/Rest 연산자</li>
              <li>Template Literals</li>
              <li>Optional Chaining (?.)</li>
            </ul>
          </div>
          <div>
            <h4>🔹 함수형 프로그래밍</h4>
            <ul>
              <li>map, filter, reduce</li>
              <li>순수 함수</li>
              <li>불변성 (Immutability)</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={styles.tips}>
        <h3>💡 면접 꿀팁</h3>
        <ul>
          <li>개념을 코드로 설명할 수 있어야 함</li>
          <li>실제 프로젝트에서 어떻게 활용했는지 예시 준비</li>
          <li>장단점을 함께 설명 (예: 클로저의 메모리 이슈)</li>
          <li>최신 문법과 구버전 문법 모두 이해</li>
          <li>브라우저 콘솔에서 직접 테스트해보기</li>
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    textAlign: 'center',
    color: '#f7df1e',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    backgroundColor: '#323330',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  summary: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    border: '2px solid #f7df1e',
  },
  section: {
    backgroundColor: '#fff',
    border: '2px solid #323330',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    marginBottom: '15px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#f7df1e',
    border: '2px solid #323330',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'all 0.3s',
  },
  outputBox: {
    backgroundColor: '#1e1e1e',
    color: '#d4d4d4',
    padding: '15px',
    borderRadius: '5px',
    fontFamily: 'Consolas, Monaco, monospace',
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '15px',
    maxHeight: '400px',
    overflowY: 'auto',
  },
  loading: {
    color: '#f7df1e',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  codeBlock: {
    backgroundColor: '#f8f8f8',
    padding: '15px',
    borderRadius: '5px',
    fontSize: '14px',
    lineHeight: '1.6',
  },
  code: {
    backgroundColor: '#1e1e1e',
    color: '#d4d4d4',
    padding: '15px',
    borderRadius: '5px',
    overflow: 'auto',
    fontFamily: 'Consolas, Monaco, monospace',
    fontSize: '13px',
    lineHeight: '1.5',
  },
  bonus: {
    backgroundColor: '#e8f5e9',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px',
  },
  bonusGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '15px',
  },
  tips: {
    backgroundColor: '#fff3e0',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px',
  }
};

export default JavaScriptInterviewEssentials;
