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
    margin: 1rem;
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
      bubbleSolved: null
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

  sort = () => {
    let arr = [...this.state.bubble];
    
    // const currentItem = document.querySelectorAll(".beam");
    // currentItem[i].style.color = "green"; for feature styling

    if (JSON.stringify(this.state.bubbleSolved) === JSON.stringify(arr)) {
      return null;
    } else {
      if (arr[i] > arr[i + 1]) {
        setTimeout(() => {
          var temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          this.setState({
            bubble: arr
          });

          if (i === arr.length - 1) {
            i = 0;
            this.sort();
          } else {
            i += 1;
            this.sort();
          }
        }, 50);
      } else {
        if (i === arr.length - 1) {
          i = 0;
          this.sort();
        } else {
          i += 1;
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
      <StyledBubbleSort>
        <div className="bubble">
          {this.state.bubble.map((num, index) => (
            <div
              key={index}
              className="beam"
              style={{
                height: `${num}rem`,
              }}
            />
          ))}
        </div>

        <button onClick={this.sort}>Sort</button>
        <button onClick={this.restart}>Restart</button>
      </StyledBubbleSort>
    );
  }
}

export default BubbleSort;
