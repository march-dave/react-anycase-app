import React, { Component } from "react";

import { connect } from "react-redux";
import action from "./Action";

const People = [
  { id: 3, name: "tom" },
  { id: 4, name: "dave" },
  { id: 2, name: "jane" },
  { id: 1, name: "john" }
];

const mapDispatchToProps = dispatch => {
  return {
    SetUserName: e => dispatch(action(e.target.value))
  };
};

class Basic extends Component {
  render() {
    return (
      <div>
        Peopel:{" "}
        {console.log(
          People.sort((a, b) => {
            return a.id - b.id;
          })
          .sort((a, b) => {
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase();

            if (x > y) {
              return 1;
            }
            if (x < y) {
              return -1;
            }
            return 0;
          })
        )}
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
