import React, { Component } from "react";
import "./App.css";
import "./style.scss";
import ReactInterviewEssentials from './ReactInterviewEssentials';
import JavaScriptInterviewEssentials from './JavaScriptInterviewEssentials';

class App extends Component {
  state = {
    activeTab: 'javascript' // 'react' or 'javascript'
  };

  renderTabButtons() {
    const { activeTab } = this.state;

    const buttonStyle = (tab) => ({
      padding: '15px 40px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      border: '3px solid #333',
      borderRadius: '8px',
      margin: '0 10px',
      backgroundColor: activeTab === tab ? '#f7df1e' : '#fff',
      color: '#333',
      transition: 'all 0.3s',
      boxShadow: activeTab === tab ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
    });

    return (
      <div style={{
        textAlign: 'center',
        padding: '30px 20px',
        backgroundColor: '#f5f5f5',
        borderBottom: '3px solid #333',
      }}>
        <h1 style={{
          fontSize: '32px',
          marginBottom: '20px',
          color: '#333',
        }}>
          🎯 면접 필수 개념 정리
        </h1>
        <div>
          <button
            onClick={() => this.setState({ activeTab: 'javascript' })}
            style={buttonStyle('javascript')}
          >
            📚 JavaScript
          </button>
          <button
            onClick={() => this.setState({ activeTab: 'react' })}
            style={buttonStyle('react')}
          >
            ⚛️ React
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { activeTab } = this.state;

    return (
      <div className="App">
        {this.renderTabButtons()}
        <div style={{ minHeight: '100vh' }}>
          {activeTab === 'react' && <ReactInterviewEssentials />}
          {activeTab === 'javascript' && <JavaScriptInterviewEssentials />}
        </div>
      </div>
    );
  }
}

export default App;
