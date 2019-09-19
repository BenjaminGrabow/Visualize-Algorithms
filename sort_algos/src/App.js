import React from 'react';
import './App.css';
import styled from "styled-components";

const StyledApp = styled.div`
display: flex;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      bubble: [2,5,8,3,1,4,6,9,7,10],
     }
  }
  render() { 
    return ( <StyledApp>
    {this.state.bubble.map(num => <div style={{width: "1rem", height: `${num}rem`, backgroundColor: "black"}}/>)}
    </StyledApp>
     );
  }
}
 
export default App;