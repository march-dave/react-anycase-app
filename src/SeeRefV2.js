import React, { Component } from 'react'

export default class SeeRefV2 extends Component {
    input = React.createRef(); // React version over 16.3 

    handleClick = () => {
        this.input.current.focus(); // React version over 16.3
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

state = {
    information: [
      {
        id: 0,
        name: 'Dave',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: 'John',
        phone: '010-0000-0001'
      }
    ]
  }
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data })
    })
  }
