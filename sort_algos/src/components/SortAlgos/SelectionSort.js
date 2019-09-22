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
let smallestCurrentNumberIndex = 0;
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

    if (JSON.stringify(this.state.selectionSolved) === JSON.stringify(arr)) {
      for (let i = 0; i < currentItem.length; i++) {
        currentItem[i].style.backgroundColor = "green";
      }
      return null;
    } else {
      if (arr[currentIndex] < arr[smallestCurrentNumberIndex]) {
        setTimeout(() => {
          for (let i = 0; i < currentItem.length; i++) {
            currentItem[i].style.backgroundColor = "black";
          }
          smallestCurrentNumberIndex = currentIndex;
          currentItem[currentIndex].style.backgroundColor = "green";

          if (currentIndex === arr.length - 1) {
            let temp = arr[numberWhichGetsSwappedIndex];
            arr[numberWhichGetsSwappedIndex] = arr[smallestCurrentNumberIndex];
            arr[smallestCurrentNumberIndex] = temp;
            this.setState({
              selection: arr
            });
         
            currentIndex = numberWhichGetsSwappedIndex + 1;
            smallestCurrentNumberIndex = arr[numberWhichGetsSwappedIndex + 1];
            numberWhichGetsSwappedIndex += 1;
            this.sort();
          } else {
            currentIndex += 1;
            this.sort();
          }
        }, 100);
      } else {
        if (currentIndex === arr.length - 1) {
          setTimeout(() => {
            let temp = arr[numberWhichGetsSwappedIndex];
            arr[numberWhichGetsSwappedIndex] = arr[smallestCurrentNumberIndex];
            arr[smallestCurrentNumberIndex] = temp;
            this.setState({
              selection: arr
            });
          
            currentIndex = numberWhichGetsSwappedIndex + 1;
            smallestCurrentNumberIndex = arr[numberWhichGetsSwappedIndex + 1];
            numberWhichGetsSwappedIndex += 1;
            this.sort();
          }, 100);
        } else {
          currentIndex += 1;
          this.sort();
        }
      }
    }
  };

  restart = () => {
    this.componentDidMount();
  };

  render() {
    return (
      <StyledSelectionSort>
        <div className="selection">
          {this.state.selection.map((item, index) => (
            <div key={index} className="beam" style={{ height: `${item}rem` }} />
          ))}
        </div>

        <button onClick={this.sort}>Sort</button>
        <button onClick={this.restart}>Restart</button>
      </StyledSelectionSort>
    );
  }
}

export default SelectionSort;
