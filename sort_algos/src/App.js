import React from "react";
import "./App.css";
import styled from "styled-components";

const StyledApp = styled.div`
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
  }
`;

let i = 0;

class App extends React.Component {
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
      bubble: a
    });

    setTimeout(
      () =>
        this.setState(prevState => ({
          bubbleSolved: copy.sort((a, b) => a - b)
        })),
      1000
    );
  };

  sort = () => {
    let arr = [...this.state.bubble];

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

          if (i < arr.length) {
            i += 1;
            this.sort();
          } else {
            i = 0;
            this.sort();
          }
        }, 50);
      } else {
        if (i < arr.length) {
          i += 1;
          this.sort();
        } else {
          i = 0;
          this.sort();
        }
      }
    }
  };

  render() {
    return (
      <StyledApp>
        <div className="bubble">
          {this.state.bubble.map((num, index) => (
            <div
              key={index}
              className="beam"
              style={{
                width: "1rem",
                height: `${num}rem`,
                backgroundColor: "black"
              }}
            />
          ))}
        </div>

        <button onClick={this.sort}>Sort</button>
      </StyledApp>
    );
  }
}

export default App;
