import React, { Component } from "react";
import "./App.css";
import "./style.scss";
import ShoeSplitApp from './shoeSplit/components/ShoeSplitApp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ShoeSplitApp />
      </div>
    );
  }
}

export default App;
