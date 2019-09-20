import React from "react";
import "./App.css";
import { Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {

  };

  render() {
    return (
      <StyledApp>
        <Route path="/" component={BubbleSort}/>
      </StyledApp>
    );
  }
}

export default App;
