import React from "react";
import styled from "styled-components";

const StyledSelectionSort = styled.div`
  .selection {
    display: flex;
  }

  .beam {
    margin: 0.1rem;
    background-color: black;
    width: 1rem;
  }
`;

let currentIndex = 0;
let smallestCurrentNumberIndex;
let numberWhichGetsSwappedIndex = 0;

class SelectionSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: [1],
      selectionSolved: null
    };
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
    let arr = [...this.state.selection];

    const currentItem = document.querySelectorAll(".beam");
    // currentItem[i].style.backgroundColor = "green";

    if (JSON.stringify(this.state.selectionSolved) === JSON.stringify(arr)) {
      for (let i = 0; i < currentItem.length; i++) {
        // currentItem[i].style.backgroundColor = "green";
      }
      return null;
    } else {
      setTimeout(() => {
        if (!smallestCurrentNumberIndex) {
          smallestCurrentNumberIndex = currentIndex;
        }

        if (currentIndex === arr.length - 1) {
          if (arr[currentIndex] > arr[smallestCurrentNumberIndex]) {
            smallestCurrentNumberIndex = currentIndex;
          }

          let temp = arr[numberWhichGetsSwappedIndex];
          arr[numberWhichGetsSwappedIndex] = arr[smallestCurrentNumberIndex];
          arr[smallestCurrentNumberIndex] = temp;
          this.setState({
            selection: arr
          });
          currentIndex = 0;
          numberWhichGetsSwappedIndex += 1;
          this.sort();
        } else {
          if (arr[currentIndex] > arr[smallestCurrentNumberIndex]) {
            smallestCurrentNumberIndex = currentIndex;
          }
          currentIndex += 1;
          this.sort();
        }
      }, 50);
    }
  };

  restart = () => {
    this.componentDidMount();
  };

  render() {
    return (
      <StyledSelectionSort>
        <div className="selection">
          {this.state.selection.map(item => (
            <div className="beam" style={{ height: `${item}rem` }} />
          ))}
        </div>

        <button onClick={this.sort}>Sort</button>
        <button onClick={this.restart}>Restart</button>
      </StyledSelectionSort>
    );
  }
}

export default SelectionSort;
