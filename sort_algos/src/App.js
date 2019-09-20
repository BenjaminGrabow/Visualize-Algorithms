import React from "react";
import BubbleSort from "./components/SortAlgos/BubbleSort";
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
      <div>
        <Route path="/" component={BubbleSort}/>
      </div>
    );
  }
}

export default App;
