// react ref example code
// ref for when done rendering I can access dom
import React, { Component } from 'react'

export default class SeeRefV2 extends Component {
    // React version 16.3 이상에서 사용 가능 하며  
    // 여기서 ref 가 설정 됐다. 요로케 React.createRef()
    // 이것은 Object 랍니다.
    focuseMe = React.createRef(); 


    handleClick = () => {
        this.focuseMe.current.focus(); // React version over 16.3
                                       // 버튼이 클릭 되었을때 ref로 설정된 곳으로 찾아 간다.
    };

    render() {
        return (
            <div>
                <input
                    placeholder="ref holder"
                    ref={this.focuseMe} // React version over 16.3
                                        // ref 이름을 가져다 쓸 수 있게 넣어 준다.
                                        // 여기서는 focuseMe로 설정 했다.
                />
                <input 
                    placeholder="ref holder2"
                    />
                <button onClick={this.handleClick}>Focus Input</button>
            </div>
        )
    }
}

// state = {
//     information: [
//       {
//         id: 0,
//         name: 'Dave',
//         phone: '010-0000-0000'
//       },
//       {
//         id: 1,
//         name: 'John',
//         phone: '010-0000-0001'
//       }
//     ]
//   }
//   handleCreate = (data) => {
//     const { information } = this.state;
//     this.setState({
//       information: information.concat({ id: this.id++, ...data })
//     })
//   }
