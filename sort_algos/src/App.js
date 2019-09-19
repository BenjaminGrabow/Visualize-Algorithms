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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bubble: [2, 5, 8, 3, 1, 4, 6, 9, 7, 10, 25, 15, 12, 11, 22, 13, 24, 17]
    };
  }

  sort = () => {

    // var sorted = false;
    // while (!sorted) {
    //   sorted = true;
    //   this.state.bubble.forEach((element, index, array) => {
    //     if (element > array[index + 1]) {
    //       // setInterval(() => {0
    //       array[index] = array[index + 1];
    //       array[index + 1] = element;
    //       // }, 100);
          
    //       // setInterval(() => sorted = false, 100)
    //     }
    //   });
    // }
    
    let arr = [...this.state.bubble];
    
        for(let j=0;j<arr.length;j++) {
            for(let i = 0; i < arr.length; i++) {
                if(arr[i]>arr[i+1]) {
                    var temp = arr[i];
                    arr[i] = arr[i+1];
                    arr[i+1] = temp;
this.changeState(arr);
break;
                  }
            
                  }
              }      
            
          };
          
          changeState = (array) => {
            this.setState({
              bubble: array
    });

    this.sort();
  }

  render() {
    return (
      <StyledApp>
        <div className="bubble">
          {this.state.bubble.map((num, index) => (
            <div key={index}
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
