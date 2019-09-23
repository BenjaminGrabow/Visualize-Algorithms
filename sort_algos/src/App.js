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
        <NavLink to="/bubble_sort" >Bubble Sort</NavLink>
        <NavLink to="/selection_sort" >Selection Sort</NavLink>
        <Route path="/bubble_sort" component={BubbleSort} />
        <Route path="/selection_sort" component={SelectionSort} />
      </div>
    );
  }
}

export default App;
