import React, { Component } from "react";

class SeeRef extends Component {
  state = {
    height: 0
  };

  input = null;
  // input = React.createRef(); // React version over 16.3 
  box = null;

  handleClick = () => {
    this.input.focus();
    // this.input.currnet.focus(); React version over 16.3
  };

  componentDidMount() {
    this.setState({
      height: this.box.clientHeight
    });
  }

  render() {
    return (
      <div>
        <input
        placeholder="ref holder"
          ref={ ref => this.input = ref }
        // ref={this.input} React version over 16.3
        />
        <button onClick={this.handleClick}>Focus Input</button>
        <div
          ref={ref => {
            this.box = ref;
          }}
        >
          <h2>TITLE</h2>
          <p>Content</p>
        </div>
        <p>
          <b>height:</b> {this.state.height}
        </p>
      </div>
    );
  }
}

export default SeeRef;
