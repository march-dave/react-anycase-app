import React, { Component } from 'react';

class Contact extends Component {

    id = 2;
    state = {
        information: [
            {
                id: 0,
                firstname: 'dave'
            },
            {
                id: 1,
                firstname: 'jane'
            }
        ]
    }

    handClick = (data) => {
        debugger;
        this.setState({
            information: this.state.information.concat({ id: this.id++, ...data })
        })
    }

    render() {
        return (
            <div>
                <input type="text" name="firstname" onClick={this.handClick} placeholder="something input" />
            </div>
        )
    }
}

export default Contact;