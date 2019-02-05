import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    GetUserName: state.username
  };
};

class BasicInfo extends Component {
  render() {
    return (
      <div>
        <input type="text" value={this.props.GetUserName} />
      </div>
    );
  }
}

BasicInfo = connect(
  mapStateToProps,
  null
)(BasicInfo);

export default BasicInfo;
