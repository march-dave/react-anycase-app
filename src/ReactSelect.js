import React, { Component } from 'react'
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

export default class ReactSelect extends Component {
  state = {
    selectedOption: null,
  }
  handleChange = (selectedOption) => {

// this.setState(prevState => ({
//   formComplete: prevState.answers.filter(answer => answer !== '').length === prevState.totalAnswers
// }));

// await this.setState(prevState => ({
//     experienceList: prevState.experienceList
//       .filter(role => role !== prevState.experienceList[index])
//   }), () => {
//     this.props.updateExperienceList(this.state.experienceList);
//   });

    this.setState({ selectedOption });

    this.setState(prevState => ({
      selectedOption: prevState.selectedOption.value === 'chocolate' ? {value: 'aaa', label: 'aaa'} : selectedOption
    }))

    console.log(`Option selected:`, selectedOption);
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <div>
        <Select
          isClearable
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
      </div>
    );
  }
}
