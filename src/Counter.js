import React, { Component } from "react";
import debounce from "lodash.debounce";

class Counter extends Component {

  state = {
    number: 0
  };

  handlerSearchDelayed = () => {
    debounce(this.onSearch, 1000);
  };

  handleChange = () => {

    this.setState(({ number }) => ({ number: number + 1 }));
  };

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <input type="button" value="+" onClick={this.handleChange} />
        <input placeholder="" onChange={this.handlerSearchDelayed} />

        <input ref={this.props.innerRef} />
      </div>
    );
  }
}

export default Counter;
