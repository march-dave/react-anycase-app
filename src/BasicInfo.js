import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    GetUserName: state.username
  };
};

class BasicInfo extends Component {
  handleChange = () => {};

  render() {
    return (
      <div>
        <input
          id="username"
          type="text"
          name="username"
          value={this.props.GetUserName}
          readOnly
        />
        <input type="text" onChange={this.handleChange} />
      </div>
    );
  }
}

BasicInfo = connect(
  mapStateToProps,
  null
)(BasicInfo);

export default BasicInfo;
