import React, { Component } from "react";

class TimeLine extends Component {
  render() {
    return (
      <div>
        <div className="cover">
          <h1 className="cover-title">
            <span>The history of </span>Photoshop
          </h1>
        </div>

        <div className="wrapper">
          <ul className="timeline">
            <li className="timeline-item">
              <div className="card">
                <img className="card-icon" src="images/1.png"  alt="images" />
                <h2 className="card-title">1990</h2>
                <dl className="card-definition">
                  <dt>
                    Photo 1.0
                    <span>Fast Eddy</span>
                  </dt>
                  <dd>Color sdjflsjl</dd>
                </dl>
              </div>
            </li>
            <li className="timeline-item">
              <div className="card">
                <img className="card-icon" src="images/1.png" />
                <h2 className="card-title">1990</h2>
                <dl className="card-definition">
                  <dt>
                    Photo 1.0
                    <span>Fast Eddy</span>
                  </dt>
                  <dd>Color sdjflsjl</dd>
                </dl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default TimeLine;
