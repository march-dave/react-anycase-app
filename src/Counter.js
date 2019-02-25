import React, { Component } from 'react';

class Counter extends Component {

    state = {
        number: 0
    }
   
    // handleChange = () => {
    //     this.setState({
    //         number: this.state.number = this.state.number + 1
    //     })
    // }

    // handleChange = () => {
    //     this.setState(({number}) => ({ number: number + 1 }));
    // }

   handleChange = () => {
    //    this.setState( ({number}) => ({number: number + 1}) )

    this.setState( ({number}) => ({number: number + 1}) )
   }

    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <input type="button" value="+" onClick={this.handleChange}/>
            </div>
        )
    }

}

export default Counter;