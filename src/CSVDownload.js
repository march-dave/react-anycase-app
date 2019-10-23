import React, { Component } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";

class CSVDownload extends Component {
  render() {
    const data = [
      { details: { firstName: "Ahmed", lastName: "Tomi" }, job: "manager" },
      { details: { firstName: "John", lastName: "Jones" }, job: "developer" }
    ];

    return (
      <CSVLink
        data={data}
        asyncOnClick={true}
        onClick={(event, done) => {
          axios.post("/spy/user").then(() => {
            done(); // REQUIRED to invoke the logic of component
          });
        }}
      >
        Download me
      </CSVLink>
    );
  }
}

export default CSVDownload;
