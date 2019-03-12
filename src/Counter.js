import React, { Component } from "react";
import debounce from "lodash.debounce";

class Counter extends Component {
//   constructor(props) {
//     super(props);
//     this.handlerSearchDelayed = debounce(this.onSearch, 1000);
//     this.handlerSearchDelayed = this.handlerSearchDelayed.bind(this);
//   }

  state = {
    number: 0
  };

  handlerSearchDelayed = () => {
    debounce(this.onSearch, 1000);
}

    // onSearch(textSearch) {
    //     this.setState({text:textSearch});
    //     this.getData();
    // }



  // handleChange = () => {
  //     this.setState({
  //         number: this.state.number = this.state.number + 1
  //     })
  // }

  // handleChange = () => {
  //     this.setState(({number}) => ({ number: number + 1 }));
  // }

  handleChange = () => {
    //    this.setState( ({number}) => ({number: number + 1}) )

    this.setState(({ number }) => ({ number: number + 1 }));
  };

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <input type="button" value="+" onClick={this.handleChange} />
        <input
          placeholder=""
          onChange={this.handlerSearchDelayed}
        />
      </div>
    );
  }
}

export default Counter;
