import React, { Component } from "react";
import debounce from "lodash.debounce";

class Counter extends Component {

  state = {
    number: 0
  };

  handleEvent = (eventType) => {
    switch(eventType) {
      case 'search':
        return debounce(this.onSearch, 1000);
      case 'change':
        return this.setState(({ number }) => ({ number: number + 1 }));
      case 'click':
        return console.log("click");
      default:
        return;
    }
  };

  handleChange = () => {

    this.setState(({ number }) => ({ number: number + 1 }));
  };

  handleClick = () => {
    console.log("click");
  };

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <input type="button" value="+" onClick={this.handleChange} />
        <input placeholder="" onChange={this.handlerSearchDelayed} />

        <input ref={this.props.innerRef} />

        <input type="button" value="click" onClick={this.handleClick} />
      </div>
    );
  }
}

export default Counter;
