import React, { Component } from 'react'

export default class StateChild extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.name(e.currentTarget.value);
    }

    render() {
        return (
            <div>
                <input value={this.props.nameprops} onChange={this.handleChange} />
            </div>
        )
    }
}
