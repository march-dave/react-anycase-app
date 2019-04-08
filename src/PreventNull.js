import React, { Component } from 'react'

export default class PreventNull extends Component {

    // Option 1
    // static defaultProps = {
    //     onIncrement: () => console.warn('onIncrement is not defined'),
    //     object: {},
    //     array: []
    // }

    render() {
        // Option 2
        // if (!this.props.object || !this.props.array || this.props.array.length ===0) return null;
        // // object 나 array 를 사용하는 코드
        return (
            <div>

            </div>
        )
    }
}
