import React, { Component } from 'react'

export default class Paremeter extends Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this, 'Parameter');
    }

    handleClick(param, e) {
        console.log('Parameter', param);
        console.log('Event', e);
    }

    render() {
        return (
            <button onClick={this.handleClick}></button>

            // ES 6 Style
            //   <button onClick={(e) => this.handleClick(param, e)}></button>
        )
    }
}