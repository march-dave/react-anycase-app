import React, { Component } from 'react'

export default class ObjectEmpty extends Component {

    render() {
        let obj = {}
        return (
            <div>
                {
                    // ES 7+
                    // Object.entries(obj).length === 0 && obj.constructor === Object
                    // ES 6
                    // Object.keys(obj).length === 0 && obj.constructor == Object
                }
            </div>
        )
    }
}
