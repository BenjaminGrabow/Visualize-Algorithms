import React from "react";
import styled from "styled-components";

const StyledBubbleSort = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .bubble {
    display: flex;
  }

  .beam {
    margin: 0.1rem;
    background-color: black;
    width: 1rem;
  }
`;

let i = 0;

class BubbleSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bubble: [1],
      bubbleSolved: null,
      checkIfSortStarted: false,
      speed: 50
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
      bubble: a,
      bubbleSolved: copy.sort((a, b) => a - b)
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  startSort = () => {
    if (!this.state.checkIfSortStarted) {
      this.setState({
        checkIfSortStarted: true
      });
      this.bubbleSort();
    }
  };

  bubbleSort = () => {
    let arr = [...this.state.bubble];

    const currentItem = document.querySelectorAll(".beam");
    currentItem[i].style.backgroundColor = "green";

    if (JSON.stringify(this.state.bubbleSolved) === JSON.stringify(arr)) {
      for (let i = 0; i < currentItem.length; i++) {
        currentItem[i].style.backgroundColor = "green";
      }
      return null;
    } else {
      if (arr[i] > arr[i + 1]) {
        setTimeout(() => {
          currentItem[i].style.backgroundColor = "black";
          var temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          this.setState({
            bubble: arr
          });

          if (i === arr.length - 1) {
            i = 0;
            this.bubbleSort();
          } else {
            i += 1;
            this.bubbleSort();
          }
        }, this.state.speed);
      } else {
        currentItem[i].style.backgroundColor = "black";
        if (i === arr.length - 1) {
          i = 0;
        } else {
          i += 1;
        }
        this.bubbleSort();
      }
    }
  };

  restart = () => {
    const currentItem = document.querySelectorAll(".beam");
    for (let i = 0; i < currentItem.length; i++) {
      currentItem[i].style.backgroundColor = "black";
    }

    this.setState({
      checkIfSortStarted: false
    });
    this.componentDidMount();
  };

  render() {
    return (
      <StyledBubbleSort>
        <div className="bubble">
          {this.state.bubble.map((num, index) => (
            <div
              key={index}
              className="beam"
              style={{
                height: `${num}rem`
              }}
            />
          ))}
        </div>
        <div className="description">
          <h2>Time Complexity</h2>
          <p>O(n^2)</p>
          <h2> Space Complexity</h2>
          <p>O(1)</p>
        </div>
        <div className="settings">
          <input
            type="number"
            onChange={this.handleChange}
            name="speed"
            value={this.state.speed}
          />
        </div>
        <button onClick={this.startSort}>Sort</button>
        <button onClick={this.restart}>Restart</button>
      </StyledBubbleSort>
    );
  }
}

export default BubbleSort;
