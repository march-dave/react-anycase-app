import React, { Component } from 'react'
import StateChild from './StateChild'

export default class StateParent extends Component {

    constructor(props) {
        super(props);
        this.updatename = this.updatename.bind(this);
        this.state = {
            name: ''
        }
    }

    updatename(e) {
        this.setState({
            name: e
        })
    }

    render() {
        return (
            <div>
                <StateChild
                    name={this.updatename}
                    nameprops={this.state.name}
                />
            </div>
        )
    }
}
