import React from 'react'
import styled from 'styled-components';
import Select from 'react-styled-select'

class MyComp extends React.Component {
  render() {
    const options = [
      { label: "One", value: 1 },
      { label: "Two", value: 2 },
    ]
    return (
      <TileStyle>
        <div className="boxddl">
          <Select
            options={options}
            clearable='true'
            // onOpen={myOpenFunc}
            // onChange={myChangeFunc}
            classes={{
              selectValue: 'my-custom-value',
              selectClearZone: 'clearZone',
              selectArrowZone: 'arrowZone',
            }}
          />
        </div>
      </TileStyle>
    )
  }
}


const TileStyle = styled.div`
.arrowZone {
  display: none;
}

.clearZone {
  margin-right: 0.5rem;
}
.clearZone::before {
  content: ' ';
  display: inline-block;
  width: 1.3em;
  height: 1.3em;
  background-color: currentColor; /* CSS 3 */
  opacity: 0.2;
  border-radius: 50%;
  position: absolute;
  top: 0px;
  left: -3px;
}
`;

export default MyComp;