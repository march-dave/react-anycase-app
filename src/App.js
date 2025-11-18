import React, { Component } from "react";
import "./App.css";
import Weather from './components/Weather';
import PointsDisplay from './components/PointsDisplay';
import SearchWithPoints from './components/SearchWithPoints';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
          <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
            Welcome! Start Earning Points
          </h1>

          <PointsDisplay />
          <SearchWithPoints />

          <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '2px solid #e5e7eb' }}>
            <Weather />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
