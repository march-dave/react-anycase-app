import React, { Component } from "react";
import styled from "styled-components";

class SelectCreate extends Component {
  state = {
    country: ""
  };

  handleSelect = e => {
    this.setState({
      country: e.target.value
    });
  };

  render() {
    return (
      <BodyStyle>
        <div>
          <select onChange={this.handleSelect}>
            <option value="1">Canada</option>
            <option value="2">USA</option>
            <option value="3">Korea</option>
          </select>

          <input type="text" value={this.state.country} readOnly />
        </div>
      </BodyStyle>
    );
  }
}

export default SelectCreate;

const BodyStyle = styled.div`
  // select 박스에서 화살표 없애기
  select {
    appearance: none;
    -webkit-appearance: none;
    background: url('xxx.png') no-repeat right;
  }

  .arrowZone {
    display: none;
  }

  .clearZone {
    margin-right: 0.5rem;
  }
  .clearZone::before {
    content: " ";
    display: inline-block;
    width: 1.3em;
    height: 1.3em;
    background-color: currentColor; /* CSS 3 */
    opacity: 0.2;
    border-radius: 50%;
    position: absolute;
    top: 0px;
    left: -3px;
  }
`;
