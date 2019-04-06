import React, { Component } from 'react'

export default class ObjectEmpty extends Component {

    render() {
        let obj = {}
        return (
            <div>
                {
                    Object.entries(obj).length === 0 && obj.constructor === Object
                }
            </div>
        )
    }
}
