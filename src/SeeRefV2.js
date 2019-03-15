import React, { Component } from 'react'

export default class SeeRefV2 extends Component {
    input = React.createRef(); // React version over 16.3 

    handleClick = () => {
        this.input.currnet.focus(); // React version over 16.3
    };

    render() {
        return (
            <div>
                <input
                    placeholder="ref holder"
                    ref={this.input} // React version over 16.3
                />
                <button onClick={this.handleClick}>Focus Input</button>
            </div>
        )
    }
}
