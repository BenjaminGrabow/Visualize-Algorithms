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
      bubble: [
        41,
      ]
    };
  }

  componentDidMount = () => {
    // create array with random numbers (but unique number)
    
    for (var a=[],i=0;i<40;++i) a[i]=i;

    function shuffle(array) {
      var tmp, current, top = array.length;
      if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
      return array;
    }
    
    a = shuffle(a);

    this.setState({
      bubble: a
    });
  };

  sort = () => {
    let arr = [...this.state.bubble];
    
//     const arrSorted = this.state.bubble.sort((a, b) => a - b);
// console.log(arr)
//     if (arrSorted === arr) {
//       return null;

//     } else {
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
        }, 100);
      } else {
        if (i < arr.length) {
          i += 1;
          this.sort();
        } else {
          i = 0;
          this.sort();
        }
      }
    // }
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
