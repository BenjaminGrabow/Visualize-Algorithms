import React from "react";
import styled from "styled-components";

const StyledSelectionSort = styled.div`
`;

class SelectionSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      selection: [1],
      solvedSelection: null
     }
  }
  render() { 
    return ( <SelectionSort>

    </SelectionSort> );
  }
}
 
export default SelectionSort;