import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    GetUserName: state.username
  };
};

class BasicInfo extends Component {

  handleChange = () => {
    
  }

  render() {
    return (
      <div>
        <input id="username" type="text" value={this.props.GetUserName} />
        <input type="text" onChange={this.handleChange}/>
      </div>
    );
  }
}

BasicInfo = connect(
  mapStateToProps,
  null
)(BasicInfo);

export default BasicInfo;
