import React, { Component } from "react";

import { connect } from "react-redux";
import action from "./Action";

const mapDispatchToProps = dispatch => {
  return {
    SetUserName: e => dispatch(action(e.target.value))
  };
};

class Basic extends Component {
  render() {
    return (
      <div>
        <input type="text" onChange={this.props.SetUserName} />
      </div>
    );
  }
}
Basic = connect(
  null,
  mapDispatchToProps
)(Basic);

export default Basic;
