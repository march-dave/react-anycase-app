import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

export default class Toastify extends Component {

  notify = () => toast('Your career vision has been saved in My Work. Feel free to access it whenever you like.');


  constructor(props) {
    super(props)

    this.state = {
      toast: false
    }
  }
  
  componentDidMount() {

    // toast('Your career vision has been saved in My Work. Feel free to access it whenever you like.');

    if (this.state.toast === false) {
      toast('Your career vision has been saved in My Work. Feel free to access it whenever you like.');

      this.setState({
        toast: true
      })
    }
  }

  render() {
    return (
      <div>
        <BodyStyle>
        {/* <button onClick={this.notify}>Toast ify</button> */}
        <ToastContainer position="top-center"
          autoClose={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable 
          
          // className='toast-container'
          // toastClassName='dark-toast'
          />
          </BodyStyle>
      </div>
    )
  }
}

const BodyStyle = styled.div`

.Toastify {
  // display: flex;
}

.Toastify__toast-body {
  color: white;
  background: black;
  // margin: 0;
}

.Toastify__toast-container--top-center {
  top: -0.3em;
  // left: 50%;
  left: 0;
  // margin-left: -460px;
  margin: 0 auto;
  // width: 70%;
  // width: 70vw;
  width: 100%;
  // border: 1px solid orangered;
}

.Toastify__toast--default {
  background: black;
  color: #aaa;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  width: 70vw;
  margin: 0 auto;
}

.Toastify__close-button {
  font-weight: normal;
  font-size: 16px;
}

.Toastify__close-button--default {
  // background: black;
  color: white;
  opacity: 1;
}

.toast-container {
  // border: 1px solid orangered;
  top: 1em;
    left: 50%;
    margin-left: -160px;

    z-index: 9999;
    position: fixed;
    padding: 4px;
    width: 320px;
    box-sizing: border-box;
    color: #fff;
    background: #000;
    align-self: flex-start;
}

// .dark-toast {
//   backckground: orangered;
// }

`;

