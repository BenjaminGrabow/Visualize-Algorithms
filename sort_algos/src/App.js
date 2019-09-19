import React from "react";
import "./App.css";
import styled from "styled-components";

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  
  .bubble{
  display: flex;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bubble: [2, 5, 8, 3, 1, 4, 6, 9, 7, 10]
    };
  }
  render() {
    return (
      <StyledApp>
        <div className="bubble">
        {this.state.bubble.map(num => (
          <div
            style={{
              width: "1rem",
              height: `${num}rem`,
              backgroundColor: "black"
            }}
          />
        ))}
        </div>
      </StyledApp>
    );
  }
}

export default App;
