import React from "react";
import styled from "styled-components";

const StyledSelectionSort = styled.div`
`;

class SelectionSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      selection: [1],
      selectionSolved: null
     }
  }

  componentDidMount = () => {
    // create array with random numbers (but unique number)

    for (var a = [], i = 0; i < 40; ++i) a[i] = i;

    function shuffle(array) {
      var tmp,
        current,
        top = array.length;
      if (top)
        while (--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
        }
      return array;
    }

    a = shuffle(a);
    let copy = [...a];

    this.setState({
      selection: a,
      selectionSolved: copy.sort((a, b) => a - b)
    });
  };

  sort = () => {

  };

  

  render() { 
    return ( <SelectionSort>
      {this.state.selection.map(item => <div className="beam" style={{height: `${item}rem`}}/>)}

      <button onClick={this.sort}>Sort</button>
      <button onClick={this.restart}>Restart</button>
    </SelectionSort> );
  }
}
 
export default SelectionSort;