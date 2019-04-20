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

    handClick = (e) => {
        this.setState({
            id: ++this.id,
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <input type="text" name="firstname" onClick={this.handClick} />
            </div>
        )
    }
}

export default Contact;