// import React, { Component } from 'react'

// const MyComponent = React.memo(function MyComponent(props) {
//     /* render using props */
//   });

// function MyComponent(props) {
//     /* render using props */
// }

// function areEqual(prevProps, nextProps) {
//     /*
//     return true if passing nextProps to render would return
//     the same result as passing prevProps to render,
//     otherwise return false
//     */
//   }
//   export default React.memo(MyComponent, areEqual);

// React.memo는 기본적으로 HOC입니다. PureComponent와 같이 동일한 입력값이 발생할때 재실행 되지 않게끔하게해서 최적화를 도와준다고 합니다!

// 어떻게? 얕은 비교(shallow compare)를 통해서 props값에 변화가 있을때만! 리렌더링합니다.

// export default class ReactMemo extends Component {


//     render() {
//         return (
//             <div>

//             </div>
//         )
//     }
// }
