// 키가 중복시 마지막(오른쪽) Object의 값으로 업데이트 한다.

// const person1 = { name: 'David Walsh', age: 33 };
// const person2 = { name: 'David Walsh Jr.', role: 'kid' };

// const merged = {...person1, ...person2}
// /*
// Object {
//   "name": "David Walsh Jr.",
//   "age": 33,
//   "role": "kid",
// }
// */
// Object.assign를 통해서도 같은 작업을 할 수 있다.

// 이 문법은 아직 모든 브라우저에서 지원되지 않는다. Babel의 transform-object-rest-spread 플러그인을 사용하면 스프레드 연산자로 Object 결합이 가능하다.