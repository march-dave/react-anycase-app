import React, { Component } from "react";

class SelectCreate extends Component {

 state = {
     country: ''
 }

 handleSelect = (e) => {
    this.setState( {
        country: e.target.value
    } )
 }

  render() {
    return (
      <div>
        <select onChange={this.handleSelect}>
         <option value="1">Canada</option>
         <option value="2">USA</option>
         <option value="3">Korea</option>
        </select>

        <input type="text" value={this.state.country} readOnly />
      </div>
    );
  }
}

export default SelectCreate;
