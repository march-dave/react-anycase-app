import React, { Component } from "react";
import "./App.css";
import "./style.scss";
import Weather from './components/Weather';
import PromotionalBanner from './components/PromotionalBanner';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PromotionalBanner />
        <Weather />
      </div>
    );
  }
}

export default App;
