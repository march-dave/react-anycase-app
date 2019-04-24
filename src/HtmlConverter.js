import React, { Component } from 'react'
import ReactHTMLConverter from 'react-html-converter/node';
import LzEditor from './editor/index.jsx'

export default class HtmlConverter extends Component {

    state = {
        mmm: `<em style={ color: #5486BF }>1111</em>`
    }

    render() {
        // const converter = new ReactHTMLConverter();
        // converter.registerComponent('test', Test);

        // const html = '<div class="my-div"><Test text="Hello World" /></div>';

        return (
            <div>
                <p>{this.state.mmm}</p>
                <p><em style={{ color: '#5486BF' }}>2222</em></p>
            </div>
        )
    }

}

// class Test extends React.Component {
//     render() (
//                             return <div>{this.props.text}</div>;
//                         );
//                     }
