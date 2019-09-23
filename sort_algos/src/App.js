import React from "react";
import BubbleSort from "./components/SortAlgos/IterativeSort/BubbleSort";
import SelectionSort from "./components/SortAlgos/IterativeSort/SelectionSort";
import "./App.css";
import { Route, NavLink } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    return (
      <div>
        <Route path="/bubble" component={BubbleSort} />
        <Route path="/" component={SelectionSort} />
      </div>
    );
  }
}

export default App;
